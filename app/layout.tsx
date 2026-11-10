import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "./concept.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import Motion from "@/components/Motion";
import IlloPlay from "@/components/concept/IlloPlay";
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
  title: { default: "Home renovations across the Midlands | CM MainWorks", template: "%s | CM MainWorks" },
  description: "I’m Connor. Full home renovations across the Midlands, managed by one team from start to finish. Free written quotes.",
  applicationName: "CM MainWorks",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CM MainWorks",
    images: [{ url: "/images/og-cm-mainworks.jpg", width: 1200, height: 630, alt: "CM MainWorks, carpentry and construction" }],
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

// Runs before first paint: marks JS as available. (The logo intro was taken out in the
// concept, John 10 Nov 2026: the van hero opens the site now.)
const boot = `document.documentElement.classList.add('js');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className={bricolage.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <JsonLd />
      </head>
      <body id="top">
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <Motion />
        <IlloPlay />
      </body>
    </html>
  );
}
