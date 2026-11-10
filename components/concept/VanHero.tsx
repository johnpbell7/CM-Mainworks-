"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { business, renovation } from "@/content/site";
import QuoteForm from "@/components/QuoteForm";
import { Award, QuoteDoc, Shield, Team } from "@/components/Icons";

gsap.registerPlugin(useGSAP);

/*
  Concept hero (John, 10 Nov 2026: Lemonade-style line drawings, a van that
  transforms a house as it drives past). A street drawn in navy line on white. The
  CM MainWorks van drives through; everything behind the middle of the van is the
  renovated house, everything ahead of it the tired one, so the change happens out
  of sight behind the van. Gold ticks pop on as the van passes.

  The finished house is what shows without script (noscript) and under reduced motion.
*/

const W = 1600;
const H = 440;
const VAN_SCALE = 1.05;
const VAN_Y = 432 - 130 * VAN_SCALE; // wheels sit on the road
const VAN_MID = 128 * VAN_SCALE; // the change happens behind the middle of the van
const WHEEL_R = 20;
const START = -260;
const END = 1730;
const PASS = 713; // van position when the change is at the middle of the house
const FULL_RUN = 2 * (PASS - START); // the desktop run, for timing

// Fast at the ends, slow in the middle, so the van lingers while it passes the house
const lingering = (t: number) => t + (0.62 * Math.sin(2 * Math.PI * t)) / (2 * Math.PI);

// Where each tick sits (x is when it pops: once the change has passed it)
const TICKS = [
  { x: 606, y: 334 },
  { x: 700, y: 112 },
  { x: 792, y: 284 },
  { x: 902, y: 190 },
  { x: 1090, y: 254 },
];

function Tick({ x, y }: { x: number; y: number }) {
  return (
    <g className="vh-tick" transform={`translate(${x} ${y})`}>
      <g className="vh-pop">
        <circle r="13" className="tk-c" />
        <path d="M-6 0.5 L-1.8 4.6 L6 -4" className="tk-v" />
      </g>
    </g>
  );
}

function Spark({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="vh-spark" d="M0 -9 L2.2 -2.2 L9 0 L2.2 2.2 L0 9 L-2.2 2.2 L-9 0 L-2.2 -2.2Z" />
    </g>
  );
}

/** A window with frame, glazing bars and sill. `glow` lights it from inside. */
function Win({ x, y, w, h, glow }: { x: number; y: number; w: number; h: number; glow?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" className={glow ? "kgl" : "kb1"} />
      <path className="kw" d={`M${x + 6} ${y + h * 0.42 - 6}l8 -8M${x + 6} ${y + h * 0.42 - 13}l4 -4`} />
      <path className="k" d={`M${x + w / 2} ${y}V${y + h}M${x} ${y + h * 0.42}H${x + w}`} />
      <rect x={x - 5} y={y + h + 1} width={w + 10} height="3" className="sh" />
      <path className="k" d={`M${x - 5} ${y + h + 1}H${x + w + 5}`} />
    </g>
  );
}

function Tufts({ x, n, y = 352 }: { x: number; n: number; y?: number }) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const cx = x + i * 13;
    d += `M${cx} ${y}q2 -${10 + (i % 3) * 5} 5 -${14 + (i % 2) * 6}M${cx + 4} ${y}q1 -${8 + (i % 2) * 6} -3 -${12 + (i % 3) * 3}`;
  }
  return <path className="k thin" d={d} />;
}

function Pickets({ from, to, broken }: { from: number; to: number; broken?: boolean }) {
  const out: React.ReactNode[] = [];
  let i = 0;
  for (let x = from; x <= to; x += 12, i++) {
    if (broken && i % 4 === 2) continue; // missing picket
    const lean = broken ? ((i % 3) - 1) * 5 : 0;
    out.push(<path key={x} className="kf" d={`M${x} 352 L${x + lean} 322 l4 -6 l4 6 L${x + 8} 352Z`} />);
  }
  return (
    <g>
      <path className="k" d={`M${from - 3} 332H${to + 11}M${from - 3} 344H${to + 11}`} />
      {out}
    </g>
  );
}

