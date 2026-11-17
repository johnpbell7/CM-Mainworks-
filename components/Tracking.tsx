"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { trackCall, trackQuoteButton, trackWhatsAppLink } from "@/lib/analytics";

/**
  Vercel Web Analytics (page views), plus a count of every tap on a phone link, a plain WhatsApp link
  and a quote button, wherever they are. See lib/analytics.ts.
*/
export default function Tracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      const call = el?.closest?.('a[href^="tel:"]');
      if (call) return trackCall(call);
      // The form's own WhatsApp links ("Try again"…) are counted by the form, so only links outside it
      const wa = el?.closest?.('a[href^="https://wa.me/"]');
      if (wa && !wa.closest("form, .quote-wrap")) return trackWhatsAppLink(wa);
      // Links to the form, and the hero's buttons that open it (not when it's being closed)
      const quote = el?.closest?.('a[href$="#quote"], button.q-start, button.quote-cta[aria-expanded="false"]');
      if (quote) trackQuoteButton(quote);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return <Analytics />;
}
