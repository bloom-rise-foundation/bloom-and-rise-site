import { PageHero, Section, TeamGrid } from "@/components/Sections";
import { heads } from "@/data/team";
export const metadata = { title: "Heads" };

export default function Heads() {
  return (
    <>
      <PageHero tone="rum" title="The heads behind " script="Bloom & Rise" lead="The students who lead our programmes, day to day." />
      <Section><h2 className="sr-only">Programme and department heads</h2><TeamGrid members={heads} /></Section>
    </>
  );
}