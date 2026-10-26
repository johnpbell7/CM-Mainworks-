import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Closing from "@/components/Closing";
import { Arrow } from "@/components/Icons";
import { localAreas, midlandsAreas, type Area } from "@/content/areas";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Areas I cover across the Midlands",
  description:
    "Based in Lichfield and covering the Midlands: Birmingham, Solihull, Sutton Coldfield, Tamworth, Walsall, Cannock, Burton upon Trent, Redditch, Leicester and more.",
  path: "/areas",
});

function Cards({ list }: { list: Area[] }) {
  return (
    <ul className="area-cards" data-reveal="stagger">
      {list.map((a) => (
        <li key={a.slug}>
          <Link href={`/areas/${a.slug}`}>
            <h3>{a.name}</h3>
            <span className="where">{a.where}</span>
            <p>{a.intro.split(". ")[0]}.</p>
            <span className="go">Carpentry and building in {a.name} <Arrow /></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Areas() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/areas", label: "Areas" }]}
        title={<>Areas <span className="hl">I cover</span></>}
        lede="I’m based in Lichfield and work right across the Midlands. Not sure if you’re in my patch? Send me your postcode and ask."
      />
      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="local-title">
        <div className="wrap">
          <h2 id="local-title" className="mid-h" data-reveal="up">Around Lichfield</h2>
          <Cards list={localAreas} />
        </div>
      </section>
      <section className="sec grey" aria-labelledby="mid-title">
        <div className="wrap">
          <h2 id="mid-title" className="mid-h" data-reveal="up">Across the Midlands</h2>
          <Cards list={midlandsAreas} />
        </div>
      </section>
      <Closing />
    </>
  );
}
