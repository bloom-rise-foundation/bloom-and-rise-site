import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, SplitWords, vars } from "./ui";
import { Bloom, Flower, PetalRing, PosterFlower } from "./Decor";
import { site } from "@/config/site";
import { team, type Member } from "@/data/team";

type Tone = "" | "pink" | "blue" | "beet" | "rum" | "dark";

export function Section({ children, tone = "", id, cv = false }: { children: ReactNode; tone?: Tone; id?: string; cv?: boolean }) {
  return (
    <section id={id} className={`section ${tone}${tone ? " edge" : ""}${cv && !tone ? " cv" : ""}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Colour-blocked page opener: giant Playfair title, an oversized petal ring that turns as you scroll, a scalloped edge. */
export function PageHero({ title, script, lead, tone = "" }: { title: string; script: string; lead?: string; tone?: Tone }) {
  return (
    <section className={`page-hero ${tone}`}>
      <div className="ph-art" aria-hidden><PetalRing /></div>
      <div className="wrap">
        <h1 className="display">
          <SplitWords text={title.trim()} /><span className="script">{script}</span>
        </h1>
        {lead && <p className="lead fade-up" style={vars({ "--d": ".35s" })}>{lead}</p>}
      </div>
    </section>
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
        <p className="chip fade-up" style={vars({ "--d": ".1s" })}>{site.statusShort}</p>
        <h1 className="display">
          <span className="ln"><span className="mask"><span className="w">Some conversations are left unspoken.</span></span></span>
          <span className="ln"><span className="mask"><span className="w">We coax them into the light.</span></span></span>
        </h1>
        <p className="lead fade-up" style={vars({ "--d": ".6s" })}>Kindling frank exchanges on health, science and safety, for girls, women and vulnerable children.</p>
        <p className="through fade-up" style={vars({ "--d": ".75s" })}>
          through{" "}
          <span className="cycle" style={vars({ "--n": site.phrases.length })} aria-label={site.phrases.join(", ")}>
            {site.phrases.map((w, i) => (
              <span key={w} className="script" aria-hidden style={vars({ "--i": i })}>{w}</span>
            ))}
          </span>
        </p>
        <div className="row fade-up" style={vars({ "--d": ".9s" })}>
          <div data-fx="mag"><Link className="btn" href="/get-involved">Join us</Link></div>
          <div data-fx="mag"><Link className="btn ghost" href="/about">Our blueprint</Link></div>
        </div>
      </div>
    </section>
  );
}

/** Two oversized rows of words drifting in opposite directions. */
export function Band({ items }: { items: string[] }) {
  const row = (rev: boolean) => (
    <div className={`band-row${rev ? " rev" : ""}`}>
      <ul className="band-track">
        {[...items, ...items].map((t, i) => (
          <li key={i} className={(i + (rev ? 1 : 0)) % 2 ? "o" : ""} aria-hidden={i >= items.length || rev || undefined}>
            {t}
            <Flower size={52} />
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="band" aria-label={items.join(", ")}>
      {row(false)}
      {row(true)}
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
    <ol className="rows">
      {items.map((s, i) => (
        <li key={s.title + i} className="row-item">
          <span className="rn" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
          <div className="rt">
            <h3 className="display">{s.title} <span className="script">{s.script}</span></h3>
            {s.text && <p>{s.text}</p>}
          </div>
          <span className="rf" aria-hidden><Flower size={80} /></span>
        </li>
      ))}
    </ol>
  );
}

// [word, left %, top %, rotation]: ambient words hidden in the dark. Topics already on the site; nothing new is claimed.
const WORDS: [string, number, number, number][] = [
  ["periods", 6, 62, -6], ["puberty", 62, 58, 4], ["stigma", 30, 76, -3], ["questions", 66, 80, 5],
  ["science", 4, 30, 4], ["safety", 44, 90, -5], ["consent", 80, 40, -3], ["privacy", 14, 88, 3], ["listen", 84, 66, -4], ["health", 82, 14, 5],
];

function Words({ lit }: { lit?: boolean }) {
  return (
    <div className={`spot-words${lit ? " lit" : ""}`} aria-hidden>
      {WORDS.map(([w, x, y, r]) => (
        <span key={w} className="script" style={vars({ left: `${x}%`, top: `${y}%`, "--r": `${r}deg` })}>{w}</span>
      ))}
    </div>
  );
}

/** A dark room. As you scroll the light grows from the lamp and unspoken words appear inside it; a soft light follows the cursor. */
export function Spotlight() {
  return (
    <section className="spot cv" data-fx="light">
      <Words />
      <Words lit />
      <div className="cone" aria-hidden />
      <div className="lamp" aria-hidden><Flower size={64} /></div>
      <div className="wrap spot-in">
        <Reveal>
          <h2 className="display">Some conversations are easy to ignore.</h2>
          <p className="script big">We’d rather turn the light on.</p>
        </Reveal>
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
