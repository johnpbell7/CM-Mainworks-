import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import Closing from "@/components/Closing";
import { Arrow } from "@/components/Icons";
import { sections } from "@/content/site";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Services",
  description: "Carpentry, building, joinery and decorating in Lichfield and nearby, with one person looking after the job from start to finish.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHead
        title={<>Four trades, <span className="hl">one person</span> looking after the job.</>}
        lede="From a single door to a full extension. Whatever you need doing, you deal with Connor from the first visit to the final clean-up."
      />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap svc-rows">
          {sections.map((s) => (
            <article className="svc-row" key={s.slug} style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
              <Photo media={media[s.slug]} illo={s.slug} sizes="(max-width: 720px) 100vw, 50vw" />
              <div data-reveal="up">
                <h2><span className="hl" data-pen={s.pen}>{s.name}</span></h2>
                <p>{s.intro}</p>
                <ul className="ticks">
                  {s.examples.slice(0, 4).map((e) => <li key={e}>{e}</li>)}
                </ul>
                <div className="row-links">
                  <Link className="link link-arrow" style={{ "--u": s.color } as React.CSSProperties} href={`/services/${s.slug}`}>More on {s.name.toLowerCase()} <Arrow /></Link>
                  <Link className="link" style={{ "--u": s.color } as React.CSSProperties} href={`/contact?job=${s.name}#quote`}>Ask about {s.name.toLowerCase()}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
