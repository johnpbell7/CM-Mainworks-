import { Base, Tick } from "./kit";
import s from "./Quote.module.css";

/*
  A visit and a written quote. The quote on its clipboard, stood on a small table with
  the tape measure and a pen. One loop: the tick drops onto the total.
*/
export default function Quote() {
  return (
    <Base>
      {/* ---- a small table ---- */}
      <path className="kf" d="M62 168H258V176H62Z" />
      <path className="kf" d="M80 176V210H90V176ZM230 176V210H240V176Z" />
      <path className="khatch" d="M96 170l-5 5M150 170l-5 5M204 170l-5 5" />
      <ellipse cx="160" cy="210" rx="100" ry="3" className="sh" />

      {/* ---- the quote on its clipboard ---- */}
      <g transform="rotate(-3 160 168)">
        <rect x="112" y="40" width="96" height="128" rx="6" className="kplank" />
        <rect x="121" y="58" width="78" height="102" rx="2" className="kf" />
        <rect x="146" y="32" width="28" height="16" rx="4" className="kb2" />
        <rect x="153" y="29" width="14" height="7" rx="3" className="kf" />
        <circle cx="160" cy="42" r="2" className="kd" />
        {/* the letterhead: a little house */}
        <path className="kb1" d="M126 82l10 -9l10 9z" />
        <rect x="128" y="82" width="16" height="10" className="kf" />
        <rect x="134" y="85" width="4" height="7" className="kg-gold" />
        <path className="k thin" d="M154 77H190M154 84H178" />
        <path className="k" d="M126 100H194" />
        {/* three lines, each ticked */}
        <path className="k thin" d="M126 108h6v6h-6zM126 120h6v6h-6zM126 132h6v6h-6z" />
        <path className="k thin" d="M127.2 111l1.8 2l2.6 -3.4M127.2 123l1.8 2l2.6 -3.4M127.2 135l1.8 2l2.6 -3.4" />
        <path className="k thin" d="M138 111H184M138 123H176M138 135H182" />
        <rect x="126" y="144" width="68" height="12" rx="6" className="kgl" />
        <text x="132" y="154.2" className="ipound" style={{ fontSize: 12 }}>£</text>
        <path className="k thin" d="M146 150H178" />
      </g>
      <g className={s.land}>
        <Tick x={190} y={150} s={1.25} className="" />
      </g>

      {/* ---- tape measure and pen ---- */}
      <circle cx="90" cy="156" r="12" className="kg" />
      <circle cx="90" cy="156" r="5" className="kf" />
      <rect x="83" y="164" width="14" height="4" className="kg-gold" />
      <g transform="rotate(-8 232 164)">
        <path className="kg-gold" d="M214 161H242L248 164L242 167H214Z" />
        <path className="k thin" d="M236 161v6" />
      </g>
    </Base>
  );
}