/** The man in his blue jumper with a brew, and his spaniel. Drawn standing on y≈364 around x 400–505. */
export function People() {
  return (
    <g className="vh-people">
      <ellipse cx="452" cy="363" rx="54" ry="3.5" className="sh" />
      {/* the man: blue jumper, jeans, a brew in his hand */}
      <path className="kb2" d="M409 336H435L433 361H426L422 345L418 361H411Z" />
      <path className="kf" d="M410 361h9q2.5 0 2.5 3h-13zM425 361h9q3 0 3 3h-13z" />
      <path className="kb2" d="M410 309Q422 303 434 309L436.5 337H407.5Z" />
      <path className="k thin" d="M408 332H436M418 309q4 4 8 0" />
      <g className="vh-arm">
        <path className="kb2" d="M411 310l-6.5 14.5l3.5 2.8l6.5 -12.6z" />
        <circle cx="406" cy="327.5" r="2.8" className="kf" />
      </g>
      <path className="kb2" d="M432 310l7.5 13.5l-2.6 3.6l-7.4 -10.5z" />
      <rect x="437" y="321" width="9" height="10" rx="1.6" className="kg-gold" />
      <path className="k thin" d="M446 323.5q4 0 4 3.2q0 3.2 -4 3.2" />
      <circle cx="438.5" cy="328" r="2.8" className="kf" />
      <path className="vh-steam" d="M439 317q-3 -4 0 -7.5q3 -3.5 0 -7.5M443.5 317q-2.5 -3 0 -6q2.5 -3 0 -6" />
      <path className="k" d="M422 303.5V308.5" />
      <ellipse cx="422.5" cy="295" rx="8.6" ry="9.6" className="kf" />
      <path className="kd" d="M413.8 295.5q-1.6 -14 9.2 -14.4q9.8 -.2 10.6 9q-2.6 -3.2 -6.8 -3.4q-1.2 2.6 -5.6 2.8q-4.4 .2 -7.4 6z" />
      <path className="k thin" d="M415.4 294.6q-3.6 1 -1.6 5.6" />
      <circle cx="423.6" cy="295.8" r=".95" className="kd" />
      <circle cx="427.8" cy="295.8" r=".95" className="kd" />
      <path className="k thin" d="M429.8 296.6q1.8 1.6 .2 3M423.8 300.6q2.4 1.8 4.6 0M422.4 292.8h2.4M426.8 292.8h2.4" />
      {/* his dog: a scruffy spaniel in a gold collar, tail going */}
      <g className="vh-tail"><path className="kf" d="M450 341q-9 -4 -8.5 -14q2.6 -1.6 4.2 .6q-.4 7.6 5.4 9.6z" /></g>
      <path className="k" d="M455 349v12M461 350v11M476 350v11M482 349v12M453 361h4.5M459 361h4.5M474 361h4.5M480 361h4.5" />
      <path className="kf" d="M450 345q-2 -11.5 10.5 -12.5h18q9.5 0 9.5 9q0 7.5 -6.5 8.5h-25.5q-6 0 -6 -5z" />
      <path className="kplank" d="M461.5 333.5q7 -3 13 0q-1 7.5 -7 7.5q-6 0 -6 -7.5z" />
      <path className="kf" d="M480 336.5q-3 -12.5 8.4 -13.5q9.6 0 9.6 9.4q0 3 -2 4h5.2q2.6 0 2.6 2.6q0 3.2 -4.2 3.2h-9.6q-7.4 0 -10 -5.7z" />
      <path className="kplank" d="M483.4 324q-7.4 2 -6.4 12.6q5.2 -1 7.4 -8.4z" />
      <circle cx="491.5" cy="329.5" r="1.3" className="kd" />
      <circle cx="503" cy="333.6" r="1.7" className="kd" />
      <path className="k thin" d="M495.6 338.4q2.2 1.6 4.4 0" />
      <path className="collar" d="M481.5 339.5q3.4 4.4 8.6 3.4" />
      <circle cx="485" cy="344" r="1.9" className="kg-gold" />
    </g>
  );
}

