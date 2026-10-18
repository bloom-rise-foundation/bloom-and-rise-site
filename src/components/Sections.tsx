"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Reveal, SplitWords, Cycle, useMouseParallax } from "./motion";
import { Flower } from "./Decor";
import { TextGenerate, Magnetic, GlowCard, Tilt } from "./Fx";
import { site } from "@/config/site";
import { team } from "@/data/team";

export function Section({ children, tone = "", id }: { children: ReactNode; tone?: "" | "pink" | "blue" | "dark"; id?: string }) {
  return (
    <section id={id} className={`section ${tone}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Heavy serif title + script tail, like the reel. */
export function PageHero({ title, script, lead }: { title: string; script: string; lead?: string }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1 className="display">
          <SplitWords text={title} /> <span className="script">{script}</span>
        </h1>
        {lead && <Reveal delay={0.3}><p className="lead">{lead}</p></Reveal>}
      </div>
    </section>
  );
}

export function Hero() {
  const { x, y } = useMouseParallax(14);
  const ix = useTransform(x, (v) => v * -1.6);
  const iy = useTransform(y, (v) => v * -1.6);
  return (
    <section className="hero">
      <motion.div className="blob b1" style={{ x: ix, y: iy }} />
      <motion.div className="blob b2" style={{ x, y }} />
      <div className="wrap hero-inner">
        <p className="chip">{site.statusShort}</p>
        <motion.h1 className="display" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          {site.name}
          <span className="script">{site.suffix}</span>
        </motion.h1>
        <p className="lead"><TextGenerate text={`A student-led initiative in Ghana, ${site.tagline.toLowerCase()}`} /></p>
        <p className="through">through <Cycle words={site.phrases} /></p>
        <div className="row">
          <Magnetic><a className="btn" href="/get-involved">Join in</a></Magnetic>
          <Magnetic><a className="btn ghost" href="/about">Our mission</a></Magnetic>
        </div>
      </div>
    </section>
  );
}

export function FocusGrid() {
  return (
    <div className="focus">
      {site.focus.map((f, i) => (
        <GlowCard key={f.title} dir={i % 2 ? 48 : -48} delay={(i % 2) * 0.1} className={`tile ${f.tone}`}>
          <h3 className="display">{f.title}</h3>
          <p>{f.text}</p>
        </GlowCard>
      ))}
    </div>
  );
}

/** Vertical timeline; a flower rides the rail as you scroll. */
export function Steps({ items }: { items: { title: string; script: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="steps" ref={ref}>
      <div className="rail">
        <motion.i className="rail-fill" style={{ scaleY: scrollYProgress }} />
        <motion.span className="rail-flower" style={{ top }}><Flower size={44} /></motion.span>
      </div>
      <ol>
        {items.map((s, i) => (
          <li key={s.title + i}>
            <Reveal from="right">
              <small>Step {i + 1}</small>
              <h3 className="display">{s.title} <span className="script">{s.script}</span></h3>
              <p>{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Beet-red "turn the light on" moment, scroll-linked. */
export function Spotlight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  return (
    <section ref={ref} className="spot">
      <motion.div className="cone" style={{ opacity, scaleX }} />
      <motion.div className="lamp" style={{ opacity }}><Flower size={56} /></motion.div>
      <div className="wrap spot-in">
        <Reveal>
          <h2 className="display">Some conversations are easy to ignore.</h2>
          <p className="script big">We’d rather turn the light on.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function TeamGrid() {
  return (
    <div className="team">
      {team.map((m, i) => {
        const initials = m.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
        return (
          <Reveal key={m.name + i} from="tilt" delay={(i % 3) * 0.09} className="member"><Tilt>
            <div className={`photo t${i % 3}`}>
              {m.photo ? <Image src={m.photo} alt={`Photo of ${m.name}`} fill sizes="(max-width:700px) 80vw, 320px" style={{ objectFit: "cover" }} /> : <span className="display" aria-hidden>{initials}</span>}
            </div>
            <h3 className="display">{m.name}</h3>
            <p className="role script">{m.role}</p>
            <p>{m.bio}</p>
          </Tilt></Reveal>
        );
      })}
    </div>
  );
}
