import { PageHero, Section, TeamGrid } from "@/components/Sections";
import { heads } from "@/data/team";
export const metadata = { title: "Heads" };

export default function Heads() {
  return (
    <>
      <PageHero title="The heads behind " script="Bloom & Rise" lead="The students who lead our programmes, day to day." />
      <Section><TeamGrid members={heads} /></Section>
    </>
  );
}