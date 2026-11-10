import { Base } from "./kit";
import { Win } from "./Building";
import s from "./Roof.module.css";

// The roof slope: ridge at y=70, eaves at y=150, edges leaning out by 0.2 a pixel
const xL = (y: number) => 26 + (150 - y) * 0.2;
const xR = (y: number) => 294 - (150 - y) * 0.2;

/** Roofing: the bottom of the roof is tiled, the top is felt and battens, a roofer sits astride the ridge. */
export default function Roof() {
  // fish-scale tiles: row 0 is the bottom row, rows 0 and 1 are done, row 2 is done as far as x=156
  let scales = "";
  [0, 1, 2].forEach((row) => {
    const yb = 150 - row * 20; // bottom of the row
    const start = row % 2 ? 26 : 16;
    const stop = row === 2 ? 156 : 300;
    for (let x = start; x < stop; x += 20) {
      scales += `M${x} ${yb}q10 8 20 0`;
      scales += `M${x + 20} ${yb - 16}V${yb}`;
    }
  });
  // battens across the felt
  const battens = "M41 79H279M157 100H284";
  // a roof ladder on the left
  let rungs = "";
  for (let t = 0.1; t < 0.95; t += 0.14) rungs += `M${(28 + 8 * t).toFixed(1)} ${(210 - 84 * t).toFixed(1)}H${(46 + 8 * t).toFixed(1)}`;

  return (
    <Base>
      <clipPath id="roof-slope"><path d="M42 70H278L294 150H26Z" /></clipPath>

      {/* chimney behind the roof */}
      <rect x="88" y="40" width="24" height="46" className="kf" />
      <path className="k" d="M84 40h32" strokeWidth="3" />
      <path className="kg" d="M92 40v-8h6v8M102 40v-8h6v8" />
      <path className="k thin" d="M88 50H112M88 60H112M100 40V50M94 50V60M106 50V60M100 60V70" />

      {/* roof: tiles below, felt and battens above */}
      <path className="kf" d="M42 70H278L294 150H26Z" />
      <g clipPath="url(#roof-slope)">
        <path className="k thin" d={scales} />
        <path className="kb1" d="M42 70H278L286 110H156V90H38Z" />
        <path className="k thin" d={battens} />
      </g>
      <path className="k" d="M42 70L26 150M278 70L294 150" />
      <rect x="40" y="62" width="240" height="8" rx="3.5" className="kb1" />
      <path className="k thin" d="M70 62v8M100 62v8M130 62v8M160 62v8M190 62v8M220 62v8M250 62v8" />

      {/* a roof window in the new tiles */}
      <rect x="212" y="113" width="36" height="27" rx="2" className="kf" />
      <rect x="216" y="117" width="28" height="19" className="kb1" />
      <path className="kw" d="M220 128l7 -7M220 122l2 -2" />
      
      {/* the next tile, sliding in */}
      <g className="a-tile"><path className="kg-gold" d="M156 92H176V102Q166 111 156 102Z" /></g>

      {/* gutter, house below */}
      <path className="k" d="M22 150H298" strokeWidth="3" />
      <rect x="24" y="151" width="272" height="5" rx="2" className="kb1" />
      <rect x="56" y="156" width="208" height="54" className="kf" />
      <rect x="266" y="155" width="6" height="51" rx="1" className="kb1" />
      <path className="k thin" d="M264 172h10M264 192h10" />
      <path className="kb1" d="M266 204h6l5 6h-11z" />
      <rect x="57" y="157" width="206" height="8" className="sh" />
      <Win x={80} y={170} w={40} h={28} glow />
      <Win x={200} y={170} w={40} h={28} />
      <path className="kf" d="M142 166H178L174 158H146Z" />
      <rect x="148" y="168" width="24" height="42" className="kdoor" />
      <rect x="153" y="173" width="14" height="14" rx="2" className="kgl" />
      <circle cx="167" cy="194" r="1.8" className="kd" />
      <rect x="140" y="206" width="40" height="4" className="kf" />

      {/* ladder up to the roof */}
      <path className="k" d="M28 210L36 126M46 210L54 126" />
      <path className="k thin" d={rungs} />

    </Base>
  );
}
