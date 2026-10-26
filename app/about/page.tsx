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
  title: "About Connor",
  description: `Connor runs CM MainWorks, a carpentry and construction business based in Lichfield, with ${business.experience} in the trade. One person from first visit to final clean-up.`,
  path: "/about",
});

const promises = [
  { h: "You know the price first", p: "A clear, written quote before any work starts.", c: "var(--oak)" },
  { h: "One person, start to finish", p: "You deal with Connor from the first visit to the final clean-up.", c: "var(--steel)" },
  { h: "Turns up when he says", p: "Work starts on the date you agree.", c: "var(--sage)" },
  { h: "Left tidy", p: "The place is cleaned up when the job’s finished.", c: "var(--brick)" },
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
            <h2 id="story-title" className="mid-h">Built on doing the job properly</h2>
            <p>I’ve spent {business.experience} in the trade, doing everything from hanging a single door to building extensions. Whether it’s a small repair or a full transformation, every job gets the same attention to detail and the same pride in the finish.</p>
            <p>I’d rather <span className="hl" data-pen="sage">do one job properly than rush three</span>, and I don’t leave until it’s right.</p>
            <p>Because I cover carpentry, joinery, building and decorating, one job doesn’t need four different people. You deal with me from the first visit to the final clean-up.</p>
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
          <p style={{ marginTop: 36 }}><Link className="link link-arrow" href="/areas">Areas I cover <Arrow /></Link></p>
        </div>
      </section>
      <Closing />
    </>
  );
}