/** The CM MainWorks van, side on, facing right. Local origin: top-left of the roof rack, wheels touch y=130. */
export function Van({ x = START, y = VAN_Y, scale = VAN_SCALE }: { x?: number; y?: number; scale?: number }) {
  const wheel = (cx: number) => (
    <g className="vh-wheel" data-cx={cx}>
      <circle cx={cx} cy="110" r={WHEEL_R} className="kd" />
      <circle cx={cx} cy="110" r="9" className="kf" />
      <path className="k thin" d={`M${cx} 101v18M${cx - 9} 110h18M${cx - 6.4} 103.6l12.8 12.8M${cx - 6.4} 116.4l12.8 -12.8`} />
    </g>
  );
  return (
    <g className="vh-van" transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* exhaust puffs, drifting back */}
      <g className="vh-puffs">
        <circle cx="-6" cy="100" r="6" className="puff p1" />
        <circle cx="-16" cy="94" r="8" className="puff p2" />
        <circle cx="-30" cy="88" r="10" className="puff p3" />
      </g>
      <ellipse cx="132" cy="131" rx="128" ry="5" className="sh" />
      <g className="vh-body">
        {/* ladder on the roof rack */}
        <path className="k" d="M24 12V4M164 12V4" />
        <rect x="16" y="-4" width="160" height="8" rx="2" className="kf" />
        <path className="k thin" d="M30 -4v8M48 -4v8M66 -4v8M84 -4v8M102 -4v8M120 -4v8M138 -4v8M156 -4v8" />
        {/* body */}
        <path className="kf" d="M10 104V22Q10 12 20 12H184Q197 12 204 23L230 60L249 66Q257 69 257 79V104Q257 112 249 112H18Q10 112 10 104Z" />
        <rect x="10" y="80" width="247" height="8" className="vh-stripe" />
        {/* cab window with the driver */}
        <path className="kb2" d="M191 24H201L224 58H191Z" />
        <path className="kw" d="M196 30l6 0M196 35l3 0" />
        <circle cx="205" cy="44" r="6.5" className="kf" />
        <path className="k" d="M198 40q7 -9 14 0" />
        <path className="k" d="M186 18V108M186 64h-8" />
        {/* side door seam */}
        <path className="k thin" d="M120 16V108" />
        {/* livery: the supplied logo lockup */}
        <image href="/brand/logo/main/cm-mainworks-header-lockup.svg" x="20" y="30" width="150" height="25.6" />
        <text x="22" y="72" className="vh-tel">{business.phoneDisplay}</text>
        {/* lights, mirror, arches */}
        <rect x="248" y="72" width="8" height="8" rx="2" className="kg-gold" />
        <rect x="10" y="66" width="6" height="12" rx="1.5" className="kg-gold" />
        <path className="k" d="M224 46h8v10h-6" />
        <path className="kf" d="M30 112a28 28 0 0 1 56 0M178 112a28 28 0 0 1 56 0" />
      </g>
      {wheel(58)}
      {wheel(206)}
    </g>
  );
}

