import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import Phases from "@/components/Phases";
import PackageCard from "@/components/PackageCard";
import QuoteForm from "@/components/QuoteForm";
import FaqList from "@/components/FaqList";
import { Arrow, Check, Cross } from "@/components/Icons";
import { business, renovation, renovationServices, smallerServices } from "@/content/site";
import { media } from "@/content/media";
import { packages } from "@/content/prices";
import { renovationFaqs } from "@/content/faqs";
import { areas } from "@/content/areas";
import { abs, businessId, faqLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Full home renovations in Lichfield and the Midlands",
  description: "I’m Connor. Full home renovations managed by one team from start to finish: kitchens, bathrooms, extensions, floors, stairs and decorating. Free written quotes.",
  path: "/renovations",
});

const usual = [
  "Finding, vetting and booking five or six different trades",
  "Working out who goes first, and waiting when someone doesn’t turn up",
  "Each firm adding its own margin to the bill",
  "Nobody responsible when one trade’s work affects another’s",
  "No real idea whether it’s on time or on budget",
  "You, managing it all around work and family",
];
const ours = [
  "One person to deal with, from the first visit to the final clean",
  "The work planned in clear phases, so the job keeps moving",
  "One clear, written quote, invoiced phase by phase",
  "Regular sit-downs to check timescales and targets",
  "One team responsible for the finished result",
  "You get on with your life, and we sit down regularly to check progress",
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
        lede="Kitchens, bathrooms, extensions, floors, stairs and decorating, planned with you and managed by me in clear phases from start to finish. Less stress, a fair price, and a home you’ll love."
      />

      <section className="sec" style={{ paddingTop: 0 }} aria-label="How I work">
        <div className="wrap">
          <div className="svc-row" style={{ borderTop: 0, paddingTop: 0 }}>
            <Photo media={media.renovation} illo={renovation.illo} sizes="(max-width: 720px) 100vw, 50vw" priority />
            <div className="prose" data-reveal="up">
              <p>Renovating is exciting, but managing it is stressful: finding trades, getting them in the right order and chasing the ones who don’t turn up.</p>
              <p>That’s the part I take off your hands. One team, one person to ring and one written quote. We work in clear phases, invoiced phase by phase, and sit down regularly to check we’re on track.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="cmp-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="cmp-title">The usual way, or my way</h2></div>
            <p data-reveal="up">Same renovation. Very different few months.</p>
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
            <p data-reveal="up">Pick one room or the whole house. It’s all <span className="hl">managed by me</span>.</p>
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
            <p data-reveal="up">A guide to get you started, then a written quote for your home.</p>
          </div>
          <div className="pkgs three swipe" data-reveal="stagger">
            {[full, ...rest.slice(0, 2)].map((p) => <PackageCard key={p.name} p={p} compact />)}
          </div>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="faq-title">Renovation questions</h2>
            <p>The things people ask me before they start. More on the <Link href="/faqs">FAQs page</Link>.</p>
          </div>
          <FaqList faqs={renovationFaqs} />
        </div>
      </section>

      <section className="sec" aria-labelledby="ask-title">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 id="ask-title" className="big-h">Let’s talk about your home</h2>
            <p className="big-p">Tell me what you’re thinking, even if it’s only a rough idea. I’ll come round, listen, and put together a plan and a written quote.</p>
            <p className="big-p">Or ring me on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
          </div>
          <QuoteForm defaultJob={renovation.job} />
        </div>
      </section>

    </div>
  );
}
