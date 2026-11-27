"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Once the home hero has scrolled out of view the flower costs nothing: the page gets `hero-off`, which hides the flower and holds
 *  its animations (see alcove.css). Scrolling back up releases them. One IntersectionObserver, no per-frame work. */
export default function HeroWatch() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector(".hero");
    root.classList.remove("hero-off");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => root.classList.toggle("hero-off", !e.isIntersecting), { rootMargin: "80px 0px 80px 0px" });
    io.observe(hero);
    return () => {
      io.disconnect();
      root.classList.remove("hero-off");
    };
  }, [path]);
  return null;
}
