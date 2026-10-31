import { PageHero, Section, FocusGrid } from "@/components/Sections";
import { Reveal } from "@/components/motion";
export const metadata = { title: "Programmes" };

export default function Programmes() {
  return (
    <>
      <PageHero title="What we" script="do" lead="Four areas of focus, and a patient start with one or two modest pilots." />
      <Section><FocusGrid /></Section>
      <Section tone="blue">
        <Reveal>
          <h2 className="display">First a seed, <span className="script">then a bloom.</span></h2>
          <p className="lead">Nothing has launched yet; we will report what happens.</p>
        </Reveal>
      </Section>
    </>
  );
}
