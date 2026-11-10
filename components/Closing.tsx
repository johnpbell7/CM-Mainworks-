import Link from "next/link";
import { business } from "@/content/site";
import ClosingScene from "./concept/ClosingScene";

export default function Closing() {
  return (
    <section className="sec closing" aria-labelledby="close-title">
      <div className="wrap">
        <h2 id="close-title" data-reveal="up">Got a <span className="hl">project in mind?</span></h2>
        <div className="contact" data-reveal="stagger">
          <a className="link" href={business.phoneHref}>Ring me on {business.phoneDisplay}</a>
          <Link className="link" href="/contact#quote">Get a free quote</Link>
        </div>
      </div>
      <ClosingScene />
    </section>
  );
}
