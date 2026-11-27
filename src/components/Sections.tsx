import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, SplitWords, vars } from "./ui";
import { Bloom, Flower, PetalRing, PosterFlower } from "./Decor";
import { EdgeDivider, claimEdge } from "./Dividers";
import SpotFit from "./SpotFit";
import { site, partnerHref } from "@/config/site";
import { team, type Member } from "@/data/team";

type Tone = "" | "pink" | "blue" | "beet" | "rum" | "dark";

export function Section({ children, tone = "", id, cv = false, edge = true, close = false }: { children: ReactNode; tone?: Tone; id?: string; cv?: boolean; edge?: boolean; close?: boolean }) {
  // a coloured section opens with its own edge (a different shape every time on a page); pass edge={false} when a WaveMarquee already opens it
  const variant = tone && edge ? claimEdge() : null;
  // close: the section also lets its colour hang down into the plain section that follows, in a different shape
  const closer = tone && close ? claimEdge() : null;
  return (
    <section id={id} className={`section ${tone}${cv && !tone ? " cv" : ""}`}>
      {variant && <EdgeDivider variant={variant} />}
      <div className="wrap">{children}</div>
      {closer && <EdgeDivider variant={closer} side="bottom" />}
    </section>
  );
}

/** Colour-blocked page opener: giant Playfair title, an oversized petal ring that turns as you scroll, a scalloped edge. */
export function PageHero({ title, script, lead, tone = "" }: { title: string; script: string; lead?: string; tone?: Tone }) {
  const variant = tone ? claimEdge() : null;
  return (
    <section className={`page-hero ${tone}`}>
      <div className="ph-art" aria-hidden><PetalRing /></div>
      {variant && <EdgeDivider variant={variant} side="bottom" />}
      <div className="wrap">
        <h1 className="display">
          <SplitWords text={title.trim()} /><span className="script">{script}</span>
        </h1>
        {lead && <p className="lead fade-up" style={vars({ "--d": ".35s" })}>{lead}</p>}
      </div>
    </section>
  );
}

/** Where we stand, as the stages of a stem. Honest: we are at the seed. */
export function Stages() {
  return (
    <ol className="stages" aria-label="Stages of growth">
      <li className="stage here" aria-current="step"><b>Seed</b><span>We are here: forming the team and asking for guidance.</span></li>
      <li className="stage"><b>Bud</b><span>First pilots, once safeguards are in place.</span></li>
      <li className="stage"><b>Open</b><span>Programmes we can honestly report on.</span></li>
    </ol>
  );
}

/** Home opener, replayed on every visit. It starts as a dark room; a bud glows, blooms, and the light floods the page. */
export function Hero() {
  return (
    <section className="hero" data-fx="hero">
      <div className="hero-art" aria-hidden>
        <div className="dawn" />
        <Bloom />
      </div>
      <div className="wrap hero-inner">
        <h1 className="display">
          <span className="ln"><span className="mask"><span className="w">Equipping girls, women, and children with</span></span></span>
          <span className="ln"><span className="mask"><span className="w">vital health, safety & knowledge.</span></span></span>
        </h1>
        <p className="lead fade-up" style={vars({ "--d": ".2s" })}>Cultivating healthier, safer and brighter futures, together.</p>
        <p className="through fade-up" style={vars({ "--d": ".3s" })}>
          through{" "}
          <span className="cycle" style={vars({ "--n": site.phrases.length })}>
            <span className="sr-only">{site.phrases.join(", ")}</span>
            {site.phrases.map((w, i) => (
              <span key={w} className="script" aria-hidden style={vars({ "--i": i })}>{w}</span>
            ))}
          </span>
        </p>
        <div className="row fade-up" style={vars({ "--d": ".4s" })}>
          <div data-fx="mag"><Link className="btn" href="/get-involved">Join us</Link></div>
          <div data-fx="mag"><Link className="btn ghost" href="/about">Our blueprint</Link></div>
          <div data-fx="mag"><a className="btn ghost" href={partnerHref}>Partner with us</a></div>
        </div>
      </div>
    </section>
  );
}

type TileData = { title: string; text: string; tone: string };

export function Tile({ title, text, tone, i = 0, reveal = true, href }: TileData & { i?: number; reveal?: boolean; href?: string }) {
  const props = {
    className: `tile ${tone}${href ? " tile-link" : ""}`,
    "data-fx": "glow",
    ...(reveal ? { "data-reveal": i % 2 ? "right" : "left" } : {}),
    style: reveal && i % 2 ? vars({ "--d": "0.1s" }) : undefined,
  };
  const inner = (
    <>
      <h3 className="display">{title}</h3>
      <p>{text}</p>
    </>
  );
  return href ? <Link href={href} {...props}>{inner}</Link> : <div {...props}>{inner}</div>;
}

