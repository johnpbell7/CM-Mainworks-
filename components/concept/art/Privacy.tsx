import { Base, Tick, Plant } from "./kit";
import s from "./Privacy.module.css";

/*
  Your details kept safe. A locked post box: the quote form (a sealed envelope) slides
  into the slot, the padlock clicks shut and a tick lands. A pot plant at its foot.
  Everything runs on one 4s beat.
*/
export default function Privacy() {
  return (
    <Base>
      <ellipse cx="164" cy="208" rx="52" ry="3.6" className="sh" />

      {/* ---- the post box ---- */}
      <path className="kf" d="M128 207V104Q128 62 164 62Q200 62 200 104V207Z" />
      <path className="kb1" d="M130 90Q136 66 164 66Q192 66 198 90Q182 82 164 82Q146 82 130 90Z" />
      <path className="k" d="M128 98H200" />
      <path className="k thin" d="M135 104V200M193 104V200" />
      {/* the slot */}
      <rect x="140" y="112" width="48" height="14" rx="3" className="kd" />
      <path className="kw" d="M145 116h12" />
      {/* the locked hatch */}
      <rect x="142" y="142" width="44" height="54" rx="3" className="kf" />
      <path className="k thin" d="M142 150h-5M142 188h-5" />
      <g className="a-lock">
        <path className="kf" d="M153 169V160Q153 148 164 148Q175 148 175 160V169H170V160Q170 153 164 153Q158 153 158 160V169Z" />
      </g>
      <rect x="150" y="168" width="28" height="22" rx="4" className="kg-gold" />
      <circle cx="164" cy="177" r="3.2" className="kd" />
      <path className="k" d="M164 179v6" />
      <path className="kw" d="M155 172v12" />

      {/* ---- the envelope on its way in ---- */}
      <g className={s.env}>
        <g transform="rotate(-6 80 120)">
          <rect x="58" y="106" width="46" height="30" rx="3" className="kf" />
          <path className="k thin" d="M58 108L81 124L104 108" />
          <circle cx="81" cy="124" r="4" className="kg-gold" />
          <path className="k thin" d="M62 134l10 -8M100 134l-10 -8" />
        </g>
      </g>

      <g className={s.tick}>
        <Tick x={206} y={72} s={1.2} className="" />
      </g>

      {/* ---- a pot plant ---- */}
      <Plant x={246} y={210} s={0.95} />
    </Base>
  );
}
