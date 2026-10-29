import { photo, type Media } from "./media";
import type { SectionSlug } from "./site";

/*
  Connor's jobs, from his Facebook posts (1 Apr to 1 Oct 2026). One entry per job feeds
  the projects page, its service page ("Recent … work"), its town page ("Recent work in …",
  matched by `place`) and, with `homepage`, the homepage before and afters. A job with at
  least four photos also gets its own page (/projects/<slug>) and a sitemap entry; smaller
  ones are shown in full on the projects page instead (see `hasPage`).

  Only real jobs, written from Connor's own captions and what the photos show. Nothing
  added: no towns he didn't name, no customer names, no reviews (those wait for Connor's
  OK). DRAFT for Connor's read-through.
  Photos are made by scripts/make-photos.py (see content/media.ts for how photos and
  drawings sit together). Every photo was checked for faces, names, house numbers and
  number plates before it went in.
*/
export type Project = {
  slug: string;
  name: string;
  section: SectionSlug;
  /** Town, only where Connor named it */
  place: string;
  /** When he posted it, YYYY-MM-DD */
  date: string;
  summary: string;
  /** Longer write-up for the project page */
  body?: string[];
  done?: string[];
  review?: { quote: string; name: string };
  before: Media;
  after: Media;
  /** true when the before and after were taken from the same spot, so they work as a slider; otherwise they sit side by side */
  aligned?: boolean;
  /** Every other photo of the job, finished ones first */
  gallery: Media[];
  placeholder: boolean;
  /** Its place in the homepage before and afters (1 to 3); both photos needed */
  homepage?: number;
};

const none = (label: string): Media => ({ src: null, alt: label, label });

