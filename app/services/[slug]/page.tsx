import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import QuoteForm from "@/components/QuoteForm";
import { Arrow } from "@/components/Icons";
import { getSection, sections } from "@/content/site";
import { media } from "@/content/media";
import { projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSection((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} in Lichfield`,
    description: `${s.blurb} ${s.intro}`,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function Service({ params }: Props) {
  const s = getSection((await params).slug);
  if (!s) notFound();
  const work = projects.filter((p) => p.section === s.slug);
  const others = sections.filter((o) => o.slug !== s.slug);

  return (
    <div style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
      <PageHead
        crumbs={[{ href: "/services", label: "Services" }, { href: `/services/${s.slug}`, label: s.name }]}
        title={<><span className="hl" data-pen={s.pen}>{s.name}</span>, done properly.</>}
        lede={s.intro}
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="svc-row" style={{ borderTop: 0, paddingTop: 0 }}>
            <Photo media={media[s.slug]} sizes="(max-width: 720px) 100vw, 50vw" />
            <div data-reveal="up">
              <h2 className="sub-h">What’s included</h2>
              <ul className="ticks">
                {s.examples.map((e) => <li key={e}>{e}</li>)}
              </ul>
              <p style={{ marginTop: 24, color: "var(--ink-2)" }}>
                Something not on the list? Ask anyway. Small jobs are as welcome as big ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {work.length > 0 && (
        <section className="sec grey">
          <div className="wrap">
            <div className="sec-head">
              <div data-reveal="up"><h2>Recent {s.name.toLowerCase()}</h2></div>
              <p data-reveal="up"><Link className="link link-arrow" href={`/projects?section=${s.slug}`}>All {s.name.toLowerCase()} projects <Arrow /></Link></p>
            </div>
            <div className="proj-grid">
              {work.map((p) => (
                <Link className="proj" key={p.slug} href={`/projects/${p.slug}`}>
                  <Photo media={p.gallery[0]} sizes="(max-width: 720px) 100vw, 50vw" />
                  <h3>{p.name}</h3>
                  <p>{p.place}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 style={{ fontSize: "clamp(2.4rem, 4.6vw, 4rem)" }}>Ask about {s.name.toLowerCase()}</h2>
            <p style={{ marginTop: 20, color: "var(--ink-2)", maxWidth: "40ch" }}>
              Send a few photos and a line about the job. Connor will look, visit if he needs to, and send a written quote.
            </p>
            <h3 className="sub-h" style={{ marginTop: 48 }}>Other services</h3>
            <ul className="ticks">
              {others.map((o) => (
                <li key={o.slug} style={{ "--c": o.color } as React.CSSProperties}>
                  <Link href={`/services/${o.slug}`} style={{ textDecoration: "none", fontWeight: 600 }}>{o.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
