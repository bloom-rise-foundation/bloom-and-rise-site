import { PageHero, Section, TeamGrid } from "@/components/Sections";
import { Flower, PetalRing } from "@/components/Decor";
import { Reveal } from "@/components/ui";
import { heads, byDepartment } from "@/data/team";
export const metadata = { title: "Heads" };

const tones = ["pink", "", "blue", ""] as const;
const depts = byDepartment(heads);

export default function Heads() {
  return (
    <>
      <PageHero tone="rum" title="The heads behind " script="Bloom & Rise" lead="The students who lead our programmes, day to day, by department." />
      <Section>
        <h2 className="sr-only">Departments</h2>
        <nav className="dept-nav" aria-label="Jump to a department">
          <ul>
            {depts.map((d) => (
              <li key={d.id}>
                <a href={`#${d.id}`}>
                  <Flower size={18} />
                  <span>{d.name}</span>
                  <b aria-label={`${d.members.length} ${d.members.length === 1 ? "head" : "heads"}`}>{d.members.length}</b>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>
      {depts.map((d, i) => (
        <Section key={d.id} id={d.id} tone={tones[i % tones.length]}>
          <div className="dept">
            <div className="dept-head">
              <Reveal>
                <h2 className="display">Department of <span className="script">{d.name}</span></h2>
                <p className="dept-count">{d.members.length === 1 ? "One head" : `${d.members.length} heads`}</p>
              </Reveal>
              <div className="dept-art" aria-hidden><PetalRing count={5 + (i % 8)} /></div>
            </div>
            <TeamGrid members={d.members} />
          </div>
        </Section>
      ))}
    </>
  );
}
