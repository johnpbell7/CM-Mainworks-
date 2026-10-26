import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/Photo";
import QuoteForm from "@/components/QuoteForm";
import BeforeAfter from "@/components/BeforeAfter";
import { Arrow } from "@/components/Icons";
import Closing from "@/components/Closing";
import Steps from "@/components/Steps";
import { business, sections } from "@/content/site";
import { media } from "@/content/media";
import { projects } from "@/content/projects";
import { homeFaqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";
import FaqList from "@/components/FaqList";

const colorOf = (slug: string) => sections.find((s) => s.slug === slug)!.color;
const nameOf = (slug: string) => sections.find((s) => s.slug === slug)!.name;

export const metadata: Metadata = pageMeta({
  title: "Carpenter and builder in Lichfield | CM MainWorks",
  description: "Carpentry, building, joinery and decorating in Lichfield, Burntwood, Tamworth and nearby. Send Connor a few photos for a free, written quote.",
  path: "/",
  absolute: true,
});

export default function Home() {
  const [lead, ...rest] = projects;
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-bg">
          <Image src={media.hero.src!} alt={media.hero.alt} fill priority sizes="100vw" />
        </div>
        <div className="wrap">
          <div>
            <h1 id="hero-title" data-hero>
              Carpentry and construction, <span className="hl">done properly.</span>
            </h1>
            <p className="lede" data-hero>
              Doors, staircases, kitchens, fitted furniture and building work across Lichfield and the villages around it.
            </p>
            <ul className="hero-meta" data-hero aria-label="At a glance">
              <li>Free, written quotes</li>
              <li>{business.experience[0].toUpperCase() + business.experience.slice(1)} in the trade</li>
              <li>Lichfield and {business.region}</li>
            </ul>
          </div>
          <QuoteForm collapsible />
        </div>
        <p className="hero-credit">Pictured: an oak-framed garden canopy by CM MainWorks</p>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="sec" id="services" aria-labelledby="svc-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up">
              <h2 id="svc-title">Services</h2>
            </div>
            <p data-reveal="up">
              From a single door to a full extension, with <span className="hl">one person looking after the job</span> from start to finish.
            </p>
          </div>
          <div className="services">
            {sections.map((s, i) => (
              <article className="service" key={s.slug} style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties} data-reveal="up">
                <Link href={`/services/${s.slug}`} tabIndex={-1} aria-hidden="true" className="card-img">
                  <Photo media={media[s.slug]} illo={s.slug} sizes="(max-width: 720px) 78vw, (max-width: 1080px) 45vw, 24vw" />
                </Link>
                <p className="num">0{i + 1}</p>
                <h3>
                  <Link href={`/services/${s.slug}`}><span className="hl" data-pen={s.pen}>{s.name}</span></Link>
                </h3>
                <p>{s.blurb}</p>
                <Link className="ask link-arrow" href={`/services/${s.slug}`}>More about {s.name.toLowerCase()} <Arrow /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Recent work ---------------- */}
      <section className="sec grey" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up">
              <h2 id="work-title">Recent work</h2>
            </div>
            <p data-reveal="up">
              A few of Connor’s recent jobs, before and after.{" "}
              <Link className="link link-arrow" href="/projects">See all projects <Arrow /></Link>
            </p>
          </div>
          <div className="work">
            <figure>
              <BeforeAfter before={lead.before} after={lead.after} />
              <figcaption className="cap">{lead.name} <span style={{ color: colorOf(lead.section) }}>{nameOf(lead.section)}</span></figcaption>
            </figure>
            <div className="side">
              {rest.slice(0, 2).map((p) => (
                <figure key={p.slug}>
                  {p.placeholder ? (
                    <Photo media={p.gallery[0]} sizes="(max-width: 720px) 78vw, (max-width: 1080px) 45vw, 36vw" />
                  ) : (
                    <Link href={`/projects/${p.slug}`} aria-label={`${p.name}, ${nameOf(p.section)}`}>
                      <Photo media={p.gallery[0]} sizes="(max-width: 720px) 78vw, (max-width: 1080px) 45vw, 36vw" />
                    </Link>
                  )}
                  <figcaption className="cap">{p.name} <span style={{ color: colorOf(p.section) }}>{nameOf(p.section)}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="sec" aria-labelledby="how-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up">
              <h2 id="how-title">How it works</h2>
            </div>
            <p data-reveal="up">You know <span className="hl" data-pen="steel">the price before any work starts</span>.</p>
          </div>
          <Steps />
        </div>
      </section>

      {/* ---------------- About ---------------- */}
      <section className="sec about" id="about" aria-labelledby="about-title">
        <div className="wrap">
          <Photo media={media.portrait} sizes="(max-width: 1080px) 100vw, 45vw" />
          <div data-reveal="up">
            <h2 id="about-title">Hi, I’m Connor.</h2>
            <p>
              I run CM MainWorks, a carpentry and construction business based in Lichfield, with {business.experience} in the trade.
              Whatever the size of the job, you deal with me from the first visit to the final clean-up.
            </p>
            <p>
              I’d rather <span className="hl" data-pen="sage">do one job properly than rush three</span>, and I don’t leave until it’s right.
            </p>
            <img className="badge" src="/brand/logo/badge/cm-badge.svg" alt="" width={96} height={42} loading="lazy" />
            <Link className="link link-arrow" href="/about" style={{ display: "inline-flex", marginTop: 28 }}>More about Connor <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* ---------------- Review ---------------- */}
      <section className="sec reviews" aria-labelledby="rev-title">
        <div className="reviews-bg" aria-hidden="true">
          <Image src={media.reviews.src!} alt={media.reviews.alt} fill sizes="100vw" loading="lazy" />
        </div>
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="rev-title">What customers say</h2></div>
          </div>
          <figure data-reveal="up">
            <blockquote className="quote-big">
              {(() => {
                const { quote, highlight } = business.review;
                const [a, b] = quote.split(highlight);
                return <>{a}<span className="hl">{highlight}</span>{b}</>;
              })()}
            </blockquote>
            <figcaption className="quote-by">
              <strong>{business.review.name}</strong>
              <span>{business.review.job}, via {business.review.source}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------- FAQs ---------------- */}
      <section className="sec" id="faq" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="faq-title">FAQs</h2>
            <p>Quick answers to what people usually ask. Anything else, just call or WhatsApp.</p>
            <Link className="link link-arrow" href="/faqs">All questions <Arrow /></Link>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      <Closing />
    </>
  );
}
