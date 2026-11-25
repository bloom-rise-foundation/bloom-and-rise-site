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

// A teardrop petal pointing up from the origin, ~42 units long.
const PETAL = "M0 0C-15-8-17-30 0-42C17-30 15-8 0 0Z";
const VEIN = "M0-6V-30";

// Sunflower-style seed head: 38 dots on a golden-angle spiral (computed once).
const SEEDS = Array.from({ length: 38 }, (_, i) => {
  const r = 1.25 * Math.sqrt(i + 1) * 1.15;
  const a = i * 137.508 * (Math.PI / 180);
  return { x: +(r * Math.cos(a)).toFixed(2), y: +(r * Math.sin(a)).toFixed(2), k: i % 3 };
});

type LayerProps = { cls: string; count: number; scale: number; offset?: number; fill: string };

/** One ring of petals, drawn once as static SVG. It is animated as a whole (scale/rotate on its box), never petal by petal,
 *  so the bloom stays on the compositor instead of repainting dozens of SVG paths every frame. */
function Layer({ cls, count, scale, offset = 0, fill }: LayerProps) {
  return (
    <svg className={`bl ${cls}`} viewBox="-70 -70 140 140" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <g key={i} transform={`rotate(${(360 / count) * i + offset}) scale(${scale})`}>
          <path className="pt" d={PETAL} fill={fill} />
          <path className="vein" d={VEIN} />
        </g>
      ))}
    </svg>
  );
}

/** The hero flower: four stacked layers (so each can drift on its own with the cursor) bloom from a glowing bud.
 *  Shared gradients live in the first <svg>. Pure CSS animation. */
export function Bloom() {
  return (
    <div className="bloom" aria-hidden>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="gBlue" cx="50%" cy="85%" r="95%"><stop offset="0" stopColor="#7FA9C4" /><stop offset=".6" stopColor="#A6C9DD" /><stop offset="1" stopColor="#D5E6F0" /></radialGradient>
          <radialGradient id="gPink" cx="50%" cy="85%" r="95%"><stop offset="0" stopColor="#C2587B" /><stop offset=".55" stopColor="#E098AC" /><stop offset="1" stopColor="#F5C9D5" /></radialGradient>
          <radialGradient id="gLight" cx="50%" cy="85%" r="95%"><stop offset="0" stopColor="#E7A9BA" /><stop offset=".6" stopColor="#F4C7D3" /><stop offset="1" stopColor="#FFF0DC" /></radialGradient>
        </defs>
      </svg>
      <div className="warm" />
      <div className="glow" />
      <div className="bw bw1" style={vars({ "--dl": "1.1s" })}><Layer cls="bl1" count={12} scale={1} offset={0} fill="url(#gBlue)" /></div>
      <div className="bw bw2" style={vars({ "--dl": "1.3s" })}><Layer cls="bl2" count={10} scale={0.8} offset={18} fill="url(#gPink)" /></div>
      <div className="bw bw3" style={vars({ "--dl": "1.5s" })}><Layer cls="bl3" count={8} scale={0.52} offset={0} fill="url(#gLight)" /></div>
      <div className="bw bw4" style={vars({ "--dl": ".3s" })}>
        <svg className="bl bl4" viewBox="-70 -70 140 140" aria-hidden>
          <circle className="core" r="11.5" />
          {SEEDS.map((s, i) => (
            <circle key={i} className={`seed k${s.k}`} cx={s.x} cy={s.y} r={0.95} />
          ))}
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
