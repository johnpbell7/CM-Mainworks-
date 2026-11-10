"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/Icons";

/** A row of cards that scrolls sideways: arrow buttons on desktop, swipe on phones. */
export default function ScrollRow({ className = "", label, children }: { className?: string; label: string; children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current!;
    const check = () => setEnds({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current!;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || "24") : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="srow">
      <div className="srow-nav">
        <button type="button" aria-label={`Previous ${label}`} onClick={() => go(-1)} disabled={ends.start}><span style={{ display: "grid", transform: "rotate(180deg)" }}><Arrow /></span></button>
        <button type="button" aria-label={`More ${label}`} onClick={() => go(1)} disabled={ends.end}><Arrow /></button>
      </div>
      <div className={`srow-track ${className}`} ref={track} role="list" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
