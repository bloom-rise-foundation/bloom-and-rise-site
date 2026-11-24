import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "@/styles/base.css";
import "@/styles/chrome.css";
import "@/styles/sections.css";
import Header from "@/components/Header";
import Closing from "@/components/Closing";
import RevealRoot from "@/components/RevealRoot";
import { Extras } from "@/components/Lazy";
import { Footer } from "@/components/Chrome";
import { site } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Playfair Display is the brand face (its italic replaces the old handwritten accents); Montserrat sets body copy.
const display = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Montserrat({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} ${site.suffix}`, template: `%s · ${site.name} ${site.suffix}` },
  description: site.mission,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/apple-touch-icon-120.png", sizes: "120x120", type: "image/png" },
      { url: "/icons/apple-touch-icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/apple-touch-icon-167.png", sizes: "167x167", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "8ItXbnmQmWPuwthDyNFeDLt80DhgkSB2qvigAKWfBs8",
  },
};

export const viewport: Viewport = { themeColor: "#FFF8D5" };

// Runs before first paint: marks the page as scripted (so scroll reveals can start hidden), skips the one-off intro
// on repeat visits in a session, and un-hides everything if hydration never arrives.
const boot = `try{var d=document.documentElement;d.classList.add("js");sessionStorage.getItem("br")?d.classList.add("seen"):sessionStorage.setItem("br","1");window.__rv=setTimeout(function(){d.classList.add("rv-fallback")},6000)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <div className="bg" aria-hidden><i /><i /><i /></div>
        <Header />
        <main>{children}</main>
        <Closing />
        <Footer year={new Date().getFullYear()} />
        <RevealRoot />
        <Extras />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
