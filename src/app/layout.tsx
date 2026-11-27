import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "@/styles/base.css";
import "@/styles/chrome.css";
import "@/styles/sections.css";
import "@/styles/alcove.css";
import Header from "@/components/Header";
import Closing from "@/components/Closing";
import RevealRoot from "@/components/RevealRoot";
import { Extras } from "@/components/Lazy";
import ScrollGovernor from "@/components/ScrollGovernor";
import Delights from "@/components/Delights";
import { Footer } from "@/components/Chrome";
import { FlowerDefs, Petals } from "@/components/Decor";
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

// viewport-fit=cover lets the page run under the notch (the header/footer pad back with env()); the keyboard resizes the layout instead of covering fields.
export const viewport: Viewport = { themeColor: "#FCF1DA", colorScheme: "light", viewportFit: "cover", interactiveWidget: "resizes-content" };

// Runs before first paint: marks the page as scripted (so scroll reveals can start hidden), un-hides everything if hydration never arrives,
// and starts every fresh load at the top (no browser scroll restoration after a refresh or a reopened tab; #anchor links are left alone).
const boot = `try{var d=document.documentElement;d.classList.add("js");window.__rv=setTimeout(function(){d.classList.add("rv-fallback")},6000);if("scrollRestoration" in history)history.scrollRestoration="manual";if(!location.hash){scrollTo({top:0,left:0,behavior:"instant"});addEventListener("load",function(){if(performance.now()<1500&&scrollY>0)scrollTo({top:0,left:0,behavior:"instant"})})}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <FlowerDefs />
        <div className="bg" aria-hidden><i /><i /><i /></div>
        <Petals />
        <div className="stem" aria-hidden>
          <i className="stem-line" />
          <svg className="stem-head" viewBox="-50 -50 100 100"><use href="#flower-sym" x="-50" y="-50" width="100" height="100" /></svg>
        </div>
        <Header />
        <main>{children}</main>
        <Closing />
        <Footer year={new Date().getFullYear()} />
        <RevealRoot />
        <Extras />
        <ScrollGovernor />
        <Delights />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
