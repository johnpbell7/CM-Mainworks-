import Link from "next/link";
import Illustration, { type IllustrationKind } from "./Illustration";
import { frame } from "./concept/frames";
import { sections } from "@/content/site";

/** A service's drawing, small, framed like the page heads. Drawn only once its menu has been opened, so pages stay light. */
export function Mini({ kind, show }: { kind: IllustrationKind; show: boolean }) {
  return <span className="mini" aria-hidden="true">{show && <Illustration kind={kind} view={frame(kind).view} decorative />}</span>;
}

/**
  Every service, with its little drawing: the Renovations drop-down on computers and the
  services list under Renovations in the phone menu (John, 10 Nov 2026). The links are always
  in the page (for Google); the drawings appear once the menu is opened.
*/
export default function ServiceLinks({ art, path, id }: { art: boolean; path: string; id?: string }) {
  return (
    <ul className="svc-links" id={id}>
      {sections.map((s) => {
        const href = `/services/${s.slug}`;
        return (
          <li key={s.slug}>
            <Link href={href} aria-current={path === href ? "page" : undefined}>
              <Mini kind={s.illo} show={art} />
              <span>{s.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
