import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Staging blocks crawlers. Production sets NEXT_PUBLIC_ALLOW_INDEXING=true.
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    rules: allow ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
