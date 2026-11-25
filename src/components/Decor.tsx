import { vars } from "./ui";

const ring8 = [0, 45, 90, 135, 180, 225, 270, 315];

/** Shared flower drawing, defined once per page (rendered in the layout) and instanced with <use>: ~25 flowers
 *  on a page cost one node each instead of ten. Colours come from CSS variables, inherited into the instance. */
export function FlowerDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
      <symbol id="flower-sym" viewBox="-50 -50 100 100">
        {ring8.map((a) => (
          <ellipse key={a} rx="13" ry="24" cy="-24" fill="var(--pink)" stroke="var(--beet)" strokeWidth="2" transform={`rotate(${a})`} />
        ))}
        <circle r="15" fill="var(--lemon)" stroke="var(--beet)" strokeWidth="2" />
        <circle r="6" fill="var(--leaf)" />
      </symbol>
    </svg>
  );
}

/** Small flat flower (icons, lamp, rows, band). */
export function Flower({ size = 52, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={`flower ${className}`} viewBox="-50 -50 100 100" width={size} height={size} aria-hidden>
      <use href="#flower-sym" x="-50" y="-50" width="100" height="100" />
    </svg>
  );
}

// A teardrop petal pointing up from the origin, ~42 units long (outline decorations).
const PETAL = "M0 0C-15-8-17-30 0-42C17-30 15-8 0 0Z";

// A broad, softly notched petal (heart-shaped tip), base at the origin, ~54 units long: the realistic hero bloom.
const PETAL_NAT = "M0 0C-11-3-26-20-22-38C-19-50-8-54-2.6-47.5C-1.2-45.8 1.2-45.8 2.6-47.5C8-54 19-50 22-38C26-20 11-3 0 0Z";
const VEINS = ["M0-5C0-20 0-34 0-45", "M0-5C-1-18-4-32-9-44", "M0-5C1-18 4-32 9-44", "M0-4C-5-14-12-26-17-36", "M0-4C5-14 12-26 17-36"];

// Deterministic pseudo-random in [0,1): petals are never mathematically identical, and server/client markup always matches.
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Stamens: fine filaments with small anthers, fanned around the centre with natural irregularity.
const STAMENS = Array.from({ length: 34 }, (_, i) => {
  const a = (i / 34) * Math.PI * 2 + rnd(i, 9) * 0.3;
  const r0 = 4 + rnd(i, 10) * 2;
  const r1 = 10.5 + rnd(i, 11) * 6.5;
  const bend = (rnd(i, 12) - 0.5) * 0.35;
  return {
    x0: +(Math.cos(a) * r0).toFixed(2), y0: +(Math.sin(a) * r0).toFixed(2),
    x1: +(Math.cos(a + bend) * r1).toFixed(2), y1: +(Math.sin(a + bend) * r1).toFixed(2),
    deg: +((a + bend) * (180 / Math.PI)).toFixed(1),
  };
});

type LayerProps = { cls: string; count: number; scale: number; offset?: number; grad: string; seed: number; veins?: number };

/** One ring of petals, drawn once as static SVG. It is animated as a whole (scale/rotate on its box), never petal by petal,
 *  so the bloom stays on the compositor instead of repainting dozens of SVG paths every frame.
 *  Each petal is shaded from a dark base to a light tip, outlined so overlaps read as shadow, and veined. */
