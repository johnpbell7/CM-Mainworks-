import Link from "next/link";
import { business, renovation, sections } from "@/content/site";
import { localAreas, midlandsAreas } from "@/content/areas";

const areas = [...localAreas, ...midlandsAreas];

const company = [
  { href: "/prices", label: "Prices" },
  { href: "/projects", label: "Recent work" },
  { href: "/about", label: "About me" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Link href="/" aria-label="CM MainWorks home">
            <img className="logo" src="/brand/logo/main/cm-mainworks-horizontal-on-light.svg" alt="CM MainWorks, carpentry and construction" width={207} height={40} loading="lazy" />
          </Link>
          <p>I’m Connor. Full home renovations, managed by one team from start to finish. Based in Lichfield, working across the Midlands.</p>
          <p className="foot-contact">
            <a href={business.phoneHref}>{business.phoneDisplay}</a>
            <a href={business.whatsapp} target="_blank" rel="noopener">WhatsApp me</a>
          </p>
        </div>
        <nav aria-label="Services">
          <p className="foot-h">Services</p>
          <ul>
            <li><Link href={renovation.href}>{renovation.name}</Link></li>
            {sections.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Areas">
          <p className="foot-h">Areas</p>
          <ul className="foot-areas">{areas.map((a) => <li key={a.slug}><Link href={`/areas/${a.slug}`}>{a.name}</Link></li>)}</ul>
        </nav>
        <nav aria-label="CM MainWorks">
          <p className="foot-h">CM MainWorks</p>
          <ul>
            {company.map((c) => <li key={c.href}><Link href={c.href}>{c.label}</Link></li>)}
            <li><a href={business.facebook} target="_blank" rel="noopener">Facebook</a></li>
          </ul>
        </nav>
      </div>
      <div className="wrap foot-base">
        <span>© {new Date().getFullYear()} {business.name} · {business.base}</span>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
