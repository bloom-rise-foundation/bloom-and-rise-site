import { PageHero, Section, FocusGrid } from "@/components/Sections";
import { WaveMarquee } from "@/components/Dividers";
import { site } from "@/config/site";
import { Reveal } from "@/components/ui";
export const metadata = { title: "Programmes" };

export default function Programmes() {
  return (
    <>
      <PageHero tone="blue" title="What we" script="do" lead="Four areas of focus, and a patient start with one or two modest pilots." />
      <Section><h2 className="sr-only">Our four areas of focus</h2><FocusGrid /></Section>
      <WaveMarquee items={site.focus.map((f) => f.title)} tone="blue" />
      <Section tone="blue" edge={false}>
        <Reveal>
          <h2 className="display">First a seed, <span className="script">then a bloom.</span></h2>
          <p className="lead">Nothing has launched yet; we will report what happens.</p>
        </Reveal>
      </Section>
    </>
  );
}
