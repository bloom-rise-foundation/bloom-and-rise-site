"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SceneImpl = dynamic(() => import("./Scene").then((m) => m.Scene), { ssr: false });
const CursorImpl = dynamic(() => import("./Cursor").then((m) => m.Cursor), { ssr: false });

/** Runs `cb` once the window has loaded and the browser is idle, so it never competes with the first load. */
function afterLoadIdle(cb: () => void): () => void {
  let cancelled = false;
  const w = window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
  let idle = 0;
  let timer = 0;
  const go = () => {
    if (cancelled) return;
    if (w.requestIdleCallback) idle = w.requestIdleCallback(() => !cancelled && cb(), { timeout: 1500 });
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

/* The background scene is not needed for first paint (the loading splash covers it): its chunk, photo and boat are fetched after the page has loaded. */
export function Scene() {
  const [on, setOn] = useState(false);
  useEffect(() => afterLoadIdle(() => setOn(true)), []);
  return on ? <SceneImpl /> : null;
}

/* The custom cursor only exists for mouse users: touch devices never download it. */
export function Cursor() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    return afterLoadIdle(() => setOn(true));
  }, []);
  return on ? <CursorImpl /> : null;
}
