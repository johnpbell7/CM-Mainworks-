import type { JobType, SectionSlug } from "./site";

/*
  Prices page (John, 10 Nov 2026). Every price depends on seeing the job:
  - a full renovation is always quoted after a visit (no figure at all)
  - kitchens, bathrooms and single-storey extensions show small, medium and large,
    each with a rough "from" figure
  - smaller jobs are priced after a visit
  The "from" figures are PLACEHOLDERS: null until Connor supplies real numbers, and the
  page shows £TBC. Never fill these in without Connor's say-so (see CLAUDE.md: no
  invented prices). The size descriptions are a draft for Connor to confirm too.
  Write figures as plain strings, e.g. "£18,000" or "£450".
*/

export type Size = { name: "Small" | "Medium" | "Large"; note: string; from: string | null };

export type Package = {
  name: string;
  /** Colour family (a service slug), or "renovation" for brand gold */
  look: SectionSlug | "renovation";
  from: string | null;
  /** Rough sizes, each with its own "from" figure */
  sizes?: Size[];
  /** No figure at all: always quoted after a visit */
  quoteOnly?: boolean;
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
    quoteOnly: true,
    summary: "My main work: every room you want doing, managed by one team.",
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
    sizes: [
      { name: "Small", note: "Compact or galley", from: null },
      { name: "Medium", note: "Typical family kitchen", from: null },
      { name: "Large", note: "Large or open-plan", from: null },
    ],
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
    sizes: [
      { name: "Small", note: "Cloakroom or en suite", from: null },
      { name: "Medium", note: "Family bathroom", from: null },
      { name: "Large", note: "Large main bathroom", from: null },
    ],
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
    sizes: [
      { name: "Small", note: "One room, like a utility", from: null },
      { name: "Medium", note: "Kitchen-diner or family room", from: null },
      { name: "Large", note: "Wide or L-shaped", from: null },
    ],
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

/** Smaller jobs, kept broad. Each is priced after a visit (John: they all depend on seeing the job). */
export const roomPrices: { name: string; note: string; from: string | null; look: SectionSlug; href: string }[] = [
  { name: "Stairs, doors and skirting", note: "Staircase makeovers, internal doors, trims", from: null, look: "staircases", href: "/services/staircases" },
  { name: "Floors and tiling", note: "Wood, laminate, LVT and tiles", from: null, look: "flooring-and-tiling", href: "/services/flooring-and-tiling" },
  { name: "Roof repairs", note: "Tiles, leaks, fascias and guttering", from: null, look: "roofing", href: "/services/roofing" },
  { name: "Joinery and decorating", note: "Media walls, alcoves and painting", from: null, look: "joinery", href: "/services/joinery" },
];

/** Shown wherever a price appears, tied to the asterisk on every "from" figure. Honest: things can change. */
export const priceNote = "Every price depends on seeing the job, so these are a rough guide. You’ll get a written quote after a visit, before any work starts. If something hidden turns up once work starts, like rot or old wiring, I’ll show you and agree any change with you before I carry on.";
