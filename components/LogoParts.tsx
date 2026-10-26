import gsap from "gsap";
import { logo } from "./logo-paths";

/*
  The CM badge split into its two halves, plus the wordmark, for animation.
  Used by the page-load intro and the square social video (/logo-animation).
  Artwork: paths are copied verbatim from cm-mainworks-stacked-on-navy.svg and only
  masked into halves. The chalk seam line is visible only while the halves are apart.
*/

// Transforms from the supplied stacked logo
const OUTER = "translate(6.3 0) scale(1.0334)";
const BADGE = "translate(8.0 8.0)";
const SKEW = "translate(6.40 0) translate(0 40.4) skewX(-9) translate(0 -40.4)";

// The box-joint line between the navy and gold halves (badge-local units)
const JOINT = "98.57,-4 98.57,16.15 78.57,16.15 78.57,32.31 98.57,32.31 98.57,48.46 78.57,48.46 78.57,64.61 98.57,64.61 98.57,86";
const LEFT_CLIP = "M-12 -12 H98.57 V16.15 H78.57 V32.31 H98.57 V48.46 H78.57 V64.61 H98.57 V95 H-12 Z";
const RIGHT_CLIP = "M98.57 -12 H205 V95 H98.57 V64.61 H78.57 V48.46 H98.57 V32.31 H78.57 V16.15 H98.57 Z";

// Spark ticks that burst out when the halves lock (viewBox units, centred on the joint)
const CX = 113, CY = 50;
export const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2 + 0.26;
  const dx = Math.cos(a), dy = Math.sin(a) * 0.62;
  const r0 = 112, len = 16;
  const r = (n: number) => Math.round(n * 100) / 100; // identical on server and client
  return { dx, dy, x1: r(CX + dx * r0), y1: r(CY + dy * r0), x2: r(CX + dx * (r0 + len)), y2: r(CY + dy * (r0 + len)), gold: i % 2 === 0 };
});

export function Half({ side }: { side: "l" | "r" }) {
  const id = `ix-${side}`;
  return (
    <svg className={`intro-half ${side}`} viewBox={logo.viewBox} aria-hidden="true">
      <defs>
        <clipPath id={`${id}-round`}><rect width="191.5" height="80.8" rx="15" /></clipPath>
        <clipPath id={`${id}-half`}><path d={side === "l" ? LEFT_CLIP : RIGHT_CLIP} /></clipPath>
      </defs>
      <g transform={OUTER}>
        <g transform={BADGE}>
          <g transform={SKEW}>
            <g clipPath={`url(#${id}-half)`}>
              <g clipPath={`url(#${id}-round)`}>
                <rect x="-2" y="-2" width="195.5" height="84.8" fill="#D9A441" />
                <path d={logo.finger} fill="#16264A" />
              </g>
              <g transform="translate(3 3.6)"><path d={logo.cShadow} fill="#D9A441" /></g>
              <path d={logo.c} fill="#F5EFE4" />
              <g transform="translate(3 3.6)"><path d={logo.mShadow} fill="#F5EFE4" /></g>
              <path d={logo.m} fill="#16264A" />
              <rect width="191.5" height="80.8" rx="15" fill="none" stroke="#F5EFE4" strokeWidth="4.6" />
              <g clipPath={`url(#${id}-round)`}>
                <polyline className="intro-seam" points={JOINT} fill="none" stroke="#F5EFE4" strokeWidth="4.6" strokeLinejoin="round" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}


/** Both halves, the spark burst and the wordmark, stacked in one square-ish stage. */
export function LogoArt() {
  return (
    <div className="intro-pop">
      <Half side="l" />
      <Half side="r" />
      <svg viewBox={logo.viewBox} aria-hidden="true">
        {SPARKS.map((s, i) => (
          <line key={i} className="intro-spark" x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke={s.gold ? "#D9A441" : "#F5EFE4"} strokeWidth="3.4" strokeLinecap="round" />
        ))}
        <g className="intro-word"><g transform="translate(6.0 144.4)"><path d={logo.word} fill="#F5EFE4" /></g></g>
        <g className="intro-desc"><g transform="translate(21.8 168.4)"><path d={logo.descriptor} fill="#B9832A" /></g></g>
      </svg>
    </div>
  );
}

/**
  Adds the snap sequence to a timeline: halves fly in, wind up, snap together with
  a spark burst, the wordmark pops up, then a friendly nod. Sets the label "snap".
  `extras` fade in with the wordmark (e.g. a line of text under the logo).
*/
export function addSnap(tl: gsap.core.Timeline, root: Element, extras: Element[] = []) {
  const q = gsap.utils.selector(root);
  const L = q(".intro-half.l")[0];
  const R = q(".intro-half.r")[0];
  const pop = q(".intro-pop")[0];
  const seams = q(".intro-seam");
  const word = q(".intro-word")[0];
  const desc = q(".intro-desc")[0];
  const sparks = q(".intro-spark");

  gsap.set(L, { xPercent: -130, rotation: -24, opacity: 0, transformOrigin: "40% 30%" });
  gsap.set(R, { xPercent: 130, rotation: 24, opacity: 0, transformOrigin: "60% 30%" });
  gsap.set([word, desc], { opacity: 0, y: 26, transformOrigin: "50% 100%" });
  gsap.set(extras, { opacity: 0, y: 12 });
  gsap.set(sparks, { opacity: 0 });

  // 1. Halves fly in from each side and land a little apart
  tl.to([L, R], { opacity: 1, duration: 0.2 }, 0.15)
    .to(L, { xPercent: -16, rotation: -7, duration: 0.8, ease: "back.out(1.9)" }, 0.15)
    .to(R, { xPercent: 16, rotation: 7, duration: 0.8, ease: "back.out(1.9)" }, 0.24)
    // 2. Wind up, a quick pull back like they're lining up the joint
    .to(L, { xPercent: -22, rotation: -10, duration: 0.2, ease: "power2.out" }, 1.0)
    .to(R, { xPercent: 22, rotation: 10, duration: 0.2, ease: "power2.out" }, 1.0)
    // 3. Snap together
    .to([L, R], { xPercent: 0, rotation: 0, duration: 0.18, ease: "power4.in" }, 1.2)
    .addLabel("snap", 1.38)
    .to(seams, { opacity: 0, duration: 0.12 }, "snap")
    .to(pop, { scaleX: 1.12, scaleY: 0.9, duration: 0.07, ease: "power2.out" }, "snap")
    .to(pop, { scaleX: 1, scaleY: 1, duration: 0.8, ease: "elastic.out(1.1, 0.32)" }, "snap+=0.07");

  // 4. Sparks burst from the joint
  sparks.forEach((s, i) => {
    const d = SPARKS[i];
    tl.fromTo(s, { opacity: 1, x: -d.dx * 26, y: -d.dy * 26 },
      { opacity: 0, x: d.dx * 18, y: d.dy * 18, duration: 0.55, ease: "power2.out", immediateRender: false }, "snap");
  });

  // 5. Wordmark pops up, then a friendly nod
  tl.to(word, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(2.2)" }, "snap+=0.22")
    .to(desc, { opacity: 1, y: 0, duration: 0.55, ease: "back.out(2)" }, "snap+=0.34")
    .to(extras, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.12 }, "snap+=0.5")
    .to(pop, { rotation: -6, duration: 0.22, ease: "power2.out" }, "snap+=0.85")
    .to(pop, { rotation: 0, duration: 0.7, ease: "elastic.out(1, 0.38)" }, "snap+=1.07");

  return { L, R, word, desc, seams };
}
