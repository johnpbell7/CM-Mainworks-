"use client";

import { useEffect } from "react";

// Next.js re-mounts this on every page change. The first page load is left alone
// (the intro covers it); after that each new page slides up and fades in quickly,
// so it's obvious you've moved to a new page.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return <div className={animate ? "page-in" : undefined}>{children}</div>;
}
