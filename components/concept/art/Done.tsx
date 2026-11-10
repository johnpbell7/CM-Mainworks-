import { Base, Tick } from "./kit";
import { Win } from "./Building";
import { Van } from "../VanHero";
import s from "./Done.module.css";

function Spark({ x, y, k = 1, delay = "" }: { x: number; y: number; k?: number; delay?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className={`vh-spark a-dot ${delay}`} d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5Z" />
    </g>
  );
}

/** The finished house, the homeowner waving with her keys, and the CM MainWorks van idling at the kerb. */
export default function Done() {
  return (
    <Base>
      {/* chimney, roof, house */}
      <rect x="116" y="54" width="16" height="32" className="kf" />
      <path className="k" d="M113 54h22M118 54v-6h4v6M126 54v-6h4v6" />
      <path className="kb1" d="M22 104L90 48L158 104Z" />
      <path className="k thin" d="M36 92H144M52 80H128M52 92v12M92 92v12M132 92v12M72 80v12M112 80v12" />
      <rect x="32" y="104" width="116" height="106" className="kf" />
      <rect x="33" y="107" width="114" height="8" className="sh" />
      <path className="k" d="M26 104H154" strokeWidth="3" />
      <Win x={46} y={120} w={28} h={24} glow />
      <Win x={106} y={120} w={28} h={24} glow />
      <Win x={44} y={162} w={32} h={28} glow />
      <path className="kf" d="M90 158H122L118 148H94Z" />
      <rect x="96" y="160" width="22" height="50" className="kdoor" />
      <rect x="100" y="165" width="14" height="16" rx="2" className="kgl" />
      <circle cx="113" cy="187" r="1.8" className="kd" />
      <rect x="92" y="206" width="30" height="4" className="kf" />
      {/* the van, idling, with its exhaust puffing */}
      <g className={s.idle}><Van x={166} y={163} scale={0.485} /></g>

      <Tick x={90} y={76} />
      <Tick x={170} y={122} className="a-pop d2" />
      <Spark x={190} y={84} k={.9} delay="d2" />
    </Base>
  );
}