export function TileGrid({ items, fill = false }: { items: TileData[]; fill?: boolean }) {
  return (
    <div className={`focus${fill ? " fill" : ""}`}>
      {items.map((t, i) => <Tile key={t.title} {...t} i={i} />)}
    </div>
  );
}

const PETALS = [5, 6, 8, 12];

function Poster({ f, i, reveal }: { f: TileData; i: number; reveal: boolean }) {
  return (
    <article className={`poster ${f.tone}`} data-fx="glow" {...(reveal ? { "data-reveal": "up" } : {})}>
      <span className="num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
      <PosterFlower count={PETALS[i % PETALS.length]} />
      <div className="poster-text">
        <h3 className="display">{f.title}</h3>
        <p>{f.text}</p>
      </div>
    </article>
  );
}

/** The four focus areas as tall posters. On desktop the page pins and they glide sideways as you scroll. */
export function FocusPin() {
  return (
    <section className="pin">
      <div className="pin-stick">
        <div className="wrap"><h2 className="display">What we <span className="script">hold dear</span></h2></div>
        <div className="pin-track">
          {site.focus.map((f, i) => <Poster key={f.title} f={f} i={i} reveal />)}
        </div>
        <div className="pin-prog" aria-hidden><i /></div>
      </div>
    </section>
  );
}

/** Programmes page: the same posters in a grid. */
export function FocusGrid() {
  return (
    <div className="poster-grid">
      {site.focus.map((f, i) => <Poster key={f.title} f={f} i={i} reveal />)}
    </div>
  );
}

const STACK_TONES = ["pink", "blue", "beet", "rum"];

/** Big cards that stack on top of each other as you scroll (position: sticky, no JavaScript). */
export function Stack({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="stack">
      {items.map((v, i) => (
        <article key={v.title} className={`stack-card ${STACK_TONES[i % 4]}`} style={vars({ "--i": i, "--r": `${[-1.4, 1.1, -0.8, 1.5][i % 4]}deg` })}>
          <span className="num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
          <h3 className="display">{v.title}</h3>
          <p>{v.text}</p>
          <Flower size={96} className="sc-flower" />
        </article>
      ))}
    </div>
  );
}

