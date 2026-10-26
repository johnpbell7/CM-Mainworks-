import Link from "next/link";

type Crumb = { href: string; label: string };

export default function PageHead({ title, lede, crumbs = [], children }: { title: React.ReactNode; lede?: React.ReactNode; crumbs?: Crumb[]; children?: React.ReactNode }) {
  return (
    <section className="page-head">
      <div className="wrap">
        {crumbs.length > 0 && (
          <ol className="crumbs" aria-label="Breadcrumb" data-reveal="up">
            <li><Link href="/">Home</Link></li>
            {crumbs.map((c) => <li key={c.href}><Link href={c.href}>{c.label}</Link></li>)}
          </ol>
        )}
        <h1 data-reveal="up">{title}</h1>
        {lede && <p data-reveal="up">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
