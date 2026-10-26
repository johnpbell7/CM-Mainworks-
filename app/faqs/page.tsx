import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Closing from "@/components/Closing";
import { homeFaqs, moreFaqs } from "@/content/faqs";
import FaqList from "@/components/FaqList";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about quotes, materials, small jobs and the areas CM MainWorks covers.",
  alternates: { canonical: "/faqs" },
};

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
        <div className="wrap" style={{ maxWidth: 960 }}>
          <FaqList faqs={all} headingLevel={2} />
          <p className="draft">Draft answers, waiting on Connor’s approval.</p>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Closing />
    </>
  );
}
