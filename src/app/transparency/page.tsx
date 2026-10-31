import { PageHero, Section } from "@/components/Sections";
import { Reveal } from "@/components/motion";
import { GlowCard } from "@/components/Fx";
import { site } from "@/config/site";
export const metadata = { title: "Status & safeguards" };

const tones = ["pink", "blue", "beet", "rum"];
const statusTones = ["pink", "blue", "rum", "pink"]; // for every card except Registration

export default function Transparency() {
  return (
    <>
      <PageHero title="Where we" script="stand" lead="We would rather admit we are early than overstate what we are. Last updated: 31/10/2026" />
      <Section>
        <div className="focus fill">
          {site.status
            .map((s, i) => ({ ...s, i }))
            .map((s) => {
              const others = site.status.slice(0, s.i).filter((x) => x.k !== "Registration").length;
              const tone = s.k === "Registration" ? "beet" : statusTones[others % statusTones.length];
              return (
                <GlowCard key={s.k} dir={s.i % 2 ? 48 : -48} delay={(s.i % 2) * 0.1} className={`tile ${tone}`}>
                  <h3 className="display">{s.k}</h3>
                  <p>{s.v}</p>
                </GlowCard>
              );
            })}
        </div>
      </Section>
      <Section tone="dark">
        <Reveal><h2 className="display">What we <span className="script">won’t do</span></h2></Reveal>
        <ul className="limits">{site.limits.map((l) => <li key={l}>{l}</li>)}</ul>
      </Section>
      <Section>
        <Reveal><h2 className="display">How we <span className="script">stay accountable</span></h2></Reveal>
        <div className="focus">
          {site.safeguards.map((s, i) => (
            <GlowCard
              key={s.title}
              dir={i % 2 ? 48 : -48}
              delay={(i % 2) * 0.1}
              className={`tile ${tones[i % tones.length]}`}
            >
              <h3 className="display">{s.title}</h3>
              <p>{s.text}</p>
            </GlowCard>
          ))}
        </div>
      </Section>
    </>
  );
}