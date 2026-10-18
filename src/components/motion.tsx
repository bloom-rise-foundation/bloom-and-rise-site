"use client";
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Respects the visitor's reduced-motion setting everywhere. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const from = {
  up: { y: 32 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.88 },
  tilt: { y: 44, rotate: -3 },
};

/** Scroll-triggered entrance. Change `from` to vary direction. */
export function Reveal({ children, delay = 0, from: f = "up", className }: { children: ReactNode; delay?: number; from?: keyof typeof from; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from[f] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Headline that rises word by word. */
export function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mask" aria-hidden>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: delay + i * 0.06, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Very slight pointer-follow values (desktop only). Spring-smoothed. */
export function useMouseParallax(range = 12) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 20 });
  const y = useSpring(my, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const h = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * range * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * range * 2);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my, range]);
  return { x, y };
}

/** Rotating phrase, echoing the reel. */
export function Cycle({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="cycle" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.span key={i} className="script" initial={{ y: "60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-60%", opacity: 0 }} transition={{ duration: 0.45, ease }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
