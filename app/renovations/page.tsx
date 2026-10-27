import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import Phases from "@/components/Phases";
import PackageCard, { PriceNote } from "@/components/PackageCard";
import QuoteForm from "@/components/QuoteForm";
import FaqList from "@/components/FaqList";
import { Check, Cross } from "@/components/Icons";
import { business, getSection, renovation, type SectionSlug } from "@/content/site";
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
// A full renovation is every job Connor also does on its own, joined up. In the
// order they usually come in a job; each card is tapped through to its service page.
const trades: { slug: SectionSlug; stage: string; text: string }[] = [
  { slug: "extensions", stage: "Structure", text: "More room, built first so everything else can follow." },
  { slug: "roofing", stage: "Structure", text: "A sound roof over the new work." },
  { slug: "kitchens", stage: "Fitting", text: "Old kitchen out, new one fitted level and square." },
  { slug: "bathrooms", stage: "Fitting", text: "Strip-out to tiling and the final seal." },
  { slug: "flooring-and-tiling", stage: "Fitting", text: "Floors levelled and laid, walls and floors tiled." },
  { slug: "staircases", stage: "Fitting", text: "Stairs, doors, skirting and architrave." },
  { slug: "carpentry", stage: "Throughout", text: "Boxing-in, trims and the woodwork in between." },
  { slug: "joinery", stage: "Finishing", text: "Media walls, alcove units and built-in storage." },
  { slug: "decorating", stage: "Finishing", text: "Every room painted, right through to the last coat." },
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
        lede="Every trade I do, in one job: kitchens, bathrooms, extensions, floors, stairs and decorating, managed by me in clear phases."
      />

      <section className="sec" style={{ paddingTop: 0 }} aria-label="How I work">
        <div className="wrap">
          <div className="svc-row" style={{ borderTop: 0, paddingTop: 0 }}>
            <Photo media={media.renovation} illo={renovation.illo} sizes="(max-width: 720px) 100vw, 50vw" priority />
            <div className="prose" data-reveal="up">
              <p>Renovating is exciting. Managing it is stressful: finding trades, getting the order right, chasing no-shows.</p>
              <p>A full renovation is really every job I do on its own, joined up: the extension, the kitchen and bathroom, floors, stairs, doors, joinery and decorating.</p>
              <p>So I take the managing off your hands too. One team, one person to ring and one written quote, paid phase by phase.</p>
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
            <div data-reveal="up"><h2 id="inc-title">Every trade I do, in one renovation</h2></div>
            <p data-reveal="up">I take on each of these as a job by itself. A renovation is <span className="hl">all of them, joined up</span>.</p>
          </div>
          <div className="trades" data-reveal="stagger">
            {trades.map((t) => {
              const s = getSection(t.slug)!;
              return (
                <Link className="trade" key={s.slug} href={`/services/${s.slug}`} style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
                  <Photo media={media[s.slug]} illo={s.illo} sizes="(max-width: 1080px) 50vw, 33vw" />
                  <span className="proj-tag">{t.stage}</span>
                  <h3>{s.name}</h3>
                  <p>{t.text}</p>
                </Link>
              );
            })}
          </div>
          <p className="more-note">Any specialist trades the job needs are organised by me, so you still only deal with one person.</p>
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