function Layer({ cls, count, scale, offset = 0, grad, seed, veins = 5 }: LayerProps) {
  return (
    <svg className={`bl ${cls}`} viewBox="-70 -70 140 140" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const a = (360 / count) * i + offset + (rnd(i, seed) - 0.5) * 9;
        const sc = scale * (0.93 + rnd(i, seed + 1) * 0.14);
        const sk = (rnd(i, seed + 2) - 0.5) * 9;
        return (
          <g key={i} transform={`rotate(${a.toFixed(1)}) scale(${sc.toFixed(3)}) skewX(${sk.toFixed(1)})`}>
            <path d={PETAL_NAT} fill={`url(#${grad})`} stroke="rgba(87,15,29,.3)" strokeWidth=".45" />
            {VEINS.slice(0, veins).map((d, v) => (
              <path key={v} d={d} fill="none" stroke="rgba(87,15,29,.16)" strokeWidth=".3" />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** The hero flower: three rings of shaded petals (so each can drift on its own with the cursor) around a stamened centre,
 *  blooming from a glowing bud. Shared gradients live in the first <svg>. Pure CSS animation. */
export function Bloom() {
  return (
    <div className="bloom" aria-hidden>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="gOuter" x1=".5" y1="1" x2=".5" y2="0"><stop offset="0" stopColor="#94404F" /><stop offset=".22" stopColor="#C65C6A" /><stop offset=".6" stopColor="#E3939B" /><stop offset="1" stopColor="#F9DAD8" /></linearGradient>
          <linearGradient id="gMid" x1=".5" y1="1" x2=".5" y2="0"><stop offset="0" stopColor="#6F2B34" /><stop offset=".25" stopColor="#94404F" /><stop offset=".65" stopColor="#C65C6A" /><stop offset="1" stopColor="#E3939B" /></linearGradient>
          <linearGradient id="gInner" x1=".5" y1="1" x2=".5" y2="0"><stop offset="0" stopColor="#570F1D" /><stop offset=".3" stopColor="#6F2B34" /><stop offset=".7" stopColor="#94404F" /><stop offset="1" stopColor="#C65C6A" /></linearGradient>
          <radialGradient id="gCore" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#94404F" /><stop offset="1" stopColor="#570F1D" /></radialGradient>
        </defs>
      </svg>
      <div className="warm" />
      <div className="glow" />
      <div className="bw bw1" style={vars({ "--dl": "1.1s" })}><Layer cls="bl1" count={8} scale={1.22} offset={0} grad="gOuter" seed={1} /></div>
      <div className="bw bw2" style={vars({ "--dl": "1.3s" })}><Layer cls="bl2" count={8} scale={0.98} offset={22} grad="gMid" seed={2} veins={3} /></div>
      <div className="bw bw3" style={vars({ "--dl": "1.5s" })}><Layer cls="bl3" count={6} scale={0.72} offset={8} grad="gInner" seed={3} veins={3} /></div>
      <div className="bw bw4" style={vars({ "--dl": ".3s" })}>
        <svg className="bl bl4" viewBox="-70 -70 140 140" aria-hidden>
          <circle r="9.5" fill="url(#gCore)" />
          {STAMENS.map((st, i) => (
            <g key={i}>
              <line x1={st.x0} y1={st.y0} x2={st.x1} y2={st.y1} stroke="#F9DAD8" strokeWidth=".55" strokeLinecap="round" opacity=".92" />
              <ellipse cx={st.x1} cy={st.y1} rx="1.6" ry="1" fill="#FCF1DA" stroke="#E3939B" strokeWidth=".25" transform={`rotate(${st.deg} ${st.x1} ${st.y1})`} />
            </g>
          ))}
          <circle r="3.2" fill="#FCF1DA" opacity=".95" />
          <circle r="1.4" fill="#94404F" />
        </svg>
      </div>
    </div>
  );
}

/** A big outlined ring of petals used as quiet page-hero decoration. */
export function PetalRing({ count = 12 }: { count?: number }) {
  return (
    <svg className="petal-ring" viewBox="-70 -70 140 140" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={PETAL} transform={`rotate(${(360 / count) * i}) scale(1.35)`} />
      ))}
      <circle r="9" />
    </svg>
  );
}

/** Poster flower: N petals of one colour, drawn oversized and cropped by its card. */
export function PosterFlower({ count = 8 }: { count?: number }) {
  return (
    <svg className="poster-flower" viewBox="-70 -70 140 140" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={PETAL} transform={`rotate(${(360 / count) * i}) scale(1.4)`} />
      ))}
      <circle r="10" className="eye" />
    </svg>
  );
}

const PETAL_COLORS = ["var(--pink)", "var(--blue)", "var(--pink)", "var(--leaf)"];

/** Falling petals: plain elements animated with CSS transform only, so they run on the compositor (no JavaScript, no canvas,
 *  nothing to repaint), keep falling for the whole page, and cost nothing on interaction. Fewer on small screens. */
export function Petals({ count = 18 }: { count?: number }) {
  return (
    <div className="petals" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <i
          key={i}
          className={`petal${i % 3 === 0 ? " extra" : ""}`}
          style={vars({
            "--px0": `${(i * 37 + 11) % 100}%`,
            "--ps": `${7 + ((i * 5) % 8)}px`,
            "--pd": `${16 + ((i * 3) % 11)}s`,
            "--pt": `-${((i * 1.7) % 22).toFixed(1)}s`,
            "--pw": `${(i % 2 ? 1 : -1) * (24 + ((i * 7) % 40))}px`,
            "--pc": PETAL_COLORS[i % PETAL_COLORS.length],
          })}
        />
      ))}
    </div>
  );
}
