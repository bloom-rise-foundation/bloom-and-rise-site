"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { Magnetic } from "./Fx";

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

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => setOpen(false), [path]);
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
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className={path === n.href ? "on" : ""}>{n.label}</Link>
          ))}
        </nav>
        <button className="burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="drawer" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <div className="wrap">
              {site.nav.map((n) => <Link key={n.href} href={n.href} className="display">{n.label}</Link>)}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Closing() {
  return (
    <section className="closing">
      <div className="wrap">
        <h2 className="display">Start honestly. Start safely. <span className="script">Grow with the community.</span></h2>
        <div className="row">
          <Magnetic><Link className="btn" href="/get-involved">Join in</Link></Magnetic>
          <Magnetic><Link className="btn ghost" href="/contact">Say hello</Link></Magnetic>
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
        <span>{site.statusShort}</span>
      </div>
    </footer>
  );
}
