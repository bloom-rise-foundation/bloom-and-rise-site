import type { Metadata } from "next";
import { Fraunces, Dancing_Script, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/motion";
import { Petals } from "@/components/Decor";
import { Header, Footer, Closing } from "@/components/Chrome";
import { site } from "@/config/site";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["SOFT", "WONK"] });
const script = Dancing_Script({ subsets: ["latin"], variable: "--font-script" });
const body = Montserrat({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: `${site.name} ${site.suffix}`, template: `%s · ${site.name} ${site.suffix}` },
  description: site.mission,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${body.variable}`}>
      <body>
        <Providers>
          <Petals />
          <Header />
          <main>{children}</main>
          <Closing />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
