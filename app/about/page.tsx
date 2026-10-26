import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import Closing from "@/components/Closing";
import { Arrow } from "@/components/Icons";
import { business, sections } from "@/content/site";
import { media } from "@/content/media";
import { areas } from "@/content/areas";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About me",
  description: `I’m Connor. I run CM MainWorks, a carpentry and construction business in Lichfield, with ${business.experience} in the trade. You deal with me from start to finish.`,
  path: "/about",
});

const promises = [
  { h: "You’ll know the price first", p: "A clear, written quote before I start anything.", c: "var(--oak)" },
  { h: "You deal with me", p: "From the first visit to the final clean-up. No passing you between people.", c: "var(--steel)" },
  { h: "I turn up when I say", p: "We agree a start date and I stick to it.", c: "var(--sage)" },
  { h: "I leave it tidy", p: "Dust sheets down while I work, and swept up before I go.", c: "var(--brick)" },
];

export default function About() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/about", label: "About" }]}
        title={<>Hi, I’m <span className="hl">Connor.</span></>}
        lede="I run CM MainWorks, a carpentry and construction business based in Lichfield."
      />

      <section className="sec about" style={{ paddingTop: 0, borderTop: 0 }} aria-labelledby="story-title">
        <div className="wrap">
          <Photo media={media.portrait} sizes="(max-width: 1080px) 100vw, 45vw" />
          <div data-reveal="up">
            {/* DRAFT copy for Connor to approve. Do not add insurance, qualifications or reviews until he confirms them. */}
            <h2 id="story-title" className="mid-h">How I work</h2>
            <p>I’ve been in the trade {business.experience}. In that time I’ve hung more doors than I could count, fitted kitchens, built extensions and painted an awful lot of skirting board.</p>
            <p>With CM MainWorks you deal with me from start to finish. I do the carpentry, the joinery, the building and the decorating, so a job doesn’t get passed between four different people, and there’s no one else to chase.</p>
            <p>I’d rather <span className="hl" data-pen="sage">do one job properly than rush three</span>. If something’s not right, I’ll put it right before I go.</p>
            <img className="badge" src="/brand/logo/badge/cm-badge.svg" alt="CM MainWorks badge" width={96} height={42} loading="lazy" />
            <p className="draft">Draft copy, waiting on Connor’s approval.</p>
          </div>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="promise-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="promise-title">What you can expect</h2></div>
          </div>
          <div className="items" data-reveal="stagger">
            {promises.map((x) => (
              <div className="item" key={x.h} style={{ "--c": x.c } as React.CSSProperties}>
                <h3>{x.h}</h3>
                <p>{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="review-title">
        <div className="wrap">
          <h2 id="review-title" className="sr-only">What a customer said</h2>
          <figure className="review-block" data-reveal="up">
            <blockquote>“{business.review.quote}”</blockquote>
            <figcaption><strong>{business.review.name}</strong> {business.review.job}, via {business.review.source}</figcaption>
          </figure>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="do-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="do-title">What I do</h2></div>
            <p data-reveal="up">Across {areas.slice(0, -1).map((a) => a.name).join(", ")} and {areas[areas.length - 1].name}.</p>
          </div>
          <div className="items" data-reveal="stagger">
            {sections.map((s) => (
              <div className="item" key={s.slug} style={{ "--c": s.color } as React.CSSProperties}>
                <h3><Link href={`/services/${s.slug}`}>{s.name}</Link></h3>
                <p>{s.blurb}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 36 }}><Link className="link link-arrow" href="/areas">Where I work <Arrow /></Link></p>
        </div>
      </section>
      <Closing />
    </>
  );
}
