"use client";
import { useEffect, useRef } from "react";

const HOT = "a,button,[role=button],summary,label,select,.btn,.burger";
const TEXT = "input:not([type=checkbox]):not([type=radio]):not([type=submit]),textarea";

// relative luminance (0..1) of a computed css colour string
function lum(c: string): number {
  const n = (c.match(/-?[\d.]+/g) || []).map(Number);
  if (n.length < 3) return 0;
  const scale = c.startsWith("color(") ? 1 : 255;
  const [r, g, b] = n.slice(0, 3).map((v) => v / scale);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const node = ref.current!;
    const root = document.documentElement;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, started = false;
    let last: Element | null = null;

    const loop = () => {
      x += (tx - x) * 0.4;
      y += (ty - y) * 0.4;
      node.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = requestAnimationFrame(loop);
    };

    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!started) { x = tx; y = ty; started = true; root.classList.add("cursor-on"); raf = requestAnimationFrame(loop); }
      node.classList.remove("out");
      const t = e.target as Element | null;
      if (t && t !== last) {
        last = t;
        node.classList.toggle("hot", !!t.closest(HOT));
        node.classList.toggle("text", !!t.closest(TEXT));
        // light text colour => dark surface underneath
        node.classList.toggle("on-dark", lum(getComputedStyle(t).color) > 0.6);
      }
    };
    const leave = () => node.classList.add("out");
    const down = () => node.classList.add("down");
    const up = () => node.classList.remove("down");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    root.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("cursor-on");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      root.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor out" aria-hidden="true">
      <div className="cursor-in">
        <svg viewBox="0 0 32 32" width="28" height="28">
          <g className="cf-petal" strokeWidth="1" strokeLinejoin="round">
            {[0, 72, 144, 216, 288].map((r) => (
              <path key={r} transform={`rotate(${r} 16 16)`}
                d="M16 16C9 11.5 9 3.5 14 2.7c1-.2 1.6.4 2 1.2.4-.8 1-1.4 2-1.2 5 .8 5 8.8-2 13.3Z" />
            ))}
          </g>
          <circle className="cf-core" cx="16" cy="16" r="3.6" />
          <g className="cf-dot">
            <circle cx="16" cy="14" r=".9" /><circle cx="17.9" cy="15.4" r=".9" />
            <circle cx="17.2" cy="17.6" r=".9" /><circle cx="14.8" cy="17.6" r=".9" />
            <circle cx="14.1" cy="15.4" r=".9" />
          </g>
        </svg>
      </div>
    </div>
  );
}