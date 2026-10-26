import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Closing from "@/components/Closing";
import FaqList from "@/components/FaqList";
import { allFaqs, faqGroups } from "@/content/faqs";
import { faqLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "FAQs: quotes, materials, small jobs and areas",
  description: "Straight answers about free quotes, materials, small jobs, insurance, how I run a job and the areas I cover across the Midlands.",
  path: "/faqs",
});

export default function Faqs() {
  return (
    <>
      <JsonLd data={faqLd(allFaqs)} />
      <PageHead
        crumbs={[{ href: "/faqs", label: "FAQs" }]}
        title={<>Questions, <span className="hl">answered.</span></>}
        lede="The things people ask me most. Can’t see yours? Ring or WhatsApp me."
      />
      {faqGroups.map((g, i) => (
        <section className={`sec${i % 2 ? " grey" : ""}`} key={g.title} style={i === 0 ? { paddingTop: 0 } : undefined} aria-labelledby={`faq-${i}`}>
          <div className="wrap faq-wrap">
            <div className="faq-side" data-reveal="up"><h2 id={`faq-${i}`}>{g.title}</h2></div>
            <FaqList faqs={g.faqs} />
          </div>
        </section>
      ))}
      <div className="wrap"><p className="draft" style={{ marginBottom: 32 }}>Draft answers, waiting on Connor’s approval.</p></div>
      <Closing />
    </>
  );
}
