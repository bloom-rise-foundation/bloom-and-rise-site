import { PageHero, Section, Steps, TileGrid } from "@/components/Sections";
import { Reveal } from "@/components/ui";
import { site } from "@/config/site";
export const metadata = { title: "About" };

const tones = ["pink", "blue", "beet", "rum"];

export default function About() {
  return (
    <>
      <PageHero
        tone="blue"
        title="Who we"
        script="are"
        lead="Bloom & Rise Foundation promotes girls’ and women’s health, encourages open conversations about overlooked issues, and expands access to STEM education and opportunities. We support orphans and vulnerable children to feel safe, valued, and able to thrive."
      />
      <Section>
        <h2 className="sr-only">What we hold to</h2>
        <TileGrid items={site.values.map((v, i) => ({ ...v, tone: tones[i % tones.length] }))} />
      </Section>
      <Section tone="pink" close>
        <Reveal><h2 className="display">How we’ll <span className="script">begin</span></h2></Reveal>
        <Steps items={site.begin} />
      </Section>
    </>
  );
}