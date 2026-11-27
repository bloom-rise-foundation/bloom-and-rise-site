"use client";
import { useEffect } from "react";

/** A speed limit for mouse-wheel and trackpad scrolling, so the scroll-timed stories (the lamp, the lit words, the pinned posters,
 *  the stack) always get to play and a hard flick cannot skip past them.
 *
 *  How it stays smooth: the wheel only moves a target; one rAF loop eases the page toward it, never faster than MAX_SPEED. Nothing
 *  else happens per frame (no style writes, no layout reads), so the loop costs microseconds. The page is never fought: keyboard,
 *  scrollbar drags, anchor links and the browser's own jumps are detected and simply take over (the governor re-syncs to them);
 *  scrolling inside nested scrollers, pinch-zoom, horizontal scrolling and the ends of the page stay native.
 *  Off for touch (browsers cannot cap finger momentum), reduced motion, and lite mode (weak devices scroll best natively). */
const MAX_SPEED = 2800; // px per second
const EASE = 10; // how quickly the page closes on the target (per second)

export default function ScrollGovernor() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("lite")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let pos = window.scrollY;
    let target = pos;
    let raf = 0;
    let last = 0;
    let path = window.location.pathname;

    const maxScroll = () => Math.max(0, root.scrollHeight - window.innerHeight);

    const frame = (t: number) => {
      if (window.location.pathname !== path) {
        // a new page opened: it starts at the top, so drop whatever scroll was still being eased
        path = window.location.pathname;
        raf = 0;
        pos = target = window.scrollY;
        return;
      }
      const dt = Math.min(0.034, (t - last) / 1000 || 0.016);
      last = t;
      const cap = MAX_SPEED * dt;
      const want = (target - pos) * (1 - Math.exp(-dt * EASE));
      pos += Math.max(-cap, Math.min(cap, want));
      if (Math.abs(target - pos) < 0.5) {
        pos = target;
        raf = 0;
      } else {
        raf = requestAnimationFrame(frame);
      }
      window.scrollTo({ top: pos, behavior: "instant" });
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (root.style.overflow === "hidden" || getComputedStyle(root).overflowY === "hidden") return;
      for (let el = e.target as HTMLElement | null; el && el !== document.body; el = el.parentElement) {
        if (el.scrollHeight > el.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(el).overflowY)) return;
      }
      if (!raf) {
        pos = window.scrollY;
        target = pos;
        // at an end of the page with nowhere to go: leave it to the browser
        if ((e.deltaY < 0 && pos <= 0) || (e.deltaY > 0 && pos >= maxScroll() - 1)) return;
      }
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY * unit));
      // never queue more than about a screen ahead of the page
      target = Math.max(pos - window.innerHeight, Math.min(pos + window.innerHeight, target));
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    // anything else that moves the page (keyboard, scrollbar, anchors, find-in-page): follow it and stand down
    const onScroll = () => {
      if (Math.abs(window.scrollY - pos) > 2) {
        cancelAnimationFrame(raf);
        raf = 0;
        pos = target = window.scrollY;
      }
    };
    const onHide = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        pos = target = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    // a weak device found at runtime hands scrolling back to the browser
    const mo = new MutationObserver(() => {
      if (root.classList.contains("lite")) {
        window.removeEventListener("wheel", onWheel);
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
