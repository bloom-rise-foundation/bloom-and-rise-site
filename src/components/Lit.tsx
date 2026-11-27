"use client";
import { useEffect, useRef } from "react";

/** Paragraph that lights up line by line, each line sweeping left to right as you scroll (CSS scroll timeline, see styles/base.css).
 *  A small effect measures which line and how far along it each word sits and writes that to --t; until then (server render, no
 *  scripting) the words simply light in reading order. */
export default function LitLines({ text, className = "", accents = [] }: { text: string; className?: string; accents?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const isAc = (w: string) => accents.includes(w.toLowerCase().replace(/[^a-z]/g, ""));
  let hue = -1;

  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const spans = Array.from(p.querySelectorAll<HTMLElement>(".lw"));
    const measure = () => {
      const lines: HTMLElement[][] = [];
      let top = -1e9;
      for (const s of spans) {
        if (Math.abs(s.offsetTop - top) > 6) { lines.push([]); top = s.offsetTop; }
        lines[lines.length - 1].push(s);
      }
      lines.forEach((ln, li) => {
        const a = ln[0].offsetLeft;
        const b = ln[ln.length - 1].offsetLeft + ln[ln.length - 1].offsetWidth;
        for (const s of ln) s.style.setProperty("--t", ((li + ((s.offsetLeft - a) / Math.max(1, b - a)) * 0.9) / lines.length).toFixed(4));
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(p);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  return (
    <p ref={ref} className={`lit ${className}`} aria-label={text}>
      {words.map((w, i) => {
        if (isAc(w) && !(i > 0 && isAc(words[i - 1]))) hue++;
        return (
          <span key={i} className={`lw${isAc(w) ? ` ac a${hue % 4}` : ""}`} aria-hidden data-w={w} style={{ "--t": (i / words.length).toFixed(4) } as React.CSSProperties}>{w}{i < words.length - 1 ? " " : ""}</span>
        );
      })}
    </p>
  );
}