export const projects: Project[] = [
  {
    slug: "garage-conversion-cannock",
    name: "Garage conversion",
    section: "decorating",
    place: "Cannock",
    date: "2026-10-01",
    summary: "A garage conversion in Cannock, taken from bare plaster to a beautiful finish, with a deep red feature wall under the sloped ceiling.",
    body: [
      "A beautiful finish on this garage conversion in Cannock. When I started, the rooms were bare plaster, and I took them right through to the final coat.",
      "Dulux Brilliant White on the ceilings, a Farrow & Ball red for the feature walls, and Dulux Egyptian Cotton on the rest. Look at the difference.",
    ],
    done: ["Ceilings in Dulux Brilliant White", "Walls in Dulux Egyptian Cotton", "Feature walls in a Farrow & Ball red"],
    before: photo("garage-conversion-cannock/before-room", "Garage conversion before decorating: bare plaster walls, a loft ladder and dust sheets"),
    after: photo("garage-conversion-cannock/after-room", "The same room finished: soft cream walls, white ceiling and skirting, and a herringbone floor"),
    gallery: [
      photo("garage-conversion-cannock/after-loft-room", "Room under the sloped ceiling with a deep red feature wall and a roof window"),
      photo("garage-conversion-cannock/after-skylight", "Sloped ceiling with a roof window over the red feature wall"),
      photo("garage-conversion-cannock/after-hatch", "Finished room with a loft ladder up to the ceiling hatch"),
      photo("garage-conversion-cannock/after-corridor", "Corridor in the conversion with the walls and ceiling painted"),
      photo("garage-conversion-cannock/before-skylight", "The sloped ceiling before decorating, in bare plaster"),
      photo("garage-conversion-cannock/before-corridor", "The corridor before decorating, in bare plaster"),
    ],
    placeholder: false,
    homepage: 2,
  },
  {
    slug: "conservatory",
    name: "Conservatory transformation",
    section: "decorating",
    place: "",
    date: "2026-09-23",
    summary: "Out with the old and in with the new: a conservatory with a new carpet, a deep green feature wall and crisp white woodwork.",
    body: [
      "Out with the old and in with the new. This conservatory had a cream and brown tiled floor, and now it has a soft new carpet.",
      "One wall went a deep green, and the sills and woodwork were painted white. A beautiful transformation.",
    ],
    done: ["Old tiled floor replaced with new carpet", "Feature wall in deep green", "Sills and woodwork painted white"],
    before: photo("conservatory/before-floor", "Conservatory before: the old cream and brown tiled floor"),
    after: photo("conservatory/after-wide", "Conservatory after: new grey carpet, a deep green feature wall and white woodwork"),
    gallery: [
      photo("conservatory/after-carpet", "New grey carpet right across the conservatory"),
      photo("conservatory/after-windows", "Conservatory windows above freshly painted white sills"),
      photo("conservatory/after-corner", "Corner of the conservatory with the green wall and new carpet"),
      photo("conservatory/before-ledge", "The window ledge before, above the old tiled floor"),
    ],
    placeholder: false,
  },
  {
    slug: "three-bed-house-repaint",
    name: "Three-bed house, painted throughout",
    section: "decorating",
    place: "",
    date: "2026-09-08",
    summary: "A large three-bed house, painted right through and absolutely mint, ready for the next tenant moving in.",
    body: [
      "A large three-bed house, painted right through and ready for the next tenant moving in.",
      "Grey and white walls, white ceilings and woodwork, with the cast-iron fireplaces kept as a feature, and the window frames and sills painted too. Absolutely mint.",
      "While I was there I also put in a drop ceiling in the kitchen.",
    ],
    done: ["Every room painted", "Grey feature walls", "Window frames and sills painted", "Stairs and landing painted"],
    before: photo("three-bed-house-repaint/before-room", "Room before painting, with ladders and dust sheets down"),
    after: photo("three-bed-house-repaint/after-living-room", "Living room finished in grey and white around a black cast-iron fireplace"),
    gallery: [
      photo("three-bed-house-repaint/after-bedroom", "Bedroom painted grey and white with a black fireplace"),
      photo("three-bed-house-repaint/after-fireplace", "Freshly painted room with a black cast-iron fireplace"),
      photo("three-bed-house-repaint/after-room", "Room painted grey and white over a new grey floor"),
      photo("three-bed-house-repaint/after-stairs", "Stairs and landing painted white"),
      photo("three-bed-house-repaint/after-front-room", "Front room painted, with a dark wood-effect floor"),
      photo("three-bed-house-repaint/during-room", "A room mid-job, with the floor covered"),
    ],
    placeholder: false,
  },
  {
    slug: "kitchen-drop-ceiling",
    name: "Drop ceiling in a kitchen",
    section: "carpentry",
    place: "",
    date: "2026-09-08",
    summary: "A new drop ceiling to modernise a kitchen: a timber frame laser-levelled all round, boarded, taped, filled and painted.",
    body: [
      "Also on the three-bed house painting job, I put a nice drop ceiling into the kitchen, just to modernise the space that little bit.",
      "I built a timber frame, laser-levelled all round, then added the boards, taped and filled them, and painted. It looks a hundred times better.",
    ],
    done: ["Timber frame built and laser-levelled", "Boards fitted", "Taped and filled", "Painted"],
    before: photo("kitchen-drop-ceiling/before-ceiling", "Kitchen before, with an old textured ceiling and a bare light wire"),
    after: photo("kitchen-drop-ceiling/after-ceiling", "Kitchen after, with a smooth new painted ceiling"),
    gallery: [
      photo("kitchen-drop-ceiling/after-ceiling-2", "The new kitchen ceiling, smooth and painted"),
      photo("kitchen-drop-ceiling/during-boards", "New boards going up on the timber frame below the old ceiling"),
    ],
    placeholder: false,
  },
  {
    slug: "hall-stairs-landing",
    name: "Hall, stairs and landing",
    section: "decorating",
    place: "",
    date: "2026-08-04",
    summary: "Hall, stairs and landing painted: a nice change from the basic white to a light grey.",
    body: [
      "Hall, stairs and landing, painted.",
      "A nice change from the basic white to a light grey, with the handrail, newel and skirting in crisp white.",
    ],
    done: ["Hall, stairs and landing painted", "Walls taken from white to light grey"],
    before: photo("hall-stairs-landing/during-stairs", "Stairs mid-job, with the grey going on over the old white"),
    after: photo("hall-stairs-landing/after-stairs", "Stairs and hall finished in light grey with a white handrail"),
    gallery: [
      photo("hall-stairs-landing/after-landing", "Landing painted light grey, looking down the stairs"),
      photo("hall-stairs-landing/after-stairs-2", "The staircase from the top, with grey walls and a white handrail"),
      photo("hall-stairs-landing/after-landing-2", "Landing with grey walls, a white newel and a window"),
      photo("hall-stairs-landing/after-landing-3", "Landing painted grey with white skirting and doors"),
    ],
    placeholder: false,
  },
  {
    slug: "bay-window-restoration",
    name: "Bay window restoration",
    section: "carpentry",
    place: "",
    date: "2026-08-01",
    summary: "A 140-year-old bay window brought back to life: repaired rather than replaced, after years of weather and neglect.",
    body: [
      "This bay window had been on the house for around 140 years, and the weather had finally got the better of it. The cills and the bottom of the frames had started to rot, the paint had given up, and water was getting in.",
      "The easy answer would have been to rip it out. Instead I cut out the rotten timber, rebuilt the cills, and filled, sanded and painted the lot. It still looks like it belongs on the house, and it’s protected for years yet.",
    ],
    done: ["Rotten timber cut out and repaired", "Cills rebuilt in new timber", "Frames filled and sanded", "Painted"],
    review: {
      quote: "My bay window has been saved, from the perils of 140 years of time, weather and neglect, by an experienced tradesman. Someone who turns up to quote and returns to actually do the job. Thanks so much Connor. Would recommend.",
      name: "Alice Walsh",
    },
    before: photo("bay-window-restoration/before-cill", "Bay window before: the timber cill rotten and the paint peeling away"),
    after: photo("bay-window-restoration/after-bay", "The bay window finished in white, with new cills"),
    gallery: [
      photo("bay-window-restoration/after-full-bay", "The whole bay finished, with the blue glazing bars kept"),
      photo("bay-window-restoration/after-side", "Side of the bay, repainted white"),
      photo("bay-window-restoration/after-cill", "New cill painted white along the bottom of the bay"),
      photo("bay-window-restoration/during-new-cill", "New timber cill fitted, ready for paint"),
      photo("bay-window-restoration/during-taped", "Glazing taped up and the new cill in, before painting"),
      photo("bay-window-restoration/before-cill-2", "The rotten cill and frame before the repair"),
    ],
    placeholder: false,
    homepage: 3,
  },
  {
    slug: "garage-and-porch",
    name: "Garage and front porch",
    section: "extensions",
    place: "",
    date: "2026-07-27",
    summary: "A garage and front porch transformation. These photos are from during the job.",
    body: [
      "A garage and front porch transformation, finished in July.",
      "These photos are from during the job: the garage walls studded, boarded and skimmed, and the porch skimmed with a new boarded ceiling.",
    ],
    done: ["Garage walls studded and boarded", "Walls skimmed", "Porch ceiling boarded"],
    before: none("Before photo"),
    after: photo("garage-and-porch/porch-door", "Front porch mid-job: fresh plaster and a new boarded ceiling around a black front door"),
    gallery: [
      photo("garage-and-porch/porch-ceiling", "The new boarded porch ceiling"),
      photo("garage-and-porch/porch", "Porch walls freshly skimmed"),
      photo("garage-and-porch/garage-boarded", "Inside the garage, with the walls boarded"),
      photo("garage-and-porch/garage-skimmed", "Garage walls boarded and skimmed"),
      photo("garage-and-porch/garage-studs", "Timber studwork going up inside the garage"),
    ],
    placeholder: false,
  },
  {
    slug: "hmo-renovation",
    name: "HMO renovation",
    section: "kitchens",
    place: "",
    date: "2026-06-30",
    summary: "A shared house renovation coming together: kitchen fitted and the splashbacks tiled, and a new bathroom on the way.",
    body: [
      "An HMO renovation, a house shared by several tenants. Things are starting to come together.",
      "Kitchen fitted and splashbacks tiled, ready for grouting. In the bathroom, the new bath is in and the wall tiles are going up.",
    ],
    done: ["Kitchen units and worktops fitted", "Metro tile splashback", "New bath fitted", "Bathroom wall tiles"],
    before: photo("hmo-renovation/during-worktop", "Kitchen mid-fit: the worktop in, the walls still bare"),
    after: photo("hmo-renovation/after-kitchen", "Kitchen fitted: white units, a dark worktop and a white metro tile splashback"),
    gallery: [
      photo("hmo-renovation/after-kitchen-2", "Metro tile splashback over the new worktop and oven"),
      photo("hmo-renovation/during-units", "Kitchen base units going in"),
      photo("hmo-renovation/bathroom-tiled", "New bath fitted with large grey wall tiles"),
      photo("hmo-renovation/bathroom-tiling", "Grey tiles going on over moisture-resistant board around the bath"),
    ],
    placeholder: false,
  },
  {
    slug: "full-house-repaint-lichfield",
    name: "Full house repaint",
    section: "decorating",
    place: "Lichfield",
    date: "2026-04-13",
    summary: "A full house repaint in Lichfield, with the walls made good first and a pale two-tone scheme throughout.",
    body: [
      "A beautiful finish to a full house repaint in Lichfield.",
      "The walls were filled and made good first, then painted in a pale two-tone scheme through the living room, hall and bedrooms.",
    ],
    done: ["Walls filled and made good", "Two-tone scheme through the living room and hall", "Bedrooms painted"],
    before: photo("full-house-repaint-lichfield/before-bedroom", "Bedroom before, with filler patches on the walls"),
    after: photo("full-house-repaint-lichfield/after-bedroom", "The same bedroom finished in a pale two-tone scheme"),
    gallery: [
      photo("full-house-repaint-lichfield/after-hall", "Hall to the front door, with white woodwork"),
      photo("full-house-repaint-lichfield/after-living-room", "Living room painted two-tone"),
      photo("full-house-repaint-lichfield/after-bedroom-2", "Second bedroom painted white"),
      photo("full-house-repaint-lichfield/before-dining", "Dining area before, with the walls patched ready for paint"),
    ],
    placeholder: false,
  },
  {
    slug: "panelled-feature-wall",
    name: "Panelled feature wall",
    section: "joinery",
    place: "",
    date: "2026-04-01",
    summary: "A plain wall turned into a panelled feature wall, sanded down and given a lick of paint.",
    body: ["A plain wall turned into a panelled feature wall. Sanded down and a lick of paint. Boom."],
    done: ["Panelling fixed to the wall", "Sanded down", "Painted"],
    before: photo("panelled-feature-wall/before", "Panelling fixed to a plain cream wall, before painting"),
    after: photo("panelled-feature-wall/after", "The panelled wall painted a warm taupe"),
    aligned: true,
    gallery: [],
    placeholder: false,
    homepage: 1,
  },
  {
    slug: "under-stairs-cupboard-door",
    name: "Under-stairs cupboard door",
    section: "carpentry",
    place: "",
    date: "2026-04-01",
    summary: "A cupboard door for under the stairs, cut to follow the line of the staircase, hung and painted.",
    body: ["A cupboard door for under the stairs, cut to follow the line of the staircase, hung, then painted to match."],
    done: ["Door cut to the stair line", "Hung", "Painted white"],
    before: photo("under-stairs-cupboard-door/before", "Under-stairs cupboard door hung, before painting"),
    after: photo("under-stairs-cupboard-door/after", "The under-stairs door painted white to match the staircase"),
    gallery: [],
    placeholder: false,
  },
  {
    slug: "oak-internal-doors",
    name: "Oak internal doors",
    section: "staircases",
    place: "",
    date: "2026-04-01",
    summary: "Oak internal doors, including a glazed double pair, hung and finished against white frames.",
    body: ["Oak internal doors, including a glazed double pair, hung and finished against white frames."],
    done: ["Glazed oak double doors", "Single oak doors, glazed and solid", "Hung and finished"],
    before: none("Before photo"),
    after: photo("oak-internal-doors/double-doors", "Glazed oak double doors in a white frame"),
    gallery: [
      photo("oak-internal-doors/door", "Oak internal door in a white frame"),
      photo("oak-internal-doors/glazed-door", "Oak doors, one glazed, in a hallway"),
    ],
    placeholder: false,
  },
  {
    slug: "extension-build",
    name: "Extension build",
    section: "extensions",
    place: "",
    date: "2026-04-01",
    summary: "An extension going up: block walls, roof timbers and the frame for a roof light.",
    body: ["Photos from an extension as it went up: the block walls, the roof timbers and the frame for a roof light."],
    done: ["Block walls built", "Roof timbers on", "Roof light framed in"],
    before: none("Before photo"),
    after: photo("extension-build/roof-timbers", "New extension with block walls up and the roof timbers on"),
    gallery: [
      photo("extension-build/rear", "The extension from the garden, with the roof joists across the walls"),
      photo("extension-build/walls", "Block walls of the extension built up"),
      photo("extension-build/roof-light", "Looking up through the roof timbers and the roof light frame"),
      photo("extension-build/roof-frame", "Roof framing on the extension"),
    ],
    placeholder: false,
  },
  {
    slug: "outdoor-timber",
    name: "Outdoor timber",
    section: "carpentry",
    place: "",
    date: "2026-04-01",
    summary: "Outdoor timber work: an oak-framed canopy over a patio, a slatted fence screen and a pair of timber gates.",
    body: ["A few outdoor timber jobs: an oak-framed canopy over a patio, a slatted fence screen, a pair of timber gates and an oak gazebo going up."],
    done: ["Oak-framed canopy", "Slatted timber fence screen", "Timber gates", "Oak gazebo"],
    before: none("Before photo"),
    after: { src: "/images/hero-oak-canopy.jpg", w: 1080, h: 1434, alt: "Oak-framed garden canopy with slatted timber screens over a patio", label: "Oak canopy" },
    gallery: [
      photo("outdoor-timber/fence-screen", "Long slatted timber fence screen beside a patio"),
      photo("outdoor-timber/gates", "Pair of timber gates with diamond windows"),
      photo("outdoor-timber/gazebo", "Oak gazebo frame going up in a yard"),
    ],
    placeholder: false,
  },
];

