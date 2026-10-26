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
  renovation: { src: null, alt: "A home renovation by CM MainWorks", label: "Renovation photo" },
  extensions: { src: null, alt: "An extension built by CM MainWorks", label: "Extension photo" },
  kitchens: { src: null, alt: "A kitchen renovation by CM MainWorks", label: "Kitchen photo" },
  bathrooms: { src: null, alt: "A bathroom renovation by CM MainWorks", label: "Bathroom photo" },
  staircases: { src: null, alt: "A staircase renovated by CM MainWorks", label: "Staircase photo" },
  roofing: { src: null, alt: "Roofing work by CM MainWorks", label: "Roofing photo" },
  "flooring-and-tiling": { src: null, alt: "Flooring and tiling by CM MainWorks", label: "Flooring photo" },
  carpentry: { src: null, alt: "Carpentry by CM MainWorks", label: "Carpentry photo" },
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
