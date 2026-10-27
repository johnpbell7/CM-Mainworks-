import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import Phases from "@/components/Phases";
import PackageCard, { PriceNote } from "@/components/PackageCard";
import QuoteForm from "@/components/QuoteForm";
import FaqList from "@/components/FaqList";
import { Arrow, Check, Cross } from "@/components/Icons";
import { business, renovation, renovationServices, smallerServices } from "@/content/site";
import { media } from "@/content/media";
import { packages } from "@/content/prices";
import { renovationFaqs } from "@/content/faqs";
import { areas } from "@/content/areas";
import { abs, businessId, faqLd, JsonLd, pageMeta, shareImage } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Full home renovations across the Midlands",
  description: "I’m Connor. Full renovations managed by one team, start to finish: kitchens, bathrooms, extensions, floors, stairs and decorating. Free written quotes.",
  path: "/renovations",
  image: shareImage("renovations", "CM MainWorks: Full home renovations, one team"),
});

const usual = [
  "Finding and booking five or six trades",
  "Waiting when someone doesn’t turn up",
  "Every firm adding its own margin",
  "Nobody responsible for the whole job",
  "No idea if it’s on time or budget",
];
const ours = [
  "One person to deal with throughout",
  "Clear phases that keep the job moving",
  "One written quote, paid phase by phase",
  "One team responsible for the result",
  "Regular sit-downs to check progress",
];


export default function Renovations() {
  const [full, ...rest] = packages;
  return (
    <div style={{ "--c": renovation.color, "--pen": renovation.tint } as React.CSSProperties}>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Full home renovations",
            serviceType: "Home renovation",
            description: business.pitch,
            url: abs("/renovations"),
            provider: { "@id": businessId },
            areaServed: areas.map((a) => ({ "@type": "City", name: a.name })),
          },
          faqLd(renovationFaqs),
        ]}
      />

      <PageHead
        crumbs={[{ href: "/renovations", label: "Renovations" }]}
        title={<>Your whole renovation, <span className="hl">one team.</span></>}
        lede="Kitchens, bathrooms, extensions, floors, stairs and decorating, planned with you and managed by me in clear phases."
      />

      <section className="sec" style={{ paddingTop: 0 }} aria-label="How I work">
        <div className="wrap">
          <div className="svc-row" style={{ borderTop: 0, paddingTop: 0 }}>
            <Photo media={media.renovation} illo={renovation.illo} sizes="(max-width: 720px) 100vw, 50vw" priority />
            <div className="prose" data-reveal="up">
              <p>Renovating is exciting. Managing it is stressful: finding trades, getting the order right, chasing no-shows.</p>
              <p>That’s the part I take off your hands. One team, one person to ring and one written quote, paid phase by phase.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="cmp-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="cmp-title">The usual way, or my way</h2></div>
            <p data-reveal="up">Same job, very different few months.</p>
          </div>
          <div className="compare" data-reveal="stagger">
            <div className="usual">
              <h3>Managing it yourself</h3>
              <ul>{usual.map((u) => <li key={u}><Cross />{u}</li>)}</ul>
            </div>
            <div className="ours">
              <h3>With CM MainWorks</h3>
              <ul>{ours.map((u) => <li key={u}><Check />{u}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="inc-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="inc-title">What your renovation can include</h2></div>
            <p data-reveal="up">One room or the whole house, <span className="hl">all managed by me</span>.</p>
          </div>
          <ul className="incl" data-reveal="stagger">
            {[...renovationServices, ...smallerServices.filter((s) => s.slug !== "carpentry")].map((s) => (
              <li key={s.slug} style={{ "--c": s.color } as React.CSSProperties}>
                <Link href={`/services/${s.slug}`}>{s.name} <Arrow /></Link>
              </li>
            ))}
            <li><span>Electrics, plumbing and plastering, organised for you</span></li>
          </ul>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="how-title">
        <div className="wrap">
          <Phases titleId="how-title" />
        </div>
      </section>

      <section className="sec" aria-labelledby="pkg-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="pkg-title">Prices from</h2></div>
            <p data-reveal="up">A guide first, then a written quote.</p>
          </div>
          <div className="pkgs three swipe" data-reveal="stagger">
            {[full, ...rest.slice(0, 2)].map((p) => <PackageCard key={p.name} p={p} compact />)}
          </div>
          <PriceNote />
        </div>
      </section>

      <section className="sec grey" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="faq-title">Renovation questions</h2>
          </div>
          <FaqList faqs={renovationFaqs} />
        </div>
      </section>

      <section className="sec" aria-labelledby="ask-title">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 id="ask-title" className="big-h">Let’s talk about your home</h2>
            <p className="big-p">A rough idea is plenty. I’ll come round and put together a plan and a written quote.</p>
            <p className="big-p">Or ring me on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
          </div>
          <QuoteForm defaultJob={renovation.job} />
        </div>
      </section>

    </div>
  );
}
