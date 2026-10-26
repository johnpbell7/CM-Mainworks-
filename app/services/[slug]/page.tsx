import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import QuoteForm from "@/components/QuoteForm";
import Steps from "@/components/Steps";
import FaqList from "@/components/FaqList";
import Closing from "@/components/Closing";
import { Arrow } from "@/components/Icons";
import { getSection, sections, type JobType } from "@/content/site";
import { serviceContent } from "@/content/services";
import { media } from "@/content/media";
import { publishedProjects } from "@/content/projects";
import { areas } from "@/content/areas";
import { abs, businessId, faqLd, JsonLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSection((await params).slug);
  if (!s) return {};
  const c = serviceContent[s.slug];
  return pageMeta({ title: c.title, description: c.description, path: `/services/${s.slug}` });
}

export default async function Service({ params }: Props) {
  const s = getSection((await params).slug);
  if (!s) notFound();
  const c = serviceContent[s.slug];
  const work = publishedProjects.filter((p) => p.section === s.slug);
  const others = sections.filter((o) => o.slug !== s.slug);
  const name = s.name.toLowerCase();
  const [first, ...rest] = c.h1.split(" ");
  const faqs = c.faqs.map((f) => ({ ...f, color: s.slug }));

  return (
    <div style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            serviceType: s.name,
            description: c.description,
            url: abs(`/services/${s.slug}`),
            provider: { "@id": businessId },
            areaServed: areas.map((a) => ({ "@type": "City", name: a.name })),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: s.name,
              itemListElement: c.items.map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: i.title, description: i.text } })),
            },
          },
          faqLd(faqs),
        ]}
      />

      <PageHead
        crumbs={[{ href: "/services", label: "Services" }, { href: `/services/${s.slug}`, label: s.name }]}
        title={<><span className="hl" data-pen={s.pen}>{first}</span> {rest.join(" ")}</>}
        lede={c.lede}
      />

      {/* intro */}
      <section className="sec" style={{ paddingTop: 0 }} aria-label={`About ${name}`}>
        <div className="wrap">
          <div className="svc-row" style={{ borderTop: 0, paddingTop: 0 }}>
            <Photo media={media[s.slug]} illo={s.slug} sizes="(max-width: 720px) 100vw, 50vw" priority />
            <div className="prose" data-reveal="up">
              {c.body.map((p) => <p key={p}>{p}</p>)}
              <p style={{ marginTop: 24 }}>
                <Link className="link link-arrow" style={{ "--u": s.color } as React.CSSProperties} href="#quote">Get a free {name} quote <Arrow /></Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* what's included */}
      <section className="sec grey" aria-labelledby="inc-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="inc-title">{s.name} jobs Connor takes on</h2></div>
            <p data-reveal="up">From a single job to a whole house. Something not on the list? Ask anyway.</p>
          </div>
          <div className="items" data-reveal="stagger">
            {c.items.map((i) => (
              <div className="item" key={i.title}>
                <h3>{i.title}</h3>
                <p>{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="sec" aria-labelledby="how-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="how-title">How a {name} job works</h2></div>
            <p data-reveal="up">You know <span className="hl" data-pen="steel">the price before any work starts</span>.</p>
          </div>
          <Steps steps={c.steps} />
        </div>
      </section>

      {work.length > 0 && (
        <section className="sec grey" aria-labelledby="work-title">
          <div className="wrap">
            <div className="sec-head">
              <div data-reveal="up"><h2 id="work-title">Recent {name}</h2></div>
              <p data-reveal="up"><Link className="link link-arrow" href="/projects">See all recent work <Arrow /></Link></p>
            </div>
            <div className="proj-grid">
              {work.map((p) => (
                <Link className="proj" key={p.slug} href={`/projects/${p.slug}`}>
                  <Photo media={p.after} sizes="(max-width: 720px) 100vw, 50vw" />
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* questions */}
      <section className="sec" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="faq-title">{s.name} questions</h2>
            <p>Quick answers about {name}. More on the <Link href="/faqs">FAQs page</Link>.</p>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      {/* quote */}
      <section className="sec" aria-labelledby="ask-title">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 id="ask-title" className="big-h">Ask about {name}</h2>
            <p className="big-p">Send a few photos and a line about the job. Connor will look, visit if he needs to, and send a written quote.</p>
            <h3 className="sub-h" style={{ marginTop: 44 }}>Other services</h3>
            <ul className="ticks">
              {others.map((o) => (
                <li key={o.slug} style={{ "--c": o.color } as React.CSSProperties}>
                  <Link href={`/services/${o.slug}`} style={{ textDecoration: "none", fontWeight: 600 }}>{o.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <QuoteForm defaultJob={s.name as JobType} />
        </div>
      </section>

      <Closing />
    </div>
  );
}
