"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { Magnetic } from "./Fx";
import { closingDefaults, closingByPage, type ClosingContent } from "@/config/closing";

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

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

/** Nav link whose dropdown opens on hover (desktop) or tap (touch / tablet). */
function NavGroup({ item, path }: { item: NavItem & { children: { label: string; href: string }[] }; path: string | null }) {
  const [open, setOpen] = useState(false);
  const [shut, setShut] = useState(false); // after a click, stay closed until the pointer leaves
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);
  const active = path === item.href || item.children.some((c) => path === c.href);
  return (
    <div
      className={`nav-group${open ? " open" : ""}${shut ? " shut" : ""}`}
      ref={ref}
      onMouseLeave={() => { setOpen(false); setShut(false); }}
      onClickCapture={(e) => {
        if (!window.matchMedia("(hover: none)").matches && (e.target as HTMLElement).closest("a")) {
          setShut(true);
          setOpen(false);
          (document.activeElement as HTMLElement | null)?.blur();
        }
      }}
    >
      <Link
        href={item.href}
        className={active ? "on" : ""}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => {
          // touch / tablet: tapping Team toggles the menu instead of navigating
          if (window.matchMedia("(hover: none)").matches) { e.preventDefault(); setOpen((o) => !o); }
        }}
      >{item.label}</Link>
      <ul className="nav-menu">
        {item.children.map((c) => (
          <li key={c.href}><Link href={c.href} className={`display${path === c.href ? " on" : ""}`}>{c.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const [teamOpen, setTeamOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { setOpen(false); setTeamOpen(false); }, [path]);
  useEffect(() => { if (!open) setTeamOpen(false); }, [open]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="wrap bar">
        <Link href="/" className="logo" aria-label="Bloom & Rise Foundation, home">
          <span className="display">{site.name}</span>
          <span className="script">{site.suffix}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {(site.nav as NavItem[]).map((n) =>
            n.children ? (
              <NavGroup key={n.href} item={{ ...n, children: n.children }} path={path} />
            ) : (
              <Link key={n.href} href={n.href} className={path === n.href ? "on" : ""}>{n.label}</Link>
            ),
          )}
        </nav>
        <button className="burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="drawer" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <div className="wrap">
              {(site.nav as NavItem[]).map((n) =>
                n.children ? (
                  <Fragment key={n.href}>
                    <button type="button" className="display drawer-toggle" aria-expanded={teamOpen} onClick={() => setTeamOpen((o) => !o)}>{n.label}</button>
                    <AnimatePresence initial={false}>
                      {teamOpen && (
                        <motion.div className="drawer-sub" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                          {n.children.map((c) => <Link key={c.href} href={c.href} className="display sub">{c.label}</Link>)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Fragment>
                ) : (
                  <Link key={n.href} href={n.href} className="display">{n.label}</Link>
                ),
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Closing() {
  const pathname = usePathname() || "/";
  const o = closingByPage[pathname.replace(/(.)\/$/, "$1")] ?? {};
  const pick = (k: keyof ClosingContent) => o[k]?.trim() || closingDefaults[k];
  return (
    <section className="closing">
      <div className="wrap">
        <h2 className="display">{pick("title")} <span className="script">{pick("script")}</span></h2>
        <div className="row">
          <Magnetic><Link className="btn" href={pick("primaryHref")}>{pick("primaryLabel")}</Link></Magnetic>
          <Magnetic><Link className="btn ghost" href={pick("secondaryHref")}>{pick("secondaryLabel")}</Link></Magnetic>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
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
        <div className="wrap fbottom small">
          <span>© {new Date().getFullYear()} {site.name} {site.suffix}</span>
          <a href="/sitemap">Sitemap</a>
        <span>{site.statusShort}</span>
      </div>
    </footer>
  );
}