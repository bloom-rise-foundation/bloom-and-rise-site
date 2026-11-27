import { PageHero, Section } from "@/components/Sections";
import { SocialLinks } from "@/components/Chrome";
import { Reveal } from "@/components/ui";
import CopyEmail from "@/components/CopyEmail";
import { site } from "@/config/site";
export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageHero tone="blue" title="Drop us a " script="line" lead="Questions, ideas, offers or a wish to join: we would love to hear from you." />
      <Section>
        <Reveal>
          <h2 className="sr-only">Ways to reach us</h2>
          <a className="btn" href={`mailto:${site.email}`}>{site.email}</a>
          <div><CopyEmail email={site.email} /></div>
          <h2 className="display follow">Or find us here</h2>
          <SocialLinks />
        </Reveal>
      </Section>
      <Section tone="blue">
        <Reveal>
          <h2 className="display">Please <span className="script">note</span></h2>
          <p className="lead">We cannot give medical advice, counselling or crisis support. In an emergency, contact your local emergency services. Please send no sensitive personal details by email.</p>
        </Reveal>
      </Section>
    </>
  );
}
