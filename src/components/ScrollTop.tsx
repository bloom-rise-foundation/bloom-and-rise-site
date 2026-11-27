"use client";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/** Every page opens at the very top, always: after a client-side navigation (even from a half-scrolled page), after a refresh, and
 *  when the browser restores a page from its back/forward cache. The one exception is a URL with a #anchor, which goes to its anchor.
 *  The jump is instant (never a smooth scroll that can be interrupted or stop short), and clicking the link to the page you are
 *  already on takes you back to the top too. The inline boot script in layout.tsx covers the first load and turns the browser's own
 *  scroll restoration off. */
export default function ScrollTop() {
  const path = usePathname();

  useLayoutEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [path]);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const top = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // a URL with a #anchor opens at its anchor, also after a refresh (scroll restoration is off, so do it ourselves, again once fonts have settled)
    const toHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    if (window.location.hash) {
      requestAnimationFrame(toHash);
      document.fonts?.ready.then(toHash);
    }
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted && !window.location.hash) top();
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const u = new URL(a.href, window.location.href);
      if (u.origin === window.location.origin && u.pathname === window.location.pathname && !u.hash && !u.search) top();
    };
    window.addEventListener("pageshow", onShow);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("pageshow", onShow);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
