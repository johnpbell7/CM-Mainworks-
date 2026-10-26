"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, nav } from "@/content/site";
import { Phone } from "./Icons";

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
          <img className="logo" src="/brand/logo/main/cm-mainworks-horizontal-on-light.svg" alt="CM MainWorks, carpentry and construction" width={238} height={46} />
        </Link>
        <nav aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <a className="tel" href={business.phoneHref}>
          <Phone />
          {business.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
