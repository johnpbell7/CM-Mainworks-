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
    summary: "Every room you want doing, planned and managed by one team from start to finish.",
    includes: [
      "A home visit and a plan for the whole job",
      "Strip-out, rubbish removal and making good",
      "Kitchen, bathroom, floors, stairs and doors",
      "Electrics, plumbing and plastering organised for you",
      "Decorating, right through to the last coat",
      "One person to deal with, start to finish",
    ],
    job: "Full renovation",
    href: "/renovations",
  },
  {
    name: "Kitchen renovation",
    look: "kitchens",
    from: null,
    summary: "Old kitchen out, new one in, and the room finished properly around it.",
    includes: [
      "Old kitchen stripped out and taken away",
      "Walls opened up if you want more space",
      "Units, worktops and appliances fitted",
      "Splashback tiling and new flooring",
      "Electrics and plumbing organised for you",
      "Decorated and ready to cook in",
    ],
    job: "Kitchen",
    href: "/services/kitchens",
  },
  {
    name: "Bathroom renovation",
    look: "bathrooms",
    from: null,
    summary: "A complete bathroom, from strip-out to the final seal, with every trade organised.",
    includes: [
      "Old suite and tiles stripped out",
      "New bath or shower, basin and toilet fitted",
      "Walls and floor tiled",
      "Boxing-in, trims and a tidy finish",
      "Plumbing and electrics organised for you",
      "Decorated and ready to use",
    ],
    job: "Bathroom",
    href: "/services/bathrooms",
  },
  {
    name: "Single-storey extension",
    look: "extensions",
    from: null,
    summary: "More room at the back of the house, built and finished inside, not handed over as a shell.",
    includes: [
      "Help getting plans and approvals in place",
      "Groundwork, walls and roof",
      "Windows, doors and the knock-through",
      "Electrics, plumbing and plastering organised",
      "Floors, doors and skirting fitted",
      "Decorated and ready to live in",
    ],
    job: "Extension",
    href: "/services/extensions",
  },
];

/** Room-by-room and smaller jobs. */
export const roomPrices: { name: string; note: string; from: string | null; unit?: string; look: SectionSlug; href: string }[] = [
  { name: "Staircase makeover", note: "New spindles, handrail and newels", from: null, look: "staircases", href: "/services/staircases" },
  { name: "Internal doors", note: "Hung, with handles and latches", from: null, unit: "per door", look: "staircases", href: "/services/staircases" },
  { name: "Skirting and architrave", note: "Old out, new in, ready for paint", from: null, unit: "per room", look: "staircases", href: "/services/staircases" },
  { name: "Flooring", note: "Wood, laminate or LVT, including preparation", from: null, unit: "per room", look: "flooring-and-tiling", href: "/services/flooring-and-tiling" },
  { name: "Floor and wall tiling", note: "Kitchens, bathrooms and hallways", from: null, unit: "per room", look: "flooring-and-tiling", href: "/services/flooring-and-tiling" },
  { name: "Roof repairs", note: "Slipped tiles, leaks and flashings", from: null, look: "roofing", href: "/services/roofing" },
  { name: "Media wall or alcove units", note: "Made to fit, painted on site", from: null, look: "joinery", href: "/services/joinery" },
  { name: "Decorating", note: "Walls, ceilings and woodwork", from: null, unit: "per room", look: "decorating", href: "/services/decorating" },
];
