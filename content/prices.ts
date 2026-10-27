import type { JobType, SectionSlug } from "./site";

/*
  Prices page. "From" figures are PLACEHOLDERS: every `from` is null until Connor
  supplies real numbers, and the page shows "Price to confirm" instead. Never fill
  these in without Connor's say-so (see CLAUDE.md: no invented prices).
  Write figures as plain strings, e.g. "£18,000" or "£450".
*/

export type Package = {
  name: string;
  /** Colour family (a service slug), or "renovation" for brand gold */
  look: SectionSlug | "renovation";
  from: string | null;
  /** e.g. "per room" */
  unit?: string;
  summary: string;
  includes: string[];
  job: JobType;
  href: string;
};

export const packages: Package[] = [
  {
    name: "Full home renovation",
    look: "renovation",
    from: null,
    summary: "Every room you want doing, managed by one team.",
    includes: [
      "Planned with you, in clear phases",
      "Invoiced phase by phase",
      "Kitchen, bathroom, floors, stairs and doors",
      "Trades organised, decorated to finish",
    ],
    job: "Full renovation",
    href: "/renovations",
  },
  {
    name: "Kitchen renovation",
    look: "kitchens",
    from: null,
    summary: "Old kitchen out, new one in, room finished.",
    includes: [
      "Strip-out and rubbish taken away",
      "New kitchen fitted level and square",
      "Splashback tiling and flooring",
      "Trades organised, decorated to finish",
    ],
    job: "Kitchen",
    href: "/services/kitchens",
  },
  {
    name: "Bathroom renovation",
    look: "bathrooms",
    from: null,
    summary: "A complete bathroom, strip-out to final seal.",
    includes: [
      "Old suite and tiles stripped out",
      "New bath or shower, basin and toilet",
      "Walls and floor tiled",
      "Trades organised, decorated to finish",
    ],
    job: "Bathroom",
    href: "/services/bathrooms",
  },
  {
    name: "Single-storey extension",
    look: "extensions",
    from: null,
    summary: "More room, built and finished inside.",
    includes: [
      "Help with plans and approvals",
      "Groundwork, walls and roof",
      "Finished inside, ready to use",
      "Invoiced phase by phase",
    ],
    job: "Extension",
    href: "/services/extensions",
  },
];

/** Smaller jobs, kept broad: one "from" price per kind of work, no per-door or per-room rates. */
export const roomPrices: { name: string; note: string; from: string | null; look: SectionSlug; href: string }[] = [
  { name: "Stairs, doors and skirting", note: "Staircase makeovers, internal doors, trims", from: null, look: "staircases", href: "/services/staircases" },
  { name: "Floors and tiling", note: "Wood, laminate, LVT and tiles", from: null, look: "flooring-and-tiling", href: "/services/flooring-and-tiling" },
  { name: "Roof repairs", note: "Tiles, leaks, fascias and guttering", from: null, look: "roofing", href: "/services/roofing" },
  { name: "Joinery and decorating", note: "Media walls, alcoves and painting", from: null, look: "joinery", href: "/services/joinery" },
];

/** Shown wherever a price appears, tied to the asterisk on every "from" figure. */
export const priceNote = "Prices are a guide and subject to seeing the job. You’ll always get a written quote before any work starts.";
