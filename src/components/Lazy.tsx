"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isLite } from "@/lib/perf";

const PetalImpl = dynamic(() => import("./PetalField"), { ssr: false });
const CursorImpl = dynamic(() => import("./Cursor").then((m) => m.Cursor), { ssr: false });
const PointerImpl = dynamic(() => import("./Pointer"), { ssr: false });

/** Runs `cb` once the window has loaded and the browser is idle, so it never competes with the first load. */
function afterLoadIdle(cb: () => void): () => void {
  let cancelled = false;
  const w = window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
  let idle = 0;
  let timer = 0;
  const go = () => {
    if (cancelled) return;
    if (w.requestIdleCallback) idle = w.requestIdleCallback(() => !cancelled && cb(), { timeout: 2000 });
    else timer = window.setTimeout(() => !cancelled && cb(), 200);
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", go);
    if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle);
    window.clearTimeout(timer);
  };
}

/** Optional extras: none of them is needed for first paint, and each only exists where it is useful.
 *  - petal canvas: capable, motion-friendly devices only
 *  - custom cursor + pointer effects: mouse users only */
export function Extras() {
  const [petals, setPetals] = useState(false);
  const [mouse, setMouse] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    return afterLoadIdle(() => {
      if (!reduce && !isLite()) setPetals(true);
      if (fine) setMouse(true);
    });
  }, []);

  return (
    <>
      {petals && <PetalImpl />}
      {mouse && (
        <>
          <PointerImpl />
          <CursorImpl />
        </>
      )}
    </>
  );
}
