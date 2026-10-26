import type { SectionSlug } from "./site";

/*
  Town pages for local search, written in Connor’s voice. Each has its own copy so
  they aren’t duplicates. Town descriptions are general, publicly known geography.
  Nothing here states prices, travel charges, past jobs or reviews in a town.
  DRAFT: the list of areas is waiting on Connor to confirm.
*/

export type Area = {
  slug: string;
  name: string;
  /** e.g. "about four miles west of Lichfield" */
  where: string;
  title: string;
  description: string;
  intro: string;
  local: string;
  /** Which services to lead with, and why, for this town */
  focus: { service: SectionSlug; text: string }[];
  faqs: { q: string; a: string }[];
  nearby: string[];
};

export const areas: Area[] = [
  {
    slug: "lichfield",
    name: "Lichfield",
    where: "Home ground",
    title: "Carpenter and builder in Lichfield",
    description:
      "I’m Connor, a Lichfield carpenter, joiner, builder and decorator. Based in the city, working right across it. Send me a few photos for a free written quote.",
    intro:
      "CM MainWorks is based in Lichfield, so this is home ground. I work right across the city, from the older streets around the cathedral and Beacon Park to Boley Park, Darwin Park, Netherstowe and everywhere in between.",
    local:
      "Lichfield keeps me varied. The older houses in the middle of the city tend to need careful repairs: doors that have dropped, timber and bay windows, skirting that was never straight to begin with. Newer homes on the edges are more often after a media wall, fitted wardrobes or a kitchen update.",
    focus: [
      { service: "carpentry", text: "Doors, skirting and staircases, including in older houses where nothing is quite square." },
      { service: "joinery", text: "Alcove units and media walls built around chimney breasts and awkward corners." },
      { service: "decorating", text: "Timber and bay windows repaired and repainted, inside and out." },
      { service: "building", text: "Extensions, knock-throughs and renovations, run by me from start to finish." },
    ],
    faqs: [
      { q: "Are you actually based in Lichfield?", a: "Yes. CM MainWorks is a Lichfield business, so most jobs in the city are a short drive away." },
      { q: "Do you work on older houses in the city centre?", a: "Yes. Old doors, windows and staircases are often worth repairing rather than replacing, and I’ll tell you honestly which makes more sense." },
    ],
    nearby: ["whittington", "shenstone", "fradley", "burntwood"],
  },
  {
    slug: "burntwood",
    name: "Burntwood",
    where: "About four miles west of Lichfield",
    title: "Carpenter and builder in Burntwood",
    description:
      "Carpentry, building, joinery and decorating in Burntwood, Chase Terrace and Chasetown. I’m Connor, based just down the road in Lichfield. Free written quotes.",
    intro:
      "Burntwood is about four miles west of Lichfield, a straight run along the A5190, so it’s well within my patch. I cover the whole town, including Chase Terrace, Chasetown, Boney Hay and the roads out towards Chasewater.",
    local:
      "A lot of Burntwood went up between the 1960s and the 80s. Those houses are solid but often tired inside, so the jobs tend to be similar: swapping dated doors and skirting all the way through, refitting a kitchen, or adding a single-storey extension at the back for a proper kitchen-diner.",
    focus: [
      { service: "carpentry", text: "New internal doors, skirting and architrave right through the house." },
      { service: "building", text: "Rear and kitchen extensions, and opening up the downstairs." },
      { service: "joinery", text: "Media walls and alcove units for the living room." },
      { service: "decorating", text: "Finishing rooms after the building work, so the whole job’s done." },
    ],
    faqs: [
      { q: "Do you cover Chase Terrace and Chasetown?", a: "Yes, along with the rest of Burntwood and Boney Hay." },
      { q: "Is Burntwood too far for a small job?", a: "No. It’s a few miles from Lichfield, so small jobs are fine." },
    ],
    nearby: ["lichfield", "shenstone", "fradley", "whittington"],
  },
  {
    slug: "tamworth",
    name: "Tamworth",
    where: "About seven miles south-east of Lichfield",
    title: "Carpenter and builder in Tamworth",
    description:
      "Carpentry, building, joinery and decorating in Tamworth, Wilnecote, Amington and Fazeley. I’m Connor, based in nearby Lichfield. Free written quotes.",
    intro:
      "Tamworth is about seven miles south-east of Lichfield along the A51, and I cover the whole town. That takes in Wilnecote, Amington, Glascote, Belgrave, Fazeley and the estates in between.",
    local:
      "There’s a bit of everything in Tamworth. Older terraces near the castle and town centre, and big estates built from the 60s onwards as the town grew. Extensions, kitchen refits and storage that makes better use of smaller rooms come up a lot.",
    focus: [
      { service: "building", text: "Extensions and renovations for families who’ve run out of room." },
      { service: "carpentry", text: "Kitchen fitting, new doors and staircase updates." },
      { service: "joinery", text: "Under-stairs storage and fitted wardrobes that use every bit of space." },
      { service: "decorating", text: "Painting and finishing, inside and out." },
    ],
    faqs: [
      { q: "Do you cover all of Tamworth?", a: "Yes, including Wilnecote, Amington, Glascote, Belgrave and Fazeley." },
      { q: "Can you price a Tamworth job from photos?", a: "Smaller jobs, usually. For extensions and building work I’ll come and see it first." },
    ],
    nearby: ["whittington", "fradley", "shenstone", "lichfield"],
  },
  {
    slug: "sutton-coldfield",
    name: "Sutton Coldfield",
    where: "About eight miles south of Lichfield",
    title: "Carpenter and builder in Sutton Coldfield",
    description:
      "Carpentry, building, joinery and decorating in Sutton Coldfield, Four Oaks, Mere Green and Little Aston. I’m Connor, based in Lichfield. Free written quotes.",
    intro:
      "Sutton Coldfield is about eight miles south of Lichfield, straight down the A5127. I cover the town, including Four Oaks, Mere Green and Little Aston.",
    local:
      "Sutton has plenty of Victorian, Edwardian and 1930s houses, and the original features are often the best thing about them. Panelled doors, turned spindles, bay windows and deep alcoves are worth repairing and building around, not ripping out. That’s where careful carpentry and joinery pays off.",
    focus: [
      { service: "joinery", text: "Alcove units and bookcases that suit a period room." },
      { service: "carpentry", text: "Staircase repairs, spindles and handrails, and panelled doors." },
      { service: "decorating", text: "Bay and sash windows repaired, filled and repainted." },
      { service: "building", text: "Kitchen extensions and knock-throughs." },
    ],
    faqs: [
      { q: "Do you cover Four Oaks and Mere Green?", a: "Yes, along with Little Aston and the rest of Sutton Coldfield." },
      { q: "Can you repair period features rather than replace them?", a: "Where it’s possible, yes. I’ll tell you honestly if something is past saving." },
    ],
    nearby: ["shenstone", "lichfield", "burntwood", "tamworth"],
  },
  {
    slug: "shenstone",
    name: "Shenstone",
    where: "About three miles south of Lichfield",
    title: "Carpenter and builder in Shenstone",
    description:
      "Carpentry, building, joinery and decorating in Shenstone, Stonnall and Little Hay. I’m Connor, just up the road in Lichfield. Free written quotes.",
    intro:
      "Shenstone is about three miles south of Lichfield, so it’s practically on my doorstep. I also cover the villages around it, including Stonnall, Lower Stonnall and Little Hay.",
    local:
      "The older cottages and village houses in Shenstone need a lighter touch. Doors, windows and woodwork are often worth saving. The newer houses around the village are more likely to want a garden canopy, fitted wardrobes or a media wall.",
    focus: [
      { service: "carpentry", text: "Oak-framed garden canopies, doors and staircases." },
      { service: "decorating", text: "Timber windows and woodwork repaired and repainted." },
      { service: "joinery", text: "Fitted wardrobes and alcove units." },
      { service: "building", text: "Extensions and renovations." },
    ],
    faqs: [
      { q: "Do you cover Stonnall and Little Hay?", a: "Yes. They’re all within a few miles of Lichfield." },
      { q: "Do you build garden canopies?", a: "Yes, including oak-framed canopies like the one on my homepage." },
    ],
    nearby: ["lichfield", "sutton-coldfield", "burntwood", "whittington"],
  },
  {
    slug: "whittington",
    name: "Whittington",
    where: "About three miles east of Lichfield",
    title: "Carpenter and builder in Whittington",
    description:
      "Carpentry, building, joinery and decorating in Whittington, Hopwas, Huddlesford and Fisherwick. I’m Connor, based in Lichfield. Free written quotes.",
    intro:
      "Whittington is about three miles east of Lichfield, on the way to Tamworth. I cover the village along with Hopwas, Huddlesford and Fisherwick.",
    local:
      "Whittington has older houses and cottages around the middle of the village and newer homes on the edges. The older ones tend to need their doors, stairs and windows looked after properly. With decent-sized gardens, outdoor timber like canopies and pergolas comes up too.",
    focus: [
      { service: "carpentry", text: "Doors, staircases, and outdoor timber like canopies and pergolas." },
      { service: "joinery", text: "Built-in storage and media walls." },
      { service: "building", text: "Extensions and alterations." },
      { service: "decorating", text: "Inside and outside painting." },
    ],
    faqs: [
      { q: "Do you cover Hopwas and Huddlesford?", a: "Yes, and Fisherwick too. They’re all a short drive from Lichfield." },
      { q: "Can you do the inside and outside on the same job?", a: "Yes. I cover carpentry, building, joinery and decorating, so one person can do both." },
    ],
    nearby: ["lichfield", "fradley", "tamworth", "shenstone"],
  },
  {
    slug: "fradley",
    name: "Fradley",
    where: "About four miles north-east of Lichfield",
    title: "Carpenter and builder in Fradley",
    description:
      "Carpentry, building, joinery and decorating in Fradley, Alrewas and Streethay. Fitted wardrobes, media walls and door upgrades. I’m Connor, based in Lichfield.",
    intro:
      "Fradley is about four miles north-east of Lichfield, near the canal junction. I cover the village, the newer estates around it, and nearby Alrewas and Streethay.",
    local:
      "A lot of homes around Fradley are new builds. They’re solid, but they come plain: flat doors, bare walls and empty corners. That’s where fitted wardrobes, a media wall, better internal doors or a garden canopy make the biggest difference.",
    focus: [
      { service: "joinery", text: "Media walls, fitted wardrobes and under-stairs storage." },
      { service: "carpentry", text: "Upgraded internal doors and garden canopies." },
      { service: "building", text: "Extensions and renovations to add more space." },
      { service: "decorating", text: "Feature walls and full redecoration." },
    ],
    faqs: [
      { q: "Do you work on new-build houses?", a: "Yes. Better doors, fitted storage or a media wall are good ways to make a new build feel like yours." },
      { q: "Do you cover Alrewas and Streethay?", a: "Yes, both are a short drive from Lichfield." },
    ],
    nearby: ["lichfield", "whittington", "burntwood", "tamworth"],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
