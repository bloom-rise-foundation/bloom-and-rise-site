"use client";
import { useEffect } from "react";

/** The floating words in the lamp room are laid out for the screen they are on. After layout (and again whenever the stage resizes,
 *  the screen rotates or the fonts arrive) this measures the headline, the lamp, and each word's real box (size and tilt), then places
 *  every word as close as it can to its intended spot, but only where it is:
 *    - in the light (inside the beam from the bulb, or in the pool of light on the floor),
 *    - clear of every other word, the two lines of text, the lamp and the edges of the screen.
 *  A word that cannot be placed anywhere on this screen is hidden; it comes back on a screen that has room. */
const GAP = 12; // breathing room around every box, in px
const BEAM_DEG = 40; // how far from straight down the light counts as lit

type Box = { l: number; t: number; r: number; b: number };
const hit = (a: Box, b: Box) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;

export default function SpotFit() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".spot");
    const stage = root?.querySelector<HTMLElement>(".spot-words");
    if (!root || !stage) return;
    const words = Array.from(stage.querySelectorAll<HTMLElement>(":scope > span"));
    // where each word would like to be (the percentages in the markup; the mobile ones on narrow screens)
    const want = words.map((w) => {
      const num = (k: string) => parseFloat(w.style.getPropertyValue(k)) / 100;
      return { x: num("--x"), y: num("--y"), mx: num("--mx"), my: num("--my"), rot: parseFloat(getComputedStyle(w).rotate) || 0 };
    });
    let raf = 0;

    const fit = () => {
      raf = 0;
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      if (!W || !H) return;
      const narrow = window.matchMedia("(max-width:820px)").matches;
      words.forEach((w) => w.removeAttribute("data-off")); // measure every word at full size
      const sr = stage.getBoundingClientRect();

      // things a word must keep clear of
      const blocks: Box[] = [];
      const addRect = (r: DOMRect, pad: number) =>
        blocks.push({ l: r.left - sr.left - pad, t: r.top - sr.top - pad, r: r.right - sr.left + pad, b: r.bottom - sr.top + pad });
      root.querySelectorAll<HTMLElement>(".spot-in h2, .spot-in .big").forEach((el) => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (!n.textContent?.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          Array.from(range.getClientRects()).forEach((r) => r.width > 1 && addRect(r, GAP + 8));
        }
      });
      const rig = root.querySelector<HTMLElement>(".lamp-rig");
      if (rig) addRect(rig.getBoundingClientRect(), 6);
      const note = root.querySelector<HTMLElement>(".scroll-note");
      if (note) addRect(note.getBoundingClientRect(), 8);

      // the lit region
      const lightEl = root.querySelector<HTMLElement>(".light");
      const bx = W / 2;
      const by = lightEl ? lightEl.offsetTop : 0;
      const TAN = Math.tan((BEAM_DEG * Math.PI) / 180);
      const inBeam = (x: number, y: number) => y > by + 6 && Math.abs(x - bx) <= (y - by) * TAN;
      const inPool = (x: number, y: number) => ((x - W / 2) / (W * 0.46)) ** 2 + ((y - H) / (H * 0.24)) ** 2 <= 0.85;
      const lit = (b: Box) => [[b.l, b.t], [b.r, b.t], [b.l, b.b], [b.r, b.b]].every(([x, y]) => inBeam(x, y) || inPool(x, y));

      // measure every word (its size and tilt do not depend on where it sits)
      const size = words.map((w, i) => {
        const rad = (want[i].rot * Math.PI) / 180;
        const bw = w.offsetWidth * 1.16;
        const bh = w.offsetHeight * 1.16;
        return {
          hw: (Math.abs(bw * Math.cos(rad)) + Math.abs(bh * Math.sin(rad))) / 2 + GAP / 2,
          hh: (Math.abs(bw * Math.sin(rad)) + Math.abs(bh * Math.cos(rad))) / 2 + GAP / 2,
        };
      });

      const kept: Box[] = [];
      const placed = words.map((_, i) => {
        const { hw, hh } = size[i];
        const tx = (narrow ? want[i].mx : want[i].x) * W;
        const ty = (narrow ? want[i].my : want[i].y) * H;
        let best: { x: number; y: number; d: number } | null = null;
        const stepY = Math.max(10, hh / 2.5);
        for (let y = hh + 6; y <= H - hh - 6; y += stepY) {
          for (let x = hw + 6; x <= W - hw - 6; x += 16) {
            const d = (x - tx) ** 2 + ((y - ty) * 1.6) ** 2; // moving sideways is cheaper than moving up or down
            if (best && d >= best.d) continue;
            const box = { l: x - hw, t: y - hh, r: x + hw, b: y + hh };
            if (!lit(box) || blocks.some((k) => hit(box, k)) || kept.some((k) => hit(box, k))) continue;
            best = { x, y, d };
          }
        }
        if (best) kept.push({ l: best.x - hw, t: best.y - hh, r: best.x + hw, b: best.y + hh });
        return best;
      });

      // write pass
      words.forEach((w, i) => {
        const p = placed[i];
        if (!p) {
          w.setAttribute("data-off", "");
          return;
        }
        w.removeAttribute("data-off");
        w.style.left = `${p.x}px`;
        w.style.top = `${p.y}px`;
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(fit);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(stage);
    document.fonts?.ready.then(schedule);
    window.addEventListener("orientationchange", schedule);
    window.addEventListener("load", schedule, { once: true });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("orientationchange", schedule);
    };
  }, []);
  return null;
}
