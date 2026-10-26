import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import QuoteForm from "@/components/QuoteForm";
import Link from "next/link";
import { business } from "@/content/site";
import { areas } from "@/content/areas";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact and free quote",
  description: "Get a free, written quote from CM MainWorks. Send a few photos of the job, call 07742 135592 or WhatsApp Connor. Covering Lichfield and nearby.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <PageHead crumbs={[{ href: "/contact", label: "Contact" }]} title={<>Get a <span className="hl">free quote.</span></>} lede="Send a few details and photos and Connor will come back with a clear, written price." />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 className="mid-h">Call, message or send photos</h2>
            <ul className="contact-list">
              <li><span className="k">Call</span><a href={business.phoneHref}>{business.phoneDisplay}</a></li>
              <li><span className="k">WhatsApp</span><a href={business.whatsapp} target="_blank" rel="noopener">Message Connor</a></li>
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
    </>
  );
}
