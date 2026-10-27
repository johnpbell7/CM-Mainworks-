import Image from "next/image";
import Link from "next/link";
import Illustration from "./Illustration";
import { Arrow } from "./Icons";
import { smallerServices } from "@/content/site";
import { media } from "@/content/media";

/** Carpentry, joinery and decorating as compact cards: a photo (or the drawing until one arrives), name, one line. */
export default function SmallerJobs() {
  return (
    <div className="smaller" data-reveal="stagger">
      {smallerServices.map((s) => (
        <Link key={s.slug} className="sj" href={`/services/${s.slug}`} style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
          <span className="sj-ill">
            {media[s.slug].src
              ? <Image src={media[s.slug].src!} alt="" fill sizes="104px" />
              : <Illustration kind={s.illo} fit="bottom" decorative />}
          </span>
          <span className="sj-text">
            <h3>{s.name}</h3>
            <p>{s.blurb}</p>
          </span>
          <Arrow className="sj-arrow" />
        </Link>
      ))}
    </div>
  );
}
