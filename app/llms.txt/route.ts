import { business, sections, siteUrl } from "@/content/site";
import { serviceContent } from "@/content/services";
import { areas } from "@/content/areas";
import { publishedProjects } from "@/content/projects";

/*
  /llms.txt: a plain list of the site for AI tools (https://llmstxt.org), in the format the studio's
  `seo.mjs llms` makes. It's built from the content files and siteUrl, like the sitemap, so the addresses
  follow NEXT_PUBLIC_SITE_URL and the pages follow the content. Fixed pages are listed below, in step with their descriptions.
*/
export const dynamic = "force-static";

const fixed = [
  ["Home renovations across the Midlands", "/", "Full home renovations managed by one team, start to finish: kitchens, bathrooms, extensions, floors and roofs. Insured, free written quotes."],
  ["Full home renovations across the Midlands", "/renovations", "Full renovations managed by one team, start to finish: kitchens, bathrooms, extensions, floors, stairs and decorating. Free written quotes."],
  ["Renovation prices and packages", "/prices", "A guide to my prices for full renovations, kitchens, bathrooms, extensions and smaller jobs across the Midlands. Free written quotes, no surprises."],
  ["Home renovation services across the Midlands", "/services", "Full renovations, extensions, kitchens, bathrooms, stairs, floors, roofing and decorating across the Midlands, managed by one team."],
  ["About Connor", "/about", `I run CM MainWorks, managing full home renovations with one team across the Midlands, with ${business.experience} in the trade.`],
  ["Recent work", "/projects", "Recent renovation, carpentry and decorating jobs from CM MainWorks, including a 140-year-old bay window I repaired and repainted."],
  ["FAQs: quotes, materials, small jobs and areas", "/faqs", "Straight answers about free quotes, materials, small jobs, insurance, how I run a job and the areas I cover across the Midlands."],
  ["Contact and free quote", "/contact", "Get a free written quote from me, Connor at CM MainWorks. Send a few photos of the job, ring or WhatsApp me. Covering the Midlands."],
] as const;

const line = (title: string, path: string, description: string) =>
  `- [${title}](${siteUrl}${path === "/" ? "" : path}): ${description}`;

export function GET() {
  const body = [
    `# ${business.name}`,
    "",
    `> ${business.pitch}. Kitchens, bathrooms, extensions, stairs, floors, roofing and decorating, across the Midlands. Run by ${business.owner}. Insured, with free written quotes.`,
    "",
    "## Pages",
    "",
    ...fixed.map(([t, p, d]) => line(t, p, d)),
    "",
    "## Services",
    "",
    ...sections.map((s) => line(serviceContent[s.slug].title, `/services/${s.slug}`, serviceContent[s.slug].description)),
    "",
    "## Areas",
    "",
    ...areas.map((a) => line(a.title, `/areas/${a.slug}`, a.description)),
    "",
    ...(publishedProjects.length
      ? ["## Work", "", ...publishedProjects.map((p) => line(p.name, `/projects/${p.slug}`, p.summary)), ""]
      : []),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
