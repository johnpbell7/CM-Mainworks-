import { useId } from "react";
import { Base, Tick } from "./kit";
import s from "./Gallery.module.css";

/*
  Recent work. One framed before-and-after photo on an easel: the same house, tired on
  the left and renovated on the right, with a gold handle that wipes back and forth.
  The picture is 136 x 88, centred on x=160.
*/

function Tufts({ x, y, n }: { x: number; y: number; n: number }) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const cx = x + i * 6;
    d += `M${cx} ${y}q1 -${5 + (i % 3) * 2} 3 -${7 + (i % 2) * 3}M${cx + 2} ${y}q0 -${4 + (i % 2) * 3} -2 -${6 + (i % 3)}`;
  }
  return <path className="k thin" d={d} />;
}

export default function Gallery() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `gal-${id}`;
  return (
    <Base clouds={false}>
      {/* ---- the easel ---- */}
      <ellipse cx="160" cy="209" rx="84" ry="3.4" className="sh" />
      <path className="kf" d="M104 138L92 210H100L112 138ZM208 138L220 210H212L200 138Z" />
      <path className="k" d="M160 138V206" />
      <rect x="76" y="136" width="168" height="8" rx="2" className="kplank" />

      {/* ---- the frame ---- */}
      <rect x="82" y="26" width="156" height="110" rx="4" className="kplank" />
      <rect x="89" y="33" width="142" height="96" className="kf" />
      <defs>
        <clipPath id={clip}>
          <rect className={s.wipe} x="160" y="30" width="200" height="100" />
        </clipPath>
      </defs>

      {/* sky and the ground, shared */}
      <rect x="92" y="38" width="136" height="86" className="kb1 nostroke" />
      <rect x="92" y="108" width="136" height="16" className="kf nostroke" />
      <path className="k thin" d="M92 108H228" />
      <path className="kb2 nostroke" d="M155 108h10l8 16h-26z" />
      <path className="k thin" d="M155 108l-8 16M165 108l8 16" />

      {/* ---- before: the tired house ---- */}
      <g transform="translate(160 108) scale(1.12) translate(-160 -108)">
        <path className="kg" d="M118 78L160 52L202 78Z" />
        <path className="khole" d="M148 68h8l1 4h-8zM176 72h7l1 3h-7z" />
        <path className="k thin" d="M130 74H150M168 66H186M176 74H192" />
        <rect x="190" y="56" width="10" height="16" className="kf" style={{ transform: "rotate(5deg)", transformOrigin: "195px 72px" }} />
        <rect x="126" y="78" width="68" height="30" className="kdingy" />
        <path className="khatch" d="M130 84l6 -6M132 96l10 -10M178 102l8 -8M184 102l8 -8" />
        <rect x="134" y="84" width="18" height="14" className="kf" />
        <path className="k thin" d="M143 84V98M134 91H152" />
        <rect x="168" y="84" width="18" height="14" className="kf" />
        <path className="kplank" d="M168 86l18 10l-1 3l-18 -10zM168 96l18 -10l1 3l-18 10z" />
        <rect x="153" y="88" width="14" height="20" className="kg" />
        <path className="khatch" d="M155 98l8 -8M157 106l8 -8" />
        <Tufts x={122} y={108} n={4} />
        <Tufts x={196} y={108} n={4} />
        <path className="kf" d="M206 108L207 98L212 96L213 108ZM216 108V102L221 100L222 108Z" />
      </g>

      {/* ---- after: the same house, renovated (only to the right of the handle) ---- */}
      <g clipPath={`url(#${clip})`}>
        <rect x="92" y="38" width="136" height="86" className="kb1 nostroke" />
        <rect x="92" y="108" width="136" height="16" className="kf nostroke" />
        <path className="k thin" d="M92 108H228" />
        <path className="kb2 nostroke" d="M155 108h10l8 16h-26z" />
        <path className="k thin" d="M155 108l-8 16M165 108l8 16" />
        <g transform="translate(160 108) scale(1.12) translate(-160 -108)">
        <path className="kf" d="M194 54h10v18h-10z" />
        <path className="kb1" d="M116 78L160 50L204 78Z" />
        <path className="k thin" d="M130 70H190M138 64H182M124 76H196" />
        <rect x="126" y="78" width="68" height="30" className="kf" />
        <rect x="134" y="84" width="18" height="14" className="kgl" />
        <path className="k thin" d="M143 84V98M134 91H152M137 93l3 -3" />
        <rect x="168" y="84" width="18" height="14" className="kgl" />
        <path className="k thin" d="M177 84V98M168 91H186" />
        <rect x="153" y="88" width="14" height="20" className="kdoor" />
        <circle cx="164" cy="99" r="1.1" className="kd" />
        <path className="kg" d="M120 108q-3 -10 7 -10q4 -6 11 -1q8 -1 8 7q3 2 1 4z" />
        <path className="kg" d="M180 108q-3 -9 6 -9q4 -5 10 -1q7 0 7 6q3 2 1 4z" />
        <path className="kf" d="M208 108V98L212.5 94L217 98V108ZM218 108V98L222.5 94L227 98V108Z" />
        </g>
      </g>

      {/* ---- the handle that wipes ---- */}
      <g className={s.handle}>
        <path className="kf nostroke" d="M159 38h2v86h-2z" />
        <path className="k thin" d="M160 38V124" />
        <circle cx="160" cy="81" r="8" className="kg-gold" />
        <path className="k thin" d="M156.5 81l-2.5 0M163.5 81l2.5 0M155 81l2 -2M155 81l2 2M165 81l-2 -2M165 81l-2 2" />
      </g>

      <Tick x={238} y={30} s={1} className="a-pop d2" />
    </Base>
  );
}
