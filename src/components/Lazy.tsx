"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

/** Optional extras for mouse users only (never needed for first paint): the flower cursor and the pointer effects. */
export function Extras() {
  const [mouse, setMouse] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    return afterLoadIdle(() => setMouse(true));
  }, []);

  return mouse ? (
    <>
      <PointerImpl />
      <CursorImpl />
    </>
  ) : null;
}
