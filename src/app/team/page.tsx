import { PageHero, Section, TeamRows } from "@/components/Sections";
import { team } from "@/data/team";
export const metadata = { title: "Executive" };

export default function Team() {
  return (
    <>
      <PageHero title="The executive team of " script="Bloom & Rise" lead="Student-led, backed by parents, guardians and trusted advisers." />
      <Section><TeamRows members={team} /></Section>
    </>
  );
}