import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import QuoteForm from "@/components/QuoteForm";
import Steps from "@/components/Steps";
import { areas, getArea } from "@/content/areas";
import { business, getSection, renovation } from "@/content/site";
import { media } from "@/content/media";
import { projectHref, projectsIn } from "@/content/projects";
import FaqList from "@/components/FaqList";
import { abs, businessId, faqLd, JsonLd, pageMeta } from "@/lib/seo";

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
  const work = projectsIn(a.name, a.alsoCovers);

  return (
    <>
      <JsonLd data={faqLd(a.faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Home renovations in ${a.name}`,
          serviceType: ["Home renovation", "Extensions", "Kitchens", "Bathrooms", "Carpentry", "Decorating"],
          description: a.description,
          url: abs(`/areas/${a.slug}`),
          provider: { "@id": businessId },
          areaServed: [{ "@type": "City", name: a.name }, ...(a.alsoCovers ?? []).map((n) => ({ "@type": "Place", name: n }))],
        }}
      />
      <PageHead
        crumbs={[{ href: `/areas/${a.slug}`, label: a.name }]}
        title={<>Home renovations in <span className="hl">{a.name}</span></>}
        lede={a.intro}
      />

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="local-title">
        <div className="wrap">
          <div className="svc-row" style={{ borderTop: 0, paddingTop: 0, "--c": lead.color, "--pen": lead.tint } as React.CSSProperties}>
            <Photo media={media[lead.slug]} illo={lead.illo} sizes="(max-width: 720px) 100vw, 50vw" />
            <div className="prose" data-reveal="up">
              <h2 id="local-title" className="mid-h">Homes in {a.name}</h2>
              {a.local.map((t) => <p key={t}>{t}</p>)}
              <ul className="facts">
                <li><span>Where</span>{a.where[0].toUpperCase() + a.where.slice(1)}</li>
                <li><span>Quotes</span>Free and written, with no obligation</li>
                <li><span>Insurance</span>Yes, I’m insured</li>
                <li><span>Who you deal with</span>Me, from the first visit to the final clean-up</li>
                <li><span>The team</span>One team for the whole job, with trusted trades organised for you</li>
              </ul>
            </div>
          </div>
          {work.length > 0 && (
            <div className="area-work">
              <h2 className="mid-h" data-reveal="up">Recent work in {a.name}</h2>
              <div className="proj-grid">
                {work.map((p) => {
                  const s = getSection(p.section)!;
                  return (
                    <Link className="proj" key={p.slug} href={projectHref(p)}>
                      <Photo media={p.after} sizes="(max-width: 720px) 100vw, 50vw" />
                      <span className="proj-tag" style={{ "--c": s.color } as React.CSSProperties}>{s.name}</span>
                      <h3>{p.name}</h3>
                      <p>{p.summary}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="sec grey" aria-labelledby="work-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="work-title">The work I do in {a.name}</h2></div>
            <p data-reveal="up">Full renovations are my main work, managed by one team. Smaller jobs are just as welcome.</p>
          </div>
          <div className="items" data-reveal="stagger">
            <div className="item" style={{ "--c": renovation.color } as React.CSSProperties}>
              <h3><Link href={renovation.href}>Full renovations in {a.name}</Link></h3>
              <p>Kitchens, bathrooms, floors, stairs and decorating, planned with you and managed by me from start to finish.</p>
            </div>
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

      <section className="sec grey" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="faq-title">Questions from {a.name}</h2>
          </div>
          <FaqList faqs={a.faqs.map((f, i) => ({ ...f, color: a.focus[i % a.focus.length].service }))} />
        </div>
      </section>

      <section className="sec" aria-labelledby="ask-title">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 id="ask-title" className="big-h">Get a free quote in {a.name}</h2>
            <p className="big-p">Send me a few photos and a line about the job. I’ll take a look, come round if I need to, and send you a written quote.</p>
            <p className="big-p">Or ring me on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
          </div>
          <QuoteForm defaultJob={renovation.job} />
        </div>
      </section>
    </>
  );
}
