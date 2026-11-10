import Link from "next/link";
import { breadcrumbLd, JsonLd, type Crumb } from "@/lib/seo";
import Illustration, { type IllustrationKind } from "./Illustration";

/** Page title block: breadcrumbs (with BreadcrumbList schema), the page’s single H1 and an intro line. */
/**
 * `art` gives the page the homepage hero's feel: sky at the top, the heading on the
 * left, and the page's drawing on the right standing on a street that runs the full
 * width of the screen (below the intro on phones).
 */
// How each drawing is framed in a page head: zoom (z) and the middle of its subject (cx),
// measured from each drawing's own edges (.concept-tools/frames.mjs), so the subject fills
// the space and nothing is ever cut off. The zoom pivots on the pavement line (y=210), which
// is what keeps the drawing's pavement level with the full-width street. Re-measure after
// changing a drawing.
const headFrame: Partial<Record<IllustrationKind, [z: number, cx: number]>> = {
  kitchen: [1.05, 160], bathroom: [1.16, 156], building: [1.05, 165], roof: [1.09, 160],
  flooring: [1.13, 160], stairs: [1.1, 141], carpentry: [1.13, 155], joinery: [1.08, 155],
  decorating: [1.17, 158], renovation: [1.12, 171], done: [1.11, 157], town: [1.07, 157],
  photos: [1.13, 171], quote: [1.11, 160], faq: [1.05, 154], privacy: [1.3, 161], gallery: [1.05, 163],
};
const r2 = (n: number) => Math.round(n * 100) / 100;
/** Also used by the link pictures (app/share-card), so they're framed the same way. */
export function frame(kind: IllustrationKind) {
  const [z, cx] = headFrame[kind] ?? [1, 160];
  return { z, view: `${r2(cx - 160 / z)} ${r2(210 - 210 / z)} ${r2(320 / z)} ${r2(240 / z)}` };
}

export default function PageHead({ title, lede, crumbs = [], children, art }: { title: React.ReactNode; lede?: React.ReactNode; crumbs?: Crumb[]; children?: React.ReactNode; art?: IllustrationKind }) {
  return (
    <section className={`page-head${art ? " has-street" : ""}`}>
      <div className={`wrap${art ? " has-art" : ""}`}>
        <div className="head-text">
        {crumbs.length > 0 && (
          <>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                {crumbs.map((c, i) => (
                  <li key={c.href}>
                    {i === crumbs.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
                  </li>
                ))}
              </ol>
            </nav>
            <JsonLd data={breadcrumbLd(crumbs)} />
          </>
        )}
        <h1>{title}</h1>
        {lede && <p>{lede}</p>}
        {children}
        </div>
        {art && (() => {
          const { z, view } = frame(art);
          return (
            <div className="head-art" style={{ "--z": z } as React.CSSProperties}>
              <Illustration kind={art} view={view} decorative />
            </div>
          );
        })()}
      </div>
    </section>
  );
}
