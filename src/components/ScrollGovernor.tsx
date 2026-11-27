"use client";
import { useEffect } from "react";

/** Mouse-wheel and trackpad scrolling gets a speed limit, so the scroll-timed stories (the lamp, the lit words, the pinned
 *  posters, the stack) always have frames to play and a fast flick cannot skip past them. Phones keep native touch momentum
 *  (browsers cannot cap it); keyboard and scrollbar dragging are native too. Reduced motion turns it off. */
const MAX_SPEED = 3000; // px per second
const EASE = 9; // how quickly the page closes on the wheel's target

export default function ScrollGovernor() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    let pos = window.scrollY;
    let target = pos;
    let raf = 0;
    let last = 0;

    const maxScroll = () => root.scrollHeight - window.innerHeight;

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      const cap = MAX_SPEED * dt;
      const step = Math.max(-cap, Math.min(cap, (target - pos) * Math.min(1, dt * EASE)));
      pos += step;
      window.scrollTo({ top: pos, behavior: "instant" });
      root.style.setProperty("--sv", (step / cap).toFixed(2));
      if (Math.abs(target - pos) > 0.5) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        root.style.setProperty("--sv", "0");
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (getComputedStyle(root).overflowY === "hidden") return;
      for (let el = e.target as HTMLElement | null; el && el !== document.body; el = el.parentElement) {
        const s = getComputedStyle(el);
        if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight) return;
      }
      e.preventDefault();
      if (!raf) { pos = window.scrollY; target = pos; }
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY * unit));
      // never run more than about a screen ahead of the page
      target = Math.max(pos - window.innerHeight, Math.min(pos + window.innerHeight, target));
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };
    const onScroll = () => { if (!raf) { pos = window.scrollY; target = pos; } };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      root.style.removeProperty("--sv");
    };
  }, []);
  return null;
}
