import Link from "next/link";
import { business, renovation, sections } from "@/content/site";
import { localAreas, midlandsAreas } from "@/content/areas";

const areas = [...localAreas, ...midlandsAreas];

/* The designer's credit along the very bottom, the same slim banner as on Birth Hood and the cricket
   club (John, 15 Nov 2026): JB's mark, a link back to his site, and "Start a project" by email. */
const JB_SITE = "https://jbdesignagency.co.uk/";
const JB_ENQUIRY =
  "mailto:jb.designagency89@gmail.com?subject=" +
  encodeURIComponent("New website enquiry (via CM MainWorks)") +
  "&body=" +
  encodeURIComponent("Hi John,\r\n\r\nI saw the CM MainWorks site and I'd like to talk about a website for my business.\r\n\r\n");

function JbMark() {
  return (
    <svg className="jb-credit-mark" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="jbcT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff58a" /><stop offset="1" stopColor="#ffe94a" /></linearGradient>
        <linearGradient id="jbcS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f5c400" /><stop offset="1" stopColor="#e2a400" /></linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="45" height="45" rx="10.5" fill="url(#jbcS)" stroke="#18181a" strokeWidth="1.6" />
      <rect x="5" y="3.6" width="38" height="36.4" rx="8" fill="url(#jbcT)" stroke="#e9b400" strokeWidth="0.8" />
      <path d="M37.9 29.29Q37.9 32.2 35.87 33.9Q33.83 35.61 30.2 35.61H17.4Q13.73 35.61 11.52 33.64Q9.3 31.67 9.3 27.84H14.92Q14.92 29.29 15.52 30.03Q16.11 30.78 17.24 30.78Q18.26 30.78 18.82 30.12Q19.38 29.46 19.38 28.2V12.39H29.83Q33.37 12.39 35.37 14.01Q37.37 15.63 37.37 18.41Q37.37 20.46 36.3 21.82Q35.22 23.17 33.44 23.7Q35.45 24.13 36.68 25.7Q37.9 27.27 37.9 29.29ZM25.04 21.78H28.74Q30.13 21.78 30.87 21.17Q31.62 20.56 31.62 19.37Q31.62 18.18 30.87 17.55Q30.13 16.92 28.74 16.92H25.04ZM32.18 28.53Q32.18 27.31 31.37 26.61Q30.56 25.92 29.14 25.92H25.04V31.04H29.2Q30.63 31.04 31.4 30.4Q32.18 29.75 32.18 28.53Z" fill="#18181a" transform="translate(24 21.8) scale(0.92) translate(-23.6 -24)" />
    </svg>
  );
}

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
            <img className="logo" src="/brand/logo/main/cm-mainworks-horizontal-on-navy.svg" alt="CM MainWorks, carpentry and construction" width={207} height={40} loading="lazy" />
          </Link>
          <p>I’m Connor. Full home renovations, managed by one team from start to finish, across the Midlands.</p>
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
      <div className="jb-credit">
        <div className="jb-credit-inner">
          <a href={JB_SITE} target="_blank" rel="noopener" className="jb-credit-brand">
            <JbMark />
            <span>Designed &amp; built by <b>JB Design Agency</b></span>
          </a>
          <div className="jb-credit-cta">
            <span>Like this site? Let&rsquo;s build yours.</span>
            <a href={JB_ENQUIRY} className="jb-credit-btn">
              Start a project
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
