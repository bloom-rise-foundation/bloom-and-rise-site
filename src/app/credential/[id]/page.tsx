import type { Metadata } from "next";
import Link from "next/link";
import { lookupCredential } from "@/lib/credentials";
import { Badge, VerifyForm } from "@/components/Credential";
import { Reveal } from "@/components/motion";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Credential verification", robots: { index: false, follow: false } };

const fmt = (d?: string) => {
  if (!d) return "";
  const t = new Date(d);
  return isNaN(+t) ? d : t.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
};
const decode = (s: string) => { try { return decodeURIComponent(s); } catch { return s; } };

export default async function CredentialPage({ params }: { params: Promise<{ id: string }> }) {
  const r = await lookupCredential(decode((await params).id));

  return (
    <section className="section">
      <div className="wrap cred">
        {r.state === "found" && !r.cred.revoked && (
          <>
            <Badge kind="valid" />
            <h1 className="display">Verified <span className="script">credential</span></h1>
            <p className="lead">This credential was issued by {site.name} {site.suffix}.</p>
            <Reveal delay={0.4} className="cred-card">
              <p className="cred-type">{r.cred.type}</p>
              <h2 className="display cred-name">{r.cred.name}</h2>
              {r.cred.role && <p className="script cred-role">{r.cred.role}</p>}
              {r.cred.description && <p>{r.cred.description}</p>}
              <dl className="cred-meta">
                {r.cred.issued && <div><dt>Issued</dt><dd>{fmt(r.cred.issued)}</dd></div>}
                <div><dt>Credential ID</dt><dd>{r.cred.id}</dd></div>
                <div><dt>Status</dt><dd>Active</dd></div>
              </dl>
            </Reveal>
            <p className="small note">Only the details printed on the certificate are shown. {site.name} {site.suffix} is a student-led initiative; see our <Link href="/transparency"><u>status</u></Link>.</p>
          </>
        )}
        {r.state === "found" && r.cred.revoked && (
          <>
            <Badge kind="revoked" />
            <h1 className="display">Credential <span className="script">revoked</span></h1>
            <p className="lead">This credential (ID {r.cred.id}) is no longer valid. If you think this is a mistake, please <Link href="/contact"><u>contact us</u></Link>.</p>
          </>
        )}
        {r.state === "missing" && (
          <>
            <Badge kind="missing" />
            <h1 className="display">Not <span className="script">found</span></h1>
            <p className="lead">We couldn’t find a credential with that ID. Check it matches the certificate exactly, or try again below. If it still doesn’t work, the certificate may not be genuine.</p>
            <VerifyForm />
          </>
        )}
        {r.state === "error" && (
          <>
            <Badge kind="error" />
            <h1 className="display">Try <span className="script">again soon</span></h1>
            <p className="lead">Verification is temporarily unavailable. This doesn’t mean the credential is invalid. Please try again in a few minutes.</p>
          </>
        )}
      </div>
    </section>
  );
}
