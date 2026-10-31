import { PageHero, Section, TeamGrid } from "@/components/Sections";
export const metadata = { title: "Team" };

export default function Team() {
  return (
    <>
      <PageHero title="The students behind " script="Bloom & Rise" lead="Student-led, backed by parents, guardians and trusted advisers." />
      <Section><TeamGrid /></Section>
    </>
  );
}
