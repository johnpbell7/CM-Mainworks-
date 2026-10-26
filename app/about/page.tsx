import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import Closing from "@/components/Closing";
import { business, renovation, sections } from "@/content/site";
import { media } from "@/content/media";
import { areas } from "@/content/areas";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About me",
  description: `I’m Connor. I run CM MainWorks, managing full home renovations with one team across Lichfield and the Midlands, with ${business.experience} in the trade.`,
  path: "/about",
});

const promises = [
  { h: "I’ll listen first", p: "Your home, your budget, your plans. I’ll help you get there, not push my ideas on you.", c: "var(--gold)" },
  { h: "You’ll know the price first", p: "A clear, written quote before I start anything, and no surprises on the bill.", c: "var(--oak)" },
  { h: "You deal with me", p: "One team, and one person to ring from the first visit to the final clean-up.", c: "var(--steel)" },
  { h: "I’m insured", p: "Happy to show you the details before I start.", c: "var(--ink-3)" },
  { h: "I turn up when I say", p: "We agree a start date and I stick to it.", c: "var(--sage)" },
  { h: "I leave it tidy", p: "Dust sheets down while I work, and swept up before I go.", c: "var(--brick)" },
];

export default function About() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/about", label: "About" }]}
        title={<>Hi, I’m <span className="hl">Connor.</span></>}
        lede="I run CM MainWorks from Lichfield. I manage home renovations from start to finish, so you get the home you want without the stress of running it yourself."
      />

      <section className="sec about" style={{ paddingTop: 0, borderTop: 0 }} aria-labelledby="story-title">
        <div className="wrap">
          <Photo media={media.portrait} sizes="(max-width: 1080px) 100vw, 45vw" />
          <div data-reveal="up">
            {/* DRAFT copy for Connor to approve. Do not add insurance, qualifications or reviews until he confirms them. */}
            <h2 id="story-title" className="mid-h">How I work</h2>
            <p>I’ve been in the trade {business.experience}. I started as a carpenter, hanging doors and fitting kitchens, and along the way I saw how stressful renovations can be for the people living through them. Too many trades, nobody in charge, and the homeowner stuck in the middle.</p>
            <p>So that’s what I do differently. I manage the whole job with one team: my labourers, the trades I trust for things like electrics and plumbing, and me on site running it. You’ve got one person to ring and one written quote, and I keep you updated as we go.</p>
            <p>I’m friendly, I’m straight with people about cost, and I’ll <span className="hl" data-pen="sage">work with you to get the home you want</span>. If something’s not right, I’ll put it right before I go.</p>
            <p><Link className="link link-arrow" href={renovation.href}>How a renovation works with me</Link></p>
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
            <div className="item" style={{ "--c": renovation.color } as React.CSSProperties}>
              <h3><Link href={renovation.href}>{renovation.name}</Link></h3>
              <p>The whole job, managed by one team from start to finish.</p>
            </div>
            {sections.map((s) => (
              <div className="item" key={s.slug} style={{ "--c": s.color } as React.CSSProperties}>
                <h3><Link href={`/services/${s.slug}`}>{s.name}</Link></h3>
                <p>{s.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Closing />
    </>
  );
}
