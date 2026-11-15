import type { SectionSlug } from "./site";

/*
  Prices page (John, 15 Nov 2026): no figures at all. Connor can't price a job before
  he's seen it, so the page is about how a job gets priced: the process, what shapes a
  price, and the work he quotes for. Every job is quoted after a free visit.
  (Until 15 Nov the page had "from" figures for small, medium and large kitchens,
  bathrooms and extensions; they were never filled in. See git history if he ever
  wants them back.)
*/

export type Step = { title: string; text: string; art: 0 | 1 | 2 | 3 | 4 | 5 };

/** From first message to final walk-round. Art: 0 photos, 1 quote, 2 finished house, 3 visit, 4 sit-down, 5 phases. */
export const priceSteps: Step[] = [
  { art: 0, title: "Tell me about the job", text: "A few photos and a line about what you’re after, on WhatsApp or by email." },
  { art: 3, title: "I come and see it", text: "I measure up, look at what’s there and talk it through with you. The visit is free." },
  { art: 1, title: "Your written quote", text: "Broken down so you can see what each part costs. Free, with no obligation." },
  { art: 4, title: "We plan it together", text: "We agree the phases, the start date, the timescales and the targets." },
  { art: 5, title: "Built and paid in phases", text: "An invoice as each phase is done, never the whole job at once, and regular sit-downs to check we’re on target." },
  { art: 2, title: "A final walk-round", text: "We go round together, and I put right anything you’re not happy with." },
];

/** What a price depends on. Kept general: nothing here is a figure or a promise. */
export const priceFactors: { title: string; text: string }[] = [
  { title: "How much is changing", text: "One room or the whole house, and whether walls come out or go up." },
  { title: "The house itself", text: "Its age, the walls and floors, and what’s behind them." },
  { title: "The finishes you choose", text: "Kitchens, tiles, floors and doors come at every price." },
  { title: "Other trades it needs", text: "Electrics, plumbing and plastering, organised as part of the job." },
  { title: "Getting in and clearing up", text: "Parking, skips and how materials get in and rubbish gets out." },
];

/** The work Connor quotes for, main work first. Each row is tapped as a whole, through to its page. */
export const quoteJobs: { name: string; note: string; look: SectionSlug | "renovation"; href: string }[] = [
  { name: "Full home renovations", note: "My main work: every room you want doing, one team", look: "renovation", href: "/renovations" },
  { name: "Kitchens", note: "Old kitchen out, new one in, room finished", look: "kitchens", href: "/services/kitchens" },
  { name: "Bathrooms", note: "Strip-out to final seal", look: "bathrooms", href: "/services/bathrooms" },
  { name: "Extensions", note: "More room, built and finished inside", look: "extensions", href: "/services/extensions" },
  { name: "Stairs, doors and skirting", note: "Staircase makeovers, internal doors, trims", look: "staircases", href: "/services/staircases" },
  { name: "Floors and tiling", note: "Wood, laminate, LVT and tiles", look: "flooring-and-tiling", href: "/services/flooring-and-tiling" },
  { name: "Roof repairs", note: "Tiles, leaks, fascias and guttering", look: "roofing", href: "/services/roofing" },
  { name: "Joinery and decorating", note: "Media walls, alcoves and painting", look: "joinery", href: "/services/joinery" },
];

/** The honest line about change: old houses can hide things. */
export const priceNote = "Old houses can hide things, like rot or old wiring. If something turns up once work starts, I’ll show you and we agree any change before I carry on.";
