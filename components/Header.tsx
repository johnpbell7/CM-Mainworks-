"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business, isCurrent, nav } from "@/content/site";
import { ChevronDown, Phone } from "./Icons";
import ServiceLinks, { RenovationLink } from "./ServiceLinks";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  // the Renovations drop-down: opens on hover or with its arrow, closes on leaving, Escape, a click elsewhere or a new page
  const [drop, setDrop] = useState(false);
  const [seen, setSeen] = useState(false); // the little drawings are drawn from the first opening on
  const dropRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const leaveTimer = useRef<number | undefined>(undefined);
  const show = (on: boolean) => { if (on) setSeen(true); setDrop(on); };

  useEffect(() => setDrop(false), [path]);
  // "Free quote" goes to this page's own form when it has one, otherwise the contact page's
  const [quoteHref, setQuoteHref] = useState("/contact#quote");
  useEffect(() => setQuoteHref(document.getElementById("quote") ? "#quote" : "/contact#quote"), [path]);
  useEffect(() => {
    if (!drop) return;
    const away = (e: MouseEvent) => { if (!dropRef.current?.contains(e.target as Node)) setDrop(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setDrop(false); btnRef.current?.focus(); } };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [drop]);

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
          {nav.map((n) => n.href !== "/renovations" ? (
            <Link key={n.href} href={n.href} aria-current={isCurrent(path, n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ) : (
            <div
              key={n.href}
              ref={dropRef}
              className={`nav-drop${drop ? " open" : ""}`}
              onMouseEnter={() => { window.clearTimeout(leaveTimer.current); if (matchMedia("(hover: hover)").matches) show(true); }}
              onMouseLeave={() => { leaveTimer.current = window.setTimeout(() => setDrop(false), 180); }}
            >
              <Link href={n.href} aria-current={isCurrent(path, n.href) ? "page" : undefined}>{n.label}</Link>
              <button ref={btnRef} type="button" className="nav-drop-btn" aria-expanded={drop} aria-controls="nav-services" aria-label="Show every service" onClick={() => show(!drop)}>
                <ChevronDown />
              </button>
              <div className="nav-panel" id="nav-services" inert={!drop}>
                <RenovationLink art={seen} path={path} />
                <ServiceLinks art={seen} path={path} />
              </div>
            </div>
          ))}
        </nav>
        <a className="tel" href={business.phoneHref} aria-label={`Call ${business.phoneDisplay}`}>
          <Phone />
          <span className="tel-num">{business.phoneDisplay}</span>
        </a>
        <Link className="btn btn-gold head-quote" href={quoteHref} onClick={() => window.dispatchEvent(new Event("cm:open-quote"))}>Free quote</Link>
        <MobileMenu />
      </div>
    </header>
  );
}
