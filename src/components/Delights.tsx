"use client";
import { useEffect } from "react";

/** A small burst of petals where a link or button is pressed. Mouse, pen and touch alike; never on form fields; capped so it
 *  stays light; skipped under reduced motion. */
const COLORS = ["var(--pink)", "var(--rose)", "var(--blue)", "var(--blush)", "var(--glacier)"];

export default function Delights() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let live = 0;
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest("a[href],button,summary,.btn") || t.closest("input,textarea,select")) return;
      if (live >= 3) return;
      live++;
      const box = document.createElement("div");
      box.className = "burst";
      box.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      const n = 7;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.6;
        const d = 34 + Math.random() * 30;
        const p = document.createElement("i");
        p.style.setProperty("--bx", `${Math.cos(a) * d}px`);
        p.style.setProperty("--by", `${Math.sin(a) * d - 8}px`);
        p.style.setProperty("--br", `${(Math.random() - 0.5) * 300}deg`);
        p.style.setProperty("--bc", COLORS[i % COLORS.length]);
        box.appendChild(p);
      }
      document.body.appendChild(box);
      window.setTimeout(() => { box.remove(); live--; }, 950);
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);
  return null;
}
