import Splash from "@/components/Splash";
import type { Metadata, Viewport } from "next";
import { Fraunces, Sacramento, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/motion";
import { Petals } from "@/components/Decor";
import { Scene, Cursor } from "@/components/Lazy";
import { Header, Footer, Closing } from "@/components/Chrome";
import { site } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["SOFT", "WONK"], display: "swap" });
const script = Sacramento({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });
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
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/apple-touch-icon-120.png", sizes: "120x120", type: "image/png" },
      { url: "/icons/apple-touch-icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/apple-touch-icon-167.png", sizes: "167x167", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = { themeColor: "#FFF8D5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${body.variable} splash-on`}>
      <body>
        <noscript><style>{`html.splash-on,html.splash-on body{overflow:auto}html.splash-on .tg-word,html.splash-on .petal,html.splash-on .marq-track{animation-play-state:running!important}`}</style></noscript>
        <Splash />
        <Providers>
          <Cursor />
          <Scene />
          <Petals />
          <Header />
          <main>{children}</main>
          <Closing />
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}