import { Base, Plant } from "./kit";
import s from "./Joinery.module.css";

/* A fitted media wall: a TV in the middle, a base cabinet, two alcove shelves with a few things on them, and a book sliding in. */

export default function Joinery() {
  return (
    <Base>
      <rect x="62" y="210" width="196" height="5" className="sh" />

      {/* a plant on the left, a floor lamp on the right */}
      <Plant x={40} y={210} s={1.3} />
      <ellipse cx="282" cy="208" rx="10" ry="2.5" className="kf" />
      <path className="k" d="M282 206V92" />
      <path className="kgl" d="M270 92L274 74H290L294 92Z" />

      {/* the unit */}
      <rect x="66" y="42" width="188" height="168" className="kf" />
      <rect x="110" y="50" width="100" height="104" className="kb1 thin" />
      <path className="k thin" d="M110 50V154M210 50V154" />

      {/* TV on the wall, with a glint across it */}
      <rect x="120" y="68" width="80" height="48" rx="3" className="kf" />
      <rect x="124" y="72" width="72" height="40" className="kb2" />
      <path className="kw" d="M132 106l12 -24M138 106l5 -10" />
      <g className={s.glint}><path className="kw" d="M140 108l10 -34M147 108l6 -20" /></g>
      <rect x="140" y="124" width="40" height="5" rx="2.5" className="kf" />

      {/* a fire under the TV, flickering */}
      <rect x="118" y="134" width="84" height="17" rx="1.5" className="kf" />
      <rect x="122" y="137" width="76" height="11" className="kb2 thin" />
      <path className="kg-gold a-flame" d="M141 148c-5 0 -6 -5 -3 -8c2 -2 2 -4 2 -6c4 2 6 6 5 10c-1 2 -2 4 -4 4z" />
      <path className="kg-gold a-flame d2" d="M160 148c-6 0 -7 -6 -4 -9c2 -2 3 -5 2 -8c5 3 7 7 6 12c-1 3 -2 5 -4 5z" />
      <path className="kg-gold a-flame d3" d="M179 148c-5 0 -6 -5 -3 -8c2 -2 2 -4 2 -6c4 2 6 6 5 10c-1 2 -2 4 -4 4z" />

      {/* base cabinet */}
      <rect x="60" y="154" width="200" height="8" className="kb1" />
      <rect x="66" y="162" width="188" height="48" className="kf" />
      <path className="k thin" d="M113 162V210M160 162V210M207 162V210" />
      <path className="k" d="M106 178v10M120 178v10M153 178v10M167 178v10M200 178v10M214 178v10" />

      {/* left alcove: a few books, a vase */}
      <rect x="72" y="100" width="32" height="5" className="kf" />
      <rect x="76" y="80" width="6" height="20" className="kf" />
      <rect x="83" y="76" width="7" height="24" className="kb2" />
      <rect x="91" y="82" width="6" height="18" className="kf" />
      <rect x="72" y="136" width="32" height="5" className="kf" />
      <path className="kgl" d="M82 136l-2 -12q0 -6 5 -6h4q5 0 5 6l-2 12z" />
      <path className="k thin" d="M87 118q-4 -6 -3 -10M89 118q2 -5 6 -8" />

      {/* right alcove: a plant, a book sliding in */}
      <rect x="216" y="100" width="32" height="5" className="kf" />
      <Plant x={232} y={100} s={0.5} />
      <rect x="216" y="136" width="32" height="5" className="kf" />
      <rect x="219" y="116" width="6" height="20" className="kf" />
      <rect x="226" y="120" width="7" height="16" className="kb2" />
      <g className="a-book"><rect x="235" y="114" width="8" height="22" className="kg-gold" /></g>
    </Base>
  );
}
