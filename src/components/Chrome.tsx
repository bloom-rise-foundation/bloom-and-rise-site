import Link from "next/link";
import { site } from "@/config/site";
import { PatternStrip } from "./Ribbons";
import { EdgeDivider, claimEdge } from "./Dividers";

export function SocialLinks() {
  return (
    <ul className="socials">
      {site.socials.filter((s) => s.href).map((s) => (
        <li key={s.label}>
          <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{s.label}</a>
        </li>
      ))}
    </ul>
  );
}

export function Footer({ year }: { year: number }) {
  const variant = claimEdge();
  return (
    <div className="footer-shell">
    <EdgeDivider variant={variant} />
    <footer className="footer cv">
      <PatternStrip />
      <div className="wrap fcols">
        {site.footer.map((c) => (
          <nav key={c.title} className="fcol" aria-label={c.title}>
            <h2 className="fh">{c.title}</h2>
            <ul>{c.links.map((l) => <li key={l.href}>{l.href.startsWith("mailto:") ? <a href={l.href}>{l.label}</a> : <Link href={l.href}>{l.label}</Link>}</li>)}</ul>
          </nav>
        ))}
        <div className="fcol">
          <h2 className="fh">Follow</h2>
          <SocialLinks />
        </div>
      </div>
      <div className="wordmark" aria-hidden><span>Bloom <em>&amp; Rise</em></span></div>
      <div className="wrap fbottom small">
        <span>© {year} {site.name} {site.suffix}</span>
        <Link href="/sitemap">Sitemap</Link>
        <span>{site.statusShort}</span>
      </div>
    </footer>
    </div>
  );
}
