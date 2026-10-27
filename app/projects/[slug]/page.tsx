import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import BeforeAfter from "@/components/BeforeAfter";
import BeforeAfterSplit from "@/components/BeforeAfterSplit";
import Closing from "@/components/Closing";
import type { Media } from "@/content/media";
import { getProject, monthOf, projectPhotos, publishedProjects } from "@/content/projects";
import { getSection } from "@/content/site";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

const titleOf = (p: { name: string; place: string }) => (p.place ? `${p.name} in ${p.place}` : p.name);
const ratio = (m: Media) => (m.w && m.h ? m.w / m.h : 3 / 4);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const image = p.after.src ? { src: p.after.src, alt: p.after.alt } : undefined;
  return pageMeta({ title: titleOf(p), description: p.summary, path: `/projects/${p.slug}`, image });
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const s = getSection(p.section)!;
  const pair = !!(p.before.src && p.after.src);
  // The pair goes at the top; of the rest, the first sits beside the write-up and the others follow as a gallery
  const photos = projectPhotos(p).filter((m) => !(pair && (m.src === p.before.src || m.src === p.after.src)));
  const [beside, ...gallery] = photos;
  // Never taller than most of the screen: an upright pair is capped by height
  const r = pair ? (p.aligned ? ratio(p.after) : ratio(p.after) * 2) : 1;
  const pairStyle = { aspectRatio: String(r), maxWidth: `min(100%, calc(78svh * ${r.toFixed(3)}))`, marginInline: "auto" };
  // More work: the same kind of job first, then the newest
  const more = [...publishedProjects.filter((x) => x.slug !== p.slug && x.section === p.section), ...publishedProjects.filter((x) => x.section !== p.section)].slice(0, 3);

  return (
    <div style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
      <PageHead
        crumbs={[{ href: "/projects", label: "Recent work" }, { href: `/projects/${p.slug}`, label: p.name }]}
        title={titleOf(p)}
        lede={<><Link href={`/services/${s.slug}`} style={{ color: `color-mix(in srgb, ${s.color} 70%, var(--ink))`, fontWeight: 600, textDecoration: "none" }}>{s.name}</Link>{p.place && ` · ${p.place}`} · {monthOf(p.date)}</>}
      />
      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="job-title">
        <div className="wrap">
          {pair && (
            <figure style={{ margin: 0 }}>
              {p.aligned
                ? <div style={{ ...pairStyle, display: "flex" }}><BeforeAfter before={p.before} after={p.after} label={`Compare ${p.name.toLowerCase()} before and after`} /></div>
                : <BeforeAfterSplit before={p.before} after={p.after} sizes="(max-width: 1080px) 50vw, 40vw" style={pairStyle} />}
            </figure>
          )}
          <div className="contact-grid" style={{ marginTop: pair ? "clamp(48px, 6vw, 88px)" : 0 }}>
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
            {beside && <Photo media={beside} sizes="(max-width: 1080px) 100vw, 40vw" style={{ aspectRatio: String(ratio(beside)) }} priority={!pair} />}
          </div>
          {gallery.length > 0 && (
            <div className="gallery">
              {gallery.map((m) => <Photo key={m.src} media={m} className={ratio(m) > 1 ? "wide" : ""} sizes="(max-width: 720px) 50vw, 33vw" />)}
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
      {more.length > 0 && (
        <section className={`sec${p.review ? "" : " grey"}`} aria-labelledby="more-title">
          <div className="wrap">
            <div className="sec-head">
              <div data-reveal="up"><h2 id="more-title">More of my work</h2></div>
            </div>
            <div className="proj-grid three">
              {more.map((x) => {
                const xs = getSection(x.section)!;
                return (
                  <Link className="proj" key={x.slug} href={`/projects/${x.slug}`}>
                    <Photo media={x.after} sizes="(max-width: 720px) 100vw, 33vw" />
                    <span className="proj-tag" style={{ "--c": xs.color } as React.CSSProperties}>{xs.name}</span>
                    <h3>{titleOf(x)}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <Closing />
    </div>
  );
}
