import { Base, r1 } from "./kit";

/** Carpentry: a carpenter sawing skirting on trestles, a new door swinging in its frame. */
export default function Carpentry() {
  // teeth along the saw's lower edge (local: the blade runs along +x from the handle)
  let teeth = "";
  for (let i = 0; i <= 13; i++) {
    const x = 18 + i * 4;
    const y = 9 - (i * 4) * 0.07;
    teeth += `${i ? "L" : "M"}${r1(x)} ${r1(y + (i % 2 ? 1.6 : 0))}`;
  }
  return (
    <Base>
      {/* the whole scene nudged left so it sits centred in its card */}
      <g transform="translate(-30 0)">
      {/* ---- timber leaning on the wall ---- */}
      <path className="kplank" d="M208 210L226 104h7L215 210z" />
      <path className="kplank" d="M218 210L234 114h7L225 210z" />

      {/* ---- a wall with a new door that swings ---- */}
      <rect x="232" y="84" width="80" height="126" className="kf" />
      <rect x="233" y="87" width="78" height="8" className="sh" />
      <path className="k" d="M226 84H318" strokeWidth="3" />
      <rect x="244" y="112" width="50" height="98" className="kgl" />
      <g className="a-door" style={{ transformOrigin: "244px 0px" }}>
        <rect x="244" y="112" width="50" height="98" className="kdoor" />
        <rect x="251" y="120" width="15" height="34" rx="1" className="k thin" />
        <rect x="272" y="120" width="15" height="34" rx="1" className="k thin" />
        <rect x="251" y="162" width="15" height="38" rx="1" className="k thin" />
        <rect x="272" y="162" width="15" height="38" rx="1" className="k thin" />
        <circle cx="288" cy="160" r="2.6" className="kf" />
      </g>
      <path className="k" d="M244 210V112H294V210" />
      <path className="k thin" d="M238 210V106H300V210" />
      <rect x="238" y="206" width="62" height="4" className="kf" />

      <g transform="translate(-14 0)">
      {/* ---- the toolbox ---- */}
      <path className="k" d="M78 192v-7h16v7" />
      <rect x="66" y="192" width="40" height="18" rx="2" className="kb1" />
      <path className="k thin" d="M66 199H106" />
      <rect x="83" y="196" width="6" height="5" rx="1" className="kg-gold" />

      {/* ---- trestles, the skirting, and the cut ---- */}
      <path className="k" d="M118 210L126 196L134 210M196 210L204 196L212 210" />
      <rect x="108" y="184" width="112" height="12" rx="1.5" className="kplank" />
      <path className="k thin" d="M114 188H150M164 188H214" />
      <path className="cut" d="M152 184v12" />
      <rect x="184" y="174" width="14" height="10" rx="3" className="kg-gold" />
      <circle cx="191" cy="179" r="2.4" className="kf" />
      <path className="k" d="M198 182h6" />
      <circle cx="152" cy="198" r="1.8" className="kgl a-dust" />
      <circle cx="157" cy="199" r="1.5" className="kgl a-dust d2" />
      <circle cx="148" cy="199" r="1.7" className="kgl a-dust d3" />

      {/* ---- the saw, at work on its own ---- */}
      <g className="a-saw">
        <g transform="translate(116 165) rotate(24) scale(.8)">
          <path className="kb1" d="M14 -3H74V6L14 9Z" />
          <path className="k thin" d={teeth} />
          <path className="kg-gold" d="M-8 -8Q-8 -14 -2 -14H8Q14 -14 14 -8V6Q14 10 10 10H-2Q-8 10 -8 4Z" />
          <rect x="-1" y="-8" width="11" height="12" rx="4" className="kf" />
        </g>
      </g>
      </g>
      </g>
    </Base>
  );
}
