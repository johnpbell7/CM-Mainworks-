import { Tick } from "./art/kit";

/*
  Simple, still drawings for "How it works" (John, 10 Nov: simpler, no animation):
  photos sent from a phone, a written quote, the finished house. Same line kit as
  the rest of the site, no backdrop.
*/
export default function StepArt({ step }: { step: 0 | 1 | 2 }) {
  return (
    <svg className="step-art" viewBox="0 0 160 120" aria-hidden="true">
      <ellipse cx="80" cy="110" rx="54" ry="4" className="sh" />
      {step === 0 && (
        <>
          <g transform="rotate(-10 40 52)">
            <rect x="18" y="36" width="42" height="34" rx="3" className="kf" />
            <rect x="22" y="40" width="34" height="22" className="kb1" />
            <path className="k thin" d="M28 62V54L39 46L50 54V62" />
          </g>
          <rect x="60" y="10" width="44" height="92" rx="9" className="kf" />
          <rect x="65" y="20" width="34" height="68" rx="2" className="kb1" />
          <path className="k thin" d="M75 15h14" />
          <rect x="69" y="30" width="26" height="20" rx="2" className="kf" />
          <path className="k thin" d="M74 50V43L82 37L90 43V50" />
          <rect x="79" y="44" width="6" height="6" className="kg-gold" />
          <rect x="69" y="56" width="20" height="8" rx="4" className="kgl" />
          <rect x="74" y="68" width="20" height="8" rx="4" className="kf" />
          <g transform="rotate(8 126 44)">
            <rect x="106" y="28" width="40" height="32" rx="3" className="kf" />
            <rect x="110" y="32" width="32" height="20" className="kb1" />
            <path className="k thin" d="M116 52V45L126 38L136 45V52" />
          </g>
          <Tick x={140} y={30} s={0.75} className="" />
        </>
      )}
      {step === 1 && (
        <>
          <rect x="46" y="12" width="68" height="92" rx="6" className="kplank" />
          <rect x="52" y="20" width="56" height="78" rx="2" className="kf" />
          <rect x="66" y="7" width="28" height="11" rx="3" className="kb2" />
          <path className="k thin" d="M60 34H96M60 42H88M60 56h5v5h-5zM60 68h5v5h-5zM70 59H98M70 71H92M60 86H100" />
          <text x="86" y="84" className="sa-pound">£</text>
          <g transform="rotate(28 128 52)">
            <rect x="123" y="26" width="8" height="44" rx="2" className="kg-gold" />
            <path className="kf" d="M123 70L127 80L131 70Z" />
          </g>
          <Tick x={108} y={96} s={0.95} className="" />
        </>
      )}
      {step === 2 && (
        <>
          <rect x="94" y="22" width="10" height="20" className="kf" />
          <path className="kb1" d="M34 56L76 22L118 56Z" />
          <rect x="42" y="56" width="68" height="50" className="kf" />
          <rect x="43" y="57" width="66" height="4" className="sh" />
          <rect x="50" y="64" width="18" height="14" rx="1.5" className="kgl" />
          <rect x="84" y="64" width="18" height="14" rx="1.5" className="kgl" />
          <path className="k thin" d="M59 64V78M50 71H68M93 64V78M84 71H102" />
          <rect x="68" y="80" width="16" height="26" className="kg-gold" />
          <path className="k" d="M28 106H132" />
          <Tick x={118} y={42} s={0.95} className="" />
          <path className="spark-s" d="M30 36l1.6 4.4l4.4 1.6l-4.4 1.6l-1.6 4.4l-1.6 -4.4l-4.4 -1.6l4.4 -1.6z" />
        </>
      )}
    </svg>
  );
}
