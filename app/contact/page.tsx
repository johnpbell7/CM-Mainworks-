import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import QuoteForm from "@/components/QuoteForm";
import Link from "next/link";
import { business } from "@/content/site";
import { areas } from "@/content/areas";
import { pageMeta, shareImage } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact and free quote",
  description: "Get a free written quote from me, Connor at CM MainWorks. Send a few photos of the job, ring 07742 135592 or WhatsApp me. Covering the Midlands.",
  path: "/contact",
  image: shareImage("contact", "CM MainWorks: Get a free quote from CM MainWorks"),
});

export default function Contact() {
  return (
    <>
      <PageHead art="photos" crumbs={[{ href: "/contact", label: "Contact" }]} title={<>Get a <span className="hl">free quote.</span></>} lede="Planning a renovation or just one job? Send me a few details and photos and I’ll come back to you to arrange a visit, then a written quote." />
      <section className="sec contact-page" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 className="mid-h">What to send for a quick quote</h2>
            <p className="contact-sub">Not all of it. The more I see, the quicker the price.</p>
            <ul className="ticks">
              <li>A photo of each room or area, plus a couple of close-ups of anything that’s damaged or awkward</li>
              <li>Rough measurements, if you’ve got them. Not essential</li>
              <li>Any pictures you’ve saved of the look you’re after</li>
              <li>Your postcode, and roughly when you’d like the work done</li>
              <li>For a renovation, a rough budget if you have one. I’ll be honest about what it can do</li>
              <li>Whether you’re supplying anything yourself, like doors, paint or tiles</li>
            </ul>
            <h2 className="mid-h contact-or">Or ring or message me</h2>
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
          {/* the page's heading already says "Get a free quote", so the form doesn't repeat it */}
          <QuoteForm head={false} />
        </div>
      </section>
    </>
  );
}
