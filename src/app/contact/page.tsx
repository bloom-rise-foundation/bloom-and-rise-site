import { PageHero, Section } from "@/components/Sections";
import { SocialLinks } from "@/components/Chrome";
import { Reveal } from "@/components/motion";
import { site } from "@/config/site";
export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageHero title="Say" script="hello" lead="Questions, ideas, partnership offers, or a wish to join the team: we’d love to hear from you." />
      <Section>
        <Reveal>
          <a className="btn" href={`mailto:${site.email}`}>{site.email}</a>
          <h3 className="display follow">Or find us here</h3>
          <SocialLinks />
        </Reveal>
      </Section>
      <Section tone="blue">
        <Reveal>
          <h2 className="display">Please <span className="script">note</span></h2>
          <p className="lead">We can’t give medical advice, counselling or crisis support. If someone is in danger or needs urgent help, contact your local emergency services or a qualified professional. Please don’t send sensitive personal details by email.</p>
        </Reveal>
      </Section>
    </>
  );
}
