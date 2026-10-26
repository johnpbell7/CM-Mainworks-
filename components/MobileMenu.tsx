"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business } from "@/content/site";
import { Phone, WhatsApp } from "./Icons";

const links = [
  { href: "/services", label: "Services", c: "var(--oak)" },
  { href: "/projects", label: "Recent work", c: "var(--steel)" },
  { href: "/areas", label: "Areas we cover", c: "var(--sage)" },
  { href: "/about", label: "About Connor", c: "var(--brick)" },
  { href: "/faqs", label: "FAQs", c: "var(--gold)" },
  { href: "/contact", label: "Contact", c: "var(--ink-3)" },
];

/** Menu button and full-screen panel for phones and tablets (hidden where the header nav shows). */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Close on navigation
  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const first = panel.current?.querySelector<HTMLElement>("a");
    setTimeout(() => first?.focus({ preventScroll: true }), 150);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel.current || !btn.current) return;
      // keep focus inside the button and the panel
      const items = [btn.current, ...Array.from(panel.current.querySelectorAll<HTMLElement>("a, button"))];
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    };
    const onResize = () => { if (window.innerWidth > 1080) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <button ref={btn} type="button" className="menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
        <span className="menu-ico" aria-hidden="true"><i /><i /></span>
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      <div id="site-menu" ref={panel} className="menu" data-open={open} inert={!open} aria-label="Site menu" role="dialog" aria-modal="true">
        <nav aria-label="Menu">
          <ul className="menu-links">
            {links.map((l, i) => (
              <li key={l.href} style={{ "--i": i, "--c": l.c } as React.CSSProperties}>
                <Link href={l.href} aria-current={path.startsWith(l.href) ? "page" : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-actions" style={{ "--i": links.length } as React.CSSProperties}>
          <a className="btn btn-line" href={business.phoneHref}><Phone />Call {business.phoneDisplay}</a>
          <a className="btn btn-line" href={business.whatsapp} target="_blank" rel="noopener"><WhatsApp />WhatsApp</a>
          <Link className="btn btn-gold" href="/contact#quote">Get a free quote</Link>
        </div>
      </div>
    </>
  );
}
