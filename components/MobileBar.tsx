"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { business } from "@/content/site";
import { Phone } from "./Icons";

/** Fixed call / quote bar on phones. Slides away while the quote form is on screen. */
export default function MobileBar() {
  const [away, setAway] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const form = document.getElementById("quote");
    if (!form) { setAway(false); return; }
    const io = new IntersectionObserver(([e]) => setAway(e.isIntersecting), { threshold: 0.15 });
    io.observe(form);
    return () => io.disconnect();
  }, [path]);

  const quoteHref = path === "/" || path === "/contact" ? "#quote" : "/contact#quote";

  return (
    <nav className={`mbar${away ? " away" : ""}`} aria-label="Quick contact">
      <a href={business.phoneHref}><Phone />Call</a>
      <a className="q" href={quoteHref}>Free quote</a>
    </nav>
  );
}
