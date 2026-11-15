"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { trackCall } from "@/lib/analytics";

/** Vercel Web Analytics (page views), plus a count of every tap on a phone link, wherever it is. See lib/analytics.ts. */
export default function Tracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (link) trackCall(link);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return <Analytics />;
}
