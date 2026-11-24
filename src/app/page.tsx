import { Hero, Section, FocusPin, Spotlight, Steps, Marquee } from "@/components/Sections";
import { Reveal, LitWords } from "@/components/ui";
import { site } from "@/config/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Section>
        <LitWords text={site.mission} className="statement display" />
      </Section>
      <FocusPin />
      <section className="section">
        <div className="wrap"><Reveal><h2 className="display">How we <span className="script">work</span></h2></Reveal></div>
        <Marquee items={site.values} />
        <Marquee items={[...site.values].reverse()} reverse />
      </section>
      <Spotlight />
      <Section>
        <Reveal><h2 className="display">How to <span className="script">join in</span></h2></Reveal>
        <Steps items={site.joinSteps} />
      </Section>
    </>
  );
}
