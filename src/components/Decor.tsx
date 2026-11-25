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
