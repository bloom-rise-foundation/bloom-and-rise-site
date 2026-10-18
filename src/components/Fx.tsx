"use client";
// Effects inspired by Aceternity UI, rebuilt on plain CSS + framer-motion (no Tailwind needed).
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ease } from "./motion";

/** "Text Generate": words fade/de-blur in one by one. */
export function TextGenerate({ text, delay = 0.5 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text}>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} aria-hidden style={{ display: "inline-block" }} initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.5, delay: delay + i * 0.07 }}>
          {w}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

/** "Magnetic Button": drifts slightly toward the cursor, springs back. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** "Card Spotlight": a soft glow follows the cursor inside the card (see .tile::before). Also reveals on scroll. */
export function GlowCard({ children, className, delay = 0, dir = 0 }: { children: ReactNode; className?: string; delay?: number; dir?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: dir, y: 28 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </motion.div>
  );
}

/** "3D Card Effect": gentle perspective tilt toward the cursor. */
export function Tilt({ children, max = 6 }: { children: ReactNode; max?: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  return (
    <motion.div
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** "Infinite Moving Cards": looping row of cards, pauses on hover. */
export function Marquee({ items }: { items: { title: string; text: string }[] }) {
  const base = [...items, ...items];
  const row = (hidden: boolean) =>
    base.map((v, i) => (
      <li key={`${hidden}-${i}`} className={`marq-card m${i % 4}`} aria-hidden={hidden || undefined}>
        <h3 className="display">{v.title}</h3>
        <p>{v.text}</p>
      </li>
    ));
  return (
    <div className="marq">
      <ul className="marq-track">{row(false)}{row(true)}</ul>
    </div>
  );
}
