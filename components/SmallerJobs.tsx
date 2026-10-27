import Link from "next/link";
import Illustration from "./Illustration";
import { Arrow } from "./Icons";
import { smallerServices } from "@/content/site";

/** Carpentry, joinery and decorating as compact cards: drawing, name, one line. */
export default function SmallerJobs() {
  return (
    <div className="smaller" data-reveal="stagger">
      {smallerServices.map((s) => (
        <Link key={s.slug} className="sj" href={`/services/${s.slug}`} style={{ "--c": s.color, "--pen": s.tint } as React.CSSProperties}>
          <span className="sj-ill"><Illustration kind={s.illo} fit="bottom" decorative /></span>
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
