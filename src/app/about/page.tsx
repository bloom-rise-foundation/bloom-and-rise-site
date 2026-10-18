import { PageHero, Section, Steps } from "@/components/Sections";
import { Reveal } from "@/components/motion";
import { site } from "@/config/site";
export const metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHero title="Who we" script="are" lead={site.mission} />
      <Section>
        <div className="two">
          {site.values.map((v, i) => (
            <Reveal key={v.title} from={i % 2 ? "right" : "left"}>
              <h3 className="display">{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
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
