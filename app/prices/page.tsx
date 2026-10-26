import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import PackageCard, { FromPrice } from "@/components/PackageCard";
import QuoteForm from "@/components/QuoteForm";
import FaqList from "@/components/FaqList";
import Closing from "@/components/Closing";
import { business, getSection, renovation } from "@/content/site";
import { packages, roomPrices } from "@/content/prices";
import { priceFaqs } from "@/content/faqs";
import { faqLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Renovation prices and packages",
  description: "A guide to my prices for full renovations, kitchens, bathrooms, extensions and smaller jobs across Lichfield and the Midlands. Free written quotes, no surprises.",
  path: "/prices",
});

const how = [
  { title: "Free visit and written quote", text: "I come round, listen to what you want and put it all in writing, with what’s included and what isn’t. No cost, no obligation." },
  { title: "Pay in phases", text: "Renovations are split into clear phases and invoiced phase by phase, so you can see exactly what each payment covers." },
  { title: "Regular sit-downs", text: "We agree timescales and targets up front, then sit down as we go to check they’re being met." },
  { title: "No surprises", text: "If something unexpected turns up, I’ll show you and we’ll agree what to do before I carry on." },
];

export default function Prices() {
  return (
    <div style={{ "--c": renovation.color, "--pen": renovation.tint } as React.CSSProperties}>
      <JsonLd data={faqLd(priceFaqs)} />
      <PageHead
        crumbs={[{ href: "/prices", label: "Prices" }]}
        title={<>Clear prices, <span className="hl">no surprises.</span></>}
        lede="Here’s a guide to what jobs usually start from. Every home is different, so you’ll always get a written quote for yours before any work starts."
      />

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="pkg-title">
        <div className="wrap">
          <h2 id="pkg-title" className="sr-only">Renovation packages</h2>
          <div className="pkgs" data-reveal="stagger">
            {packages.map((p) => <PackageCard key={p.name} p={p} />)}
          </div>
          <p className="price-note">
            “From” prices are for a typical job and are a starting point, not a quote. Your price depends on your home, the size of the job and the finish you choose. Renovations are invoiced phase by phase, not all at once.
          </p>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="room-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="room-title">Room by room</h2>
            <p>Not doing the whole house? These can be done on their own or added to a bigger job.</p>
          </div>
          <ul className="price-rows" data-reveal="stagger">
            {roomPrices.map((r) => {
              const s = getSection(r.look)!;
              return (
                <li key={r.name} style={{ "--c": s.color } as React.CSSProperties}>
                  <Link href={r.href}>
                    <h3>{r.name}</h3>
                    <FromPrice from={r.from} unit={r.unit} />
                    <p>{r.note}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="how-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="how-title">How my pricing works</h2></div>
            <p data-reveal="up">Fair, competitive and <span className="hl">out in the open</span>.</p>
          </div>
          <div className="items" data-reveal="stagger" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {how.map((h) => (
              <div className="item" key={h.title} style={{ "--c": "var(--gold)" } as React.CSSProperties}>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="faq-title">Questions about prices</h2>
            <p>More answers on the <Link href="/faqs">FAQs page</Link>.</p>
          </div>
          <FaqList faqs={priceFaqs} />
        </div>
      </section>

      <section className="sec" aria-labelledby="ask-title">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 id="ask-title" className="big-h">Get your price</h2>
            <p className="big-p">Send me a few photos and a line about what you’d like done. I’ll come round if I need to and send you a written quote.</p>
            <p className="big-p">Or ring me on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <Closing />
    </div>
  );
}
