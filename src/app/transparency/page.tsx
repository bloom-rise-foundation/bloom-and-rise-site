import { PageHero, Section } from "@/components/Sections";
import { Reveal } from "@/components/motion";
import { site } from "@/config/site";
export const metadata = { title: "Status & safeguards" };

export default function Transparency() {
  return (
    <>
      <PageHero title="Where we" script="stand" lead="We’d rather be honest about being early than overstate what we are. This page is kept up to date as things change." />
      <Section>
        <dl className="status">
          {site.status.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.05} className="status-row"><dt className="display">{s.k}</dt><dd>{s.v}</dd></Reveal>
          ))}
        </dl>
      </Section>
      <Section tone="dark">
        <Reveal><h2 className="display">What we <span className="script">won’t do</span></h2></Reveal>
        <ul className="limits">{site.limits.map((l) => <li key={l}>{l}</li>)}</ul>
      </Section>
      <Section>
        <Reveal><h2 className="display">How we <span className="script">stay accountable</span></h2></Reveal>
        <div className="two">
          {site.safeguards.map((s, i) => (
            <Reveal key={s.title} from={i % 2 ? "right" : "left"}><h3 className="display">{s.title}</h3><p>{s.text}</p></Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
