import { photoFiles } from "./photos";

/*
  Every photo slot on the site. While `src` is null, the drawing (or a labelled
  placeholder) shows instead.

  How photos and drawings work together (John, 27 and 29 Oct 2026: keep every icon and
  drawing, and work photography in alongside them; never both in one frame):
  - Cards (service cards, the renovation trades, smaller jobs, steps) always show the
    drawing: it's each service's sign.
  - The homepage renovation feature shows the full drawing too.
  - Every other feature row (a service's intro, the services list, the renovations
    intro, a town's "Homes in …") shows Connor's photo on its own once there is one.
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
  renovation: photo("garage-conversion-cannock/after-loft-room", "Garage conversion in Cannock, finished: a deep red feature wall under a sloped ceiling with a roof window", "Renovation photo"),
  extensions: photo("extension-build/roof-timbers", "An extension going up: new block walls with the roof timbers on", "Extension photo"),
  kitchens: photo("hmo-renovation/after-kitchen", "New kitchen fitted with white units, a dark worktop and a white metro tile splashback", "Kitchen photo"),
  bathrooms: photo("hmo-renovation/bathroom-tiled", "New bath fitted with large grey wall tiles going up", "Bathroom photo"),
  staircases: photo("oak-internal-doors/door", "Oak internal door hung in a white frame", "Doors photo"),
  roofing: photo("extension-build/roof-light", "Roof timbers on an extension with the frame for a roof light, looking up at the sky", "Roofing photo"),
  "flooring-and-tiling": photo("conservatory/after-corner", "Conservatory with the old tiled floor taken up and a new grey carpet laid", "Flooring photo"),
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
