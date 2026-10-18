import { Hero, Section, FocusGrid, Spotlight, Steps } from "@/components/Sections";
import { Reveal } from "@/components/motion";
import { Marquee } from "@/components/Fx";
import { site } from "@/config/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Section>
        <Reveal><p className="statement display">{site.mission}</p></Reveal>
      </Section>
      <Section>
        <Reveal><h2 className="display">What we <span className="script">care about</span></h2></Reveal>
        <FocusGrid />
      </Section>
      <section className="section">
        <div className="wrap"><Reveal><h2 className="display">What we <span className="script">stand for</span></h2></Reveal></div>
        <Marquee items={site.values} />
      </section>
      <Spotlight />
      <Section>
        <Reveal><h2 className="display">How to <span className="script">join in</span></h2></Reveal>
        <Steps items={site.joinSteps} />
      </Section>
    </>
  );
}
