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

/** Room-by-room and smaller jobs. */
export const roomPrices: { name: string; note: string; from: string | null; unit?: string; look: SectionSlug; href: string }[] = [
  { name: "Staircase makeover", note: "New spindles, handrail and newels", from: null, look: "staircases", href: "/services/staircases" },
  { name: "Internal doors", note: "Hung, with handles and latches", from: null, unit: "per door", look: "staircases", href: "/services/staircases" },
  { name: "Skirting and architrave", note: "Ready for paint", from: null, unit: "per room", look: "staircases", href: "/services/staircases" },
  { name: "Flooring", note: "Wood, laminate or LVT", from: null, unit: "per room", look: "flooring-and-tiling", href: "/services/flooring-and-tiling" },
  { name: "Floor and wall tiling", note: "Kitchens, bathrooms and hallways", from: null, unit: "per room", look: "flooring-and-tiling", href: "/services/flooring-and-tiling" },
  { name: "Roof repairs", note: "Slipped tiles, leaks and flashings", from: null, look: "roofing", href: "/services/roofing" },
  { name: "Media wall or alcove units", note: "Made to fit, painted on site", from: null, look: "joinery", href: "/services/joinery" },
  { name: "Decorating", note: "Walls, ceilings and woodwork", from: null, unit: "per room", look: "decorating", href: "/services/decorating" },
];
