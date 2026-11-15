import { Base, Tick } from "./kit";
import { Win } from "./Building";

/*
  What shapes a price (prices page, John 15 Nov 2026): a room being looked over before
  the quote. A patch of plaster cut back shows the old brick, a pipe and a run of old
  wiring; the tape measure and a torch on the floor, the torch's beam on the patch.
  Loop: the tick pops on beside the patch (a-pop, from Tick).
*/
export default function Survey() {
  return (
    <Base>
      {/* the room: back wall, a window, skirting */}
      <rect x="56" y="66" width="208" height="84" rx="2" className="kb1 nostroke" />
      <Win x={78} y={82} w={44} h={34} />
      <rect x="56" y="141" width="208" height="9" className="kf" />
      <path className="k" d="M56 150V66H264V150" />

      {/* the opened-up patch: brick, an old pipe and wiring behind the plaster */}
      <rect x="160" y="78" width="80" height="58" rx="2" className="kplank" />
      <path className="k thin" d="M160 90H240M160 102H240M160 114H240M160 126H240M176 78v12M200 78v12M224 78v12M188 90v12M212 90v12M176 102v12M200 102v12M224 102v12M188 114v12M212 114v12M176 126v10M200 126v10M224 126v10" />
      <path className="kg" d="M160 96H240V102H160Z" />
      <path className="k thin" d="M182 96v6M218 96v6" />
      <path className="k" d="M166 136C170 124 180 128 184 116S200 108 204 120S224 126 232 112" />
      <rect x="160" y="78" width="80" height="58" rx="2" className="k" />
      <path className="cut" d="M154 72H246V142H154Z" />

      {/* the floor */}
      <path className="kf" d="M56 150H264L292 200H28Z" />
      <path className="k thin" d="M50 160H270M42 174H278M34 188H286" />
      <path className="kf" d="M28 200H292V208H28Z" />

      {/* the torch on the floor, its beam on the patch */}
      <path className="kgl" d="M150 176L176 136L222 136L168 184Z" opacity=".55" style={{ stroke: "none" }} />
      <g transform="rotate(-30 158 182)">
        <rect x="140" y="176" width="28" height="12" rx="3" className="kg" />
        <path className="kg-gold" d="M168 174H176V190H168Z" />
      </g>

      {/* the tape measure */}
      <circle cx="92" cy="182" r="13" className="kg" />
      <circle cx="92" cy="182" r="5" className="kf" />
      <path className="kg-gold" d="M104 186H136V191H104Z" />
      <path className="k thin" d="M112 186v3M120 186v2M128 186v3" />

      <Tick x={252} y={74} />
    </Base>
  );
}
