import type { ReactNode } from "react";

/* Reusable transition: see Dividers.tsx. Client-safe (plain SVG, no server-only APIs), so the closing call to action can use it. */

/** Two drawn flowers (a bloom with a stem and leaves, and a small one) that stand either side of a heading. */
export function FlankFlowers({ children }: { children: ReactNode }) {
  return (
    <div className="flank-wrap">
      <Flank side="left" />
      {children}
      <Flank side="right" />
    </div>
  );
}

const PETALS5 = [0, 72, 144, 216, 288];

function Bloom5({ x, y, r, petal, rim, core }: { x: number; y: number; r: number; petal: string; rim: string; core: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {PETALS5.map((a) => (
        <ellipse key={a} rx={r * 0.5} ry={r * 0.72} cy={-r * 0.62} fill={petal} stroke={rim} strokeWidth="1.4" transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.34} fill="#FCF1DA" stroke={rim} strokeWidth="1.2" />
      <circle r={r * 0.14} fill={core} />
    </g>
  );
}

function Flank({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  const g = left ? "" : "translate(220 0) scale(-1 1)";
  // every leaf starts ON the stem (stem points were computed from its curve), and the small flower has its own twig off the stem
  return (
    <svg className={`flank ${side}`} viewBox="0 0 220 340" aria-hidden focusable="false">
      <g transform={g}>
        <path d="M76 226C92 190 140 176 182 186C160 226 112 240 76 226Z" fill="#7C95B6" stroke="#3A557D" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M76 226C110 206 146 196 178 188" fill="none" stroke="#3A557D" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M69 294C50 262 24 256 6 262C14 290 40 304 69 294Z" fill="#D5E3EE" stroke="#3A557D" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M69 294C48 282 28 270 8 263" fill="none" stroke="#3A557D" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M71 262C104 272 132 270 156 258" fill="none" stroke="#3A557D" strokeWidth="3" strokeLinecap="round" />
        <path d="M70 330C66 270 74 210 100 150L94 116" fill="none" stroke="#3A557D" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {left ? (
        <>
          <Bloom5 x={92} y={112} r={44} petal="#E3939B" rim="#94404F" core="#C65C6A" />
          <Bloom5 x={158} y={256} r={24} petal="#F9DAD8" rim="#C65C6A" core="#94404F" />
        </>
      ) : (
        <>
          <Bloom5 x={128} y={112} r={44} petal="#F9DAD8" rim="#C65C6A" core="#6F2B34" />
          <Bloom5 x={62} y={256} r={24} petal="#E3939B" rim="#94404F" core="#C65C6A" />
        </>
      )}
    </svg>
  );
}
