"use client";
import { useEffect } from "react";

/** The floating words in the lamp room must never overlap each other, the two lines of text, the lamp, or the edge of the stage,
 *  whatever the screen size, orientation or font size. After layout (and again whenever the stage resizes or the fonts arrive) this
 *  measures each word's real box (its size and rotation) and the text lines, then hides any word that would collide, keeping the
 *  earlier words in the list first. Nothing is removed from the page: a word that fits again on a bigger screen simply returns. */
const GAP = 10; // breathing room around every box, in px

type Box = { l: number; t: number; r: number; b: number };
const hit = (a: Box, b: Box) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;

export default function SpotFit() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".spot");
    const stage = root?.querySelector<HTMLElement>(".spot-words");
    if (!root || !stage) return;
    const words = Array.from(stage.querySelectorAll<HTMLElement>(":scope > span"));
    let raf = 0;

    const fit = () => {
      raf = 0;
      // measure every word at full size first
      words.forEach((w) => w.removeAttribute("data-off"));
      const sr = stage.getBoundingClientRect();
      const W = stage.clientWidth;
      const H = stage.clientHeight;

      // read pass: the things a word must keep clear of
      const blocks: Box[] = [];
      const addRect = (r: DOMRect, pad = GAP) =>
        blocks.push({ l: r.left - sr.left - pad, t: r.top - sr.top - pad, r: r.right - sr.left + pad, b: r.bottom - sr.top + pad });
      // only the lines of text themselves (one rect per text fragment), not the wide boxes around them
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
      if (rig) addRect(rig.getBoundingClientRect(), 4);
      const note = root.querySelector<HTMLElement>(".scroll-note");
      if (note) addRect(note.getBoundingClientRect(), 6);

      const boxes = words.map((w) => {
        const cs = getComputedStyle(w);
        const deg = parseFloat(cs.rotate) || 0;
        const rad = (deg * Math.PI) / 180;
        const bw = w.offsetWidth * 1.2;
        const bh = w.offsetHeight * 1.2;
        const cx = w.offsetLeft + w.offsetWidth / 2;
        const cy = w.offsetTop + w.offsetHeight / 2;
        const hw = (Math.abs(bw * Math.cos(rad)) + Math.abs(bh * Math.sin(rad))) / 2 + GAP / 2;
        const hh = (Math.abs(bw * Math.sin(rad)) + Math.abs(bh * Math.cos(rad))) / 2 + GAP / 2;
        return { l: cx - hw, t: cy - hh, r: cx + hw, b: cy + hh };
      });

      // decide, in list order, which words stay
      const kept: Box[] = [];
      const off: boolean[] = boxes.map((b) => {
        const outside = b.l < 4 || b.t < 4 || b.r > W - 4 || b.b > H - 4;
        if (outside || blocks.some((k) => hit(b, k)) || kept.some((k) => hit(b, k))) return true;
        kept.push(b);
        return false;
      });
      // write pass
      words.forEach((w, i) => off[i] && w.setAttribute("data-off", ""));
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
