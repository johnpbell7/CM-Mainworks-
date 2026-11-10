import { Base, Tick } from "./kit";
import { Win } from "./Building";

/*
  Floors: a new floor going down. Boards laid on the left, bare boards on the right,
  and a gold board sliding into the gap between them. A mallet resting on the bare
  side, a small stack of boards waiting. Loop: the gold board slides in (a-plank).
*/

export default function Flooring() {
  return (
    <Base>
      {/* the room: back wall, a window with a radiator under it, a picture, skirting */}
      <rect x="56" y="66" width="208" height="84" rx="2" className="kb1 nostroke" />
      <Win x={82} y={82} w={44} h={34} glow />
      <rect x="84" y="124" width="40" height="15" rx="2" className="kf" />
      <path className="k thin" d="M92 124v15M100 124v15M108 124v15M116 124v15" />
      <rect x="150" y="80" width="34" height="26" className="kf" />
      <rect x="154" y="84" width="26" height="18" className="kb1" />
      <path className="k thin" d="M154 102l8 -9l6 6l4 -4l8 7" />
      <rect x="56" y="141" width="208" height="9" className="kf" />

      {/* boards waiting, leaning on the wall */}
      <path className="kplank" d="M218 150L230 86h8L226 150z" />
      <path className="kplank" d="M229 150L243 88h8L237 150z" />
      <path className="kplank" d="M240 150L254 92h7L248 150z" />

      {/* the floor: laid boards, the gap, bare boards */}
      <path className="kplank" d="M56.0 150H82.0L61.0 200H28.0Z" />
      <path className="kplank" d="M82.0 150H108.0L94.0 200H61.0Z" />
      <path className="kplank" d="M108.0 150H134.0L127.0 200H94.0Z" />
      <path className="kplank" d="M134.0 150H160.0L160.0 200H127.0Z" />
      <path className="kplank" d="M160.0 150H186.0L193.0 200H160.0Z" />
      <path className="kf" d="M212.0 150H238.0L259.0 200H226.0Z" />
      <path className="kf" d="M238.0 150H264.0L292.0 200H259.0Z" />
      <path className="k thin" d="M44.8 170H73.6M66.9 186H97.9M105.2 160H132.6M128.1 192H160.0M160.0 176H189.6" />
      <circle cx="228.5" cy="160" r="1.2" className="kd" /><circle cx="234.1" cy="176" r="1.2" className="kd" /><circle cx="239.7" cy="192" r="1.2" className="kd" /><circle cx="255.9" cy="160" r="1.2" className="kd" /><circle cx="263.8" cy="176" r="1.2" className="kd" /><circle cx="271.6" cy="192" r="1.2" className="kd" />
      <g className="a-plank"><path className="kg-gold" d="M186.0 150H212.0L226.0 200H193.0Z" /></g>
      <path className="k" d="M56 150H264L292 200H28Z" />
      <path className="kf" d="M28 200H292V208H28Z" />

      {/* the mallet */}
      <rect x="226" y="164" width="22" height="13" rx="3" className="kb2" transform="rotate(-12 237 170)" />
      <path className="k" d="M248 172l26 10" />

      <Tick x={203} y={124} />
    </Base>
  );
}
