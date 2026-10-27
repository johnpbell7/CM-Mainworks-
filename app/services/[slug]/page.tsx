import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import QuoteForm from "@/components/QuoteForm";
import Steps from "@/components/Steps";
import FaqList from "@/components/FaqList";
import { Arrow } from "@/components/Icons";
import { business, getSection, renovation, sections } from "@/content/site";
import { serviceContent } from "@/content/services";
import { media } from "@/content/media";
import { publishedProjects } from "@/content/projects";
import { areas } from "@/content/areas";
import { abs, businessId, faqLd, JsonLd, pageMeta, shareImage } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSection((await params).slug);
  if (!s) return {};
  const c = serviceContent[s.slug];
  return pageMeta({
    title: c.title,
    description: c.description,
    path: `/services/${s.slug}`,
    image: shareImage(`service-${s.slug}`, `CM MainWorks: ${c.h1}`),
  });
}

export default async function Service({ params }: Props) {
  const s = getSection((await params).slug);
  if (!s) notFound();
  const c = serviceContent[s.slug];
  const work = publishedProjects.filter((p) => p.section === s.slug);
  const name = s.name.toLowerCase();
  const [first, ...rest] = c.h1.split(" ");
  const faqs = c.faqs.map((f) => ({ ...f, color: s.slug }));
  // keep white and grey sections alternating whichever optional blocks show
  const showReno = s.slug !== "carpentry";
  const renoGrey = work.length > 0;
  const faqGrey = showReno ? !renoGrey : work.length > 0;

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
            <Photo media={media[s.slug]} illo={s.illo} sizes="(max-width: 720px) 100vw, 50vw" priority />
            <div className="prose" data-reveal="up">
              {c.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* what's included */}
      <section className="sec grey" aria-labelledby="inc-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="inc-title">{s.work} I take on</h2></div>
            <p data-reveal="up">Not on the list? Ask anyway.</p>
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
            <div data-reveal="up"><h2 id="how-title">{s.how}</h2></div>
            <p data-reveal="up">You know <span className="hl" data-pen="steel">the price before any work starts</span>.</p>
          </div>
          <Steps steps={c.steps} />
          <div className="faq-wrap time-wrap">
            <div className="faq-side" data-reveal="up">
              <h2 id="time-title">How long, and how much disruption</h2>
              <p>{c.time.intro}</p>
            </div>
            <ul className="facts" data-reveal="up">
              {c.time.typical && <li><span>Typical time</span>{c.time.typical}</li>}
              <li><span>How long</span>{c.time.long}</li>
              <li><span>Living there</span>{c.time.living}</li>
              <li><span>Mess</span>{c.time.mess}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* what affects the price */}
      <section className="sec grey" aria-labelledby="price-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="price-title">What affects the price</h2>
            <p>{c.price.intro}</p>
          </div>
          <ol className="factors" data-reveal="stagger">
            {c.price.factors.map((f) => <li key={f}>{f}</li>)}
          </ol>
        </div>
      </section>

      {work.length > 0 && (
        <section className="sec" aria-labelledby="work-title">
          <div className="wrap">
            <div className="sec-head">
              <div data-reveal="up"><h2 id="work-title">Recent {s.work.toLowerCase()}</h2></div>
            </div>
            <div className="proj-grid">
              {work.map((p) => (
                <Link className="proj" key={p.slug} href={`/projects/${p.slug}`}>
                  <Photo media={p.after} sizes="(max-width: 720px) 100vw, 50vw" />
                  <span className="proj-tag" style={{ "--c": s.color } as React.CSSProperties}>{s.name}</span>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* part of a bigger job? */}
      {showReno && (
        <section className={`sec${renoGrey ? " grey" : ""}`} aria-labelledby="reno-title" style={{ "--c": renovation.color, "--pen": renovation.tint } as React.CSSProperties}>
          <div className="wrap">
            <div className="feature" style={{ marginBottom: 0 }}>
              <Photo media={media.renovation} illo={renovation.illo} sizes="(max-width: 1080px) 100vw, 48vw" />
              <div data-reveal="up">
                <h2 id="reno-title" className="big-h">Part of a bigger project?</h2>
                <p>{s.work} is often one piece of a wider renovation. I can manage the whole job with one team, so everything is planned together and you’ve only got one person to deal with.</p>
                <div className="row-links">
                  <Link className="link link-arrow" href={renovation.href}>How a full renovation works <Arrow /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* questions */}
      <section className={`sec${faqGrey ? " grey" : ""}`} aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="faq-title">Questions about {name}</h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      {/* quote */}
      <section className="sec" aria-labelledby="ask-title">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 id="ask-title" className="big-h">Ask about {name}</h2>
            <p className="big-p">Send a few photos and a line about the job, and I’ll send a written quote.</p>
            <p className="big-p">Or ring me on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
          </div>
          <QuoteForm defaultJob={s.job} />
        </div>
      </section>

    </div>
  );
}
