import { Base, Tick } from "./kit";
import { Van } from "../VanHero";
import s from "./Photos.module.css";

/*
  Send a few photos: the phone on the left, three photos flying along a dotted arc
  to the CM MainWorks van on the right, and a tick once they've landed. Matches the
  FAQ drawing (you, then Connor). Loops: the photos fly in turn, the tick lands.
*/

function Print({ x, y, tilt }: { x: number; y: number; tilt: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <rect x="-17" y="-14" width="34" height="28" rx="2.5" className="kf" />
      <rect x="-13" y="-10" width="26" height="16" className="kb1" />
      <path className="k thin" d="M-7 6V0L0 -5L7 0V6" />
      <rect x="-1.6" y="1" width="3.2" height="5" className="kg-gold nostroke" />
    </g>
  );
}

export default function Photos() {
  return (
    <Base>
      {/* the phone, camera open on a house */}
      <ellipse cx="70" cy="208" rx="30" ry="3" className="sh" />
      <g transform="rotate(-6 70 140)">
        <rect x="44" y="84" width="52" height="110" rx="10" className="kf" />
        <rect x="50" y="98" width="40" height="78" rx="3" className="kb1" />
        <path className="k thin" d="M63 91h14" />
        <path className="k thin" d="M55 105h5M55 105v5M85 105h-5M85 105v5M55 169h5M55 169v-5M85 169h-5M85 169v-5" />
        <path className="k" d="M60 154V138L70 130L80 138V154" />
        <rect x="67" y="144" width="6" height="10" className="kg-gold" />
        <circle cx="70" cy="185" r="4" className="kg-gold" />
      </g>

      {/* the photos, flying over to the van */}
      <path className="arc" d="M98 100Q170 18 244 126" />
      <g className={`${s.fly} ${s.f1}`}><Print x={124} y={70} tilt={-10} /></g>
      <g className={`${s.fly} ${s.f2}`}><Print x={170} y={52} tilt={4} /></g>
      <g className={`${s.fly} ${s.f3}`}><Print x={214} y={80} tilt={12} /></g>

      {/* Connor's van, catching them */}
      <Van x={176} y={222 - 130 * 0.5} scale={0.5} />
      <Tick x={276} y={138} className="a-pop d3" />
    </Base>
  );
}
