import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import Closing from "@/components/Closing";
import SmallerJobs from "@/components/SmallerJobs";
import { Arrow } from "@/components/Icons";
import { renovation, renovationServices, type Section } from "@/content/site";
import { media } from "@/content/media";
import { serviceContent } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Renovation services: kitchens, bathrooms, extensions and more",
  description: "I’m Connor. Full renovations, extensions, kitchens, bathrooms, stairs, floors, roofing and decorating across the Midlands, managed by one team.",
  path: "/services",
});

function Row({ s }: { s: Section }) {
  return (
    <article className="svc-row" style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
      <Photo media={media[s.slug]} illo={s.illo} sizes="(max-width: 720px) 100vw, 50vw" />
      <div data-reveal="up">
        <h2><span className="hl" data-pen={s.pen}>{s.name}</span></h2>
        <p>{s.intro}</p>
        <ul className="ticks">
          {serviceContent[s.slug].items.slice(0, 4).map((e) => <li key={e.title}>{e.title}</li>)}
        </ul>
        <div className="row-links">
          <Link className="link link-arrow" style={{ "--u": s.color } as React.CSSProperties} href={`/services/${s.slug}`}>More on {s.name.toLowerCase()} <Arrow /></Link>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/services", label: "Services" }]}
        title={<>Everything your home needs, <span className="hl">one team.</span></>}
        lede="Whole renovations are my main work, all managed by me. Smaller jobs are welcome too."
      />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap svc-rows">
          <article className="svc-row" style={{ "--c": renovation.color, "--pen": renovation.tint, borderTop: 0 } as React.CSSProperties}>
            <Photo media={media.renovation} illo={renovation.illo} sizes="(max-width: 720px) 100vw, 50vw" priority />
            <div data-reveal="up">
              <h2><span className="hl">Full home renovations</span></h2>
              <p>The whole job, planned with you and managed by me. One team, one written quote.</p>
              <ul className="ticks">
                <li>One person to deal with throughout</li>
                <li>Specialist trades organised for you</li>
                <li>A clear, written quote before work starts</li>
                <li>Clear phases, invoiced phase by phase</li>
              </ul>
              <div className="row-links">
                <Link className="link link-arrow" href={renovation.href}>How a renovation works <Arrow /></Link>
              </div>
            </div>
          </article>
          {renovationServices.map((s) => <Row key={s.slug} s={s} />)}
        </div>
      </section>
      <section className="sec grey" aria-labelledby="small-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="small-title">Smaller jobs</h2></div>
            <p data-reveal="up"><span className="hl" data-pen="oak">Just as welcome.</span></p>
          </div>
          <SmallerJobs />
        </div>
      </section>
      <Closing />
    </>
  );
}
