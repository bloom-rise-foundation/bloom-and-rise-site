import Link from "next/link";
import { PageHero } from "@/components/Sections";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not" script="found" lead="That page doesn’t exist or may have moved. Let’s get you back on track." />
      <div className="wrap row" style={{ paddingBottom: "6rem" }}>
        <Link className="btn" href="/">Back to home</Link>
        <Link className="btn ghost" href="/contact">Say hello</Link>
      </div>
    </>
  );
}