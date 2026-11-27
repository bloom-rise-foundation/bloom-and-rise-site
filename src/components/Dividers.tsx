import { cache } from "react";
import { Flower } from "./Decor";

/* =====================================================================================================================
   TRANSITIONS: reusable pieces that carry one section into the next. All of them are server-rendered, CSS-only, and take
   the colour of the section they open. The edge shapes are repeating masks (see styles/dividers.css), so they stretch to any width.

   - EdgeDivider    one torn / stacked-pages / notebook-spiral / perforated / wavy edge. Never repeated on a page: claimEdge() hands out each shape once per page.
   - WaveMarquee    a line of words sliding along a wavy edge, opening the next section (used instead of a plain edge).
   - FlankFlowers   (FlankFlowers.tsx) a pair of drawn flowers either side of a heading: the closing call to action.
   ===================================================================================================================== */

export type EdgeVariant = "torn" | "pages" | "spiral" | "stamp" | "cloud" | "torn-soft" | "pinked" | "deckle" | "ripple" | "wave";

/** Preferred order; "wave" is last because the wave marquee reserves it. */
const ORDER: EdgeVariant[] = ["torn", "pages", "spiral", "deckle", "stamp", "torn-soft", "pinked", "cloud", "ripple", "wave"];

/** The shapes already used on the page being rendered (React's cache() is scoped to one render, i.e. one page). */
const used = cache(() => new Set<EdgeVariant>());

/** Hands out an edge shape that this page has not used yet (or the preferred one if it is still free). */
export function claimEdge(prefer?: EdgeVariant): EdgeVariant {
  const u = used();
  if (prefer && !u.has(prefer)) {
    u.add(prefer);
    return prefer;
  }
  const v = ORDER.find((x) => !u.has(x) && x !== "wave") ?? ORDER.find((x) => !u.has(x)) ?? ORDER[u.size % ORDER.length];
  u.add(v);
  return v;
}

/** One edge. It sits just above (side="top") or below (side="bottom") its parent, in the parent's colour (--c). */
export function EdgeDivider({ variant, side = "top" }: { variant: EdgeVariant; side?: "top" | "bottom" }) {
  return <i className={`edge-div ${variant} ${side}`} aria-hidden />;
}

type Tone = "pink" | "blue" | "beet" | "rum" | "wine";

/** Words sliding along a wavy edge (a ticker that opens the next section). Put it between two sections and give the next
 *  Section `edge={false}`; `tone` is the colour of that next section. */
export function WaveMarquee({ items, tone }: { items: string[]; tone: Tone }) {
  claimEdge("wave");
  const run = [...items, ...items];
  const half = (n: number) =>
    run.map((t, i) => (
      <li key={`${n}-${i}`} aria-hidden={n > 0 || i >= items.length || undefined}>
        <span>{t}</span>
        <Flower size={22} />
      </li>
    ));
  return (
    <div className={`wm ${tone}`} role="presentation" aria-label={items.join(", ")}>
      <div className="wm-text" aria-hidden>
        <ul className="wm-track">{half(0)}{half(1)}</ul>
      </div>
      <i className="edge-div wave top wm-edge" aria-hidden />
    </div>
  );
}
