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
        description: `${business.pitch}. Kitchens, bathrooms, extensions, stairs, floors, roofing and decorating. Insured, covering the Midlands.`,
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
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full home renovations", description: business.pitch, url: `${siteUrl}/renovations` } },
            ...sections.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.intro, url: `${siteUrl}/services/${s.slug}` },
            })),
          ],
        },
      }}
    />
  );
}
