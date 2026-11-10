import { Base } from "./kit";
import { Win } from "./Building";
import s from "./Town.module.css";

function Spark({ x, y, k = 1, delay = "" }: { x: number; y: number; k?: number; delay?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className={`vh-spark a-dot ${delay}`} d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5Z" />
    </g>
  );
}

/** A terrace of three houses on a local street, a map pin bobbing over the middle one, a lamp, a hedge. */
export default function Town() {
  return (
    <Base>
      {/* ---- left house: gable front, chimney ---- */}
      <rect x="76" y="86" width="12" height="30" className="kf" />
      <path className="k" d="M74 86h16" />
      <path className="kb1" d="M18 122L61 80L104 122Z" />
      <path className="k thin" d="M33 110H89M44 98H78" />
      <rect x="24" y="122" width="74" height="88" className="kf" />
      <rect x="25" y="125" width="72" height="7" className="sh" />
      <path className="k" d="M18 122H104" strokeWidth="3" />
      <Win x={42} y={138} w={26} h={22} />
      <rect x="40" y="170" width="22" height="40" className="kf" />
      <rect x="45" y="175" width="12" height="13" rx="2" className="kb1" />
      <circle cx="58" cy="196" r="1.6" className="kd" />

      {/* ---- middle house: the one on the map. Hipped roof, gold front door ---- */}
      <path className="kb1" d="M96 118L122 82H182L208 118Z" />
      <path className="k" d="M122 82L96 118M182 82L208 118" />
      <path className="k thin" d="M110 100H194M118 90H186" />
      <rect x="104" y="118" width="96" height="92" className="kf" />
      <rect x="105" y="121" width="94" height="8" className="sh" />
      <path className="k" d="M96 118H208" strokeWidth="3" />
      <Win x={116} y={132} w={26} h={22} glow />
      <Win x={162} y={132} w={26} h={22} glow />
      <Win x={110} y={170} w={26} h={26} />
      <Win x={170} y={170} w={26} h={26} />
      <path className="kf" d="M136 164H168L164 156H140Z" />
      <rect x="140" y="166" width="24" height="44" className="kdoor" />
      <rect x="145" y="171" width="14" height="15" rx="2" className="kgl" />
      <circle cx="159" cy="190" r="1.8" className="kd" />
      <rect x="136" y="206" width="32" height="4" className="kf" />

      {/* ---- right house: gable front ---- */}
      <path className="kf" d="M200 134L248 90L296 134Z" />
      <path className="k thin" d="M216 122H280M230 110H266" />
      <rect x="206" y="134" width="84" height="76" className="kf" />
      <rect x="207" y="137" width="82" height="7" className="sh" />
      <path className="k" d="M200 134H296" strokeWidth="3" />
      <Win x={235} y={148} w={26} h={22} />
      <rect x="214" y="172" width="22" height="38" className="kb1" />
      <circle cx="231" cy="192" r="1.6" className="kd" />

      {/* a low hedge in front of the right house */}
      <path className="kb1" d="M244 210q-2 -12 8 -13q2 -8 11 -6q7 -6 14 1q10 -1 10 9q4 3 3 9z" />

      {/* ---- the map pin, bobbing over the middle house ---- */}
      <g className="a-pin">
        <path className="kg-gold" d="M152 22Q135 22 135 40Q135 54 152 70Q169 54 169 40Q169 22 152 22Z" transform="translate(8 0)" />
        <circle cx="160" cy="39" r="7" className="kf" />
      </g>
      <Spark x={118} y={44} k={1} />
      <Spark x={204} y={52} k={1.2} delay="d2" />
    </Base>
  );
}
