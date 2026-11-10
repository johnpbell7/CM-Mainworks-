import type { IllustrationKind } from "../Illustration";

// How each drawing is framed in a page head: zoom (z) and the middle of its subject (cx),
// measured from each drawing's own edges (.concept-tools/frames.mjs), so the subject fills
// the space and nothing is ever cut off. The zoom pivots on the pavement line (y=210), which
// is what keeps the drawing's pavement level with the full-width street. Re-measure after
// changing a drawing.
export const headFrame: Partial<Record<IllustrationKind, [z: number, cx: number]>> = {
  kitchen: [1.05, 160], bathroom: [1.16, 156], building: [1.05, 165], roof: [1.09, 160],
  flooring: [1.13, 160], stairs: [1.1, 141], carpentry: [1.13, 155], joinery: [1.08, 155],
  decorating: [1.17, 158], renovation: [1.12, 171], done: [1.11, 157], town: [1.07, 157],
  photos: [1.13, 171], quote: [1.11, 160], faq: [1.05, 154], privacy: [1.3, 161], gallery: [1.05, 163],
};
const r2 = (n: number) => Math.round(n * 100) / 100;
/** Used by the page heads, the link pictures (app/share-card) and the services menu, so they're all framed the same way. */
export function frame(kind: IllustrationKind) {
  const [z, cx] = headFrame[kind] ?? [1, 160];
  return { z, view: `${r2(cx - 160 / z)} ${r2(210 - 210 / z)} ${r2(320 / z)} ${r2(240 / z)}` };
}

