import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import QuoteForm from "@/components/QuoteForm";
import Link from "next/link";
import { business } from "@/content/site";
import { areas } from "@/content/areas";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact and free quote",
  description: "Get a free written quote from me, Connor at CM MainWorks. Send a few photos of the job, ring 07742 135592 or WhatsApp me. Covering Lichfield and the Midlands.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <PageHead crumbs={[{ href: "/contact", label: "Contact" }]} title={<>Get a <span className="hl">free quote.</span></>} lede="Planning a renovation or just one job? Send me a few details and photos and I’ll come back to you with a clear, written price." />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 className="mid-h">Ring, message or send photos</h2>
            <ul className="contact-list">
              <li><span className="k">Call</span><a href={business.phoneHref}>{business.phoneDisplay}</a></li>
              <li><span className="k">WhatsApp</span><a href={business.whatsapp} target="_blank" rel="noopener">Message me</a></li>
              <li><span className="k">Facebook</span><a href={business.facebook} target="_blank" rel="noopener">CM MainWorks</a></li>
              <li>
                <span className="k">Areas covered</span>
                <p style={{ color: "var(--ink-2)" }}>
                  {areas.map((a, i) => (
                    <span key={a.slug}>{i > 0 && (i === areas.length - 1 ? " and " : ", ")}<Link href={`/areas/${a.slug}`}>{a.name}</Link></span>
                  ))}
                  .
                </p>
              </li>
            </ul>
          </div>
          <QuoteForm />
        </div>
      </section>
      <section className="sec grey" aria-labelledby="send-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="send-title">What to send for a quick quote</h2>
            <p>You don’t need all of this, but the more I can see, the quicker and more accurate the price.</p>
          </div>
          <ol className="factors" data-reveal="stagger">
            <li>A photo of the whole area, plus a couple of close-ups of anything that’s damaged or awkward</li>
            <li>Rough measurements, if you’ve got them. Not essential</li>
            <li>Any pictures you’ve saved of the look you’re after</li>
            <li>Your postcode, and roughly when you’d like the work done</li>
            <li>Whether you’re supplying anything yourself, like doors, paint or tiles</li>
          </ol>
        </div>
      </section>
    </>
  );
}
