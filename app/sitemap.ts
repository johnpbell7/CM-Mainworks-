import type { MetadataRoute } from "next";
import { sections, siteUrl } from "@/content/site";
import { projectPhotos, publishedProjects } from "@/content/projects";
import { media } from "@/content/media";
import { areas } from "@/content/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, photos: (string | null)[] = []): MetadataRoute.Sitemap[number] => {
    const images = photos.filter((src): src is string => !!src).map((src) => `${siteUrl}${src}`);
    return {
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority,
      ...(images.length ? { images } : {}),
    };
  };
  return [
    entry("", 1, [media.hero.src]),
    entry("/renovations", 1, [media.renovation.src]),
    entry("/services", 0.9),
    entry("/prices", 0.9),
    ...sections.map((s) => entry(`/services/${s.slug}`, 0.9, [media[s.slug].src])),
    ...areas.map((a) => entry(`/areas/${a.slug}`, 0.8)),
    entry("/projects", 0.7),
    ...publishedProjects.map((p) => entry(`/projects/${p.slug}`, 0.6, projectPhotos(p).map((m) => m.src))),
    entry("/about", 0.6, [media.portrait.src]),
    entry("/faqs", 0.6),
    entry("/contact", 0.7),
    entry("/privacy", 0.2),
  ];
}
