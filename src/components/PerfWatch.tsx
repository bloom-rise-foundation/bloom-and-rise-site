"use client";
import { useEffect } from "react";
import { LITE_KEY } from "@/lib/perf";

/** Watches real frame times. If a device keeps missing frames (a weak phone, a throttled CPU, a busy machine) the page drops into
 *  lite mode for the rest of the session: the costliest finishing effects step back, nothing is removed. It samples the first
 *  seconds after load and the first seconds of scrolling, the two moments the page works hardest. Capable devices never see it. */
const WINDOW = 70; // frames per verdict
const SLOW_MS = 50; // a frame longer than this counts as dropped
const LIMIT = 0.5; // share of dropped frames that triggers lite

export default function PerfWatch() {
  useEffect(() => {
    const d = document.documentElement;
    if (d.classList.contains("lite")) return;
    let raf = 0;
    let prev = 0;
    let n = 0;
    let slow = 0;
    let until = 0;
    let done = false;

    const tick = (t: number) => {
      raf = 0;
      if (done) return;
      if (prev) {
        const dt = t - prev;
        if (dt < 500) { n++; if (dt > SLOW_MS) slow++; } // ignore gaps from a hidden tab
      }
      prev = t;
      if (n >= WINDOW) {
        if (slow / n > LIMIT) {
          d.classList.add("lite");
          try { sessionStorage.setItem(LITE_KEY, "1"); } catch { /* storage blocked: lite still holds for this page */ }
          done = true;
          return;
        }
        n = 0; slow = 0;
      }
      if (t < until) raf = requestAnimationFrame(tick);
      else { prev = 0; n = 0; slow = 0; }
    };
    const watch = (ms: number) => {
      if (done) return;
      until = performance.now() + ms;
      if (!raf) { prev = 0; raf = requestAnimationFrame(tick); }
    };

    const first = window.setTimeout(() => watch(6000), 1500);
    let armed = false;
    const onScroll = () => { if (!armed) { armed = true; watch(4000); } };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => {
      clearTimeout(first);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}
