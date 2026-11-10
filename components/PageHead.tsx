import Link from "next/link";
import { breadcrumbLd, JsonLd, type Crumb } from "@/lib/seo";
import Illustration, { type IllustrationKind } from "./Illustration";

/** Page title block: breadcrumbs (with BreadcrumbList schema), the page’s single H1 and an intro line. */
/**
 * `art` gives the page the homepage hero's feel: sky at the top, the heading on the
 * left, and the page's drawing on the right standing on a street that runs the full
 * width of the screen (below the intro on phones).
 */
export { frame } from "./concept/frames";
import { frame } from "./concept/frames";

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
