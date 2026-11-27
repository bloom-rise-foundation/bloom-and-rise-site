import { PageHero, Section, Stages, TileGrid } from "@/components/Sections";
import { WaveMarquee } from "@/components/Dividers";
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
        <Stages />
        <TileGrid
          fill
          items={site.status.map((s, i) => {
            const others = site.status.slice(0, i).filter((x) => x.k !== "Registration").length;
            const tone = s.k === "Registration" ? "beet" : statusTones[others % statusTones.length];
            return { title: s.k, text: s.v, tone };
          })}
        />
      </Section>
      <WaveMarquee items={site.values.map((v) => v.title)} tone="beet" />
      <Section tone="dark" edge={false}>
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