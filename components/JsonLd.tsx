import { business, sections, siteUrl } from "@/content/site";
import { areas } from "@/content/areas";
import { businessId, JsonLd } from "@/lib/seo";

/** Site-wide LocalBusiness schema. Only facts that are confirmed or public. */
export default function BusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "@id": businessId,
        name: business.name,
        description: "Carpentry, building, joinery and decorating in Lichfield and the villages around it.",
        url: siteUrl,
        telephone: "+447742135592",
        logo: `${siteUrl}/images/og.jpg`,
        image: [`${siteUrl}/images/hero-oak-canopy.jpg`, `${siteUrl}/images/bay-window-after.jpg`],
        address: { "@type": "PostalAddress", addressLocality: "Lichfield", addressRegion: "Staffordshire", addressCountry: "GB" },
        areaServed: areas.map((a) => ({ "@type": "City", name: a.name })),
        sameAs: [business.facebook],
        founder: { "@type": "Person", name: business.owner },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: sections.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.blurb, url: `${siteUrl}/services/${s.slug}` },
          })),
        },
      }}
    />
  );
}
