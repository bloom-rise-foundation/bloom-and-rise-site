import { getSitemapEntries } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap() {
  return getSitemapEntries();
}