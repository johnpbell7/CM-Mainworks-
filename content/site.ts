// Business details and sections. Mirrors brand/tokens.ts; keep the two in step.
export const business = {
  name: "CM MainWorks",
  descriptor: "Carpentry & Construction",
  owner: "Connor",
  phoneDisplay: "07742 135592",
  phoneHref: "tel:+447742135592",
  whatsapp: "https://wa.me/447742135592",
  facebook: "https://www.facebook.com/61574301627028/",
  base: "Lichfield, Staffordshire",
  // From Connor's pinned Facebook post (1 Apr). Flagged for Connor to confirm on the site.
  experience: "over 10 years",
  region: "the Midlands",
  // Confirmed by Connor via John, Oct 2026
  insured: true,
  // Real review, left on Connor's Facebook post about the bay window (1 Aug).
  review: {
    quote: "My bay window has been saved, from the perils of 140 years of time, weather and neglect, by an experienced tradesman. Someone who turns up to quote and returns to actually do the job. Thanks so much Connor. Would recommend.",
    highlight: "Someone who turns up to quote and returns to actually do the job.",
    name: "Alice Walsh",
    job: "Bay window restoration",
    source: "Facebook",
  },
  // Headline towns for copy. Full list (with town pages) is in content/areas.ts.
  areas: ["Lichfield", "Birmingham", "Solihull", "Sutton Coldfield", "Tamworth", "Walsall", "Cannock", "Burton upon Trent", "Redditch", "Leicester"],
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cm-mainworks.vercel.app";

export type SectionSlug = "carpentry" | "building" | "joinery" | "decorating";

export type Section = {
  slug: SectionSlug;
  name: string;
  /** CSS variable for the section colour, e.g. var(--oak) */
  color: string;
  /** CSS variable for the highlighter tint */
  tint: string;
  /** Highlighter name used by .hl[data-pen] */
  pen: "oak" | "steel" | "sage" | "brick";
  blurb: string;
  intro: string;
  examples: string[];
};

export const sections: Section[] = [
  {
    slug: "carpentry",
    pen: "oak",
    name: "Carpentry",
    color: "var(--oak)",
    tint: "var(--t-oak)",
    blurb: "Internal doors, skirting, staircases, kitchens and fitted wardrobes.",
    intro: "Doors, skirting, stairs and kitchens, fitted so they sit right and stay right. The woodwork you only notice when it’s wrong.",
    examples: ["Internal doors hung and adjusted", "Skirting, architrave and trims", "Staircases and spindles", "Kitchen fitting", "Fitted wardrobes", "Oak-framed garden canopies and outdoor structures"],
  },
  {
    slug: "building",
    pen: "steel",
    name: "Building",
    color: "var(--steel)",
    tint: "var(--t-steel)",
    blurb: "Extensions, structural alterations and renovations.",
    intro: "Extensions, knock-throughs and renovations. I plan them with you and run them myself, start to finish.",
    examples: ["Extensions", "Knocking through and structural alterations", "Full renovations", "Bathroom refits", "Landscaping and outdoor projects"],
  },
  {
    slug: "joinery",
    pen: "sage",
    name: "Joinery",
    color: "var(--sage)",
    tint: "var(--t-sage)",
    blurb: "Made-to-fit media walls, alcove units, shelving and storage.",
    intro: "Media walls, alcove units and storage, built for your room rather than flat-pack that nearly fits.",
    examples: ["Media walls", "Alcove units", "Shelving", "Under-stairs storage"],
  },
  {
    slug: "decorating",
    pen: "brick",
    name: "Decorating",
    color: "var(--brick)",
    tint: "var(--t-brick)",
    blurb: "Painting and finishing, right through to the last coat.",
    intro: "The bit everyone sees, with the prep done properly underneath so it lasts.",
    examples: ["Painting walls, ceilings and woodwork", "Filling and preparation", "Flooring and finishing after building work"],
  },
];

export const jobTypes = ["Carpentry", "Building", "Joinery", "Decorating", "Something else"] as const;
export type JobType = (typeof jobTypes)[number];

export function getSection(slug: string) {
  return sections.find((s) => s.slug === slug);
}

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Recent work" },
  { href: "/areas", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/faqs", label: "FAQs" },
] as const;
