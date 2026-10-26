import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import Closing from "@/components/Closing";
import { business, sections } from "@/content/site";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "About Connor",
  description: "Connor runs CM MainWorks, a carpentry and construction business based in Lichfield.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHead title={<>Hi, I’m <span className="hl">Connor.</span></>} lede="I run CM MainWorks, a carpentry and construction business based in Lichfield." />
      <section className="sec about" style={{ paddingTop: 0, borderTop: 0 }}>
        <div className="wrap">
          <Photo media={media.portrait} sizes="(max-width: 1080px) 100vw, 45vw" />
          <div data-reveal="up">
            {/* DRAFT copy for Connor to approve. Do not add insurance, qualifications or reviews until he confirms them. */}
            <p>I’ve spent {business.experience} in the trade, doing everything from hanging a single door to building extensions. Whatever the size of the job, you deal with me from the first visit to the final clean-up.</p>
            <p>I’d rather <span className="hl" data-pen="sage">do one job properly than rush three</span>, and I don’t leave until it’s right. You’ll know the price before any work starts, and the place is left tidy when it’s done.</p>
            <p>I work across Lichfield and {business.region}, including {business.areas.slice(1).join(", ")}.</p>
            <img className="badge" src="/brand/logo/badge/cm-badge.svg" alt="" width={96} height={42} loading="lazy" />
            <p className="draft">Draft copy, waiting on Connor’s approval.</p>
          </div>
        </div>
      </section>
      <section className="sec grey">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2>What I do</h2></div>
          </div>
          <div className="faq">
            {sections.map((s) => (
              <div key={s.slug} style={{ "--c": s.color } as React.CSSProperties}>
                <h3>{s.name}</h3>
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
