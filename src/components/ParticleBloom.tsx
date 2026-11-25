"use client";
import { useEffect, useRef } from "react";

/* The hero flower, built out of ~3-5k square particles (a mosaic of palette colours) on a 2D canvas.
 *  - The flower is drawn once offscreen (shaded, veined petals + stamens) and sampled on a grid: every opaque cell becomes a particle
 *    coloured with the nearest palette colour (a few get a sky-blue accent).
 *  - A ring follows the cursor and pushes particles outward like a lens; they spring back. With no pointer, a ghost ring drifts
 *    through the flower so it stays alive (and so touch screens get the same effect).
 *  - On load the particles gather into the flower. Scrolling past it blows them apart (outer petals first), scrolling up re-forms it.
 *  Runs only while the hero is on screen and the tab is visible; static under reduced motion. */

const PETAL = "M0 0C-11-3-26-20-22-38C-19-50-8-54-2.6-47.5C-1.2-45.8 1.2-45.8 2.6-47.5C8-54 19-50 22-38C26-20 11-3 0 0Z";
const VEINS = ["M0-5C0-20 0-34 0-45", "M0-5C-1-18-4-32-9-44", "M0-5C1-18 4-32 9-44", "M0-4C-5-14-12-26-17-36", "M0-4C5-14 12-26 17-36"];

const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type RGB = [number, number, number];
// wine, mulberry, garnet, old rose, petal pink, blush, cream | frozen blue, glacier, denim
const WARM: RGB[] = [[87, 15, 29], [111, 43, 52], [148, 64, 79], [198, 92, 106], [227, 147, 155], [249, 218, 216], [252, 241, 218]];
const COOL: RGB[] = [[213, 227, 238], [124, 149, 182], [58, 85, 125]];
const COLORS = [...WARM, ...COOL].map((c) => `rgb(${c[0]},${c[1]}, ${c[2]})`);

type Stop = [number, string];
const RINGS: { n: number; sc: number; off: number; seed: number; veins: number; stops: Stop[] }[] = [
  { n: 8, sc: 1.22, off: 0, seed: 1, veins: 5, stops: [[0, "#94404F"], [0.22, "#C65C6A"], [0.6, "#E3939B"], [1, "#F9DAD8"]] },
  { n: 8, sc: 0.98, off: 22, seed: 2, veins: 3, stops: [[0, "#6F2B34"], [0.25, "#94404F"], [0.65, "#C65C6A"], [1, "#E3939B"]] },
  { n: 6, sc: 0.72, off: 8, seed: 3, veins: 3, stops: [[0, "#570F1D"], [0.3, "#6F2B34"], [0.7, "#94404F"], [1, "#C65C6A"]] },
];

