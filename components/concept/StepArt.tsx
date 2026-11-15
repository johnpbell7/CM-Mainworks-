import { Tick } from "./art/kit";

/*
  Simple, still drawings for "How it works" (John, 10 Nov: simpler, no animation):
  photos sent from a phone, a written quote, the finished house. Same line kit as
  the rest of the site, no backdrop.
*/
/*
  Steps 3 to 5 are for the prices page's process (John, 15 Nov 2026): the visit (a front
  door with the tape measure out), the sit-down (a calendar with the start date ringed in
  gold, two mugs), and the phases (rising blocks, the finished ones ticked, an invoice for
  each).
*/
export type StepArtKind = 0 | 1 | 2 | 3 | 4 | 5;

export default function StepArt({ step }: { step: StepArtKind }) {
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
      {step === 3 && (
        <>
          {/* a front: brick wall, porch canopy, the door */}
          <rect x="22" y="30" width="86" height="76" className="kb1" />
          <path className="khatch" d="M22 48H48M84 48H108M22 66H48M84 66H108M22 84H48M84 84H108M35 30v18M96 30v18M28 48v18M102 48v18M35 66v18M96 66v18M28 84v22M102 84v22" />
          <path className="kf" d="M44 36L65 24L86 36Z" />
          <rect x="50" y="40" width="30" height="66" className="kf" />
          <rect x="55" y="46" width="20" height="24" rx="1.5" className="kb1" />
          <rect x="55" y="76" width="20" height="24" rx="1.5" className="kf" />
          <circle cx="74" cy="73" r="2.2" className="kg-gold" />
          <path className="k" d="M12 106H148" />
          {/* the tape measure, run out along the step */}
          <path className="kg-gold" d="M42 101H120V106H42Z" />
          <path className="k thin" d="M50 101v3M58 101v2M66 101v3M74 101v2M82 101v3M90 101v2M98 101v3M106 101v2M114 101v3" />
          <path className="kd" d="M40 99h3v7h-3z" />
          <rect x="116" y="80" width="28" height="26" rx="8" className="kg" />
          <circle cx="130" cy="93" r="8" className="kf" />
          <circle cx="130" cy="93" r="2.5" className="kd" />
          <rect x="128" y="76" width="9" height="5" rx="1.5" className="kg-gold" />
          <Tick x={128} y={52} s={0.95} className="" />
        </>
      )}
      {step === 4 && (
        <>
          {/* the calendar on the wall, start date ringed */}
          <rect x="38" y="8" width="72" height="56" rx="4" className="kf" />
          <path className="kb2" d="M42 8H106Q110 8 110 12V20H38V12Q38 8 42 8Z" />
          <rect x="52" y="3" width="5" height="10" rx="2" className="kd" />
          <rect x="91" y="3" width="5" height="10" rx="2" className="kd" />
          <path className="k thin" d="M56 20V64M74 20V64M92 20V64M38 34H110M38 49H110" />
          <circle cx="83" cy="41.5" r="6" className="kgl" />
          <path className="collar" d="M77 41.5a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
          <path className="k thin" d="M43 27h8M61 27h8M97 27h8M43 57h8M61 57h8" />
          {/* the table and two mugs */}
          <path className="kf" d="M16 98H144V104H16Z" />
          <rect x="44" y="82" width="16" height="16" rx="3" className="kb1" />
          <path className="k" d="M60 85q6 0 6 4.5t-6 4.5" />
          <rect x="94" y="82" width="16" height="16" rx="3" className="kgl" />
          <path className="k" d="M110 85q6 0 6 4.5t-6 4.5" />
          <path className="k thin" d="M49 78q-2 -3 0 -6M55 78q-2 -3 0 -6M99 78q-2 -3 0 -6M105 78q-2 -3 0 -6" />
          <Tick x={116} y={14} s={0.8} className="" />
        </>
      )}
      {step === 5 && (
        <>
          {/* the phases, rising: the first two done and ticked */}
          <path className="k" d="M14 106H146" />
          <rect x="22" y="84" width="24" height="22" rx="3" className="kgl" />
          <rect x="52" y="72" width="24" height="34" rx="3" className="kgl" />
          <rect x="82" y="60" width="24" height="46" rx="3" className="kf" />
          <rect x="112" y="46" width="24" height="60" rx="3" className="kf" />
          <path className="khatch" d="M88 70l12 -6M88 82l12 -6M88 94l12 -6M118 58l12 -6M118 70l12 -6M118 82l12 -6M118 94l12 -6" />
          <Tick x={34} y={84} s={0.6} className="" />
          <Tick x={64} y={72} s={0.6} className="" />
          {/* an invoice for each phase */}
          <g transform="rotate(-6 46 38)">
            <rect x="26" y="12" width="40" height="50" rx="3" className="kf" />
            <path className="k thin" d="M33 22H55M33 29H50M33 40H59M33 47H59" />
            <text x="33" y="59" className="sa-pound">£</text>
            <path className="k thin" d="M43 55H59" />
          </g>
        </>
      )}
    </svg>
  );
}
