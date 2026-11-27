import type { ReactNode } from "react";

/* Reusable transition: see Dividers.tsx. The flowers are cut from the supplied reference illustration (left: the coral flower and leaf beside "Made Slowly, Shaped by Hand"; right: the coral flower on the green panel) (public/flank-left.png, flank-right.png), used as they are. */

/** Two drawn flowers (the illustrated coral flower with leaf, and the yellow flower with leaves) that stand either side of a heading. */
export function FlankFlowers({ children }: { children: ReactNode }) {
  return (
    <div className="flank-wrap">
      <Flank side="left" />
      {children}
      <Flank side="right" />
    </div>
  );
}

const SIZE = { left: [394, 444], right: [456, 822] } as const;

function Flank({ side }: { side: "left" | "right" }) {
  const [w, h] = SIZE[side];
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={`flank ${side}`} src={`/flank-${side}.png`} width={w} height={h} alt="" aria-hidden decoding="async" loading="lazy" />;
}
