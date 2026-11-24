"use client";
import { useEffect, useRef } from "react";

/* Petal field: ~24 petals drift down the page, lean away from the cursor and swell with scroll speed.
   Built to cost almost nothing: DPR capped at 1.5, ~30fps, paused when the tab is hidden or the visitor has
   scrolled past the first screen. (Not mounted at all on lite devices or under reduced motion; see Lazy.tsx.) */
const COLORS = ["#E098AC", "#A6C9DD", "#E098AC", "#C9D27A"];
const COUNT = 24;
const FRAME = 1000 / 30;

type P = { x: number; y: number; s: number; vy: number; ph: number; sp: number; rot: number; vr: number; c: string };

export default function PetalField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const petals: P[] = Array.from({ length: COUNT }, (_, i) => ({
      x: rnd(0, w), y: rnd(0, h), s: rnd(5, 11), vy: rnd(14, 30), ph: rnd(0, 6.28), sp: rnd(0.4, 1), rot: rnd(0, 6.28), vr: rnd(-0.8, 0.8), c: COLORS[i % COLORS.length],
    }));

    let mx = -999, my = -999;
    let lastY = window.scrollY, speed = 0;
    let raf = 0, last = 0, running = false;

    const visible = () => !document.hidden && window.scrollY < window.innerHeight * 1.3;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < FRAME) return;
      const dt = Math.min((t - last) / 1000, 0.1);
      last = t;
      const sy = window.scrollY;
      speed += (Math.min(Math.abs(sy - lastY) / Math.max(dt * 1000, 1), 3) - speed) * 0.15;
      lastY = sy;
      if (!visible()) { stop(); return; }

      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.ph += dt * p.sp;
        p.y += (p.vy + speed * 40) * dt;
        p.x += Math.sin(p.ph) * 18 * dt;
        p.rot += p.vr * dt;
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) {
          const d = Math.sqrt(d2) || 1, f = (1 - d / 130) * 140 * dt;
          p.x += (dx / d) * f; p.y += (dy / d) * f;
        }
        if (p.y > h + 20) { p.y = -20; p.x = rnd(0, w); }
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.s * 0.5, p.s, 0, 0, 6.2832);
        ctx.fill();
        ctx.restore();
      }
    };

    const start = () => { if (running || !visible()) return; running = true; last = performance.now(); raf = requestAnimationFrame(draw); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
    const onScroll = () => { if (!running) start(); };
    const onVis = () => (document.hidden ? stop() : start());

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => {
      stop();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="petal-canvas" aria-hidden="true" />;
}
