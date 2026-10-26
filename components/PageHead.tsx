import Link from "next/link";
import { breadcrumbLd, JsonLd, type Crumb } from "@/lib/seo";

/** Page title block: breadcrumbs (with BreadcrumbList schema), the page’s single H1 and an intro line. */
export default function PageHead({ title, lede, crumbs = [], children }: { title: React.ReactNode; lede?: React.ReactNode; crumbs?: Crumb[]; children?: React.ReactNode }) {
  return (
    <section className="page-head">
      <div className="wrap">
        {crumbs.length > 0 && (
          <>
            <nav aria-label="Breadcrumb" data-reveal="up">
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
        <h1 data-reveal="up">{title}</h1>
        {lede && <p data-reveal="up">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
