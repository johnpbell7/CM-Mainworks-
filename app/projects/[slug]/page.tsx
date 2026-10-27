import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import BeforeAfter from "@/components/BeforeAfter";
import Closing from "@/components/Closing";
import { getProject, projectPhotos, publishedProjects } from "@/content/projects";
import { getSection } from "@/content/site";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const title = p.place ? `${p.name} in ${p.place}` : p.name;
  const image = p.after.src ? { src: p.after.src, alt: p.after.alt } : undefined;
  return pageMeta({ title, description: p.summary, path: `/projects/${p.slug}`, image });
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const s = getSection(p.section)!;
  // the first photo sits beside the write-up; the rest follow underneath
  const photos = projectPhotos(p).filter((m) => !(p.before.src && p.after.src && (m.src === p.before.src || m.src === p.after.src)));
  return (
    <div style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
      <PageHead
        crumbs={[{ href: "/projects", label: "Recent work" }, { href: `/projects/${p.slug}`, label: p.name }]}
        title={p.name}
        lede={<><Link href={`/services/${s.slug}`} style={{ color: `color-mix(in srgb, ${s.color} 70%, var(--ink))`, fontWeight: 600, textDecoration: "none" }}>{s.name}</Link>{p.place && ` · ${p.place}`}</>}
      />
      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="job-title">
        <div className="wrap">
          {p.before.src && p.after.src ? (
            <figure style={{ margin: 0 }}>
              <div style={{ aspectRatio: "16 / 9", display: "flex" }}><BeforeAfter before={p.before} after={p.after} /></div>
            </figure>
          ) : null}
          <div className="contact-grid" style={{ marginTop: p.before.src ? "clamp(48px, 6vw, 88px)" : 0 }}>
            <div className="prose" data-reveal="up">
              <h2 id="job-title" className="mid-h">The job</h2>
              {(p.body ?? [p.summary]).map((t) => <p key={t}>{t}</p>)}
              {p.done && (
                <>
                  <h3 className="sub-h" style={{ marginTop: 32 }}>What was done</h3>
                  <ul className="ticks">{p.done.map((d) => <li key={d}>{d}</li>)}</ul>
                </>
              )}
            </div>
            {photos[0] && <Photo media={photos[0]} sizes="(max-width: 1080px) 100vw, 40vw" style={{ aspectRatio: "3 / 4" }} priority />}
          </div>
          {photos.length > 1 && (
            <div className="proj-photos">
              {photos.slice(1).map((m) => <Photo key={m.src} media={m} sizes="(max-width: 720px) 100vw, 33vw" />)}
            </div>
          )}
        </div>
      </section>
      {p.review && (
        <section className="sec grey" aria-labelledby="said-title">
          <div className="wrap">
            <h2 id="said-title" className="mid-h" data-reveal="up">What the customer said</h2>
            <figure className="review-block" data-reveal="up">
              <blockquote>“{p.review.quote}”</blockquote>
              <figcaption><strong>{p.review.name}</strong> via Facebook</figcaption>
            </figure>
          </div>
        </section>
      )}
      <Closing />
    </div>
  );
}
