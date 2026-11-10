import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Illustration, { type IllustrationKind } from "@/components/Illustration";

// Working page for the drawing set: every scene at card size. Not linked, not indexed, and only on this Mac:
// a live build shows "not found" (.concept-tools/frames.mjs measures the drawings here).
export const metadata: Metadata = { title: "Drawings", robots: { index: false, follow: false } };

const kinds: IllustrationKind[] = ["kitchen", "bathroom", "building", "roof", "flooring", "stairs", "carpentry", "joinery", "decorating", "renovation", "done", "town", "photos", "quote", "faq", "privacy", "gallery"];

export default function ArtPreview() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="wrap" style={{ padding: "40px 0 80px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: 24 }}>Drawings</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 28 }}>
        {kinds.map((k) => (
          <figure key={k} id={`art-${k}`} style={{ margin: 0 }}>
            <div className="ph ph-illo" style={{ aspectRatio: "4 / 3", position: "relative" }}>
              <Illustration kind={k} fit="bottom" decorative />
            </div>
            <figcaption style={{ marginTop: 8, fontWeight: 600 }}>{k}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
