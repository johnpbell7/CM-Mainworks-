import { Base, Plant } from "./kit";

/*
  Bathrooms: a slipper bath on a gold plinth with a tall gold freestanding tap, tiles
  half-way up the wall, a round mirror and a shelf, a plant, a towel over a ladder
  rail and a stool with a folded towel. Loop: steam curls up off the bath.
*/

export default function Bathroom() {
  let grout = "";
  for (let x = 62; x < 278; x += 24) grout += `M${x} 116V210`;
  for (let y = 135; y < 210; y += 19) grout += `M40 ${y}H278`;
  let rungs = "";
  for (let i = 0; i < 5; i++) {
    const y = 196 - i * 22;
    const t = (210 - y) / 116;
    rungs += `M${(252 + 10 * t).toFixed(1)} ${y}H${(274 + 10 * t).toFixed(1)}`;
  }
  return (
    <Base>
      {/* tiles half-way up, no frame */}
      <rect x="40" y="116" width="238" height="94" className="kb1 nostroke" />
      <path className="kwl" d={grout} />
      <path className="k thin" d="M40 116H278" />

      {/* a round mirror and a little shelf above the bath */}
      <circle cx="150" cy="62" r="24" className="kb1" />
      <circle cx="150" cy="62" r="19" className="k thin" />
      <path className="kw" d="M139 54l9 -9M141 62l4 -4" />
      <path className="k" d="M118 100H182" />
      <rect x="126" y="88" width="8" height="12" rx="2" className="kgl" />
      <rect x="138" y="84" width="7" height="16" rx="2" className="kf" />
      <path className="k thin" d="M141.5 84v-4" />
      <circle cx="170" cy="94" r="5.6" className="kb2" />

      {/* a plant in a pot */}
      <Plant x={56} y={210} s={1.45} />

      {/* steam off the bath */}
      <path className="a-steam" d="M132 112q-5 -7 0 -14q5 -7 0 -14" />
      <path className="a-steam d2" d="M150 108q-5 -7 0 -14q5 -7 0 -14" />
      <path className="a-steam d3" d="M168 112q-5 -7 0 -14q5 -7 0 -14" />

      {/* the slipper bath on its gold plinth */}
      <ellipse cx="150" cy="210" rx="62" ry="3" className="sh" />
      <path className="kg-gold" d="M116 188H186L194 210H108Z" />
      <path className="kf" d="M80 114Q74 108 80 104Q92 106 108 122Q118 128 134 128H206Q216 128 216 138Q214 174 186 188H116Q88 184 82 154Q80 134 80 114Z" />
      <path className="k thin" d="M90 118Q104 130 120 136H206M92 152Q98 176 120 180" />
      <path className="kw" d="M96 144v12" />

      {/* the gold freestanding tap */}
      <path className="kg-gold" d="M226 210V114q0 -12 -12 -12h-6v8h6q4 0 4 4v96z" />
      <rect x="219" y="204" width="14" height="6" rx="2" className="kg-gold" />
      <path className="a-drip" d="M210 112v5" />

      {/* a towel over the ladder rail */}
      <path className="k" d="M252 210L262 94M274 210L284 94" />
      <path className="k thin" d={rungs} />
      <path className="kgl" d="M257 150h24v28h-24z" />
      <path className="kgl" d="M257 150h24v12h-24z" />
    </Base>
  );
}
