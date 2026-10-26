import Link from "next/link";
import { Arrow } from "./Icons";
import { renovation, getSection } from "@/content/site";
import type { Package } from "@/content/prices";

export function lookOf(look: Package["look"]) {
  if (look === "renovation") return { color: renovation.color, tint: renovation.tint };
  const s = getSection(look)!;
  return { color: s.color, tint: s.tint };
}

/** A "from" price. Shows a clearly marked placeholder until Connor supplies the figure. */
export function FromPrice({ from, unit }: { from: string | null; unit?: string }) {
  return (
    <p className={`from${from ? "" : " tbc"}`}>
      <span>From</span>
      <strong>{from ?? "£—"}</strong>
      {unit && <span>{unit}</span>}
    </p>
  );
}

/** A renovation package: name, from price, what’s included and two links. */
export default function PackageCard({ p, compact = false, headingLevel = 3 }: { p: Package; compact?: boolean; headingLevel?: 2 | 3 }) {
  const { color, tint } = lookOf(p.look);
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="pkg" style={{ "--c": color, "--pen": tint } as React.CSSProperties}>
      <H>{p.name}</H>
      <FromPrice from={p.from} />
      <p className="pkg-sum">{p.summary}</p>
      {!compact && (
        <ul className="ticks">
          {p.includes.map((i) => <li key={i}>{i}</li>)}
        </ul>
      )}
      <div className="pkg-links">
        <Link className="link link-arrow" style={{ "--u": color } as React.CSSProperties} href={`/contact?job=${encodeURIComponent(p.job)}#quote`}>
          Get a quote <Arrow />
        </Link>
        <Link className="pkg-more" href={p.href}>Find out more</Link>
      </div>
    </article>
  );
}
