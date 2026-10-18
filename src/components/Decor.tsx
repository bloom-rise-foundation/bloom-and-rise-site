"use client";

export function Flower({ size = 52, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={`flower ${className}`} viewBox="-50 -50 100 100" width={size} height={size} aria-hidden>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a} rx="13" ry="24" cy="-24" fill="var(--pink)" stroke="var(--beet)" strokeWidth="2" transform={`rotate(${a})`} />
      ))}
      <circle r="15" fill="var(--lemon)" stroke="var(--beet)" strokeWidth="2" />
      <circle r="6" fill="var(--leaf)" />
    </svg>
  );
}

const colors = ["var(--pink)", "var(--blue)", "var(--leaf)"];

/** Fixed, falling petals. Deterministic values avoid hydration mismatches. */
export function Petals({ count = 16 }: { count?: number }) {
  return (
    <div className="petals" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <i
          key={i}
          className="petal"
          style={{
            ["--x" as string]: `${(i * 37) % 100}%`,
            ["--s" as string]: `${6 + ((i * 5) % 7)}px`,
            ["--d" as string]: `${14 + ((i * 3) % 9)}s`,
            ["--t" as string]: `-${(i * 1.9) % 16}s`,
            ["--c" as string]: colors[i % 3],
          }}
        />
      ))}
    </div>
  );
}
