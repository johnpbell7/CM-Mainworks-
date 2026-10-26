import Link from "next/link";
import { business } from "@/content/site";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="wrap">
        <img className="badge" src="/brand/logo/badge/cm-badge-jaunty.svg" alt="" width={120} height={53} />
        <h1>This page has <span className="hl">gone walkabout.</span></h1>
        <p>The link may be old or mistyped. Try the homepage, or call Connor on {business.phoneDisplay}.</p>
        <Link className="btn btn-gold" href="/">Back to the homepage</Link>
      </div>
    </section>
  );
}
