import { Base, Tick } from "./kit";
import { Win } from "./Building";
import s from "./Renovation.module.css";

function Spark({ x, y, k = 1, delay = "" }: { x: number; y: number; k?: number; delay?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className={`vh-spark a-dot ${delay}`} d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5Z" />
    </g>
  );
}

/** A whole house mid-renovation: the left half finished, the right half under scaffold, a bucket going up, a skip, and the neighbour with his dog. */
export default function Renovation() {
  return (
    <Base>
      {/* a tree on the finished side */}
      <path className="k" d="M60 210V170M60 188l-7 -7" />
      <path className="kb1" d="M44 172q-9 -2 -7 -13q2 -9 11 -9q3 -11 13 -11q11 0 13 11q9 1 9 11q0 11 -9 11z" />

      {/* chimney */}
      <rect x="186" y="38" width="22" height="46" className="kdingy" />
      <path className="k" d="M182 38h30M190 38v-7h6v7M200 38v-7h6v7" />

      {/* roof: new tiles on the left, tired on the right */}
      <path className="kb1" d="M84 106L162 50V106Z" />
      <path className="k thin" d="M99 94H162M114 82H162M130 70H162M118 94v12M138 94v12M128 82v12" />
      <path className="kdingy" d="M162 50L240 106H162Z" />
      <path className="k thin" d="M178 84H208M200 94H236" />
      <path className="khole" d="M176 90h14l1 6h-14zM214 78h12l1 5h-12z" />
      <path className="ktarp" d="M204 70l14 -4l5 14l-16 3z" />
      <path className="k thin" d="M206 71l-5 9M220 67l6 11" />
      <path className="k" d="M84 106L162 50L240 106" />
      <path className="k" d="M80 106H244" strokeWidth="3" />
      <path className="k thin" d="M162 106Q200 112 240 106" />
      <rect x="93" y="109" width="68" height="7" className="sh" />

      {/* walls: finished on the left, still tired on the right */}
      <rect x="92" y="106" width="70" height="104" className="kf" />
      <rect x="162" y="106" width="70" height="104" className="kdingy" />
      <path className="k" d="M92 106V210M162 106V210M232 106V210" />

      {/* left half: new windows, a gold door, tidy planting */}
      <Win x={104} y={120} w={30} h={26} glow />
      <Win x={100} y={166} w={32} h={28} glow />
      <path className="kf" d="M130 162H160L156 154H134Z" />
      <rect x="134" y="164" width="22" height="46" className="kdoor" />
      <rect x="139" y="169" width="12" height="13" rx="2" className="kgl" />
      <circle cx="151" cy="192" r="1.8" className="kd" />
      <rect x="128" y="206" width="34" height="4" className="kf" />

      {/* right half: a taped window, an empty opening */}
      <rect x="182" y="120" width="30" height="26" className="kf" />
      
      <rect x="180" y="166" width="38" height="30" className="kg" />

      {/* scaffold across the right half, with a pulley and a bucket going up */}
      <path className="k" d="M168 210V54M230 210V54" />
      <rect x="164" y="164" width="70" height="5" className="kplank" />
      <rect x="164" y="119" width="70" height="5" className="kplank" />
      <path className="k" d="M230 56L254 46" />
      <circle cx="254" cy="50" r="4.5" className="kf" />
      <path className={`rope ${s.rope}`} d="M254 55V151" />
      <g className={s.bucket}>
        <path className="k" d="M247 152q7 -9 14 0" />
        <path className="kg-gold" d="M246 152H262L259 168H249Z" />
        <path className="k thin" d="M248 158H260" />
      </g>

      {/* a skip of rubble out front */}
      <path className="kb1" d="M246 186q6 -10 14 -6q6 -8 14 -2q8 -6 16 4z" />
      <path className="kplank" d="M262 184L286 170l2.5 4.5L264 188z" />
      <path className="kg-gold" d="M238 186H304L294 210H248Z" />
      <path className="k thin" d="M243 194H299" />

      <Tick x={118} y={90} />
    </Base>
  );
}
