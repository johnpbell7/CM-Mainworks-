import type { MetadataRoute } from "next";
import { sections, siteUrl } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/projects", "/about", "/faqs", "/contact", "/privacy",
    ...sections.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((p) => ({ url: `${siteUrl}${p}`, lastModified: new Date() }));
}
