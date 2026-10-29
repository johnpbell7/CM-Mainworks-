import { photoFiles } from "./photos";

/*
  Every photo slot on the site. While `src` is null, the drawing (or a labelled
  placeholder) shows instead.

  How photos and drawings work together (John, 27 and 29 Oct 2026: keep every icon and
  drawing, and work photography in alongside them; never both in one frame):
  - Cards (service cards, the renovation trades, smaller jobs, steps) always show the
    drawing: it's each service's sign.
  - The homepage renovation feature shows the full drawing too.
  - Wherever a full renovation is pitched (the renovations page, "Part of a bigger
    project?" on service pages, the town pages), three photos sit together in a bento
    (`renovationBento`, at the bottom of this file).
  - A service's own intro shows Connor's photo on its own once there is one.
  - Proof (projects, before and afters, recent work, the renovation photo wall) is
    photos only.
  Connor's photos come from his Facebook posts, made into web copies by
  scripts/make-photos.py. `photo()` looks one up by job and name.
*/

export type Media = { src: string | null; alt: string; label: string; w?: number; h?: number };

/** One of Connor's job photos, by "<job>/<name>" as listed in scripts/photos.json. */
export function photo(key: string, alt: string, label = ""): Media & { src: string } {
  const f = photoFiles[key];
  if (!f) throw new Error(`No photo "${key}": add it to scripts/photos.json and run scripts/make-photos.py`);
  return { src: f.src, w: f.w, h: f.h, alt, label };
}

export const media = {
  // Full-bleed photo behind the whole hero. Supplied by John (Connor's oak-framed garden canopy).
  hero: {
    src: "/images/hero-oak-canopy.jpg",
    alt: "Oak-framed garden canopy with slatted timber screens, built by CM MainWorks",
    label: "Hero photo",
  },
  // Feature-row photos, one per service, from Connor's real jobs (null keeps the drawing alone)
  renovation: photo("conservatory/after-wide", "Conservatory finished: new grey carpet, a deep green feature wall and white woodwork", "Renovation photo"),
  extensions: photo("extension-build/roof-timbers", "An extension going up: new block walls with the roof timbers on", "Extension photo"),
  kitchens: photo("hmo-renovation/after-kitchen", "New kitchen fitted with white units, a dark worktop and a white metro tile splashback", "Kitchen photo"),
  bathrooms: photo("hmo-renovation/bathroom-tiled", "New bath fitted with large grey wall tiles going up", "Bathroom photo"),
  staircases: photo("oak-internal-doors/door", "Oak internal door hung in a white frame", "Doors photo"),
  roofing: photo("extension-build/roof-light", "Roof timbers on an extension with the frame for a roof light, looking up at the sky", "Roofing photo"),
  "flooring-and-tiling": photo("garage-conversion-cannock/floor", "New herringbone floor in a garage conversion in Cannock", "Flooring photo"),
  carpentry: photo("bay-window-restoration/after-bay", "Bay window restored and painted white, with new timber cills", "Carpentry photo"),
  joinery: photo("panelled-feature-wall/after", "Panelled feature wall painted a warm taupe", "Joinery photo"),
  decorating: photo("hall-stairs-landing/after-stairs", "Stairs and hall painted light grey with a white handrail", "Decorating photo"),
  // Behind the reviews section. Bay window Connor restored and repainted (Facebook post, 1 Aug).
  reviews: {
    src: "/images/bay-window-after.jpg",
    alt: "Restored bay window, freshly painted white, by CM MainWorks",
    label: "Reviews background",
  },
  portrait: { src: null, alt: "Connor, who runs CM MainWorks", label: "Photo of Connor" },
} satisfies Record<string, Media>;

/*
  Full-renovation photos, best first: finished rooms from different jobs. Wherever a full
  renovation is pitched (the renovations page, "Part of a bigger project?" on each service
  page, the town pages), three of them sit together in a bento (John, 29 Oct 2026).
*/
const renovationSet: Media[] = [
  media.renovation,
  photo("garage-conversion-cannock/after-hatch", "Garage conversion in Cannock, finished, with a loft ladder up to the hatch"),
  photo("three-bed-house-repaint/after-living-room", "Living room finished in grey and white around a black cast-iron fireplace"),
  photo("hmo-renovation/after-kitchen", "Kitchen fitted: white units, a dark worktop and a white metro tile splashback"),
  photo("three-bed-house-repaint/after-front-room", "Front room painted, with a dark wood-effect floor"),
  photo("panelled-feature-wall/after", "Panelled feature wall painted a warm taupe"),
];

/**
 * Three photos for a renovation bento. `skip` leaves out photos already on the page;
 * `first` puts the page's own photo in (a town's main service). The tall cell gets an
 * upright photo when there is one.
 */
export function renovationBento(skip: (string | null)[] = [], first?: Media): Media[] {
  const pool = [...(first?.src ? [first] : []), ...renovationSet.filter((m) => !skip.includes(m.src) && m.src !== first?.src)];
  const pick = pool.slice(0, 3);
  const tall = Math.max(0, pick.findIndex((m) => (m.h ?? 0) > (m.w ?? 0)));
  return [pick[tall], ...pick.filter((_, i) => i !== tall)];
}
