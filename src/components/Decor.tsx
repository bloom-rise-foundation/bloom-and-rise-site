import { vars } from "./ui";

const ring = [0, 45, 90, 135, 180, 225, 270, 315];

export function Flower({ size = 52, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={`flower ${className}`} viewBox="-50 -50 100 100" width={size} height={size} aria-hidden>
      {ring.map((a) => (
        <ellipse key={a} rx="13" ry="24" cy="-24" fill="var(--pink)" stroke="var(--beet)" strokeWidth="2" transform={`rotate(${a})`} />
      ))}
      <circle r="15" fill="var(--lemon)" stroke="var(--beet)" strokeWidth="2" />
      <circle r="6" fill="var(--leaf)" />
    </svg>
  );
}

/** The hero flower: a blue back ring and a pink front ring unfurl petal by petal, then turn very slowly. Pure CSS. */
export function Bloom() {
  return (
    <svg className="bloom" viewBox="-62 -62 124 124" aria-hidden>
      <g className="spin">
        {ring.map((a, i) => (
          <ellipse key={`b${a}`} className="pt back" rx="12.5" ry="27" cy="-29" style={vars({ "--a": `${a + 22.5}deg`, "--i": i })} />
        ))}
        {ring.map((a, i) => (
          <ellipse key={`f${a}`} className="pt" rx="13" ry="24" cy="-24" style={vars({ "--a": `${a}deg`, "--i": i })} />
        ))}
        <circle className="core" r="15" />
        <circle className="seed" r="6" />
      </g>
    </svg>
  );
}
