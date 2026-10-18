import { PageHero, Section } from "@/components/Sections";
import { VerifyForm } from "@/components/Credential";
export const metadata = { title: "Verify a credential" };

export default function Verify() {
  return (
    <>
      <PageHero title="Verify a" script="credential" lead="Scan the QR code on a Bloom & Rise certificate, or enter the ID printed on it." />
      <Section><VerifyForm /></Section>
    </>
  );
}
