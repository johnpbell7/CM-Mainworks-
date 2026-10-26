"use client";

import type { JobType } from "@/content/site";

/** Scrolls to the quote form on the same page and pre-selects the type of work. */
export default function AskButton({ job, children }: { job: JobType; children: React.ReactNode }) {
  return (
    <button
      className="ask"
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("cm:job", { detail: job }));
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById("quote")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        setTimeout(() => (document.getElementById("q-name") as HTMLInputElement | null)?.focus({ preventScroll: true }), 650);
      }}
    >
      {children}
    </button>
  );
}
