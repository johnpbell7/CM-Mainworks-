import { Base, Tick } from "./kit";
import { Van } from "../VanHero";
import s from "./Faq.module.css";

/*
  Questions and answers: a question from the house, a reply typed from Connor's van,
  then the answer with a tick. No people, just the two places talking.
  Loops: the question pops, the reply types then lands.
*/

export default function Faq() {
  return (
    <Base clouds={false}>
      {/* the house asking */}
      <rect x="86" y="102" width="12" height="22" className="kf" />
      <path className="kb1" d="M28 134L72 98L116 134Z" />
      <rect x="36" y="134" width="72" height="76" className="kf" />
      <rect x="37" y="135" width="70" height="5" className="sh" />
      <rect x="46" y="146" width="22" height="18" rx="2" className="kgl" />
      <path className="k thin" d="M57 146V164M46 155H68" />
      <rect x="80" y="170" width="18" height="40" className="kg-gold" />
      <circle cx="94" cy="191" r="1.6" className="kd" />
      <rect x="76" y="206" width="26" height="4" className="kf" />

      {/* Connor's van answering */}
      <Van x={150} y={222 - 130 * 0.5} scale={0.5} />

      {/* ---- speech ---- */}
      <g className={s.ask}>
        <path className="kf" d="M44 20H108Q120 20 120 32V56Q120 68 108 68H94L90 82L78 68H44Q32 68 32 56V32Q32 20 44 20Z" />
        <text x="76" y="60" className="iq" style={{ fontSize: 44 }}>?</text>
      </g>
      <g className={s.typing}>
        <path className="kgl" d="M208 24H260Q272 24 272 36V52Q272 64 260 64H240L242 74L230 64H208Q196 64 196 52V36Q196 24 208 24Z" />
        <circle cx="214" cy="44" r="3.6" className="kd a-dot" />
        <circle cx="234" cy="44" r="3.6" className="kd a-dot d2" />
        <circle cx="254" cy="44" r="3.6" className="kd a-dot d3" />
      </g>
      <g className={s.answer}>
        <path className="kgl" d="M200 20H268Q280 20 280 32V58Q280 70 268 70H238L240 82L226 70H200Q188 70 188 58V32Q188 20 200 20Z" />
        <path className="k thin" d="M198 34H232M198 45H226M198 56H230" />
        <Tick x={258} y={45} s={0.95} className="" />
      </g>
    </Base>
  );
}
