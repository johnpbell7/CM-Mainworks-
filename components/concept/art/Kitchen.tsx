import { Base, Plant } from "./kit";

/* One kitchen run: tiled splashback, a hood, an oven with its light on, a pan steaming, one gold pendant swinging. */

export default function Kitchen() {
  let tiles = "";
  for (let row = 1; row < 4; row++) {
    const y = 100 + row * 10;
    tiles += `M52 ${y}H268`;
  }
  for (let row = 0; row < 4; row++) {
    const y = 100 + row * 10;
    for (let x = 52 + (row % 2 ? 9 : 18); x < 268; x += 18) tiles += `M${x} ${y}v10`;
  }
  return (
    <Base>
      <rect x="52" y="210" width="216" height="5" className="sh" />

      {/* splashback and wall cabinet */}
      <rect x="52" y="100" width="216" height="40" className="kb1 thin" />
      <path className="kwl" d={tiles} />
      <rect x="52" y="52" width="50" height="48" className="kf" />
      <rect x="57" y="57" width="40" height="38" className="k thin" />
      <path className="k" d="M92 82v8" />
      <rect x="52" y="100" width="50" height="5" className="sh" />

      {/* an open shelf: jars and a little plant */}
      <rect x="188" y="68" width="9" height="14" rx="2" className="kf" />
      <rect x="187" y="65" width="11" height="4" rx="1" className="kgl thin" />
      <rect x="200" y="72" width="8" height="10" rx="2" className="kf" />
      <Plant x={215} y={82} s={0.38} />
      <path className="k" d="M184 82H222" />

      {/* a chopping board against the splashback */}
      <rect x="103" y="104" width="6" height="10" rx="2" className="kplank" />
      <rect x="96" y="111" width="20" height="29" rx="3" className="kplank" />
      <circle cx="106" cy="108" r="1.4" className="kf thin" />

      {/* extractor hood */}
      <rect x="139" y="20" width="14" height="38" className="kf" />
      <path className="kf" d="M118 92L132 58H160L174 92Z" />
      <path className="kw" d="M135 66l-6 16" />
      <rect x="124" y="92" width="44" height="3" className="kgl thin" />

      {/* worktop, base units, oven */}
      <rect x="46" y="140" width="228" height="9" className="kb1" />
      <rect x="52" y="149" width="216" height="61" className="kf" />
      <path className="k thin" d="M118 149V210M174 149V210M222 149V210M52 202H268" />
      <rect x="57" y="154" width="56" height="13" className="k thin" />
      <rect x="57" y="170" width="56" height="13" className="k thin" />
      <rect x="57" y="186" width="56" height="13" className="k thin" />
      <path className="k" d="M80 160.5h10M80 176.5h10M80 192.5h10" />
      <circle cx="128" cy="156" r="1.6" className="kd" />
      <circle cx="146" cy="156" r="1.6" className="kd" />
      <circle cx="164" cy="156" r="1.6" className="kd" />
      <rect x="125" y="164" width="42" height="30" rx="2" className="kgl" />
      <path className="k" d="M123 161H169" />
      <path className="kw" d="M131 172l9 -5M131 180l4 -2" />
      <rect x="179" y="154" width="38" height="44" className="k thin" />
      <rect x="227" y="154" width="36" height="44" className="k thin" />
      <path className="k" d="M184 162v10M257 162v10" />

      {/* a tea towel over the oven rail */}
      <path className="kb2" d="M150 160h12v24h-12z" />
      <path className="kw" d="M152 177h8" />
      <path className="k" d="M148 161h16" />

      {/* a bowl of fruit */}
      <circle cx="203" cy="127" r="4.2" className="kb1" />
      <circle cx="197.5" cy="131.5" r="4.6" className="kgl" />
      <circle cx="208" cy="131" r="4.6" className="kg-gold" />
      <path className="kf" d="M189 133h28q-2 7 -14 7q-12 0 -14 -7z" />

      {/* the pan on the hob, steaming */}
      <rect x="126" y="138" width="40" height="3" className="kd" />
      <rect x="134" y="122" width="24" height="16" rx="2" className="kf" />
      <path className="k" d="M132 122H160M134 129h-7M158 129h7" />
      <circle cx="146" cy="119" r="2.4" className="kf thin" />
      <path className="a-steam" d="M139 115q-3 -5 0 -9q3 -4 0 -9" />
      <path className="a-steam d2" d="M146 114q-3 -5 0 -9q3 -4 0 -9" />
      <path className="a-steam d3" d="M153 115q-3 -5 0 -9q3 -4 0 -9" />

      {/* a jar of spoons */}
      <rect x="68" y="126" width="13" height="14" rx="2" className="kf" />
      <path className="k thin" d="M71 126l-2 -14M75 126l1 -16M79 126l3 -12" />
      <ellipse cx="68.6" cy="110" rx="2.4" ry="3.4" className="kplank thin" />
      <ellipse cx="76.4" cy="108" rx="2.4" ry="3.4" className="kplank thin" />
      <ellipse cx="82.4" cy="112" rx="2.4" ry="3.4" className="kplank thin" />

      {/* one gold pendant */}
      <g className="a-swing" style={{ transformOrigin: "232px 0px" }}>
        <linearGradient id="kit-cord" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="44"><stop offset="0" stopColor="var(--ink)" stopOpacity="0" /><stop offset="1" stopColor="var(--ink)" /></linearGradient>
        <path className="k thin" d="M232 0V78" style={{ stroke: "url(#kit-cord)" }} />
        <path className="kg-gold" d="M220 98L226 78H238L244 98Z" />
        <circle cx="232" cy="99" r="3.6" className="kgl thin" />
      </g>
    </Base>
  );
}