function paintFlower(ctx: CanvasRenderingContext2D, N: number) {
  ctx.clearRect(0, 0, N, N);
  ctx.save();
  ctx.translate(N / 2, N / 2);
  ctx.scale(N / 140, N / 140);
  const petal = new Path2D(PETAL);
  const veins = VEINS.map((d) => new Path2D(d));
  for (const r of RINGS) {
    const g = ctx.createLinearGradient(0, 0, 0, -54);
    for (const [o, c] of r.stops) g.addColorStop(o, c);
    for (let i = 0; i < r.n; i++) {
      const a = (360 / r.n) * i + r.off + (rnd(i, r.seed) - 0.5) * 9;
      const sc = r.sc * (0.93 + rnd(i, r.seed + 1) * 0.14);
      const sk = (rnd(i, r.seed + 2) - 0.5) * 9;
      ctx.save();
      ctx.rotate((a * Math.PI) / 180);
      ctx.scale(sc, sc);
      ctx.transform(1, 0, Math.tan((sk * Math.PI) / 180), 1, 0, 0);
      ctx.fillStyle = g;
      ctx.fill(petal);
      ctx.strokeStyle = "rgba(87,15,29,.8)";
      ctx.lineWidth = 1.1;
      ctx.stroke(petal);
      ctx.strokeStyle = "rgba(87,15,29,.35)";
      ctx.lineWidth = 0.55;
      for (let v = 0; v < r.veins; v++) ctx.stroke(veins[v]);
      ctx.restore();
    }
  }
  // centre: dark disc, fine stamens with cream anthers
  ctx.fillStyle = "#570F1D";
  ctx.beginPath();
  ctx.arc(0, 0, 9.5, 0, Math.PI * 2);
  ctx.fill();
  for (let i = 0; i < 34; i++) {
    const a = (i / 34) * Math.PI * 2 + rnd(i, 9) * 0.3;
    const r0 = 4 + rnd(i, 10) * 2;
    const r1 = 10.5 + rnd(i, 11) * 6.5;
    ctx.strokeStyle = "#F9DAD8";
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
    ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
    ctx.stroke();
    ctx.fillStyle = "#FCF1DA";
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r1, Math.sin(a) * r1, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#FCF1DA";
  ctx.beginPath();
  ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#94404F";
  ctx.beginPath();
  ctx.arc(0, 0, 1.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

type Field = { n: number; hx: Float32Array; hy: Float32Array; col: Uint8Array; sz: Float32Array; vx: Float32Array; vy: Float32Array; rr: Float32Array; ph: Float32Array; ox: Float32Array; oy: Float32Array };

function buildField(step: number): Field {
  const N = 300;
  const off = document.createElement("canvas");
  off.width = off.height = N;
  const octx = off.getContext("2d", { willReadFrequently: true })!;
  paintFlower(octx, N);
  const px = octx.getImageData(0, 0, N, N).data;
  const items: { x: number; y: number; c: number; r: number }[] = [];
  for (let y = 0; y < N; y += step) {
    for (let x = 0; x < N; x += step) {
      const i = ((y + (step >> 1)) * N + x + (step >> 1)) * 4;
      if (px[i + 3] < 140) continue;
      let best = 0;
      let bd = 1e9;
      for (let k = 0; k < WARM.length; k++) {
        const w = WARM[k];
        const d = (px[i] - w[0]) ** 2 + (px[i + 1] - w[1]) ** 2 + (px[i + 2] - w[2]) ** 2;
        if (d < bd) { bd = d; best = k; }
      }
      const hx = (x + step / 2) / N - 0.5;
      const hy = (y + step / 2) / N - 0.5;
      const s = items.length;
      // sprinkle the cool palette colours through the bloom
      const t = rnd(s, 40);
      if (best >= 4 && best < 6 && t < 0.09) best = WARM.length + (t < 0.045 ? 0 : 1);
      else if (best >= 1 && best <= 3 && t < 0.05) best = WARM.length + 2;
      items.push({ x: hx, y: hy, c: best, r: Math.min(1, Math.hypot(hx, hy) / 0.5) });
    }
  }
  items.sort((a, b) => a.c - b.c); // batch by colour: one fillStyle per bucket
  const n = items.length;
  const f: Field = {
    n,
    hx: new Float32Array(n), hy: new Float32Array(n), col: new Uint8Array(n), sz: new Float32Array(n),
    vx: new Float32Array(n), vy: new Float32Array(n), rr: new Float32Array(n), ph: new Float32Array(n),
    ox: new Float32Array(n), oy: new Float32Array(n),
  };
  const cell = (step / N) * 0.84;
  items.forEach((it, i) => {
    f.hx[i] = it.x; f.hy[i] = it.y; f.col[i] = it.c; f.rr[i] = it.r;
    f.sz[i] = cell * (0.85 + rnd(i, 50) * 0.3);
    const ang = Math.atan2(it.y, it.x) + (rnd(i, 51) - 0.5) * 1.3;
    const dist = 0.5 + rnd(i, 52) * 1.0;
    f.vx[i] = Math.cos(ang) * dist;
    f.vy[i] = Math.sin(ang) * dist - 0.12;
    f.ph[i] = rnd(i, 53) * 6.283;
  });
  return f;
}

export default function ParticleBloom() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const canvas = cv.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S0 = el.clientWidth || 500;
    const f = buildField(S0 < 520 ? 3 : 2);
    const dpr = Math.min(window.devicePixelRatio || 1, S0 < 520 ? 1.5 : 2);

    let S = 0;
    const size = () => {
      S = el.clientWidth;
      canvas.width = Math.round(S * dpr);
      canvas.height = Math.round(S * dpr);
    };
    size();

    let visible = true;
    let raf = 0;
    let last = 0;
    const t0 = performance.now();
    let mx = 0, my = 0, moved = -1e9, real = false;
    let gx = 0, gy = 0, gStr = 0; // the eased pointer the lens follows
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; moved = performance.now(); real = e.pointerType !== "touch"; };
    const onLeave = () => { moved = -1e9; };

    const draw = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const sy = window.scrollY;
      const scrollP = Math.min(1, Math.max(0, sy / (innerHeight * 0.6)));
      const gather = still ? 0 : Math.max(0, 1 - (now - t0 - 350) / 1900);
      const introP = gather * gather * (3 - 2 * gather); // smoothstep, 1 -> 0
      const P = still ? 0 : Math.max(scrollP, introP);
      const idle = P === 0 && now - moved > 2500;
      // skip frames when nothing is changing quickly
      if (!still && P === 0 && now - last < 28) { raf = requestAnimationFrame(draw); return; }
      last = now;

      const rect = canvas.getBoundingClientRect();
      const R = S * 0.17;
      let tx: number, ty: number, str: number;
      if (!idle && !still) { tx = mx - rect.left; ty = my - rect.top; str = 1; }
      else { const t = now / 1000; tx = S / 2 + Math.cos(t * 0.55) * S * 0.2; ty = S / 2 + Math.sin(t * 0.8) * S * 0.17; str = still ? 0 : 0.75; }
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12; gStr += (str - gStr) * 0.08;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, S, S);
      if (P >= 0.995) { if (!still) raf = requestAnimationFrame(draw); return; }

      const c = S / 2;
      const t = now / 1000;
      let cur = -1;
      for (let i = 0; i < f.n; i++) {
        const k = f.col[i];
        if (k !== cur) { ctx.fillStyle = COLORS[k]; cur = k; }
        const hx = f.hx[i] * S, hy = f.hy[i] * S;
        let x = c + hx, y = c + hy;
        let s = f.sz[i] * S;
        if (P > 0) {
          const l = Math.min(1, Math.max(0, P * 1.4 - (1 - f.rr[i]) * 0.4));
          const e = 1 - (1 - l) ** 3;
          x += f.vx[i] * e * S * 0.9;
          y += f.vy[i] * e * S * 0.9;
          s *= 1 - 0.65 * e;
          ctx.globalAlpha = 1 - 0.97 * e;
        } else if (ctx.globalAlpha !== 1) ctx.globalAlpha = 1;
        if (!still) {
          const dx = x - gx, dy = y - gy;
          const d2 = dx * dx + dy * dy;
          let ax = 0, ay = 0;
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const fo = 1 - d / R;
            const push = fo * fo * R * 0.9 * gStr;
            ax = (dx / d) * push; ay = (dy / d) * push;
          }
          f.ox[i] += (ax - f.ox[i]) * 0.17;
          f.oy[i] += (ay - f.oy[i]) * 0.17;
          x += f.ox[i] + Math.sin(t * 1.3 + f.ph[i]) * 0.45;
          y += f.oy[i] + Math.cos(t * 1.1 + f.ph[i]) * 0.45;
        }
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      // the cursor's ring (mouse / pen only)
      if (!still && real && !idle && P < 0.2) {
        ctx.strokeStyle = "rgba(87,15,29,.8)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(gx, gy, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#C65C6A";
        ctx.beginPath();
        ctx.arc(gx, gy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!still) raf = requestAnimationFrame(draw);
    };

    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); });
    io.observe(el);
    const ro = new ResizeObserver(() => { size(); kick(); });
    ro.observe(el);
    const onVis = () => { if (!document.hidden) kick(); };
    document.addEventListener("visibilitychange", onVis);
    if (!still) {
      addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      addEventListener("scroll", kick, { passive: true });
    }
    kick();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      removeEventListener("scroll", kick);
    };
  }, []);

  return (
    <div className="bloom" ref={wrap} aria-hidden>
      <div className="warm" />
      <div className="glow" />
      <canvas ref={cv} className="pbloom" />
    </div>
  );
}
