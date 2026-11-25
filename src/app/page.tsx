import { Hero, Band, Section, FocusPin, Stack, Spotlight, Steps } from "@/components/Sections";
import { Reveal, LitWords } from "@/components/ui";
import { site } from "@/config/site";

const band = [...site.phrases.slice(0, 3), site.values[0].title];

export default function Home() {
  return (
    <>
      <Hero />
      <Band items={band} />
      <Section cv>
        <LitWords text={site.mission} className="statement display" />
      </Section>
      <FocusPin />
      <section className="section cv cv-stack">
        <div className="wrap">
          <Reveal><h2 className="display">How we <span className="script">work</span></h2></Reveal>
          <Stack items={site.values} />
        </div>
      </section>
      <Spotlight />
      <Section tone="pink">
        <Reveal><h2 className="display">How to <span className="script">join in</span></h2></Reveal>
        <Steps items={site.joinSteps} />
      </Section>
    </>
  );
}
