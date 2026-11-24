import { PageHero, Section } from "@/components/Sections";
import { Tile } from "@/components/Sections";
import { getRoutes, labelFor } from "@/lib/routes";

export const metadata = { title: "Sitemap" };
export const dynamic = "force-static";

const tones = ["pink", "blue", "beet", "rum"];

export default function SitemapPage() {
  const routes = getRoutes().filter((r) => r !== "/sitemap");
  return (
    <>
      <PageHero title="Find your" script="way around" lead="Every page on the site, in one place. Search engines read the same list at /sitemap.xml." />
      <Section>
        <div className="focus">
          {routes.map((r, i) => (
            <Tile key={r} href={r} title={labelFor(r)} text={r} tone={tones[i % tones.length]} i={i} />
          ))}
        </div>
      </Section>
    </>
  );
}