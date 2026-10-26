import type { Faq } from "@/content/faqs";
import { sections } from "@/content/site";

const colorOf = (slug: string) => sections.find((s) => s.slug === slug)!.color;

/** Tap-to-open questions. Native <details>, so it works without JavaScript. */
export default function FaqList({ faqs, headingLevel = 3 }: { faqs: Faq[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <details key={f.q} className="faq-item" style={{ "--c": colorOf(f.color) } as React.CSSProperties} open={i === 0}>
          <summary>
            <span className="dot" aria-hidden="true" />
            <H>{f.q}</H>
            <span className="pm" aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
