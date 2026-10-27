import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import PackageCard, { FromPrice, PriceNote } from "@/components/PackageCard";
import QuoteForm from "@/components/QuoteForm";
import FaqList from "@/components/FaqList";
import { business, getSection, renovation } from "@/content/site";
import { Calendar, Eye, Layers, QuoteDoc } from "@/components/Icons";
import { packages, roomPrices } from "@/content/prices";
import { priceFaqs } from "@/content/faqs";
import { faqLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Renovation prices and packages",
  description: "A guide to my prices for full renovations, kitchens, bathrooms, extensions and smaller jobs across the Midlands. Free written quotes, no surprises.",
  path: "/prices",
});

const how = [
  { Icon: QuoteDoc, title: "Free written quote", text: "After a visit. No cost, no obligation." },
  { Icon: Layers, title: "Paid in phases", text: "Renovations are invoiced phase by phase." },
  { Icon: Calendar, title: "Regular sit-downs", text: "We check timescales and targets together." },
  { Icon: Eye, title: "No surprises", text: "Any change is agreed before I carry on." },
];

export default function Prices() {
  return (
    <div style={{ "--c": renovation.color, "--pen": renovation.tint } as React.CSSProperties}>
      <JsonLd data={faqLd(priceFaqs)} />
      <PageHead
        crumbs={[{ href: "/prices", label: "Prices" }]}
        title={<>Clear prices, <span className="hl">no surprises.</span></>}
        lede="A rough guide before we talk. You’ll always get a written quote for your home."
      >
        {packages.every((p) => !p.from) && <p className="draft">Draft: Connor to confirm the “from” prices.</p>}
      </PageHead>

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="pkg-title">
        <div className="wrap">
          <h2 id="pkg-title" className="sr-only">Renovation packages</h2>
          <div className="pkgs swipe" data-reveal="stagger">
            {packages.map((p) => <PackageCard key={p.name} p={p} />)}
          </div>
          <PriceNote />
        </div>
      </section>

      <section className="sec grey" aria-labelledby="how-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="how-title">How my pricing works</h2></div>
            <p data-reveal="up">Fair, competitive and <span className="hl">out in the open</span>.</p>
          </div>
          <ul className="benefits tight" data-reveal="stagger">
            {how.map(({ Icon, title, text }) => (
              <li key={title} style={{ "--c": "var(--gold)", "--pen": "#fff" } as React.CSSProperties}>
                <span className="benefit-ico"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="room-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="room-title">Smaller jobs</h2>
            <p>On their own or as part of a bigger job.</p>
          </div>
          <div>
          <ul className="price-rows" data-reveal="stagger">
            {roomPrices.map((r) => {
              const s = getSection(r.look)!;
              return (
                <li key={r.name} style={{ "--c": s.color } as React.CSSProperties}>
                  <Link href={r.href}>
                    <h3>{r.name}</h3>
                    <FromPrice from={r.from} />
                    <p>{r.note}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
            <PriceNote />
          </div>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="faq-title">Questions about prices</h2>
          </div>
          <FaqList faqs={priceFaqs} />
        </div>
      </section>

      <section className="sec" aria-labelledby="ask-title">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 id="ask-title" className="big-h">Get your price</h2>
            <p className="big-p">Send a few photos and a line about the job, and I’ll send a written quote.</p>
            <p className="big-p">Or ring me on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
          </div>
          <QuoteForm />
        </div>
      </section>

    </div>
  );
}
