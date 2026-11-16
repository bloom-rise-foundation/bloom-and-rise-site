import { useSyncExternalStore } from "react";

/* Flips to true once the window has loaded and the browser has gone idle. Shared by everything that wants to wait for that. */
let ready = false;
let started = false;
const subs = new Set<() => void>();

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  const fire = () => { ready = true; subs.forEach((f) => f()); };
  const go = () => {
    const w = window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(fire, { timeout: 1500 }); else window.setTimeout(fire, 200);
  };
  if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
}

export function useLoadedIdle(): boolean {
  return useSyncExternalStore(
    (cb) => { subs.add(cb); start(); return () => { subs.delete(cb); }; },
    () => ready,
    () => false,
  );
}
