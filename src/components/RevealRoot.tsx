"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** One IntersectionObserver for every [data-reveal] on the page (re-armed on each route change). */
export default function RevealRoot() {
  const path = usePathname();
  const first = useRef(true);

  useEffect(() => {
    // hydration arrived: the "un-hide everything" safety net from the boot script is no longer needed
    clearTimeout((window as Window & { __rv?: number }).__rv);
    // from the second route onwards, pages ease in (see .navd in base.css)
    if (!first.current) document.documentElement.classList.add("navd");
    first.current = false;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);

  return null;
}
