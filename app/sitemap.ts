import type { MetadataRoute } from "next";
import { sections, siteUrl } from "@/content/site";
import { publishedProjects } from "@/content/projects";
import { areas } from "@/content/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    entry("", 1),
    entry("/services", 0.9),
    ...sections.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/areas", 0.8),
    ...areas.map((a) => entry(`/areas/${a.slug}`, 0.8)),
    entry("/projects", 0.7),
    ...publishedProjects.map((p) => entry(`/projects/${p.slug}`, 0.6)),
    entry("/about", 0.6),
    entry("/faqs", 0.6),
    entry("/contact", 0.7),
    entry("/privacy", 0.2),
  ];
}
