import { Hero, Section, FocusPin, Stack, Spotlight, Stages, Steps } from "@/components/Sections";
import { WaveMarquee } from "@/components/Dividers";
import { Band } from "@/components/Ribbons";
import { Reveal } from "@/components/ui";
import LitLines from "@/components/Lit";
import { site } from "@/config/site";

const band = site.phrases.slice(0, 3);
const band2 = site.values.map((v) => v.title);

export default function Home() {
  return (
    <>
      <Hero />
      <Band items={band} items2={band2} />
      <section className="section mission">
        <div className="wrap">
          <LitLines text={site.mission} className="statement display" accents={["candid", "answers", "science", "unhurriedly", "community"]} />
        </div>
      </section>
      <FocusPin />
      <section className="section">
        <div className="wrap">
          <Reveal><h2 className="display">How we <span className="script">work</span></h2></Reveal>
          <Stack items={site.values} />
        </div>
      </section>
      <WaveMarquee items={site.phrases} tone="wine" />
      <Spotlight />
      <Section tone="pink" close>
        <Reveal><h2 className="display">Where we <span className="script">stand</span></h2></Reveal>
        <Stages />
        <Reveal><h2 className="display">How to <span className="script">join in</span></h2></Reveal>
        <Steps items={site.joinSteps} />
      </Section>
    </>
  );
}
