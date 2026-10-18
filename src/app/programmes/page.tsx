import { PageHero, Section, FocusGrid } from "@/components/Sections";
import { Reveal } from "@/components/motion";
export const metadata = { title: "Programmes" };

export default function Programmes() {
  return (
    <>
      <PageHero title="What we" script="do" lead="Awareness, education, listening and partnership. We’ll begin with one or two small pilots, not a big promise." />
      <Section><FocusGrid /></Section>
      <Section tone="blue">
        <Reveal>
          <h2 className="display">Pilot first, <span className="script">then grow</span></h2>
          <p className="lead">No programme has launched yet. Our first pilots will likely be an introductory STEM workshop and a health-information session reviewed by a qualified source. We’ll publish what actually happens here once it has.</p>
        </Reveal>
      </Section>
    </>
  );
}
