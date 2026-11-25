import Link from "next/link";
import { site } from "@/config/site";
import { PatternStrip } from "./Ribbons";

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
  return (
    <footer className="footer cv">
      <PatternStrip />
      <div className="wrap fcols">
        <div className="fbrand">
          <p className="display">{site.name}</p>
          <p className="script">{site.suffix}</p>
          <p className="small">{site.tagline}</p>
        </div>
        {site.footer.map((c) => (
          <nav key={c.title} className="fcol" aria-label={c.title}>
            <h4>{c.title}</h4>
            <ul>{c.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </nav>
        ))}
        <div className="fcol">
          <h4>Follow</h4>
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
  );
}
