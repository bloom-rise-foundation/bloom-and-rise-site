import Link from "next/link";
import { PageHero, Section } from "@/components/Sections";
import { GlowCard } from "@/components/Fx";
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
            <GlowCard key={r} dir={i % 2 ? 48 : -48} delay={(i % 2) * 0.1} className={`tile ${tones[i % tones.length]}`}>
              <Link href={r} className="sm-link">
                <h3 className="display">{labelFor(r)}</h3>
                <p className="sm-path">{r}</p>
              </Link>
            </GlowCard>
          ))}
        </div>
      </Section>
    </>
  );
}