"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Lets each drawing's little loop run only while it's on screen (adds .is-on), so nothing works off screen. */
export default function IlloPlay() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-on", e.isIntersecting)),
      { rootMargin: "80px 0px" },
    );
    const watch = () =>
      document.querySelectorAll("svg.li-art").forEach((el) => {
        if (!seen.has(el)) { seen.add(el); io.observe(el); }
      });
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [path]);
  return null;
}
