import type { CSSProperties, ReactNode } from "react";

/* Server-rendered helpers. Motion is plain CSS (see styles/base.css); nothing here ships JavaScript. */

type From = "up" | "left" | "right" | "scale" | "tilt";
export const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Scroll-triggered entrance: the shared observer in RevealRoot adds `.in` when it scrolls into view. */
export function Reveal({ children, delay = 0, from = "up", className }: { children: ReactNode; delay?: number; from?: From; className?: string }) {
  return (
    <div data-reveal={from} className={className} style={delay ? vars({ "--d": `${delay}s` }) : undefined}>
      {children}
    </div>
  );
}

/** Headline that rises word by word on load. */
export function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mask" aria-hidden>
          <span className="w" style={vars({ "--i": i + delay * 16 })}>{w}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function LitWords({ text, className = "", accents = [] }: { text: string; className?: string; accents?: string[] }) {
  const words = text.split(" ");
  return (
    <p className={`lit ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className={`lw${accents.includes(w.toLowerCase().replace(/[^a-z]/g, "")) ? " ac" : ""}`} aria-hidden style={vars({ "--i": i, "--n": words.length })}>{w}{i < words.length - 1 ? " " : ""}</span>
      ))}
    </p>
  );
}

/** Wraps `data-fx` so the shared pointer island can drive it. */
export const fx = (kind: "mag" | "tilt" | "glow" | "light") => ({ "data-fx": kind });
