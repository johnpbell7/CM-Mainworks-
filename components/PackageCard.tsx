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

/** For work that's always priced once Connor has seen it. */
export function VisitPrice() {
  return <p className="from visit"><strong>Priced after a visit</strong></p>;
}

/** The footnote for the asterisk. Use under every group of prices. */
export function PriceNote() {
  return <p className="price-note"><span aria-hidden="true">* </span>{priceNote}</p>;
}

/**
  A renovation package. On the prices page every card has the same four rows (name, one
  line, the price block, and what's included as a dropdown), lined up across the cards so
  they're all one size. The price block is three sizes with rough figures, or "priced after
  a visit". Compact cards are one tappable link to the prices page.
*/
export default function PackageCard({ p, compact = false, headingLevel = 3 }: { p: Package; compact?: boolean; headingLevel?: 2 | 3 }) {
  const { color, tint } = lookOf(p.look);
  const H = headingLevel === 2 ? "h2" : "h3";
  const style = { "--c": color, "--pen": tint } as React.CSSProperties;
  if (compact) {
    return (
      <Link className="pkg" href="/prices" style={style}>
        <div className="pkg-head">
          <H>{p.name}<Arrow /></H>
          {p.quoteOnly || p.sizes ? <VisitPrice /> : <FromPrice from={p.from} />}
        </div>
        <div className="pkg-body"><p className="pkg-sum">{p.summary}</p></div>
      </Link>
    );
  }
  return (
    <article className="pkg" style={style}>
      <H className="pkg-name">{p.name}</H>
      <p className="pkg-sum">{p.summary}</p>
      <div className="pkg-price">
        {p.sizes ? (
          <ul className="sizes">
            {p.sizes.map((z) => (
              <li key={z.name}>
                <span><b>{z.name}</b>{z.note}</span>
                <strong>{z.from ?? "£TBC"}<sup aria-hidden="true">*</sup></strong>
              </li>
            ))}
          </ul>
        ) : p.quoteOnly ? (
          <div className="pkg-visit">
            <strong>Priced after a visit</strong>
            <span>Every home is different, so I come and see it first. The written quote is free.</span>
          </div>
        ) : (
          <FromPrice from={p.from} />
        )}
      </div>
      <details className="pkg-inc">
        <summary>What’s included</summary>
        <ul className="ticks">
          {p.includes.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </details>
    </article>
  );
}
