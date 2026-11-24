"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
const nav = site.nav as NavItem[];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  // flat list for the full-screen menu: sub-pages sit under their parent
  const flat = nav.flatMap((n) => [{ ...n, sub: false }, ...(n.children ?? []).map((c) => ({ ...c, sub: true }))]);

  return (
    <header className="header">
      <div className="bar">
        <Link href="/" className="logo" aria-label="Bloom & Rise Foundation, home">
          <span className="display">{site.name}</span>
          <span className="script">{site.suffix}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {nav.map((n) =>
            n.children ? (
              <div key={n.href} className="nav-group">
                <Link href={n.href} className={path === n.href || n.children.some((c) => c.href === path) ? "on" : ""} aria-haspopup="true">{n.label}</Link>
                <ul className="nav-menu">
                  {n.children.map((c) => (
                    <li key={c.href}><Link href={c.href} className={`display${path === c.href ? " on" : ""}`}>{c.label}</Link></li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link key={n.href} href={n.href} className={path === n.href ? "on" : ""}>{n.label}</Link>
            ),
          )}
        </nav>
        <button className="burger" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
      <nav id="menu" className={`menu${open ? " open" : ""}`} aria-label="Mobile" inert={!open}>
        {flat.map((n, i) => (
          <Link key={n.href} href={n.href} style={{ ["--i" as string]: i }} className={`display${n.sub ? " sub" : ""}${path === n.href ? " on" : ""}`} tabIndex={open ? 0 : -1}>{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}
