"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** One IntersectionObserver for every [data-reveal] on the page (re-armed on each route change). */
export default function RevealRoot() {
  const path = usePathname();

  useEffect(() => {
    // hydration arrived: the "un-hide everything" safety net from the boot script is no longer needed
    clearTimeout((window as Window & { __rv?: number }).__rv);
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

  // After the first paint settles, later visits to the home page skip the one-off intro.
  useEffect(() => {
    const t = window.setTimeout(() => document.documentElement.classList.add("seen"), 3200);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
