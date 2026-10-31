import { PageHero, Section, Steps } from "@/components/Sections";
import { Reveal } from "@/components/motion";
import { site } from "@/config/site";
export const metadata = { title: "Get involved" };
const mail = (s: string) => `mailto:${site.email}?subject=${encodeURIComponent(s)}`;

export default function GetInvolved() {
  return (
    <>
      <PageHero title="Rise with " script="us" lead="You need not be an expert. Inquisitiveness and care are enough." />
      <Section><Steps items={site.joinSteps} /></Section>
      <Section tone="pink">
        <Reveal>
          <h2 className="display">Roles <span className="script">to step into</span></h2>
          <p className="lead">See what each leadership and programme role involves before you reach out.</p>
          <div className="row">
            <a className="btn" href={site.rolesPdf.href} target="_blank" rel="noopener noreferrer">{site.rolesPdf.label}</a>
          </div>
          <p className="small note">Roles can be combined while the team is small. Under-18s need a parent or guardian’s agreement to take part.</p>
        </Reveal>
      </Section>
      <Section id="partner">
        <Reveal>
          <h2 className="display">Partner <span className="script">with us</span></h2>
          <p className="lead">Schools, health professionals, community groups and child-welfare organisations: we’d value your guidance on content, safeguarding, venues and referrals.</p>
          <div className="row"><a className="btn" href={mail("Partnership enquiry")}>Email us</a></div>
          <p className="small note">Donations are not yet open. We will not collect funds until the legal requirements are clear.</p>
        </Reveal>
      </Section>
    </>
  );
}
