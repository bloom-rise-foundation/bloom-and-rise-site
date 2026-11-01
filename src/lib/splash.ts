import { useSyncExternalStore } from "react";

/* Tiny shared flag: false while the loading splash is up, true once it starts to fade.
   Page animations wait for it, so they play for the visitor instead of behind the splash. */
let done = false;
const subs = new Set<() => void>();

export function markSplashDone() {
  if (done) return;
  done = true;
  subs.forEach((f) => f());
}

export function useSplashDone(): boolean {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => { subs.delete(cb); };
    },
    () => done,
    () => false,
  );
}