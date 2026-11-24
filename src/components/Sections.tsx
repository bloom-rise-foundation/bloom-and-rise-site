import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, SplitWords, vars } from "./ui";
import { Bloom, Flower } from "./Decor";
import { site } from "@/config/site";
import { team, type Member } from "@/data/team";

export function Section({ children, tone = "", id }: { children: ReactNode; tone?: "" | "pink" | "blue" | "dark"; id?: string }) {
  return (
    <section id={id} className={`section ${tone}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Heavy serif title + italic tail. */
export function PageHero({ title, script, lead }: { title: string; script: string; lead?: string }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1 className="display">
          <SplitWords text={title.trim()} /> <span className="script">{script}</span>
        </h1>
        {lead && <p className="lead fade-up" style={vars({ "--d": ".35s" })}>{lead}</p>}
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="blob" aria-hidden />
      <div className="hero-art" aria-hidden><Bloom /></div>
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

export function FocusGrid() {
  return <TileGrid items={site.focus} />;
}

/** Home: on desktop the page pins and the four focus tiles glide sideways as you scroll; elsewhere they stack. */
export function FocusPin() {
  return (
    <section className="pin">
      <div className="pin-stick">
        <div className="wrap"><h2 className="display">What we <span className="script">hold dear</span></h2></div>
        <div className="pin-track">
          {site.focus.map((f, i) => <Tile key={f.title} {...f} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/** Looping rows of cards (CSS only). The second row runs the other way. */
export function Marquee({ items, reverse = false }: { items: { title: string; text: string }[]; reverse?: boolean }) {
  const base = [...items, ...items];
  return (
    <div className={`marq${reverse ? " rev" : ""}`}>
      <ul className="marq-track">
        {base.map((v, i) => (
          <li key={i} className={`marq-card m${(i + (reverse ? 2 : 0)) % 4}`} aria-hidden={i >= items.length || undefined}>
            <h3 className="display">{v.title}</h3>
            <p>{v.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Vertical timeline; the rail fills and a flower rides it as you scroll. */
export function Steps({ items }: { items: { title: string; script: string; text: string }[] }) {
  return (
    <div className="steps">
      <div className="rail" aria-hidden>
        <i className="rail-fill" />
        <span className="rail-flower"><Flower size={44} /></span>
      </div>
      <ol>
        {items.map((s, i) => (
          <li key={s.title + i} data-reveal="right">
            <span className="dot" aria-hidden><Flower size={28} /></span>
            <small>Step {i + 1}</small>
            <h3 className="display">{s.title} <span className="script">{s.script}</span></h3>
            {s.text && <p>{s.text}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Beet-red "turn the light on" room: the lamp and cone fade in on scroll, a soft light follows the cursor. */
export function Spotlight() {
  return (
    <section className="spot" data-fx="light">
      <div className="cone" aria-hidden />
      <div className="lamp" aria-hidden><Flower size={56} /></div>
      <div className="wrap spot-in">
        <Reveal>
          <h2 className="display">Some conversations are easy to ignore.</h2>
          <p className="script big">We’d rather turn the light on.</p>
        </Reveal>
      </div>
    </section>
  );
}

function MemberPhoto({ m, i, sizes }: { m: Member; i: number; sizes: string }) {
  const initials = m.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <div className={`photo t${i % 3}`}>
      {m.photo ? <Image src={m.photo} alt={`Photo of ${m.name}`} fill sizes={sizes} style={{ objectFit: "cover" }} /> : <span className="display" aria-hidden>{initials}</span>}
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
          <MemberPhoto m={m} i={i} sizes="(max-width:700px) 80vw, 340px" />
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
