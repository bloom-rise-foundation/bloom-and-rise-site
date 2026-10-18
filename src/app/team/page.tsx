import { PageHero, Section, TeamGrid } from "@/components/Sections";
export const metadata = { title: "Team" };

export default function Team() {
  return (
    <>
      <PageHero title="Meet the" script="team" lead="Student-led, with parents, guardians and trusted advisers supporting the legal and administrative side." />
      <Section><TeamGrid /></Section>
    </>
  );
}
