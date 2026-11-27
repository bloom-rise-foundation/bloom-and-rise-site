import { PageHero, Section, TeamRows } from "@/components/Sections";
import { team } from "@/data/team";
export const metadata = { title: "Executive" };

export default function Team() {
  return (
    <>
      <PageHero tone="beet" title="The executive team of " script="Bloom & Rise" lead="Student-led, backed by parents, guardians and trusted advisers." />
      <Section><h2 className="sr-only">Executive team</h2><TeamRows members={team} /></Section>
    </>
  );
}