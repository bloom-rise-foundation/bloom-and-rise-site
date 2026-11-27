"use client";
import { useEffect, useRef } from "react";

/** Paragraph that lights up line by line, each line sweeping left to right as you scroll (CSS scroll timeline, see styles/alcove.css).
 *  A small effect measures which line and how far along it each word sits and writes that to --t; until then (server render, no
 *  scripting) the words simply light in reading order.
 *  The measuring is done in two passes (read every position, then write every value) and coalesced to one run per frame: interleaving
 *  reads and writes forced a full layout per word, which cost over a second on the home page. */
export default function LitLines({ text, className = "", accents = [] }: { text: string; className?: string; accents?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const isAc = (w: string) => accents.includes(w.toLowerCase().replace(/[^a-z]/g, ""));
  let hue = -1;

  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const spans = Array.from(p.querySelectorAll<HTMLElement>(".lw"));
    let raf = 0;
    let last = "";

    const measure = () => {
      raf = 0;
      // pass 1: read
      const pos = spans.map((s) => [s.offsetTop, s.offsetLeft, s.offsetWidth] as const);
      const lines: number[][] = []; // indexes of the words on each line
      let top = -1e9;
      pos.forEach((q, i) => {
        if (Math.abs(q[0] - top) > 6) { lines.push([]); top = q[0]; }
        lines[lines.length - 1].push(i);
      });
      const values: string[] = new Array(spans.length);
      lines.forEach((ln, li) => {
        const first = pos[ln[0]][1];
        const lastIdx = ln[ln.length - 1];
        const span = Math.max(1, pos[lastIdx][1] + pos[lastIdx][2] - first);
        for (const i of ln) values[i] = ((li + ((pos[i][1] - first) / span) * 0.9) / lines.length).toFixed(4);
      });
      const key = values.join(",");
      if (key === last) return; // nothing moved: no style writes at all
      last = key;
      // pass 2: write
      spans.forEach((s, i) => s.style.setProperty("--t", values[i]));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };

    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(p);
    document.fonts?.ready.then(schedule);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <p ref={ref} className={`lit ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => {
        if (isAc(w) && !(i > 0 && isAc(words[i - 1]))) hue++;
        return (
          <span key={i} className={`lw${isAc(w) ? ` ac a${hue % 4}` : ""}`} aria-hidden style={{ "--t": (i / words.length).toFixed(4) } as React.CSSProperties}>{w}{i < words.length - 1 ? " " : ""}</span>
        );
      })}
    </p>
  );
}
