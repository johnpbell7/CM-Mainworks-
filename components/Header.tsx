"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, isCurrent, nav } from "@/content/site";
import { Phone } from "./Icons";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`head${scrolled ? " scrolled" : ""}`}>
      <div className="wrap">
        <Link href="/" aria-label="CM MainWorks home">
          {/* Supplied logo, used as-is */}
          <img className="logo logo-head" src="/brand/logo/main/cm-mainworks-header-lockup.svg" alt="CM MainWorks, carpentry and construction" width={328} height={56} />
        </Link>
        <nav className="main-nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isCurrent(path, n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <a className="tel" href={business.phoneHref} aria-label={`Call ${business.phoneDisplay}`}>
          <Phone />
          <span className="tel-num">{business.phoneDisplay}</span>
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}
