import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { site } from "@/config/site";

// Set NEXT_PUBLIC_SITE_URL (e.g. https://yourdomain.org) in your hosting env vars.
export const BASE = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

// Pages to keep out of the sitemap (XML and page), e.g. ["/verify"]
const EXCLUDE = new Set<string>([]);

const PAGE_FILE = /^page\.(tsx|ts|jsx|js|mdx)$/;

// Walks the app folder and returns every static page route.
// Skips dynamic ([id]), private (_x), parallel (@x) and intercepting ((.)x) folders; route groups (x) don't appear in URLs.
function walk(dir: string, route = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out: string[] = [];
  if (entries.some((e) => e.isFile() && PAGE_FILE.test(e.name))) out.push(route || "/");
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const n = e.name;
    if (n.startsWith("_") || n.startsWith("@") || n.startsWith("(.") || n.includes("[")) continue;
    const seg = n.startsWith("(") && n.endsWith(")") ? "" : `/${n}`;
    out.push(...walk(path.join(dir, n), route + seg));
  }
  return out;
}

export function getRoutes(): string[] {
  const root = path.join(process.cwd(), "src", "app");
  const appDir = fs.existsSync(root) ? root : path.join(process.cwd(), "app");
  return [...new Set(walk(appDir))]
    .filter((r) => !EXCLUDE.has(r))
    .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date();
  return getRoutes().map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: r === "/" ? "weekly" : "monthly",
    priority: r === "/" ? 1 : 0.7,
  }));
}

// Friendly names: reuse your nav/footer labels, otherwise prettify the folder name.
const known = new Map<string, string>();
for (const l of [...site.nav, ...site.footer.flatMap((c) => c.links)]) {
  const p = l.href.split("#")[0];
  if (p && !known.has(p)) known.set(p, l.label);
}
export function labelFor(route: string): string {
  if (route === "/") return "Home";
  const hit = known.get(route);
  if (hit) return hit;
  const last = (route.split("/").filter(Boolean).pop() ?? route).replace(/-/g, " ");
  return last.charAt(0).toUpperCase() + last.slice(1);
}