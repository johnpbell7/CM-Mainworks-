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
  region: "Staffordshire",
  // Real review, left on Connor's Facebook post about the bay window (1 Aug).
  review: {
    quote: "My bay window has been saved, from the perils of 140 years of time, weather and neglect, by an experienced tradesman. Someone who turns up to quote and returns to actually do the job. Thanks so much Connor. Would recommend.",
    highlight: "Someone who turns up to quote and returns to actually do the job.",
    name: "Alice Walsh",
    job: "Bay window restoration",
    source: "Facebook",
  },
  // Draft list, waiting on Connor to confirm.
  areas: ["Lichfield", "Burntwood", "Tamworth", "Sutton Coldfield", "Shenstone", "Whittington", "Fradley"],
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
    intro: "The woodwork that makes a house feel finished, hung, fitted and trimmed so it sits right and stays right.",
    examples: ["Internal doors hung and adjusted", "Skirting, architrave and trims", "Staircases and spindles", "Kitchen fitting", "Fitted wardrobes", "Oak-framed garden canopies and outdoor structures"],
  },
  {
    slug: "building",
    pen: "steel",
    name: "Building",
    color: "var(--steel)",
    tint: "var(--t-steel)",
    blurb: "Extensions, structural alterations and renovations.",
    intro: "Bigger changes to the shape of your home, planned clearly and run by one person from start to finish.",
    examples: ["Extensions", "Knocking through and structural alterations", "Full renovations", "Bathroom refits", "Landscaping and outdoor projects"],
  },
  {
    slug: "joinery",
    pen: "sage",
    name: "Joinery",
    color: "var(--sage)",
    tint: "var(--t-sage)",
    blurb: "Made-to-fit media walls, alcove units, shelving and storage.",
    intro: "Built-in pieces made to fit your rooms exactly, rather than flat-pack that nearly fits.",
    examples: ["Media walls", "Alcove units", "Shelving", "Under-stairs storage"],
  },
  {
    slug: "decorating",
    pen: "brick",
    name: "Decorating",
    color: "var(--brick)",
    tint: "var(--t-brick)",
    blurb: "Painting and finishing, right through to the last coat.",
    intro: "The finish that people actually see, with the prep done properly underneath it.",
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
  { href: "/about", label: "About" },
  { href: "/faqs", label: "FAQs" },
] as const;
