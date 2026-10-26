import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import QuoteForm from "@/components/QuoteForm";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact and free quote",
  description: "Send Connor a few photos of the job for a free, written quote. Or call or WhatsApp on 07742 135592.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHead title={<>Get a <span className="hl">free quote.</span></>} lede="Send a few details and photos and Connor will come back with a clear, written price." />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <ul className="contact-list">
              <li><span className="k">Call</span><a href={business.phoneHref}>{business.phoneDisplay}</a></li>
              <li><span className="k">WhatsApp</span><a href={business.whatsapp} target="_blank" rel="noopener">Message Connor</a></li>
              <li><span className="k">Facebook</span><a href={business.facebook} target="_blank" rel="noopener">CM MainWorks</a></li>
              <li>
                <span className="k">Areas covered</span>
                <p style={{ color: "var(--ink-2)" }}>Lichfield and nearby, including {business.areas.slice(1).join(", ")}.</p>
              </li>
            </ul>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
