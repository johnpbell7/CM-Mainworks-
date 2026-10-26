import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Closing from "@/components/Closing";
import { Arrow } from "@/components/Icons";
import { areas } from "@/content/areas";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Areas covered around Lichfield",
  description:
    "CM MainWorks covers Lichfield, Burntwood, Tamworth, Sutton Coldfield, Shenstone, Whittington and Fradley for carpentry, building, joinery and decorating.",
  path: "/areas",
});

export default function Areas() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/areas", label: "Areas" }]}
        title={<>Areas <span className="hl">we cover</span></>}
        lede="CM MainWorks is based in Lichfield and works across the towns and villages around it. If you’re nearby but not listed, ask anyway."
      />
      <section className="sec" style={{ paddingTop: 0 }} aria-label="Towns and villages">
        <div className="wrap">
          <ul className="area-cards" data-reveal="stagger">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`}>
                  <h2>{a.name}</h2>
                  <span className="where">{a.where[0].toUpperCase() + a.where.slice(1)}</span>
                  <p>{a.intro.split(". ")[0]}.</p>
                  <span className="go">Carpentry and building in {a.name} <Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="draft">Draft list of areas, waiting on Connor to confirm.</p>
        </div>
      </section>
      <Closing />
    </>
  );
}
