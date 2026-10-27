import Link from "next/link";
import { Arrow } from "./Icons";
import { renovation, getSection } from "@/content/site";
import { priceNote, type Package } from "@/content/prices";

export function lookOf(look: Package["look"]) {
  if (look === "renovation") return { color: renovation.color, tint: renovation.tint };
  const s = getSection(look)!;
  return { color: s.color, tint: s.tint };
}

/** A "from" price, with the asterisk that ties it to PriceNote. Shows a placeholder until Connor supplies the figure. */
export function FromPrice({ from }: { from: string | null }) {
  return (
    <p className={`from${from ? "" : " tbc"}`}>
      <span>From</span>
      <strong>{from ?? "£TBC"}<sup aria-hidden="true">*</sup></strong>
    </p>
  );
}

/** The footnote for the asterisk. Use under every group of prices. */
export function PriceNote() {
  return <p className="price-note"><span aria-hidden="true">* </span>{priceNote}</p>;
}

/**
  A renovation package: name, from price and a short line. Compact cards (homepage,
  renovations page) are one tappable link to the prices page; the full cards on the
  prices page add what's included and carry no links, since the page ends in the quote form.
*/
export default function PackageCard({ p, compact = false, headingLevel = 3 }: { p: Package; compact?: boolean; headingLevel?: 2 | 3 }) {
  const { color, tint } = lookOf(p.look);
  const H = headingLevel === 2 ? "h2" : "h3";
  const style = { "--c": color, "--pen": tint } as React.CSSProperties;
  const inner = (
    <>
      <div className="pkg-head">
        <H>{p.name}{compact && <Arrow />}</H>
        <FromPrice from={p.from} />
      </div>
      <div className="pkg-body">
        <p className="pkg-sum">{p.summary}</p>
        {!compact && (
          <ul className="ticks">
            {p.includes.map((i) => <li key={i}>{i}</li>)}
          </ul>
        )}
      </div>
    </>
  );
  return compact
    ? <Link className="pkg" href="/prices" style={style}>{inner}</Link>
    : <article className="pkg" style={style}>{inner}</article>;
}
