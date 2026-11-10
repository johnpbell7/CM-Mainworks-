import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import RenovationBento from "@/components/RenovationBento";
import BeforeAfterSplit from "@/components/BeforeAfterSplit";
import QuoteForm from "@/components/QuoteForm";
import Steps from "@/components/Steps";
import FaqList from "@/components/FaqList";
import Illustration from "@/components/Illustration";
import { Arrow } from "@/components/Icons";
import { business, getSection, renovation, sections } from "@/content/site";
import { serviceContent } from "@/content/services";
import { media, renovationBento } from "@/content/media";
import { hasPage, projectHref, publishedProjects } from "@/content/projects";
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
  // A job's card shows another of its photos when its finished one already leads the page,
  // or its before and after side by side when it has no other
  const repeats = (p: (typeof work)[number]) => p.after.src === media[s.slug].src;
  const cover = (p: (typeof work)[number]) => (repeats(p) ? p.gallery.find((m) => m.src) ?? p.after : p.after);
  const asPair = (p: (typeof work)[number]) => repeats(p) && !p.gallery.some((m) => m.src) && !!p.before.src;
  const name = s.name.toLowerCase();
  // the services either side, for scrolling through them; it wraps round, so there's always one each way
  const at = sections.findIndex((x) => x.slug === s.slug);
  const prev = sections[(at - 1 + sections.length) % sections.length];
  const next = sections[(at + 1) % sections.length];
  // the gold underline goes under the words that matter, at the end of the heading (Impeccable critique, 10 Nov):
  // the words after the comma, or the last three when there are more ("Decorating, right to the last coat"),
  // kept on one line so the underline never runs into the line below
  const [lead, mark] = (() => {
    const at = c.h1.indexOf(", ");
    const tail = at > 0 ? c.h1.slice(at + 2) : c.h1;
    const words = tail.split(" ");
    const keep = words.length > 3 ? words.slice(-3).join(" ") : tail;
    return [c.h1.slice(0, c.h1.length - keep.length), keep];
  })();
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
        crumbs={[{ href: "/renovations", label: "Renovations" }, { href: `/services/${s.slug}`, label: s.name }]}
        art={s.illo}
        title={<>{lead}<span className="hl" data-pen={s.pen} style={{ whiteSpace: "nowrap" }}>{mark}</span></>}
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
            <p data-reveal="up">You get <span className="hl" data-pen="steel">a written quote before any work starts</span>.</p>
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
                <Link className="proj" key={p.slug} href={projectHref(p)}>
                  {asPair(p)
                    ? <BeforeAfterSplit before={p.before} after={p.after} sizes="(max-width: 720px) 50vw, 25vw" />
                    : <Photo media={cover(p)} sizes="(max-width: 720px) 100vw, 50vw" />}
                  <span className="proj-tag" style={{ "--c": s.color } as React.CSSProperties}>{s.name}</span>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <span className="proj-more">{hasPage(p) ? "See the job" : "See the photos"} <Arrow /></span>
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
              <RenovationBento photos={renovationBento([media[s.slug].src, ...work.map((p) => cover(p).src)])} />
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

      {/* the previous and next service, to scroll through them (John, 10 Nov 2026) */}
      <nav className="sec svc-nav" aria-label="More services">
        <div className="wrap svc-nav-row">
          <Link className="svc-nav-card prev" href={`/services/${prev.slug}`}>
            <span className="svc-nav-art"><Illustration kind={prev.illo} decorative /></span>
            <span className="svc-nav-text">
              <span className="svc-nav-label"><Arrow />Previous</span>
              <strong>{prev.name}</strong>
            </span>
          </Link>
          <Link className="svc-nav-card next" href={`/services/${next.slug}`}>
            <span className="svc-nav-art"><Illustration kind={next.illo} decorative /></span>
            <span className="svc-nav-text">
              <span className="svc-nav-label">Next<Arrow /></span>
              <strong>{next.name}</strong>
            </span>
          </Link>
        </div>
      </nav>

    </div>
  );
}
