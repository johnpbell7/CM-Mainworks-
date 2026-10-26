// Every photo on the site comes from here.
// To add a real photo: put the file in /public/images/ and set `src` (and update `alt`).
// While `src` is null, a clearly labelled placeholder is shown instead.
// Waiting on Connor's photos (likely from his Facebook page).

export type Media = { src: string | null; alt: string; label: string };

export const media = {
  // Full-bleed photo behind the whole hero. Supplied by John (Connor's oak-framed garden canopy).
  hero: {
    src: "/images/hero-oak-canopy.jpg",
    alt: "Oak-framed garden canopy with slatted timber screens, built by CM MainWorks",
    label: "Hero photo",
  },
  carpentry: { src: null, alt: "Carpentry by CM MainWorks", label: "Carpentry photo" },
  building: { src: null, alt: "Building work by CM MainWorks", label: "Building photo" },
  joinery: { src: null, alt: "Joinery by CM MainWorks", label: "Joinery photo" },
  decorating: { src: null, alt: "Decorating by CM MainWorks", label: "Decorating photo" },
  // Behind the reviews section. Bay window Connor restored and repainted (Facebook post, 1 Aug).
  reviews: {
    src: "/images/bay-window-after.jpg",
    alt: "Restored bay window, freshly painted white, by CM MainWorks",
    label: "Reviews background",
  },
  portrait: { src: null, alt: "Connor, who runs CM MainWorks", label: "Photo of Connor" },
} satisfies Record<string, Media>;
