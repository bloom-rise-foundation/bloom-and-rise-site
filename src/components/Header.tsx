"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
const nav = site.nav as NavItem[];

/** Dropdown: opens on hover or keyboard focus; once a link is clicked it stays shut until the pointer leaves. */
function NavGroup({ item, path }: { item: NavItem & { children: { label: string; href: string }[] }; path: string | null }) {
  const [shut, setShut] = useState(false);
  const prev = useRef(path);
  useEffect(() => { if (prev.current !== path) { prev.current = path; setShut(true); } }, [path]);
  const active = path === item.href || item.children.some((c) => c.href === path);
  return (
    <div
      className={`nav-group${shut ? " shut" : ""}`}
      onMouseLeave={() => setShut(false)}
      onClickCapture={(e) => {
        if ((e.target as HTMLElement).closest("a")) {
          setShut(true);
          (document.activeElement as HTMLElement | null)?.blur();
        }
      }}
    >
      <Link href={item.href} className={active ? "on" : ""} aria-haspopup="true">{item.label}</Link>
      <ul className="nav-menu">
        {item.children.map((c) => (
          <li key={c.href}><Link href={c.href} className={`display${path === c.href ? " on" : ""}`}>{c.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const [tap, setTap] = useState(-1); // the menu link just pressed: its underline draws at once, even if the page changes straight away
  useEffect(() => {
    setOpen(false);
    const t = setTimeout(() => setTap(-1), 700);
    return () => clearTimeout(t);
  }, [path]);
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
        <Link href="/" className="logo">
          <span className="display">{site.name}</span>
          <span className="script">{site.suffix}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {nav.map((n) =>
            n.children ? (
              <NavGroup key={n.href} item={{ ...n, children: n.children }} path={path} />
            ) : (
              <Link key={n.href} href={n.href} className={path === n.href ? "on" : ""}>{n.label}</Link>
            ),
          )}
        </nav>
        <button className="burger" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
      <nav id="menu" className={`menu${open ? " open" : ""}`} aria-label="Mobile" inert={!open}>
        {flat.map((n, i) => (
          <Link key={`${n.href}-${i}`} href={n.href} style={{ ["--i" as string]: i }} className={`display${n.sub ? " sub" : ""}${path === n.href ? " on" : ""}${tap === i ? " tap" : ""}`} tabIndex={open ? 0 : -1} onPointerDown={() => setTap(i)}>{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}
