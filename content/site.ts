import type { IllustrationKind } from "@/components/Illustration";

// Business details and sections. Mirrors brand/tokens.ts; keep the two in step.
export const business = {
  name: "CM MainWorks",
  descriptor: "Carpentry & Construction",
  /** The main offer, used in titles and schema */
  pitch: "Full home renovations, managed by one team from start to finish",
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

export type SectionSlug =
  | "extensions" | "kitchens" | "bathrooms" | "staircases" | "roofing" | "flooring-and-tiling"
  | "carpentry" | "joinery" | "decorating";

/** What people pick in the quote form. Each service maps to one. */
export const jobTypes = [
  "Full renovation", "Extension", "Kitchen", "Bathroom", "Stairs", "Floors and tiling", "Roofing",
  "Doors, skirting and carpentry", "Joinery", "Decorating", "Something else",
] as const;
export type JobType = (typeof jobTypes)[number];

export type Section = {
  slug: SectionSlug;
  name: string;
  /** "renovation" = the main work; "smaller" = trades Connor also takes on as single jobs */
  group: "renovation" | "smaller";
  /** CSS variable for the section colour, e.g. var(--oak) */
  color: string;
  /** CSS variable for the highlighter tint */
  tint: string;
  /** Highlighter name used by .hl[data-pen] */
  pen: "oak" | "steel" | "sage" | "brick";
  illo: IllustrationKind;
  job: JobType;
  blurb: string;
  intro: string;
};

const oak = { color: "var(--oak)", tint: "var(--t-oak)", pen: "oak" } as const;
const steel = { color: "var(--steel)", tint: "var(--t-steel)", pen: "steel" } as const;
const sage = { color: "var(--sage)", tint: "var(--t-sage)", pen: "sage" } as const;
const brick = { color: "var(--brick)", tint: "var(--t-brick)", pen: "brick" } as const;

export const sections: Section[] = [
  {
    slug: "extensions", ...brick, group: "renovation", illo: "building", job: "Extension",
    name: "Extensions",
    blurb: "More room, built and finished inside.",
    intro: "More space without moving house. I plan it with you, build it and finish it inside, so you’re handed a room, not a shell.",
  },
  {
    slug: "kitchens", ...sage, group: "renovation", illo: "kitchen", job: "Kitchen",
    name: "Kitchens",
    blurb: "Old one out, new one in, room finished.",
    intro: "From stripping the old one out to the last bit of tiling, your kitchen is handled by one team, so it comes together without the usual chasing.",
  },
  {
    slug: "bathrooms", ...steel, group: "renovation", illo: "bathroom", job: "Bathroom",
    name: "Bathrooms",
    blurb: "Strip-out to tiling and the final seal.",
    intro: "A bathroom has a lot of trades squeezed into a small room. I organise all of them, so you get a finished bathroom, not five separate appointments.",
  },
  {
    slug: "staircases", ...oak, group: "renovation", illo: "stairs", job: "Stairs",
    name: "Stairs, doors and skirting",
    blurb: "The joinery that finishes a home.",
    intro: "The joinery that makes a house feel finished: a solid staircase, doors that close properly and skirting and architrave that sit tight.",
  },
  {
    slug: "roofing", ...steel, group: "renovation", illo: "roof", job: "Roofing",
    name: "Roofing",
    blurb: "Repairs, new roofs, fascias and guttering.",
    intro: "A sound roof over the work, whether that’s a repair after a storm or a new roof as part of an extension.",
  },
  {
    slug: "flooring-and-tiling", ...brick, group: "renovation", illo: "flooring", job: "Floors and tiling",
    name: "Floors and tiling",
    blurb: "Laid flat, tiled straight.",
    intro: "Floors laid flat and tiles set straight, with the preparation underneath done properly so they stay that way.",
  },
  {
    slug: "carpentry", ...oak, group: "smaller", illo: "carpentry", job: "Doors, skirting and carpentry",
    name: "Carpentry",
    blurb: "Doors, trims and the odd jobs.",
    intro: "One door that sticks is as welcome as a whole house of new ones. Small carpentry jobs, done the same way as the big ones.",
  },
  {
    slug: "joinery", ...sage, group: "smaller", illo: "joinery", job: "Joinery",
    name: "Joinery",
    blurb: "Media walls, alcoves and storage.",
    intro: "Media walls, alcove units and storage, built for your room rather than flat-pack that nearly fits.",
  },
  {
    slug: "decorating", ...brick, group: "smaller", illo: "decorating", job: "Decorating",
    name: "Decorating",
    blurb: "One room or the whole house.",
    intro: "The bit everyone sees, with the prep done properly underneath so it lasts.",
  },
];

export const renovationServices = sections.filter((s) => s.group === "renovation");
export const smallerServices = sections.filter((s) => s.group === "smaller");

/** The full-renovation offer has its own page and uses brand gold. */
export const renovation = {
  name: "Full renovations",
  href: "/renovations",
  color: "var(--gold)",
  tint: "var(--t-gold)",
  illo: "renovation" as IllustrationKind,
  job: "Full renovation" as JobType,
};

export function getSection(slug: string) {
  return sections.find((s) => s.slug === slug);
}

/** Colour for a job type (used by the quote form). */
export function jobColor(j: JobType | "") {
  if (j === renovation.job) return renovation.color;
  return sections.find((s) => s.job === j)?.color ?? "var(--gold)";
}

export const nav = [
  { href: "/renovations", label: "Renovations" },
  { href: "/services", label: "Services" },
  { href: "/prices", label: "Prices" },
  { href: "/projects", label: "Recent work" },
  { href: "/about", label: "About" },
] as const;