/** Numbered steps: giant outlined numerals fill with colour as each row scrolls in, and a flower turns beside it. */
export function Steps({ items }: { items: { title: string; script: string; text: string }[] }) {
  return (
    <div className="steps">
      <div className="rail" aria-hidden>
        <i className="rail-fill" />
        <span className="rail-ride"><Flower size={44} className="rail-flower" /></span>
      </div>
      <ol className="rows">
        {items.map((s, i) => (
          <li key={s.title + i} className="row-item">
            <span className="rn" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
            <div className="rt">
              <h3 className="display">{s.title} <span className="script">{s.script}</span></h3>
              {s.text && <p>{s.text}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// [word, centre x %, centre y %, rotation, order, mobile x %, mobile y %]: ambient words hidden in the dark. Topics already on the site; nothing new is claimed.
// `order` is the lighting-up sequence (deliberately irregular, so it reads as a wave rather than a metronome).
// Phones have a narrower, taller stage where the headline wraps to four lines, so each word has its own spot clear of it.
const WORDS: [string, number, number, number, number, number, number][] = [
  ["periods", 12, 72, -6, 0, 22, 71],
  ["puberty", 58, 77, 4, 1, 62, 72],
  ["stigma", 30, 82, -3, 2.2, 30, 82],
  ["questions", 75, 85, 5, 3, 66, 88],
  ["science", 16, 36, 4, 4.3, 20, 26],
  ["health", 84, 22, 5, 5, 80, 22],
  ["safety", 50, 93, -5, 6.2, 56, 96],
  ["consent", 82, 47, -3, 7, 82, 32],
  ["privacy", 22, 91, 3, 8.3, 22, 93],
  ["listen", 87, 71, -4, 9, 84, 79],
];

// A few specks of dust drifting up through the beam. Deterministic values (no hydration mismatch); they only show once the light is on.
const MOTES = Array.from({ length: 10 }, (_, i) => ({
  x: 36 + ((i * 17) % 29),
  y: (i * 23) % 70,
  s: 2 + (i % 3),
  d: 5 + (i % 4) * 1.3,
  t: -((i * 1.1) % 6),
  dx: (i % 2 ? 1 : -1) * (8 + ((i * 5) % 22)),
}));

/** The pull-cord lamp. The page pins for a short stretch of scroll and the scroll position drives a story:
 *  the cord is tugged down, the lamp clicks and swings, the light flickers, floods on brightly, then the hidden words light one by one.
 *  The story is CSS scroll-driven animation (transform/opacity only); the idle life (sway, glow breath, dust, word bob) is compositor-only loops.
 *  Without scroll timelines, or under reduced motion, it is simply the lit room. See styles/sections.css. */
export function Spotlight() {
  return (
    <section className="spot">
      <SpotFit />
      <div className="spot-stick">
        <div className="light" aria-hidden>
          <div className="cone" />
          <div className="bulb-glow" />
          {MOTES.map((m, i) => (
            <i key={i} className="mote" style={vars({ "--x": `${m.x}%`, "--y": `${m.y}%`, "--s": `${m.s}px`, "--d": `${m.d}s`, "--t": `${m.t}s`, "--dx": `${m.dx}px` })} />
          ))}
        </div>
        <div className="flash" aria-hidden />
        <div className="spot-words" aria-hidden>
          {WORDS.map(([w, x, y, r, o, mx, my]) => (
            <span key={w} className="script" style={vars({ "--x": `${x}%`, "--y": `${y}%`, "--mx": `${mx}%`, "--my": `${my}%`, "--r": `${r}deg`, "--o": o })}>
              <em data-w={w}>{w}</em>
            </span>
          ))}
        </div>
        <div className="lamp-rig" aria-hidden>
          <div className="lamp-idle">
            <svg className="lamp-svg" viewBox="0 0 200 232">
              <line x1="100" y1="0" x2="100" y2="120" stroke="rgba(252,241,218,.45)" strokeWidth="2" />
              <path d="M36 196C36 152 66 120 100 120C134 120 164 152 164 196Z" fill="#3A557D" stroke="#E3939B" strokeWidth="1.5" />
              <ellipse cx="100" cy="196" rx="64" ry="9" fill="#570F1D" stroke="#E3939B" strokeWidth="1.5" />
              <circle cx="100" cy="203" r="15" fill="#6F2B34" />
              <circle className="bulb-on" cx="100" cy="203" r="15" fill="#FCF1DA" stroke="#E3939B" strokeWidth="1.5" />
            </svg>
            <div className="cord-wrap">
              <i className="cord" />
              <b className="bead" />
            </div>
          </div>
        </div>
        <div className="scroll-note" aria-hidden>
          <span>
            Keep scrolling
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
          </span>
          <i className="sn-bar"><b /></i>
        </div>
        <div className="wrap spot-in">
          <h2 className="display">Some conversations are easy to ignore.</h2>
          <p className="script big">We’d rather turn the light on.</p>
        </div>
      </div>
    </section>
  );
}

function MemberPhoto({ m, i, sizes, first = false }: { m: Member; i: number; sizes: string; first?: boolean }) {
  const initials = m.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <div className={`photo t${i % 3}`}>
      {m.photo ? <Image src={m.photo} alt={`Photo of ${m.name}`} fill sizes={sizes} style={{ objectFit: "cover" }} {...(first ? { loading: "eager" as const, fetchPriority: "high" as const } : {})} /> : <span className="display" aria-hidden>{initials}</span>}
    </div>
  );
}

/** Shows the opening of a long bio and tucks the rest behind a smooth "Read more". */
function Bio({ text }: { text: string }) {
  if (!text) return null;
  const at = text.slice(150).search(/[.!?]\s/);
  if (at === -1 || text.length - (150 + at) < 120) return <p className="bio">{text}</p>;
  const cut = 150 + at + 2;
  return (
    <>
      <p className="bio">{text.slice(0, cut)}</p>
      <details className="bio-more">
        <summary>Read more</summary>
        <p className="bio">{text.slice(cut).trimStart()}</p>
      </details>
    </>
  );
}

/** Vertical cards in a grid (used by the Heads page). */
export function TeamGrid({ members = team }: { members?: Member[] }) {
  return (
    <div className="team">
      {members.map((m, i) => (
        <Reveal key={m.name + i} from="tilt" delay={(i % 3) * 0.09} className="member">
          <div data-fx="tilt">
            <MemberPhoto m={m} i={i} sizes="(max-width:700px) 80vw, 320px" />
            <h3 className="display">{m.name}</h3>
            <p className="role script">{m.role}</p>
            <Bio text={m.bio} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Horizontal rows: photo beside a large bio (used by the Executive page). */
export function TeamRows({ members = team }: { members?: Member[] }) {
  return (
    <div className="team-rows">
      {members.map((m, i) => (
        <div key={m.name + i} data-reveal={i % 2 ? "right" : "left"} className="member-row">
          <MemberPhoto m={m} i={i} sizes="(max-width:700px) 80vw, 340px" first={i === 0} />
          <div className="member-text">
            <h3 className="display">{m.name}</h3>
            <p className="role script">{m.role}</p>
            <Bio text={m.bio} />
          </div>
        </div>
      ))}
    </div>
  );
}
