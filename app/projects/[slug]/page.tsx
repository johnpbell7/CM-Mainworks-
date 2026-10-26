import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import BeforeAfter from "@/components/BeforeAfter";
import Closing from "@/components/Closing";
import { Arrow } from "@/components/Icons";
import { getProject, projects } from "@/content/projects";
import { getSection } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.summary, alternates: { canonical: `/projects/${p.slug}` } };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const s = getSection(p.section)!;
  return (
    <div style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
      <PageHead
        crumbs={[{ href: "/projects", label: "Recent work" }, { href: `/projects/${p.slug}`, label: p.name }]}
        title={p.name}
        lede={<><span style={{ color: s.color, fontWeight: 600 }}>{s.name}</span> · {p.place}</>}
      />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <figure style={{ margin: 0 }}>
            <div style={{ aspectRatio: "16 / 9", display: "flex" }}>
              <BeforeAfter before={p.before} after={p.after} />
            </div>
            <figcaption className="cap"><span style={{ color: "var(--ink-3)" }}>Drag to compare before and after</span></figcaption>
          </figure>
          <div className="contact-grid" style={{ marginTop: "clamp(48px, 6vw, 88px)" }}>
            <div className="prose" data-reveal="up">
              <p style={{ fontSize: "1.2rem", color: "var(--ink)" }}>{p.summary}</p>
              {p.placeholder && <p className="draft">Placeholder project. Real write-up and photos to come.</p>}
            </div>
            <div data-reveal="up">
              <Link className="link link-arrow" href={`/contact?job=${s.name}#quote`}>Ask about a job like this <Arrow /></Link>
            </div>
          </div>
          <div className="proj-grid" style={{ marginTop: "clamp(48px, 6vw, 88px)" }}>
            {p.gallery.map((m, i) => <Photo key={i} media={m} sizes="(max-width: 720px) 100vw, 50vw" style={{ aspectRatio: "4 / 3" }} />)}
          </div>
        </div>
      </section>
      <Closing />
    </div>
  );
}
