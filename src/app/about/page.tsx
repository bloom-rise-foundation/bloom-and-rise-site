import { PageHero, Section, Steps } from "@/components/Sections";
import { Reveal } from "@/components/motion";
import { GlowCard } from "@/components/Fx";
import { site } from "@/config/site";
export const metadata = { title: "About" };

const tones = ["pink", "blue", "beet", "rum"];

export default function About() {
  return (
    <>
      <PageHero
        title="Who we"
        script="are"
        lead="Bloom & Rise Foundation promotes girls’ and women’s health, encourages open conversations about overlooked issues, and expands access to STEM education and opportunities. We support orphans and vulnerable children to feel safe, valued, and able to thrive."
      />
      <Section>
        <div className="focus">
          {site.values.map((v, i) => (
            <GlowCard key={v.title} dir={i % 2 ? 48 : -48} delay={(i % 2) * 0.1} className={`tile ${tones[i % tones.length]}`}>
              <h3 className="display">{v.title}</h3>
              <p>{v.text}</p>
            </GlowCard>
          ))}
        </div>
      </Section>
      <Section tone="pink">
        <Reveal><h2 className="display">How we’ll <span className="script">begin</span></h2></Reveal>
        <Steps items={site.begin} />
      </Section>
    </>
  );
}