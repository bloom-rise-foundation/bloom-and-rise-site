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
  return (
    <svg className={`flank ${side}`} viewBox="0 0 220 340" aria-hidden focusable="false">
      {left ? (
        <>
          <path d="M70 330C66 270 74 210 100 150" fill="none" stroke="#3A557D" strokeWidth="5" strokeLinecap="round" />
          <path d="M100 160C128 120 160 96 196 90C186 128 158 156 112 176Z" fill="#7C95B6" stroke="#3A557D" strokeWidth="1.6" />
          <path d="M88 236C60 220 38 222 18 236C38 256 64 258 88 244Z" fill="#D5E3EE" stroke="#3A557D" strokeWidth="1.6" />
          <Bloom5 x={92} y={112} r={44} petal="#E3939B" rim="#94404F" core="#C65C6A" />
          <Bloom5 x={158} y={262} r={24} petal="#F9DAD8" rim="#C65C6A" core="#94404F" />
        </>
      ) : (
        <>
          <path d="M150 330C154 272 146 212 120 150" fill="none" stroke="#3A557D" strokeWidth="5" strokeLinecap="round" />
          <path d="M120 160C92 120 60 96 24 90C34 128 62 156 108 176Z" fill="#7C95B6" stroke="#3A557D" strokeWidth="1.6" />
          <path d="M132 236C160 220 182 222 202 236C182 256 156 258 132 244Z" fill="#D5E3EE" stroke="#3A557D" strokeWidth="1.6" />
          <Bloom5 x={128} y={112} r={44} petal="#F9DAD8" rim="#C65C6A" core="#6F2B34" />
          <Bloom5 x={62} y={262} r={24} petal="#E3939B" rim="#94404F" core="#C65C6A" />
        </>
      )}
    </svg>
  );
}

