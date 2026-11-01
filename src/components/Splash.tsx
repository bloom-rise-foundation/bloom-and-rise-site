"use client";

import { useEffect, useState } from "react";

/* Full-screen loading splash: the flower pops out, shines a soft light,
   then the overlay fades away to reveal the page once it has loaded. */
const MIN_MS = 2400; // let the pop + shine finish
const MAX_MS = 6000; // never hold the page hostage on slow networks
const FADE_MS = 900; // must match .splash transition in globals.css

export default function Splash() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const start = performance.now();
    document.documentElement.classList.add("splash-on");
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      window.setTimeout(() => {
        setDone(true);
        document.documentElement.classList.remove("splash-on");
        window.setTimeout(() => setGone(true), FADE_MS + 100);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = window.setTimeout(finish, MAX_MS);

    return () => {
      window.clearTimeout(cap);
      window.removeEventListener("load", finish);
      document.documentElement.classList.remove("splash-on");
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`splash${done ? " done" : ""}`} aria-hidden="true">
      <div className="splash-stage">
        <span className="splash-glow" />
        <span className="splash-rays" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="splash-flower" src="/icons/icon-512.png" alt="" width={512} height={512} />
        <span className="splash-sheen" />
      </div>
    </div>
  );
}