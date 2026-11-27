import { PageHero, Section, TileGrid } from "@/components/Sections";
import { Reveal } from "@/components/ui";
import { site } from "@/config/site";
export const metadata = { title: "Status & safeguards" };

const tones = ["pink", "blue", "beet", "rum"];
const statusTones = ["pink", "blue", "rum", "pink"]; // for every card except Registration

export default function Transparency() {
  return (
    <>
      <PageHero tone="rum" title="Where we" script="stand" lead="We would rather admit we are early than overstate what we are. Last updated: 31/10/2026" />
      <Section>
        <h2 className="sr-only">Our current status</h2>
        <ol className="stages" aria-label="Stages of growth">
          <li className="stage here" aria-current="step"><b>Seed</b><span>We are here: forming the team and asking for guidance.</span></li>
          <li className="stage"><b>Bud</b><span>First pilots, once safeguards are in place.</span></li>
          <li className="stage"><b>Open</b><span>Programmes we can honestly report on.</span></li>
        </ol>
        <TileGrid
          fill
          items={site.status.map((s, i) => {
            const others = site.status.slice(0, i).filter((x) => x.k !== "Registration").length;
            const tone = s.k === "Registration" ? "beet" : statusTones[others % statusTones.length];
            return { title: s.k, text: s.v, tone };
          })}
        />
      </Section>
      <Section tone="dark">
        <Reveal><h2 className="display">What we <span className="script">won’t do</span></h2></Reveal>
        <ul className="limits">{site.limits.map((l) => <li key={l}>{l}</li>)}</ul>
      </Section>
      <Section>
        <Reveal><h2 className="display">How we <span className="script">stay accountable</span></h2></Reveal>
        <TileGrid items={site.safeguards.map((s, i) => ({ title: s.title, text: s.text, tone: tones[i % tones.length] }))} />
      </Section>
    </>
  );
}