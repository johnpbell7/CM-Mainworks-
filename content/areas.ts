import type { SectionSlug } from "./site";

/*
  Town pages for local search. Each has its own copy so they aren't duplicates.
  Town descriptions are general, publicly known geography. Nothing here states
  prices, travel charges, past jobs or reviews in a town. DRAFT: the list of
  areas is waiting on Connor to confirm.
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
  nearby: string[];
};

export const areas: Area[] = [
  {
    slug: "lichfield",
    name: "Lichfield",
    where: "Connor’s home patch",
    title: "Carpenter and builder in Lichfield",
    description:
      "Carpentry, building, joinery and decorating in Lichfield from CM MainWorks. Doors, stairs, kitchens, extensions and fitted furniture. Free, written quotes.",
    intro:
      "CM MainWorks is based in Lichfield, so most jobs here are only a short drive away. From the Georgian and Victorian streets around the cathedral to the newer estates on the edge of the city, Connor works on all kinds of homes.",
    local:
      "Older Lichfield houses often have uneven walls, original doors and timber windows that need a careful hand, while newer homes are more likely to want fitted wardrobes, media walls and kitchen updates. Both are welcome.",
    focus: [
      { service: "carpentry", text: "Doors, skirting and staircases, including in older homes where nothing is quite square." },
      { service: "joinery", text: "Alcove units and media walls built around chimney breasts and awkward corners." },
      { service: "decorating", text: "Timber windows and bay windows repaired and repainted." },
      { service: "building", text: "Extensions, knock-throughs and renovations, run by one person." },
    ],
    nearby: ["whittington", "shenstone", "fradley", "burntwood"],
  },
  {
    slug: "burntwood",
    name: "Burntwood",
    where: "about four miles west of Lichfield",
    title: "Carpenter and builder in Burntwood",
    description:
      "Carpentry, building, joinery and decorating in Burntwood, Chase Terrace and Chasetown from Lichfield-based CM MainWorks. Free, written quotes.",
    intro:
      "Burntwood is about four miles west of Lichfield, so it’s well within Connor’s area. That includes Chase Terrace, Chasetown and the streets towards Chasewater and Cannock Chase.",
    local:
      "Many Burntwood homes were built in the 1960s, 70s and 80s, and a lot of them are now due new internal doors, a kitchen refit or a single-storey extension to make more room.",
    focus: [
      { service: "carpentry", text: "Replacing dated internal doors, skirting and architrave throughout the house." },
      { service: "building", text: "Kitchen and rear extensions, and opening up downstairs rooms." },
      { service: "joinery", text: "Media walls and alcove units for living rooms." },
      { service: "decorating", text: "Finishing rooms after building work so the job is fully done." },
    ],
    nearby: ["lichfield", "shenstone", "fradley", "whittington"],
  },
  {
    slug: "tamworth",
    name: "Tamworth",
    where: "about seven miles south-east of Lichfield",
    title: "Carpenter and builder in Tamworth",
    description:
      "Carpentry, building, joinery and decorating in Tamworth from Lichfield-based CM MainWorks. Doors, kitchens, extensions and fitted furniture. Free quotes.",
    intro:
      "Tamworth is about seven miles south-east of Lichfield, a short run down the A51. Connor covers the town and the areas around it, including Wilnecote, Amington, Glascote and Fazeley.",
    local:
      "Tamworth has a real mix of homes, from older terraces near the castle and town centre to the large estates built from the 1960s onwards. Kitchen refits, extensions and fitted storage are some of the most common jobs.",
    focus: [
      { service: "building", text: "Extensions and renovations to give growing families more room." },
      { service: "carpentry", text: "Kitchen fitting, new doors and staircase updates." },
      { service: "joinery", text: "Under-stairs storage and fitted wardrobes that make the most of space." },
      { service: "decorating", text: "Painting and finishing, inside and out." },
    ],
    nearby: ["whittington", "fradley", "shenstone", "lichfield"],
  },
  {
    slug: "sutton-coldfield",
    name: "Sutton Coldfield",
    where: "about eight miles south of Lichfield",
    title: "Carpenter and builder in Sutton Coldfield",
    description:
      "Carpentry, building, joinery and decorating in Sutton Coldfield, Four Oaks and Mere Green from CM MainWorks. Free, written quotes.",
    intro:
      "Sutton Coldfield is about eight miles south of Lichfield, down the A5127. Connor covers the town, including Four Oaks, Mere Green and Little Aston.",
    local:
      "Sutton Coldfield has plenty of Victorian, Edwardian and 1930s houses, where period doors, staircases, bay windows and alcoves are worth looking after properly rather than ripping out.",
    focus: [
      { service: "joinery", text: "Alcove units and bookcases built to suit period rooms." },
      { service: "carpentry", text: "Staircase repairs, spindles and handrails, and period-style doors." },
      { service: "decorating", text: "Bay windows and sash windows repaired, filled and repainted." },
      { service: "building", text: "Kitchen extensions and knock-throughs." },
    ],
    nearby: ["shenstone", "lichfield", "burntwood", "tamworth"],
  },
  {
    slug: "shenstone",
    name: "Shenstone",
    where: "about three miles south of Lichfield",
    title: "Carpenter and builder in Shenstone",
    description:
      "Carpentry, building, joinery and decorating in Shenstone and Stonnall from Lichfield-based CM MainWorks. Free, written quotes.",
    intro:
      "Shenstone is about three miles south of Lichfield, so it’s right on Connor’s doorstep. He also covers the villages around it, including Stonnall and Little Hay.",
    local:
      "Village homes in and around Shenstone range from old cottages to modern detached houses. Older properties often need joinery and windows repaired with care, while newer ones are more likely to want garden structures and fitted furniture.",
    focus: [
      { service: "carpentry", text: "Oak-framed garden canopies, doors and staircases." },
      { service: "decorating", text: "Timber windows and woodwork repaired and repainted." },
      { service: "joinery", text: "Fitted wardrobes and alcove units." },
      { service: "building", text: "Extensions and renovations." },
    ],
    nearby: ["lichfield", "sutton-coldfield", "burntwood", "whittington"],
  },
  {
    slug: "whittington",
    name: "Whittington",
    where: "about three miles east of Lichfield",
    title: "Carpenter and builder in Whittington",
    description:
      "Carpentry, building, joinery and decorating in Whittington, Hopwas and Huddlesford from Lichfield-based CM MainWorks. Free, written quotes.",
    intro:
      "Whittington is about three miles east of Lichfield, between the city and Tamworth. Connor covers the village and nearby Hopwas and Huddlesford.",
    local:
      "Whittington mixes older village houses and cottages with newer homes. Doors, staircases and windows in older properties need a careful hand, and garden structures are popular with the bigger plots.",
    focus: [
      { service: "carpentry", text: "Doors, staircases and outdoor timber like canopies and pergolas." },
      { service: "joinery", text: "Built-in storage and media walls." },
      { service: "building", text: "Extensions and alterations." },
      { service: "decorating", text: "Interior and exterior painting." },
    ],
    nearby: ["lichfield", "fradley", "tamworth", "shenstone"],
  },
  {
    slug: "fradley",
    name: "Fradley",
    where: "about four miles north-east of Lichfield",
    title: "Carpenter and builder in Fradley",
    description:
      "Carpentry, building, joinery and decorating in Fradley and Alrewas from Lichfield-based CM MainWorks. Fitted wardrobes, media walls and more. Free quotes.",
    intro:
      "Fradley is about four miles north-east of Lichfield, near the canal junction. Connor covers the village and its newer estates, as well as nearby Alrewas and Streethay.",
    local:
      "A lot of homes in and around Fradley are newer builds, which are often well built but plain. Fitted wardrobes, media walls, garden structures and upgraded doors are popular ways to make them feel like your own.",
    focus: [
      { service: "joinery", text: "Media walls, fitted wardrobes and under-stairs storage." },
      { service: "carpentry", text: "Upgraded internal doors and garden canopies." },
      { service: "building", text: "Extensions and renovations to add more space." },
      { service: "decorating", text: "Feature walls and full redecoration." },
    ],
    nearby: ["lichfield", "whittington", "burntwood", "tamworth"],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
