"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CursorImpl = dynamic(() => import("./Cursor").then((m) => m.Cursor), { ssr: false });
const PointerImpl = dynamic(() => import("./Pointer"), { ssr: false });
const GovernorImpl = dynamic(() => import("./ScrollGovernor"), { ssr: false });
const DelightsImpl = dynamic(() => import("./Delights"), { ssr: false });
const WatchImpl = dynamic(() => import("./PerfWatch"), { ssr: false });
const HeroImpl = dynamic(() => import("./HeroWatch"), { ssr: false });

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

/** Everything that is not needed for first paint loads once the window has loaded and the browser is idle, so none of it competes
 *  with hydration: the frame watcher, the petal burst and (mouse users only) the scroll governor, flower cursor and pointer effects. */
export function Extras() {
  const [ready, setReady] = useState(false);
  const [mouse, setMouse] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    return afterLoadIdle(() => {
      setReady(true);
      if (fine) setMouse(true);
    });
  }, []);

  if (!ready) return null;
  return (
    <>
      <WatchImpl />
      <HeroImpl />
      <DelightsImpl />
      {mouse && (
        <>
          <GovernorImpl />
          <PointerImpl />
          <CursorImpl />
        </>
      )}
    </>
  );
}
