import { Hero, Section, FocusPin, Stack, Spotlight, Steps } from "@/components/Sections";
import { Band } from "@/components/Ribbons";
import { Reveal, LitWords } from "@/components/ui";
import { site } from "@/config/site";

const band = site.phrases.slice(0, 3);
const band2 = site.values.map((v) => v.title);

export default function Home() {
  return (
    <>
      <Hero />
      <Band items={band} items2={band2} />
      <section className="section mission cv">
        <div className="wrap">
          <LitWords text={site.mission} className="statement display" accents={["candid", "answers", "science", "unhurriedly", "community"]} />
        </div>
      </section>
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
