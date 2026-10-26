import Link from "next/link";
import { business } from "@/content/site";

export default function Closing() {
  return (
    <section className="sec closing" aria-labelledby="close-title">
      <div className="wrap">
        <h2 id="close-title" data-reveal="up">Got a <span className="hl">job in mind?</span></h2>
        <div className="contact" data-reveal="stagger">
          <a className="link" href={business.phoneHref}>Ring me on {business.phoneDisplay}</a>
          <a className="link" href={business.whatsapp} target="_blank" rel="noopener">WhatsApp me</a>
          <Link className="link" href="/contact#quote">Get a free quote</Link>
        </div>
      </div>
      <img className="big-badge" src="/brand/logo/badge/cm-badge-jaunty.svg" alt="" width={320} height={140} loading="lazy" />
    </section>
  );
}
