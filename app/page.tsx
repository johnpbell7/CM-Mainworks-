import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/Photo";
import QuoteForm from "@/components/QuoteForm";
import BeforeAfter from "@/components/BeforeAfter";
import { Arrow, Award, QuoteDoc, Shield, Team } from "@/components/Icons";
import Closing from "@/components/Closing";
import SmallerJobs from "@/components/SmallerJobs";
import Steps from "@/components/Steps";
import Benefits from "@/components/Benefits";
import PackageCard, { PriceNote } from "@/components/PackageCard";
import { business, renovation, renovationServices, sections } from "@/content/site";
import { packages } from "@/content/prices";
import { media } from "@/content/media";
import { beforeAfters } from "@/content/projects";
import { homeFaqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";
import FaqList from "@/components/FaqList";

const colorOf = (slug: string) => sections.find((s) => s.slug === slug)!.color;
const nameOf = (slug: string) => sections.find((s) => s.slug === slug)!.name;
const tintOf = (slug: string) => sections.find((s) => s.slug === slug)!.tint;

export const metadata: Metadata = pageMeta({
  title: "Home renovations across the Midlands | CM MainWorks",
  description: "I’m Connor. Full home renovations managed by one team, start to finish: kitchens, bathrooms, extensions, floors, stairs and roofs. Insured, with free written quotes.",
  path: "/",
  absolute: true,
});

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-bg">
          <Image src={media.hero.src!} alt={media.hero.alt} fill priority fetchPriority="high" sizes="100vw" />
        </div>
        <div className="wrap">
          <div>
            <h1 id="hero-title" data-hero>
              Your whole renovation, <span className="hl">one team.</span>
            </h1>
            <p className="lede" data-hero>
              Kitchens, bathrooms, extensions and whole homes across the Midlands, managed start to finish.
            </p>
            <ul className="hero-meta" data-hero aria-label="At a glance">
              <li><Team />One team, start to finish</li>
              <li><QuoteDoc />Free written quotes</li>
              <li><Shield />Insured</li>
              <li><Award />{business.experience[0].toUpperCase() + business.experience.slice(1)} in the trade</li>
            </ul>
          </div>
          <QuoteForm collapsible defaultJob={renovation.job} />
        </div>
        <p className="hero-credit">Pictured: an oak-framed garden canopy I built</p>
      </section>

      {/* ---------------- Why one team ---------------- */}
      <section className="sec" id="why" aria-labelledby="why-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up">
              <h2 id="why-title">One team. Less stress.</h2>
            </div>
            <p data-reveal="up">
              <span className="hl">I manage the whole thing</span>, so you don’t have to.
            </p>
          </div>
          <Benefits />
        </div>
      </section>

      {/* ---------------- Renovations ---------------- */}
      <section className="sec grey" id="services" aria-labelledby="svc-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up">
              <h2 id="svc-title">What I can do for your home</h2>
            </div>
            <p data-reveal="up">
              One room or the whole house, <span className="hl" data-pen="steel">planned with you</span>.
            </p>
          </div>

          <article className="feature" style={{ "--c": renovation.color, "--pen": renovation.tint } as React.CSSProperties}>
            <Link href={renovation.href} tabIndex={-1} aria-hidden="true" className="card-img">
              <Photo media={media.renovation} illo={renovation.illo} sizes="(max-width: 1080px) 100vw, 48vw" />
            </Link>
            <div data-reveal="up">
              <h3><Link href={renovation.href} style={{ textDecoration: "none" }}>Full home renovations</Link></h3>
              <p>Everything you want doing, from the first plan to the last coat of paint. One team, in clear phases.</p>
              <ul className="ticks hide-m">
                <li>Kitchens and bathrooms</li>
                <li>Extensions and knock-throughs</li>
                <li>Floors, tiling and stairs</li>
                <li>Doors, skirting and architrave</li>
                <li>Roofing</li>
                <li>Decorating, to the last coat</li>
              </ul>
              <div className="row-links">
                <Link className="link link-arrow" href={renovation.href}>How a renovation works <Arrow /></Link>
              </div>
            </div>
          </article>

          <div className="services six">
            {renovationServices.map((s) => (
              <Link className="service" key={s.slug} href={`/services/${s.slug}`} style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties} data-reveal="up">
                <Photo media={media[s.slug]} illo={s.illo} sizes="(max-width: 720px) 78vw, (max-width: 1080px) 45vw, 30vw" />
                <h3><span className="hl" data-pen={s.pen}>{s.name}</span> <Arrow /></h3>
                <p>{s.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Smaller jobs ---------------- */}
      <section className="sec" aria-labelledby="small-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up">
              <h2 id="small-title">Smaller jobs, just as welcome</h2>
            </div>
            <p data-reveal="up"><span className="hl" data-pen="oak">One sticking door</span> gets the same care.</p>
          </div>
          <SmallerJobs />
        </div>
      </section>

      {/* ---------------- Prices ---------------- */}
      <section className="sec grey" id="prices" aria-labelledby="price-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up">
              <h2 id="price-title">Prices from</h2>
            </div>
            <p data-reveal="up">
              A guide first, then <span className="hl">a written quote</span>.
            </p>
          </div>
          <div className="pkgs three swipe" data-reveal="stagger">
            {packages.slice(0, 3).map((p) => <PackageCard key={p.name} p={p} compact />)}
          </div>
          <PriceNote />
        </div>
      </section>

      {/* ---------------- Before and after ---------------- */}
      <section className="sec" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up">
              <h2 id="work-title">Before and after</h2>
            </div>
            <p data-reveal="up">
              A few of my recent jobs.{" "}
              <Link className="link link-arrow" href="/projects">All recent work <Arrow /></Link>
            </p>
          </div>
          <div className="ba-grid">
            {beforeAfters.map((w) => (
              <figure key={w.name} style={{ "--c": colorOf(w.section), "--pen": tintOf(w.section) } as React.CSSProperties}>
                <BeforeAfter before={w.before} after={w.after} label={`Compare ${w.name.toLowerCase()} before and after`} />
                <figcaption className="cap">
                  {w.href ? <Link href={w.href} style={{ textDecoration: "none" }}>{w.name}</Link> : w.name}
                  <span>{nameOf(w.section)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="sec grey" aria-labelledby="how-title">
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
      <section className={`sec about${media.portrait.src ? "" : " no-photo"}`} id="about" aria-labelledby="about-title">
        <div className="wrap">
          {media.portrait.src && <Photo media={media.portrait} sizes="(max-width: 1080px) 100vw, 45vw" />}
          <div data-reveal="up">
            <h2 id="about-title">Hi, I’m Connor.</h2>
            <p>
              {business.experience[0].toUpperCase() + business.experience.slice(1)} in the trade, from carpenter to running whole renovations. One team, and me as the person you deal with throughout.
            </p>
            <p>
              I’ll be straight with you about cost and <span className="hl" data-pen="sage">work with you to get the home you want</span>.
            </p>
            <img className="badge" src="/brand/logo/badge/cm-badge.svg" alt="" width={96} height={42} loading="lazy" />
            <Link className="link link-arrow" href="/about" style={{ display: "inline-flex", marginTop: 28 }}>More about me <Arrow /></Link>
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
            <p>Anything else, just ring or WhatsApp.</p>
            <Link className="link link-arrow" href="/faqs">All questions <Arrow /></Link>
          </div>
          <FaqList faqs={homeFaqs.slice(0, 4)} />
        </div>
      </section>

      <Closing />
    </>
  );
}
