import Link from "next/link";
import { business, nav } from "@/content/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <Link href="/" aria-label="CM MainWorks home">
          <img className="logo" src="/brand/logo/main/cm-mainworks-horizontal-on-light.svg" alt="CM MainWorks" width={207} height={40} loading="lazy" />
        </Link>
        <nav aria-label="Footer">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <a href={business.facebook} target="_blank" rel="noopener">Facebook</a>
          <a href="#top">Back to top</a>
        </nav>
        <span>© {new Date().getFullYear()} {business.name}</span>
      </div>
    </footer>
  );
}
