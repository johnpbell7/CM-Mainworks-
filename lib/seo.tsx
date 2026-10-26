import type { Metadata } from "next";
import { business, siteUrl } from "@/content/site";

/*
  Shared SEO helpers. Every page gets a unique title, description, canonical URL
  and Open Graph/Twitter card. Titles use the root template "%s | CM MainWorks".
*/

const ogImage = { url: "/images/og-cm-mainworks.jpg", width: 1200, height: 630, alt: "CM MainWorks, carpentry and construction in Lichfield" };

export function pageMeta({ title, description, path, absolute = false, noindex = false }: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
  noindex?: boolean;
}): Metadata {
  const full = absolute ? title : `${title} | ${business.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_GB", siteName: business.name, url: path, title: full, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title: full, description, images: [ogImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const businessId = `${siteUrl}/#business`;
export const abs = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

export type Crumb = { href: string; label: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ href: "/", label: "Home" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: abs(c.href),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