export default function VanHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const svg = root.current!.querySelector<SVGSVGElement>(".vh-stage > svg")!;
      const a = svg.querySelector("#vh-a")!;
      const b = svg.querySelector("#vh-b")!;
      const van = svg.querySelector<SVGGElement>(".vh-van")!;
      const body = svg.querySelector(".vh-body")!;
      const wheels = gsap.utils.toArray<SVGGElement>(".vh-wheel", svg);
      const ticks = gsap.utils.toArray<SVGGElement>(".vh-pop", svg);
      const sparks = gsap.utils.toArray<SVGPathElement>(".vh-spark", svg);
      const arm = svg.querySelector(".vh-arm")!;
      const tail = svg.querySelector(".vh-tail")!;

      const setEdge = (e: number) => {
        a.setAttribute("width", String(Math.max(0, e)));
        b.setAttribute("x", String(e));
        b.setAttribute("width", String(Math.max(0, W - e)));
      };
      const finished = () => {
        setEdge(W);
        gsap.set(van, { x: END + 200, y: VAN_Y, scale: VAN_SCALE });
        gsap.set(ticks, { scale: 1 });
        gsap.set(sparks, { scale: 1, opacity: 1 });
      };

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        finished();
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(ticks, { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(sparks, { scale: 0, opacity: 0, transformOrigin: "50% 50%" });
        gsap.set(arm, { rotation: 0, svgOrigin: "411 310" });
        gsap.set(tail, { rotation: 0, svgOrigin: "450 341" });
        wheels.forEach((w) => gsap.set(w, { svgOrigin: `${w.dataset.cx} 110` }));
        const wag = gsap.to(tail, { rotation: 24, duration: 0.3, yoyo: true, repeat: -1, ease: "sine.inOut" });
        const bounce = gsap.to(body, { y: -1.4, duration: 0.17, yoyo: true, repeat: -1, ease: "sine.inOut", paused: true });

        const state = { x: START };
        let popped = 0;
        let waved = false;
        const render = () => {
          const edge = state.x + VAN_MID;
          gsap.set(van, { x: state.x, y: VAN_Y, scale: VAN_SCALE });
          const turn = (state.x / (2 * Math.PI * WHEEL_R * VAN_SCALE)) * 360;
          wheels.forEach((w) => gsap.set(w, { rotation: turn }));
          setEdge(edge);
          while (popped < TICKS.length && edge > TICKS[popped].x + 36) {
            gsap.to(ticks[popped], { scale: 1, duration: 0.5, ease: "back.out(2.6)" });
            popped++;
          }
          if (!waved && edge > 1130) {
            waved = true;
            gsap.to(sparks, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.07, ease: "back.out(3)" });
            gsap.timeline()
              .to(arm, { rotation: 150, duration: 0.35, ease: "back.out(2)" })
              .to(arm, { rotation: 128, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" })
              .to(arm, { rotation: 0, duration: 0.4, ease: "power2.inOut" }, "+=0.4");
            wag.timeScale(2.4);
            gsap.delayedCall(2.4, () => { wag.timeScale(1); });
          }
        };

        // What part of the street is on screen (the drawing is wider than a phone)
        const visible = () => {
          const box = svg.getBoundingClientRect();
          const stage = svg.parentElement!.getBoundingClientRect();
          const scale = Math.min(box.width / W, box.height / H);
          return { left: (stage.left - box.left) / scale, right: (stage.right - box.left) / scale };
        };

        const run = () => {
          const view = visible();
          const from = view.left - 250;
          const past = 2 * PASS - from; // as far past the house as it started before it
          const off = Math.max(past, view.right + 20);
          state.x = from;
          popped = 0;
          waved = false;
          gsap.set(ticks, { scale: 0 });
          gsap.set(sparks, { scale: 0, opacity: 0 });
          render();
          bounce.play();
          const run1 = 6.4 * Math.max(0.55, (past - from) / FULL_RUN);
          const speed = (1.62 * (past - from)) / run1; // how fast it's going as it leaves
          gsap.timeline({ onComplete: () => { bounce.pause(); } })
            .to(state, { x: past, duration: run1, ease: lingering, onUpdate: render })
            .to(state, { x: off, duration: (off - past) / speed, ease: "none", onUpdate: render });
        };
        // Start once the page has settled, so the first paint is never held up
        const id = window.setTimeout(run, 700);
        return () => window.clearTimeout(id);
      });
    },
    { scope: root },
  );

  return (
    <section className="vh" ref={root} aria-labelledby="hero-title">
      <noscript>
        <style>{`.vh-after{clip-path:none!important}.vh-before{display:none}.vh-van{display:none}.vh-pop,.vh-spark{transform:none!important;opacity:1!important}`}</style>
      </noscript>
      <div className="wrap vh-top">
        <div className="vh-text">
          <h1 id="hero-title">
            Your whole renovation, <span className="hl">one team.</span>
          </h1>
          <p className="lede">Kitchens, bathrooms, extensions and whole homes across the Midlands, managed start to finish.</p>
        </div>
        {/* the form sits over the sky on the right, so the street stays in view */}
        <div className="vh-form"><QuoteForm collapsible defaultJob={renovation.job} /></div>
      </div>

      <div className="vh-stage">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMinYMax meet" role="img" aria-label="Drawing: the CM MainWorks van drives past a tired house, and as it passes the house is renovated">
          <defs>
            <clipPath id="vh-after-clip" clipPathUnits="userSpaceOnUse"><rect id="vh-a" x="0" y="0" width="0" height={H} /></clipPath>
            <clipPath id="vh-before-clip" clipPathUnits="userSpaceOnUse"><rect id="vh-b" x="0" y="0" width={W} height={H} /></clipPath>
          </defs>

          {/* ---- sky and the town behind, faint ---- */}
          <g className="vb">
            <g className="vh-cloud c1"><path d="M188 92q6 -22 30 -16q12 -20 36 -8q24 -6 26 16q16 6 8 20H182q-16 -2 -10 -14q4 -6 16 2z" /></g>
            <g className="vh-cloud c2"><path d="M1238 66q6 -18 26 -12q12 -16 30 -6q20 -4 22 14q14 4 6 16H1232q-12 -2 -8 -12z" /></g>
            <g className="vh-cloud c3"><path d="M720 34q4 -12 18 -8q8 -12 22 -4q14 -2 14 10q10 4 4 12H716q-10 0 -6 -10z" /></g>
          </g>
          <g className="far">
            <path d="M0 352V236h58v-24h40v140zM102 352V258h52v94z" />
            <path d="M452 352V222h64v130zM520 352V250h40v102z" />
            <path d="M1030 352V214h46v-18h34v156zM1092 352V250h44v102z" />
            <path d="M1440 352V168h112v184zM1556 352V230h44v122z" />
            <path d="M1610 352V196h70v156zM1700 352V240h56v112zM1790 352V150h90v202zM1900 352V226h60v126zM1990 352V184h84v168zM2100 352V246h50v106z" />
            <path d="M-120 352V200h90v152zM-210 352V244h70v108zM-330 352V176h96v176z" />
            <circle cx="124" cy="262" r="30" /><circle cx="152" cy="276" r="22" />
            <circle cx="1130" cy="266" r="26" /><circle cx="1158" cy="282" r="18" />
          </g>
          <g className="vb">
            <path className="farw" d="M14 254h12M34 254h12M14 278h12M34 278h12M14 302h12M34 302h12M1454 190h16M1484 190h16M1514 190h16M1454 220h16M1484 220h16M1514 220h16M1454 250h16M1484 250h16M1514 250h16M1454 280h16M1484 280h16M1514 280h16M464 240h12M490 240h12M464 266h12M490 266h12M1040 232h12M1060 232h12M1040 258h12M1060 258h12" />
            <path d="M1046 120l6 -5l6 5M1068 108l5 -4l5 4M406 150l6 -5l6 5" className="vh-birds" />
          </g>

          {/* ---- road and pavement ---- */}
          <rect x={-W} y="366" width={W * 3} height={H - 366} className="rd" />
          <rect x={-W} y="352" width={W * 3} height="14" className="pv" />
          <path className="kerb" d={Array.from({ length: 120 }, (_, i) => `M${i * 40 - W + 20} 352v14`).join("")} />
          <path className="k" d={`M${-W} 352H${W * 2}M${-W} 366H${W * 2}`} />
          <path className="road" d={`M${-W} 414H${W * 2}`} />

          {/* ---- left neighbour ---- */}
          <g>
            <rect x="334" y="118" width="22" height="44" className="kf" />
            <path className="kb1" d="M134 198L272 112L412 198Z" />
            <path className="k thin" d="M220 150h104M190 172h168" />
            <rect x="150" y="198" width="248" height="154" className="kf" />
            <rect x="151" y="199" width="246" height="7" className="sh" />
            <Win x={172} y={214} w={60} h={44} />
            <Win x={316} y={214} w={60} h={44} />
            <path className="kb1" d="M164 344V280L176 268H238L250 280V344Z" />
            <path className="k" d="M184 270V344M230 270V344M164 300H250" />
            <rect x="268" y="270" width="40" height="82" className="kb2" />
            <circle cx="300" cy="312" r="2.4" className="kd" />
            <path className="k" d="M262 268h52" />
            <Tufts x={322} n={4} />
          </g>

          {/* ---- right neighbour, lamp post and tree ---- */}
          <g>
            <path className="kb1" d="M1182 206L1238 130H1392L1448 206Z" />
            <path className="k thin" d="M1222 160h188M1202 184h228" />
            <rect x="1198" y="206" width="234" height="146" className="kf" />
            <rect x="1199" y="207" width="232" height="7" className="sh" />
            <Win x={1220} y={224} w={62} h={46} />
            <Win x={1346} y={224} w={62} h={46} />
            <Win x={1220} y={290} w={62} h={46} />
            <rect x="1336" y="282" width="40" height="70" className="kb2" />
            <circle cx="1368" cy="318" r="2.4" className="kd" />
            <path className="kf" d="M1214 340h76v12h-76z" />
            <path className="k thin" d="M1222 340q4 -10 8 0M1238 340q4 -12 8 0M1254 340q4 -10 8 0M1270 340q4 -12 8 0" />
            <path className="k" d="M1146 352V198q0 -10 12 -10h14" />
            <path className="kg-gold" d="M1166 184h22l-4 10h-14z" />
            <ellipse cx="1520" cy="354" rx="40" ry="4" className="sh" />
            <path className="k" d="M1520 352V286" />
            <circle cx="1520" cy="262" r="34" className="kg" />
            <circle cx="1496" cy="282" r="20" className="kg" />
            <circle cx="1546" cy="280" r="22" className="kg" />
            <path className="k thin" d="M1508 250q6 -6 12 0M1530 270q6 -6 12 0" />
          </g>

          {/* ================= the house, before ================= */}
          <g className="vh-before" clipPath="url(#vh-before-clip)">
            <path className="kf" d="M852 134L856 92L882 95L878 136Z" />
            <path className="k" d="M858 92l-2 -8h14l2 9" />
            <path className="kg" d="M546 172L748 74Q760 80 774 78L954 172Z" />
            <path className="k thin" d="M610 140h40M668 140h30M760 140h60M842 140h52M640 116h30M706 116h40M792 116h26M694 96h24M770 96h20" />
            <path className="khole" d="M672 124h22l2 8h-22zM800 150h20l2 8h-20z" />
            <path className="ktarp" d="M736 100l40 -4l10 30l-44 6z" />
            <path className="k thin" d="M738 100l-14 24M786 126l18 20" />
            <rect x="568" y="172" width="364" height="180" className="kdingy" />
            <path className="khatch" d="M584 200l16 -16M590 210l26 -26M598 218l22 -22M880 320l18 -18M888 330l24 -24M896 338l16 -16M640 236l12 -12" />
            <path className="k" d="M698 176l6 14l-5 10l8 12l-4 9M902 290l-7 10l4 8l-6 10" />
            <path className="k" d="M556 174H900L944 204" />
            <rect x="598" y="186" width="84" height="56" className="kf" />
            <path className="k" d="M640 186V242M598 210H682M606 192l14 18l-6 12" />
            <rect x="722" y="190" width="56" height="48" className="kf" />
            <path className="k thin" d="M726 192q10 30 22 4q8 26 26 -2" />
            <rect x="818" y="186" width="84" height="56" className="kf" />
            <path className="kplank" d="M814 196l92 32l-3 8l-92 -32zM814 228l92 -32l3 8l-92 32z" />
            <rect x="592" y="276" width="96" height="58" className="kf" />
            <path className="k thin" d="M596 280q20 26 42 0q20 24 46 0" />
            <rect x="812" y="276" width="96" height="58" className="kf" />
            <path className="k" d="M860 276V334M812 300H908" />
            <path className="ktape" d="M822 282l30 18M852 282l-30 18" />
            <rect x="722" y="270" width="56" height="82" className="kg" />
            <path className="khatch" d="M730 290l12 -12M732 320l20 -20M756 344l14 -14" />
            <path className="k" d="M736 300h28" />
            <rect x="712" y="346" width="76" height="6" className="kf" />
            <path className="kf" d="M968 352L974 300L1048 296L1052 352Z" />
            <path className="k" d="M962 302L1056 292M992 352V318h22v34" />
            <path className="k thin" d="M994 320l18 30" />
            <rect x="528" y="314" width="30" height="38" rx="2" className="kg" />
            <path className="k" d="M526 314l26 -16l6 4" />
            <Tufts x={572} n={9} />
            <Tufts x={800} n={9} />
            <Tufts x={940} n={14} />
            <Pickets from={1062} to={1110} broken />
          </g>

          {/* ================= the house, after ================= */}
          <g className="vh-after" clipPath="url(#vh-after-clip)">
            <rect x="852" y="90" width="30" height="48" className="kf" />
            <path className="k" d="M848 90h38M856 90v-8h8v8M870 90v-8h8v8" />
            <path className="kb1" d="M544 172L750 70L956 172Z" />
            <path className="k thin" d="M699 95H801M648 120H852M597 145H903" />
            <path className="k thin" d="M720 95v12M760 95v12M740 108v12M690 120v12M730 120v12M770 120v12M810 120v12M640 145v12M680 145v12M720 145v12M760 145v12M800 145v12M840 145v12M880 145v12" />
            <rect x="568" y="172" width="364" height="180" className="kf" />
            <rect x="569" y="175" width="362" height="9" className="sh" />
            <rect x="933" y="263" width="178" height="6" className="sh" />
            <path className="k" d="M552 174H948" strokeWidth="3" />
            <path className="k thin" d="M568 340H932" />
            <Win x={598} y={186} w={84} h={56} glow />
            <Win x={722} y={190} w={56} h={48} glow />
            <Win x={818} y={186} w={84} h={56} glow />
            <Win x={592} y={276} w={96} h={58} glow />
            <Win x={812} y={276} w={96} h={58} glow />
            <path className="kf" d="M710 266H790L780 254H720Z" />
            <rect x="722" y="270" width="56" height="82" className="kdoor" />
            <rect x="734" y="280" width="32" height="22" rx="2" className="kgl" />
            <circle cx="768" cy="318" r="2.6" className="kd" />
            <rect x="712" y="346" width="76" height="6" className="kf" />
            <rect x="694" y="326" width="18" height="20" className="kf" />
            <circle cx="703" cy="316" r="12" className="kg" />
            <rect x="788" y="326" width="18" height="20" className="kf" />
            <circle cx="797" cy="316" r="12" className="kg" />
            {/* side extension with a roof lantern and glazed doors */}
            <path className="kgl" d="M990 262L1000 244H1052L1062 262Z" />
            <path className="k thin" d="M1016 244V262M1036 244V262" />
            <rect x="932" y="262" width="180" height="90" className="kf" />
            <path className="k" d="M928 262H1116" strokeWidth="3" />
            <rect x="950" y="280" width="146" height="72" className="kgl" />
            <path className="k" d="M986 280V352M1022 280V352M1060 280V352" />
            <path className="k thin" d="M968 280v10M1040 280v10" />
            <circle cx="968" cy="294" r="4" className="kg-gold" />
            <circle cx="1040" cy="294" r="4" className="kg-gold" />
            {/* tidy front: hedges, path, new fence */}
            <path className="kg" d="M572 352q-6 -26 18 -26q10 -14 28 -2q22 -6 22 18q8 4 4 10z" />
            <path className="kg" d="M820 352q-6 -24 16 -24q12 -12 26 -2q20 -4 20 16q8 4 4 10z" />
            <path className="kf" d="M732 352L728 366H772L768 352Z" />
            <path className="k thin" d="M730 359H770" />
            <Pickets from={1122} to={1134} />
            <Spark x={980} y={226} s={1.1} />
            <Spark x={634} y={92} s={0.9} />
            <Spark x={936} y={128} s={0.8} />
            <Spark x={1124} y={290} s={0.7} />
            {TICKS.map((t) => <Tick key={t.x} {...t} />)}
          </g>

          <People />

          {/* ---- the van ---- */}
          <Van />
        </svg>
      </div>

      <ul className="vh-meta wrap" aria-label="At a glance">
        <li><Team />One team, start to finish</li>
        <li><QuoteDoc />Free written quotes</li>
        <li><Shield />Insured</li>
        <li><Award />{business.experience[0].toUpperCase() + business.experience.slice(1)} in the trade</li>
      </ul>
    </section>
  );
}
