import { business, sections, siteUrl } from "@/content/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    description: "Carpentry and construction in Lichfield and the villages around it.",
    url: siteUrl,
    telephone: "+447742135592",
    logo: `${siteUrl}/images/og.jpg`,
    image: `${siteUrl}/images/hero-oak-canopy.jpg`,
    address: { "@type": "PostalAddress", addressLocality: "Lichfield", addressRegion: "Staffordshire", addressCountry: "GB" },
    areaServed: business.areas.map((name) => ({ "@type": "City", name })),
    sameAs: [business.facebook],
    knowsAbout: sections.map((s) => s.name),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
