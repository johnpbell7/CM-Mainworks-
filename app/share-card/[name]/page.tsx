import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Illustration, { type IllustrationKind } from "@/components/Illustration";
import { frame } from "@/components/concept/frames";
import { publishedProjects } from "@/content/projects";
import { areas } from "@/content/areas";
import words from "@/content/share-cards.json";
import s from "./card.module.css";

/*
  The link pictures (what shows when a link is sent on WhatsApp, Facebook, iMessage…), 1200 x 630, in the
  site's own look: the sky, the heading with its gold underline, and the page's drawing on the street, as in
  the page heads (John, 10 Nov 2026). Words for the main pages are in content/share-cards.json; town and
  project cards come from their own content. Only on John's Mac (a live build shows "not found"):
  scripts/make-share-images.mjs photographs each card into public/images/share/.
*/
export const metadata: Metadata = { title: "Link picture", robots: { index: false, follow: false } };

type Card = { title: string; sub: string; art?: IllustrationKind; photo?: string };

function card(name: string): Card | null {
  const w = (words as Record<string, Card>)[name];
  if (w) return w;
  if (name.startsWith("area-")) {
    const a = areas.find((x) => x.slug === name.slice(5));
    if (a) return { title: `Home renovations in <b>${a.name}</b>`, sub: "Kitchens, bathrooms, extensions and whole homes, managed by one team.", art: "town" };
  }
  if (name.startsWith("project-")) {
    const p = publishedProjects.find((x) => x.slug === name.slice(8));
    if (p?.after.src) return { title: p.place ? `${p.name} in <b>${p.place}</b>` : `<b>${p.name}</b>`, sub: p.summary, photo: p.after.src };
  }
  return null;
}

// "<b>…</b>" marks the words with the gold underline
const rich = (t: string) => t.split(/(<b>.*?<\/b>)/).map((part, i) => (part.startsWith("<b>") ? <span key={i} className="hl">{part.slice(3, -4)}</span> : part));

export default async function ShareCard({ params }: { params: Promise<{ name: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const c = card((await params).name);
  if (!c) notFound();
  const f = c.art ? frame(c.art) : { z: 1, view: "" };
  const plain = c.title.replace(/<\/?b>/g, "");
  return (
    <div className={s.card} style={{ "--z": f.z } as React.CSSProperties}>
      {/* the dev-mode badge stays out of the picture */}
      <style>{`nextjs-portal{display:none!important}`}</style>
      <img className={s.logo} src="/brand/logo/main/cm-mainworks-header-lockup.svg" alt="" width={328} height={56} />
      <div className={s.text}>
        <p className={`${s.title}${plain.length > 34 ? ` ${s.long}` : ""}`}>{rich(c.title)}</p>
        <p className={s.sub}>{c.sub}</p>
      </div>
      <div className={s.road} />
      <div className={s.pavement} />
      {c.art ? (
        <div className={s.art}><Illustration kind={c.art} view={f.view} decorative /></div>
      ) : c.photo ? (
        <div className={s.photo}><img src={c.photo} alt="" /></div>
      ) : null}
    </div>
  );
}
