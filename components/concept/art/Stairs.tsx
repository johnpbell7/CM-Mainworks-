import { Base, Plant } from "./kit";

/* One staircase with an oak rail and treads, a landing above and a gold front door that swings open beneath it. */

const N = 8;
const X0 = 48;
const RUN = 18;
const RISE = 14.5;
const top = (i: number) => 210 - (i + 1) * RISE; // height of step i's tread
const railY = (x: number) => 146 - (RISE / RUN) * (x - 54);

export default function Stairs() {
  let outline = `M${X0} 210`;
  let treads = "";
  let spindles = "";
  for (let i = 0; i < N; i++) {
    const x = X0 + i * RUN;
    outline += `V${top(i)}H${x + RUN}`;
    treads += `M${x - 1.5} ${top(i) - 2}h${RUN + 3}v4h-${RUN + 3}z`;
    const mx = x + RUN / 2;
    spindles += `M${mx} ${top(i) + 1}V${(railY(mx) + 2).toFixed(1)}`;
  }
  outline += `V210Z`;
  return (
    <Base>
      <rect x="40" y="210" width="236" height="5" className="sh" />

      {/* upstairs wall and window, the landing */}
      <rect x="196" y="36" width="72" height="58" className="kf" />
      <rect x="210" y="48" width="44" height="36" className="kf" />
      <rect x="214" y="52" width="36" height="28" className="kgl" />
      <path className="k thin" d="M232 52V80M214 66H250" />
      <path className="kw" d="M219 62l6 -6" />
      <rect x="190" y="94" width="86" height="9" className="kb1" />

      {/* the front door, swinging */}
      <rect x="196" y="103" width="72" height="107" className="kf" />
      <rect x="212" y="107" width="46" height="103" className="kf" />
      <rect x="217" y="112" width="36" height="98" className="kgl" />
      <g className="a-door" style={{ transformOrigin: "217px 160px" }}>
        <rect x="217" y="112" width="36" height="98" className="kg-gold" />
        <rect x="223" y="119" width="24" height="20" rx="1.5" className="kgl thin" />
        <path className="k thin" d="M223 148h24v50h-24z" />
        <circle cx="247" cy="162" r="2.4" className="kd" />
      </g>
      <rect x="210" y="206" width="50" height="4" className="kb1 thin" />

      {/* pictures up the stair wall */}
      <rect x="90" y="66" width="26" height="22" className="kf" />
      <rect x="94" y="70" width="18" height="14" className="kb1" />
      <path className="k thin" d="M94 84l6 -7l4 4l3 -3l5 6" />
      <rect x="126" y="44" width="20" height="26" className="kf" />
      <rect x="130" y="48" width="12" height="18" className="kgl" />

      {/* a plant at the foot of the stairs */}
      <Plant x={24} y={210} s={0.95} />

      {/* the stairs */}
      <path className="kf" d={outline} />
      <path className="kplank thin" d={treads} />
      <path className="k thin" d={spindles} />

      {/* oak rail and the two newel posts */}
      <path className="kplank" d={`M54 ${railY(54) - 5}L188 ${railY(188) - 5}V${railY(188)}L54 ${railY(54)}Z`} />
      <rect x="45" y="142" width="10" height="68" className="kf" />
      <circle cx="50" cy="138" r="5" className="kplank" />
      <rect x="186" y="46" width="10" height="48" className="kf" />
      <circle cx="191" cy="42" r="5" className="kplank" />
    </Base>
  );
}
