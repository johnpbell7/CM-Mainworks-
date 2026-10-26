import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import Closing from "@/components/Closing";
import { Arrow } from "@/components/Icons";
import { sections } from "@/content/site";
import { media } from "@/content/media";
import { serviceContent } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Carpentry, building, joinery and decorating",
  description: "I’m Connor. Carpentry, building, joinery and decorating across Lichfield and the Midlands, run by me from start to finish. Insured, with free written quotes.",
  path: "/services",
});

export default function Services() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/services", label: "Services" }]}
        title={<>Four trades, <span className="hl">one person</span> in charge.</>}
        lede="One door or a full extension, I run the job and you deal with me. On bigger jobs I bring in labourers I trust."
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
                  {serviceContent[s.slug].items.slice(0, 4).map((e) => <li key={e.title}>{e.title}</li>)}
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
