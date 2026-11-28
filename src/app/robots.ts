import type { MetadataRoute } from "next";
import { BASE, EXCLUDED } from "@/lib/routes";

export const dynamic = "force-static";

/** Generated like the sitemap: it follows the same site URL and the same excluded pages.
 *  Preview deployments (VERCEL_ENV=preview) ask crawlers to stay away entirely, so only the real domain is indexed. */
export default function robots(): MetadataRoute.Robots {
  const preview = process.env.VERCEL_ENV === "preview";
  return {
    rules: preview ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", ...(EXCLUDED.length ? { disallow: EXCLUDED } : {}) },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
