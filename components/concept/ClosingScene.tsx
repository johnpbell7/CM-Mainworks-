"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Van } from "./VanHero";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  "Got a project in mind?" in the concept's line-drawing style: a sheet of plans is
  pinned up, a house with an extension sketches itself in, the van pulls up beside
  it, and gold ticks land on the plan. Plays once, when it's scrolled to.
  (John preferred this to the thought-bubble version: just sketching the idea.)
*/

const VAN_S = 0.62;
const VAN_X = 372;
const VAN_Y = 336 - 130 * VAN_S;

// The sketch, in drawing order (each path draws itself in)
const SKETCH = [
  "M18 204H262",
  "M50 204V112L110 64L170 112V204",
  "M42 117L110 58L178 117",
  "M140 84V64H154V95",
  "M98 204V162H122V204",
  "M62 130H90V154H62ZM76 130V154M62 141H90",
  "M130 130H158V154H130ZM144 130V154M130 141H158",
  "M170 204V148H242V204",
  "M190 148L197 137H216L223 148",
  "M182 162H232V204M199 162V204M216 162V204",
  "M50 220H170M50 216V224M170 216V224M190 220H242M190 216V224M242 216V224",
];

const TICKS = [
  { x: 112, y: 84 },
  { x: 244, y: 146 },
  { x: 124, y: 168 },
];

export default function ClosingScene() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const lines = gsap.utils.toArray<SVGPathElement>(".cs-line", el);
      const ticks = gsap.utils.toArray<SVGGElement>(".cs-pop", el);
      const van = el.querySelector<SVGGElement>(".vh-van")!;
      const wheels = gsap.utils.toArray<SVGGElement>(".vh-wheel", el);
      const body = el.querySelector(".vh-body")!;
      const pencil = el.querySelector(".cs-pencil")!;
      const puffs = el.querySelector(".vh-puffs")!;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(ticks, { scale: 0, transformOrigin: "50% 50%" });
        wheels.forEach((w) => gsap.set(w, { svgOrigin: `${w.dataset.cx} 110` }));
        const state = { x: -180 };
        const place = () => {
          gsap.set(van, { x: state.x, y: VAN_Y, scale: VAN_S });
          const turn = (state.x / (2 * Math.PI * 20 * VAN_S)) * 360;
          wheels.forEach((w) => gsap.set(w, { rotation: turn }));
        };
        place();
        gsap.set(puffs, { opacity: 0 });

        // the exhaust puffs only while the van moves, then everything is still (see .is-driving in concept.css)
        gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true }, onStart: () => van.classList.add("is-driving"), onComplete: () => van.classList.remove("is-driving") })
          .to(lines, { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut", stagger: 0.16 })
          .to(pencil, { x: 6, y: -4, rotation: -6, duration: 0.16, yoyo: true, repeat: 13, ease: "sine.inOut" }, 0)
          .to(puffs, { opacity: 1, duration: 0.2 }, 0.9)
          .to(state, { x: VAN_X, duration: 1.6, ease: "power3.out", onUpdate: place }, 0.9)
          .to(body, { y: -1.6, duration: 0.14, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.9)
          .to(puffs, { opacity: 0, duration: 0.6 }, 2.4)
          .to(ticks, { scale: 1, duration: 0.45, ease: "back.out(2.6)", stagger: 0.14 }, "-=0.4");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(van, { x: VAN_X, y: VAN_Y, scale: VAN_S });
      });
    },
    { scope: root },
  );

  return (
    <div className="cs" ref={root} aria-hidden="true">
      <svg viewBox="0 0 640 360">
        <ellipse cx="320" cy="338" rx="300" ry="6" className="sh" />
        <path className="k" d="M24 336H616" />
        {/* the plan, pinned up */}
        <g transform="translate(60 26) rotate(-3 150 130)">
          <rect x="6" y="8" width="284" height="248" rx="4" className="sh" />
          <rect x="0" y="0" width="284" height="248" rx="4" className="kb1" />
          <path className="cs-grid" d={Array.from({ length: 13 }, (_, i) => `M${12 + i * 21} 10V238`).join("") + Array.from({ length: 11 }, (_, i) => `M10 ${14 + i * 22}H274`).join("")} />
          <rect x="16" y="-8" width="40" height="16" rx="2" className="kgl" transform="rotate(-8 36 0)" />
          <rect x="230" y="-8" width="40" height="16" rx="2" className="kgl" transform="rotate(7 250 0)" />
          {SKETCH.map((d) => <path key={d} d={d} pathLength={1} className="cs-line" />)}
          {TICKS.map((t) => (
            <g key={t.x} transform={`translate(${t.x} ${t.y})`}>
              <g className="cs-pop">
                <circle r="11" className="tk-c" />
                <path d="M-5 0.5L-1.5 4L5 -3.4" className="tk-v" />
              </g>
            </g>
          ))}
          <g className="cs-pencil" transform="translate(236 214) rotate(-38)">
            <path className="kg-gold" d="M0 0H52V9H0Z" />
            <path className="kf" d="M52 0L66 4.5L52 9Z" />
            <path className="kd" d="M62 3.2L66 4.5L62 5.8Z" />
            <path className="kb2" d="M-8 0H0V9H-8Z" />
          </g>
        </g>
        {/* a cone by where the van stops */}
        <path className="kgl" d="M590 336L602 300L614 336Z" />
        <path className="kf" d="M596 318H608M593 327H611" />
        <path className="k" d="M584 336H620" />
        <Van x={-180} y={VAN_Y} scale={VAN_S} />
      </svg>
    </div>
  );
}
