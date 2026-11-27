"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { partnerHref } from "@/config/site";
import { FlankFlowers } from "./FlankFlowers";
import { closingDefaults, closingByPage, type ClosingContent } from "@/config/closing";

/** The per-page call to action above the footer (copy lives in config/closing.ts). */
export default function Closing() {
  const pathname = usePathname() || "/";
  const o = closingByPage[pathname.replace(/(.)\/$/, "$1")] ?? {};
  const pick = (k: keyof ClosingContent) => o[k]?.trim() || closingDefaults[k];
  return (
    <section className="closing">
      <FlankFlowers>
      <div className="wrap">
        <h2 className="display">{pick("title")} <span className="script">{pick("script")}</span></h2>
        <div className="row">
          <div data-fx="mag"><Link className="btn" href={pick("primaryHref")}>{pick("primaryLabel")}</Link></div>
          <div data-fx="mag"><Link className="btn ghost" href={pick("secondaryHref")}>{pick("secondaryLabel")}</Link></div>
          {pick("primaryHref") !== partnerHref && pick("secondaryHref") !== partnerHref && (
            <div data-fx="mag"><a className="btn ghost" href={partnerHref}>Partner with us</a></div>
          )}
        </div>
      </div>
      </FlankFlowers>
    </section>
  );
}