/** Real projects only, newest first. Placeholders stay off the projects page, the sitemap and search. */
export const publishedProjects = projects.filter((p) => !p.placeholder).sort((a, b) => b.date.localeCompare(a.date));

export function getProject(slug: string) {
  return projectPages.find((p) => p.slug === slug);
}

/** Every real photo of a job, after first, without repeats. */
export function projectPhotos(p: Project): (Media & { src: string })[] {
  const seen = new Set<string>();
  return [p.after, p.before, ...p.gallery].filter((m): m is Media & { src: string } => {
    if (!m.src || seen.has(m.src)) return false;
    seen.add(m.src);
    return true;
  });
}

/*
  Fewer, stronger pages (John, 29 Oct): a job gets its own page once it has at least four
  photos. The others are shown in full on the projects page, at /projects#<slug>, and
  get their own page as soon as Connor sends more photos of them.
*/
export const hasPage = (p: Project) => projectPhotos(p).length >= 4;
export const projectPages = publishedProjects.filter(hasPage);

/** Where a job's card or caption links: its own page, or its place on the projects page. */
export const projectHref = (p: Project) => (hasPage(p) ? `/projects/${p.slug}` : `/projects#${p.slug}`);

/** Real jobs in a town, or in one of the villages its page covers. Matches `place` by name. */
export function projectsIn(town: string, alsoCovers: string[] = []) {
  const names = [town, ...alsoCovers].map((n) => n.toLowerCase());
  return publishedProjects.filter((p) => p.place && names.includes(p.place.toLowerCase()));
}

/** "October 2026" */
export function monthOf(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

/*
  Homepage before and afters: up to three jobs with a `homepage` place and both photos.
  A slider where the two photos line up (`aligned`), side by side where they don't.
*/
export type BeforeAfterPair = { name: string; section: SectionSlug; before: Media; after: Media; aligned: boolean; href: string };

export const beforeAfters: BeforeAfterPair[] = publishedProjects
  .filter((p) => p.homepage && p.before.src && p.after.src)
  .sort((a, b) => a.homepage! - b.homepage!)
  .slice(0, 3)
  .map((p) => ({ name: p.place ? `${p.name}, ${p.place}` : p.name, section: p.section, before: p.before, after: p.after, aligned: !!p.aligned, href: projectHref(p) }));
