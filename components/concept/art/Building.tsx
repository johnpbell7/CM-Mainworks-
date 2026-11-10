import { Base, Tick } from "./kit";
import s from "./Building.module.css";

/** A window with frame, glazing bar, glint and sill, as in the homepage hero. `glow` lights it from inside. */
export function Win({ x, y, w, h, glow }: { x: number; y: number; w: number; h: number; glow?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" className={glow ? "kgl" : "kb1"} />
      <path className="kw" d={`M${x + 5} ${y + h * 0.42 - 5}l7 -7M${x + 5} ${y + h * 0.42 - 11}l3.5 -3.5`} />
      <path className="k" d={`M${x + w / 2} ${y}V${y + h}M${x} ${y + h * 0.42}H${x + w}`} />
      <rect x={x - 4} y={y + h + 1} width={w + 8} height="3" className="sh" />
      <path className="k" d={`M${x - 4} ${y + h + 1}H${x + w + 4}`} />
    </g>
  );
}

/** Extension going up beside a house: blockwork racked back, a gold block coming down, one builder waving. */
export default function Building() {
  const W = 26;
  const H = 14;
  const ends = [228, 228, 202, 176]; // where each row of blocks stops (bottom row first)
  const blocks: React.ReactNode[] = [];
  ends.forEach((end, row) => {
    const y = 196 - row * H;
    for (let x = row % 2 ? 107 : 120; x < end; x += W) {
      const a = Math.max(120, x);
      const b = Math.min(end, x + W);
      blocks.push(<rect key={`${row}-${x}`} x={a} y={y} width={b - a} height={H} className="kf" />);
    }
  });
  return (
    <Base>
      {/* ---- the house ---- */}
      <rect x="92" y="62" width="14" height="36" className="kf" />
      <path className="k" d="M90 62h18" />
      <path className="kb1" d="M22 108L74 60L126 108Z" />
      <path className="k thin" d="M36 96H112M50 84H98" />
      <rect x="30" y="108" width="90" height="102" className="kf" />
      <rect x="31" y="111" width="88" height="7" className="sh" />
      <path className="k" d="M24 108H126" strokeWidth="3" />
      <Win x={42} y={126} w={28} h={24} glow />
      <Win x={80} y={126} w={28} h={24} glow />
      <Win x={40} y={166} w={30} h={26} />
      <rect x="84" y="164" width="22" height="46" className="kdoor" />
      <rect x="88" y="169" width="14" height="15" rx="2" className="kgl" />
      <circle cx="101" cy="192" r="1.8" className="kd" />

      {/* ---- the extension going up, the finished shape pencilled in ---- */}
      <path className="cut" d="M120 114L230 140V182" />
      {blocks}
      <rect x="124" y="148" width="46" height="6" rx="1.5" className="kgl" />
      <rect x="143" y="149.5" width="8" height="3" rx="1.5" className="kb1 thin" />

      {/* a barrow of sand with a shovel in it */}
      <path className="k" d="M274 164L288 126M284 126h8" />
      <path className="kb2" d="M244 168q14 -12 30 -8q10 2 16 8z" />
      <path className="k" d="M250 200L308 175M289 183L292 210M257 186L255 196" />
      <path className="kf" d="M240 168H292L282 186H254Z" />
      <circle cx="250" cy="200" r="9.5" className="kf" />
      <circle cx="250" cy="200" r="2.4" className="kd" />
      <g className="a-drop">
        <rect x="202" y="168" width="26" height="14" className="kg-gold" />
        <path className="kw" d="M207 173h6" />
      </g>
      <Tick x={182} y={104} />

    </Base>
  );
}
