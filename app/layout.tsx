import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import Intro from "@/components/Intro";
import Motion from "@/components/Motion";
import JsonLd from "@/components/JsonLd";
import { siteUrl } from "@/content/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  // Variable font with the optical-size axis, so small text gets the wider,
  // easier-to-read letterforms and big headlines keep the display cut.
  axes: ["opsz"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Home renovations in Lichfield and the Midlands | CM MainWorks", template: "%s | CM MainWorks" },
  description: "I’m Connor. Full home renovations across Lichfield and the Midlands, managed by one team from start to finish. Free written quotes.",
  applicationName: "CM MainWorks",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CM MainWorks",
    images: [{ url: "/images/og-cm-mainworks.jpg", width: 1200, height: 630, alt: "CM MainWorks, carpentry and construction in Lichfield" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true },
  // Staging must not be indexed. Set NEXT_PUBLIC_ALLOW_INDEXING=true on production only.
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  viewportFit: "cover",
};

// Runs before first paint: marks JS as available and decides whether the intro plays.
// Two failsafes so a slow phone never sits on the navy screen: if the intro hasn't
// started within 1.8s it's skipped, and after 7s the page always opens.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('cm-intro-seen')){d.classList.add('intro-on');var off=function(){d.classList.remove('intro-on');try{sessionStorage.setItem('cm-intro-seen','1')}catch(e){}};setTimeout(function(){if(!window.__cmIntroStarted)off()},1800);setTimeout(off,7000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className={bricolage.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <JsonLd />
      </head>
      <body id="top">
        <a className="skip" href="#main">Skip to content</a>
        <Intro />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <Motion />
      </body>
    </html>
  );
}
