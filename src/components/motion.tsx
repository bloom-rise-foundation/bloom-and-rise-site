"use client";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSplashDone } from "@/lib/splash";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Respects the visitor's reduced-motion setting everywhere. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

const from = {
  up: { y: 32 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.88 },
  tilt: { y: 44, rotate: -3 },
};

/** Scroll-triggered entrance. Change `from` to vary direction. Waits for the loading splash to finish. */
export function Reveal({ children, delay = 0, from: f = "up", className }: { children: ReactNode; delay?: number; from?: keyof typeof from; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const ready = useSplashDone();
  return (
    <m.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...from[f] }}
      animate={ready && seen ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </m.div>
  );
}

/** Headline that rises word by word. */
export function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const ready = useSplashDone();
  return (
    <span ref={ref} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mask" aria-hidden>
          <m.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={ready && seen ? { y: 0 } : undefined}
            transition={{ duration: 0.7, delay: delay + i * 0.06, ease }}
          >
            {w}&nbsp;
          </m.span>
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
  const ready = useSplashDone();
  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, [words.length, ready]);
  return (
    <span className="cycle" aria-live="off">
      {/* invisible copies of every phrase share one grid cell, so the box is always as tall as the longest phrase and nothing below ever shifts */}
      {words.map((w) => (
        <span key={w} className="script cycle-ghost" aria-hidden="true">{w}</span>
      ))}
      <AnimatePresence mode="wait">
        <m.span key={i} className="script cycle-live" initial={{ y: "60%", opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : undefined} exit={{ y: "-60%", opacity: 0 }} transition={{ duration: 0.45, ease }}>
          {words[i]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}