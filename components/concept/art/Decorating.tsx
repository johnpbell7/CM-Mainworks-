import { Base } from "./kit";
import { Win } from "./Building";
import s from "./Decorating.module.css";

/*
  Decorating: a wall going from its old coat to a fresh pale blue, the roller working the
  edge of the new paint. Coving along the top, a window, colour cards taped up, a light
  switch and a socket, masking tape on the skirting. A dust sheet below, a tin with a brush
  in it, and a stepladder with a tin of paint on top. Loop: the roller and the fresh coat
  rise together, then start again.
*/

export default function Decorating() {
  return (
    <Base>
      {/* the wall: the old coat, and the fresh coat rising over it */}
      <rect x="44" y="64" width="150" height="132" className="kg nostroke" />
      <rect x="44" y="64" width="150" height="132" className={`kb1 nostroke ${s.paint}`} />
      <rect x="44" y="64" width="150" height="132" className="k" />

      {/* coving along the top */}
      <rect x="44" y="64" width="150" height="7" className="kf" />
      <path className="k thin" d="M44 74H194" />

      {/* a window */}
      <rect x="150" y="84" width="38" height="46" rx="2" className="kf" />
      <Win x={154} y={88} w={30} h={38} glow />

      {/* colour cards taped up to choose from */}
      <rect x="52" y="84" width="12" height="12" className="kb2 thin" />
      <rect x="67" y="84" width="12" height="12" className="kf thin" />
      <rect x="52" y="99" width="12" height="12" className="kgl thin" />
      <rect x="55" y="81.5" width="6" height="4" className="kgl thin" />
      <rect x="70" y="81.5" width="6" height="4" className="kgl thin" />
      <rect x="55" y="96.5" width="6" height="4" className="kgl thin" />

      {/* a light switch by the window, a socket by the floor */}
      <rect x="170" y="146" width="11" height="13" rx="1.5" className="kf" />
      <rect x="173.5" y="149" width="4" height="7" rx="1" className="k thin" />
      <rect x="56" y="176" width="16" height="11" rx="1.5" className="kf" />
      <path className="k thin" d="M61 180v3M67 180v3" />

      {/* skirting, with masking tape along its top */}
      <rect x="44" y="196" width="150" height="9" className="kf" />
      <rect x="44" y="193.5" width="150" height="2.5" className="kgl nostroke" />

      {/* the roller, its sleeve wet with the new colour (its pole never shows through the floor) */}
      <clipPath id="deco-clip"><rect x="0" y="0" width="320" height="200" /></clipPath>
      <g clipPath="url(#deco-clip)">
        <g className={s.roller}>
          <rect x="80" y="76" width="58" height="16" rx="8" className="kb2" />
          <path className="k" d="M138 84h8v32h-27v18" />
          <rect x="114" y="133" width="10" height="34" rx="3" className="kg-gold" />
        </g>
      </g>

      {/* the dust sheet */}
      <path className="kf" d="M30 210L38 200Q70 196 110 202Q150 196 202 200L212 210Z" />
      <path className="k thin" d="M64 199l-6 11M120 201l4 9M168 199l-4 11" />

      {/* a tin with a brush resting in it */}
      <rect x="208" y="181" width="5" height="18" rx="2" className="kg-gold" transform="rotate(22 210 190)" />
      <rect x="196" y="190" width="20" height="17" rx="2" className="kf" />
      <path className="k" d="M194 190h24" />
      <path className="kb1 thin" d="M199 190v6q2 3 4 0v-6z" />

      {/* the stepladder, front on, a tin of paint on top */}
      <path className="k thin" d="M258 136L286 210" />
      <path className="k" d="M228 210L240 136M268 210L256 136" />
      <path className="k" d="M231.6 188H264.4M235.1 166H260.9M238.4 146H257.6" />
      <rect x="234" y="130" width="28" height="7" rx="1.5" className="kf" />
      <rect x="240" y="111" width="16" height="19" rx="2" className="kg-gold" />
      <path className="k thin" d="M240 116h16" />
      <path className="k" d="M242 111q6 -8 12 0" />
    </Base>
  );
}
