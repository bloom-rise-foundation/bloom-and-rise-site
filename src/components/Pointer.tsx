"use client";
import { useEffect } from "react";

/* One delegated pointer handler for every interactive effect on the site (magnetic buttons, card tilt,
   cursor glow, spotlight room). Components only add data-fx="mag|tilt|glow|light"; nothing per-element runs in JS.
   Only mounted for mouse users, after the page has gone idle. */
const SEL = "[data-fx]:not([data-fx=hero]),.tile";

export default function Pointer() {
  useEffect(() => {
    let raf = 0;
    let ev: PointerEvent | null = null;
    let cur: HTMLElement | null = null;

    const reset = (el: HTMLElement) => {
      for (const k of ["--tx", "--ty", "--rx", "--ry", "--px", "--py"]) el.style.removeProperty(k);
    };

    const apply = () => {
      raf = 0;
      const e = ev;
      if (!e) return;
      // hero flower drifts with the cursor (handled apart from the rest so buttons inside the hero don't reset it)
      const hero = document.querySelector<HTMLElement>("[data-fx=hero]");
      if (hero) {
        const hr = hero.getBoundingClientRect();
        if (e.clientY >= hr.top && e.clientY <= hr.bottom) {
          hero.style.setProperty("--px", `${(e.clientX / hr.width - 0.5) * 2}`);
          hero.style.setProperty("--py", `${(e.clientY - hr.top) / hr.height * 2 - 1}`);
        }
      }
      const t = (e.target as Element | null)?.closest<HTMLElement>(SEL) ?? null;
      if (cur && cur !== t) reset(cur);
      cur = t;
      if (!t) return;
      const r = t.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const kind = t.dataset.fx ?? "glow";
      if (kind === "mag") {
        t.style.setProperty("--tx", `${(x - r.width / 2) * 0.3}px`);
        t.style.setProperty("--ty", `${(y - r.height / 2) * 0.3}px`);
      } else if (kind === "tilt") {
        t.style.setProperty("--ry", `${(x / r.width - 0.5) * 12}deg`);
        t.style.setProperty("--rx", `${-(y / r.height - 0.5) * 12}deg`);
      } else if (kind === "light") {
        t.style.setProperty("--lx", `${x}px`);
        t.style.setProperty("--ly", `${y}px`);
      } else {
        t.style.setProperty("--mx", `${x}px`);
        t.style.setProperty("--my", `${y}px`);
      }
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ev = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => { if (cur) reset(cur); cur = null; };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return null;
}
