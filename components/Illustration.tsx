/*
  CM MainWorks illustrations, concept style (John, 10 Nov 2026): Lemonade-style line
  drawings in Connor's palette. Navy line on white, the palest blue tints for depth,
  gold as the one accent. Each scene sits on a soft blue circle and has one small
  loop of life (steam, a drip, a saw, a roller…), which only runs while it's on
  screen (IlloPlay adds .is-on) and never under reduced motion.

  Drawing kit (styled in app/concept.css):
    .k line   .thin fine line   .kf white   .kg grey   .kb1/.kb2 blue tints
    .kgl gold tint   .kg-gold gold   .kplank timber   .kd ink   .sh soft shadow
  Every scene is 320 x 240 and stands on a ground line at y=210.
*/

import Kitchen from "./concept/art/Kitchen";
import Bathroom from "./concept/art/Bathroom";
import Building from "./concept/art/Building";
import Stairs from "./concept/art/Stairs";
import Roof from "./concept/art/Roof";
import Flooring from "./concept/art/Flooring";
import Carpentry from "./concept/art/Carpentry";
import Joinery from "./concept/art/Joinery";
import Decorating from "./concept/art/Decorating";
import Renovation from "./concept/art/Renovation";
import Photos from "./concept/art/Photos";
import Quote from "./concept/art/Quote";
import Done from "./concept/art/Done";
import Faq from "./concept/art/Faq";
import Privacy from "./concept/art/Privacy";
import Town from "./concept/art/Town";
import Gallery from "./concept/art/Gallery";

export type IllustrationKind =
  | "carpentry" | "building" | "joinery" | "decorating"
  | "renovation" | "kitchen" | "bathroom" | "flooring" | "stairs" | "roof"
  | "photos" | "quote" | "done"
  | "faq" | "privacy" | "town" | "gallery";

const map: Record<IllustrationKind, { C: () => React.ReactNode; label: string }> = {
  kitchen: { C: Kitchen, label: "Drawing of a fitted kitchen" },
  bathroom: { C: Bathroom, label: "Drawing of a new bathroom" },
  building: { C: Building, label: "Drawing of an extension going up" },
  stairs: { C: Stairs, label: "Drawing of a staircase and an oak door" },
  roof: { C: Roof, label: "Drawing of a tiled roof" },
  flooring: { C: Flooring, label: "Drawing of a new floor being laid" },
  carpentry: { C: Carpentry, label: "Drawing of a saw cutting timber on trestles" },
  joinery: { C: Joinery, label: "Drawing of a media wall with alcove shelves" },
  decorating: { C: Decorating, label: "Drawing of a wall being painted" },
  renovation: { C: Renovation, label: "Drawing of a house being renovated" },
  photos: { C: Photos, label: "Drawing of photos sent from a phone" },
  quote: { C: Quote, label: "Drawing of a written quote" },
  done: { C: Done, label: "Drawing of the CM MainWorks van outside a finished house" },
  faq: { C: Faq, label: "Drawing of a question and an answer" },
  privacy: { C: Privacy, label: "Drawing of a padlock on a shield" },
  town: { C: Town, label: "Drawing of a street with a map pin" },
  gallery: { C: Gallery, label: "Drawing of before and after photos" },
};

// `view` frames a drawing more tightly (a page head uses it so the subject fills the space without anything cut off)
export default function Illustration({ kind, className = "", label, decorative = false, fit, view }: { kind: IllustrationKind; className?: string; label?: string; decorative?: boolean; fit?: "bottom"; view?: string }) {
  const { C } = map[kind];
  if (!decorative) label = label ?? map[kind].label;
  return (
    <svg
      className={`il li-art il-${kind} ${className}`}
      viewBox={view ?? "0 0 320 240"}
      preserveAspectRatio={fit === "bottom" ? "xMidYMax meet" : undefined}
      data-illustration
      {...(label && !decorative ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {label && !decorative && <title>{label}</title>}
      <C />
    </svg>
  );
}
