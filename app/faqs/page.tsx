import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Closing from "@/components/Closing";
import { homeFaqs, moreFaqs } from "@/content/faqs";
import { sections } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about quotes, materials, small jobs and the areas CM MainWorks covers.",
  alternates: { canonical: "/faqs" },
};

const colorOf = (slug: string) => sections.find((s) => s.slug === slug)!.color;

export default function Faqs() {
  const all = [...homeFaqs, ...moreFaqs];
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: all.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHead title={<>Questions, <span className="hl">answered.</span></>} lede="Can’t see yours here? Call or WhatsApp Connor and ask." />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="faq">
            {all.map((f) => (
              <div key={f.q} style={{ "--c": colorOf(f.color) } as React.CSSProperties}>
                <h2 style={{ fontSize: "1.25rem", letterSpacing: "-.02em", lineHeight: 1.3, marginBottom: 8 }}>{f.q}</h2>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <p className="draft">Draft answers, waiting on Connor’s approval.</p>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Closing />
    </>
  );
}
