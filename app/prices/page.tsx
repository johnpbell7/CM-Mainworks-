import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import QuoteForm from "@/components/QuoteForm";
import FaqList from "@/components/FaqList";
import Illustration from "@/components/Illustration";
import StepArt from "@/components/concept/StepArt";
import { business, getSection, renovation } from "@/content/site";
import { priceFactors, priceNote, priceSteps, quoteJobs } from "@/content/prices";
import { priceFaqs } from "@/content/faqs";
import { faqLd, JsonLd, pageMeta, shareImage } from "@/lib/seo";

/*
  Prices (John, 15 Nov 2026): no figures. Every job is quoted once Connor has seen it, so
  the page shows how a job gets priced: the process as six drawings, what shapes a price,
  the work he quotes for, the price questions and the quote form.
*/

export const metadata: Metadata = pageMeta({
  title: "How I price a job",
  description: "Every renovation and smaller job across the Midlands is priced after a free visit, with a written quote broken down so you can see what each part costs.",
  path: "/prices",
  image: shareImage("prices", "CM MainWorks: Every job priced once I’ve seen it"),
});

export default function Prices() {
  return (
    <div style={{ "--c": renovation.color, "--pen": renovation.tint } as React.CSSProperties}>
      <JsonLd data={faqLd(priceFaqs)} />
      <PageHead
        crumbs={[{ href: "/prices", label: "Prices" }]}
        art="quote"
        title={<>Every job priced <span className="hl">once I’ve seen it.</span></>}
        lede="No two homes are the same, so there’s no price list here. I come and see the job, then send you a written quote, free."
      />

      <section className="sec" aria-labelledby="how-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="up"><h2 id="how-title">How I price a job</h2></div>
            <p data-reveal="up">From your first message to the <span className="hl" style={{ whiteSpace: "nowrap" }}>final walk-round</span>.</p>
          </div>
          <ol className="steps six">
            {priceSteps.map((st, i) => (
              <li key={st.title} data-reveal="up">
                <div className="step-mark"><StepArt step={st.art} /></div>
                <div className="step-body">
                  <p className="step-n">Step {i + 1}</p>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="shape-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="shape-title">What shapes your price</h2>
            <p>Your quote is worked out from your home, not from a list.</p>
            <div className="ph ph-illo shape-art">
              <Illustration kind="survey" fit="bottom" />
            </div>
          </div>
          <div>
            <ol className="shapes" data-reveal="stagger">
              {priceFactors.map((f, i) => (
                <li key={f.title}>
                  <span className="shape-n" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="price-note">{priceNote}</p>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="jobs-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="jobs-title">What I quote for</h2>
            <p>Whole homes first, and smaller jobs on their own or as part of a bigger one.</p>
          </div>
          <ul className="price-rows" data-reveal="stagger">
            {quoteJobs.map((r) => {
              const c = r.look === "renovation" ? renovation.color : getSection(r.look)!.color;
              return (
                <li key={r.name} className={r.look === "renovation" ? "main" : undefined} style={{ "--c": c } as React.CSSProperties}>
                  <Link href={r.href}>
                    <h3>{r.name}</h3>
                    <p>{r.note}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="sec grey" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="faq-side" data-reveal="up">
            <h2 id="faq-title">Questions about prices</h2>
          </div>
          <FaqList faqs={priceFaqs} />
        </div>
      </section>

      <section className="sec" aria-labelledby="ask-title">
        <div className="wrap contact-grid">
          <div data-reveal="up">
            <h2 id="ask-title" className="big-h">Get your price</h2>
            <p className="big-p">Send a few photos and a line about the job, and I’ll come and see it.</p>
            <p className="big-p">Or ring me on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
          </div>
          <QuoteForm />
        </div>
      </section>

    </div>
  );
}
