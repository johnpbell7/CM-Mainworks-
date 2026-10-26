import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import QuoteForm from "@/components/QuoteForm";
import Steps from "@/components/Steps";
import { areas, getArea } from "@/content/areas";
import { business, getSection } from "@/content/site";
import { media } from "@/content/media";
import { abs, businessId, JsonLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  return pageMeta({ title: a.title, description: a.description, path: `/areas/${a.slug}` });
}

export default async function AreaPage({ params }: Props) {
  const a = getArea((await params).slug);
  if (!a) notFound();
  const lead = getSection(a.focus[0].service)!;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Carpentry and building in ${a.name}`,
          serviceType: ["Carpentry", "Building", "Joinery", "Decorating"],
          description: a.description,
          url: abs(`/areas/${a.slug}`),
          provider: { "@id": businessId },
          areaServed: { "@type": "City", name: a.name },
        }}
      />
      <PageHead
        crumbs={[{ href: "/areas", label: "Areas" }, { href: `/areas/${a.slug}`, label: a.name }]}
        title={<>Carpenter and builder in <span className="hl">{a.name}</span></>}
        lede={a.intro}
      />

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="local-title">
        <div className="wrap">
          <div className="svc-row" style={{ borderTop: 0, paddingTop: 0, "--c": lead.color, "--pen": lead.tint } as React.CSSProperties}>
            <Photo media={media[lead.slug]} illo={lead.slug} sizes="(max-width: 720px) 100vw, 50vw" />
            <div className="prose" data-reveal="up">
              <h2 id="local-title" className="mid-h">Homes in {a.name}</h2>
              <p>{a.local}</p>
              <ul className="facts">
                <li><span>Where</span>{a.where[0].toUpperCase() + a.where.slice(1)}</li>
                <li><span>Quotes</span>Free and written, with no obligation</li>
                <li><span>Who you deal with</span>{business.owner}, from first visit to final clean-up</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="work-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="work-title">Work Connor does in {a.name}</h2></div>
            <p data-reveal="up">Carpentry, building, joinery and decorating, so one person can see the whole job through.</p>
          </div>
          <div className="items" data-reveal="stagger">
            {a.focus.map((f) => {
              const s = getSection(f.service)!;
              return (
                <div className="item" key={f.service} style={{ "--c": s.color } as React.CSSProperties}>
                  <h3><Link href={`/services/${s.slug}`}>{s.name} in {a.name}</Link></h3>
                  <p>{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="how-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="how-title">How it works</h2></div>
            <p data-reveal="up">You know <span className="hl" data-pen="steel">the price before any work starts</span>.</p>
          </div>
          <Steps />
        </div>
      </section>

      <section className="sec" aria-labelledby="ask-title">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 id="ask-title" className="big-h">Get a free quote in {a.name}</h2>
            <p className="big-p">Send a few photos and a line about the job. Connor will look, visit if he needs to, and send a written quote.</p>
            <p className="big-p">Or call <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
