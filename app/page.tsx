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
import PackageCard from "@/components/PackageCard";
import { business, renovation, renovationServices, sections } from "@/content/site";
import { packages } from "@/content/prices";
import { media } from "@/content/media";
import { publishedProjects } from "@/content/projects";
import { homeFaqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";
import FaqList from "@/components/FaqList";

const colorOf = (slug: string) => sections.find((s) => s.slug === slug)!.color;
const nameOf = (slug: string) => sections.find((s) => s.slug === slug)!.name;

export const metadata: Metadata = pageMeta({
  title: "Home renovations in Lichfield and the Midlands | CM MainWorks",
  description: "I’m Connor. Full home renovations managed by one team, start to finish: kitchens, bathrooms, extensions, floors, stairs and roofs. Insured, with free written quotes.",
  path: "/",
  absolute: true,
});

export default function Home() {
  // Only real jobs on the homepage; placeholders stay off until photos arrive.
  const [lead, ...rest] = publishedProjects;
  const side = rest.slice(0, 2);
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
              Kitchens, bathrooms, extensions and full home renovations across Lichfield and the Midlands, managed by me from start to finish.
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
              Renovating should be exciting, not a second job. <span className="hl">I manage the whole thing</span>, so you don’t have to.
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
              One room or the whole house, <span className="hl" data-pen="steel">planned with you</span> and finished properly.
            </p>
          </div>

          <article className="feature" style={{ "--c": renovation.color, "--pen": renovation.tint } as React.CSSProperties}>
            <Link href={renovation.href} tabIndex={-1} aria-hidden="true" className="card-img">
              <Photo media={media.renovation} illo={renovation.illo} sizes="(max-width: 1080px) 100vw, 48vw" />
            </Link>
            <div data-reveal="up">
              <h3><Link href={renovation.href} style={{ textDecoration: "none" }}>Full home renovations</Link></h3>
              <p>Everything you want doing, from the first plan to the final coat of paint. One team, clear phases, and regular sit-downs so you always know where things stand.</p>
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
            <p data-reveal="up">Renovations are my main work, but <span className="hl" data-pen="oak">one sticking door</span> still gets the same care.</p>
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
              A guide to get you started, then <span className="hl">a written quote for your home</span>.
            </p>
          </div>
          <div className="pkgs three swipe" data-reveal="stagger">
            {packages.slice(0, 3).map((p) => <PackageCard key={p.name} p={p} compact />)}
          </div>
        </div>
      </section>

      {/* ---------------- Recent work ---------------- */}
      <section className="sec" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up">
              <h2 id="work-title">Recent work</h2>
            </div>
            <p data-reveal="up">
              {side.length ? "A few of my recent jobs." : "One of my recent jobs."}
            </p>
          </div>
          <div className={`work${side.length ? "" : " solo"}`}>
            <figure>
              {lead.before.src && lead.after.src ? (
                <BeforeAfter before={lead.before} after={lead.after} />
              ) : (
                <Link href={`/projects/${lead.slug}`} aria-label={`${lead.name}, ${nameOf(lead.section)}`}>
                  <Photo media={lead.after} sizes="(max-width: 1080px) 100vw, 60vw" />
                </Link>
              )}
              <figcaption className="cap">{lead.name} <span style={{ "--c": colorOf(lead.section) } as React.CSSProperties}>{nameOf(lead.section)}</span></figcaption>
            </figure>
            {side.length > 0 && (
              <div className="side">
                {side.map((p) => (
                  <figure key={p.slug}>
                    <Link href={`/projects/${p.slug}`} aria-label={`${p.name}, ${nameOf(p.section)}`}>
                      <Photo media={p.gallery[0]} sizes="(max-width: 720px) 78vw, (max-width: 1080px) 45vw, 36vw" />
                    </Link>
                    <figcaption className="cap">{p.name} <span style={{ "--c": colorOf(p.section) } as React.CSSProperties}>{nameOf(p.section)}</span></figcaption>
                  </figure>
                ))}
              </div>
            )}
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
              I run CM MainWorks from Lichfield, with {business.experience} in the trade. I started as a carpenter, and now I manage whole renovations:
              one team, with the trades I trust, and me as the one person you deal with from the first visit to the final clean-up.
            </p>
            <p>
              I’ll listen, be straight with you about cost, and <span className="hl" data-pen="sage">work with you to get the home you want</span>. I don’t leave until it’s right.
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
            <p>What people usually ask me first. Anything else, just ring or WhatsApp. I’m always happy to talk.</p>
            <Link className="link link-arrow" href="/faqs">All questions <Arrow /></Link>
          </div>
          <FaqList faqs={homeFaqs.slice(0, 4)} />
        </div>
      </section>

      <Closing />
    </>
  );
}
