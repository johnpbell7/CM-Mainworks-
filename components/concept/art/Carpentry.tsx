import { Base, r1 } from "./kit";

/*
  Carpentry: a room part-way through. A length of skirting on a sawhorse with a panel saw
  in the cut (a pencil mark beside it, sawdust landing in a small pile), a shelf going up on brackets with a spirit level on it, and a new
  door hung in its lining with architrave, hinges and a lever handle. Skirting along the wall,
  and the toolbox by the sawhorse.
  Loops: the saw works, the sawdust falls, the door swings.
*/

export default function Carpentry() {
  // the saw's teeth along the lower edge of the blade (local: the blade runs along +x from the handle)
  let teeth = "";
  for (let i = 0; i <= 13; i++) {
    const x = 2 + i * 4;
    const y = 13 - (x - 2) * (6 / 54);
    teeth += `${i ? "L" : "M"}${r1(x)} ${r1(y + (i % 2 ? 1.8 : 0))}`;
  }
  return (
    <Base>
      {/* ---- the room: a soft back wall, a light switch, skirting either side of the door ---- */}
      <rect x="36" y="72" width="254" height="138" rx="2" className="kb1 nostroke" />
      <rect x="268" y="138" width="9" height="13" rx="1.5" className="kf" />
      <path className="k thin" d="M272.5 142v5" />
      <rect x="36" y="200" width="162" height="10" className="kf" />
      <rect x="262" y="200" width="28" height="10" className="kf" />
      <path className="k thin" d="M36 203.5H198M262 203.5H290" />

      {/* ---- a shelf going up, on two brackets, with the level on it and the pencil line run on ---- */}
      <path className="kf" d="M78 110h12l-12 14z" />
      <path className="kf" d="M142 110h-12l12 14z" />
      <rect x="64" y="104" width="92" height="6" rx="1" className="kplank" />
      <path className="cut" d="M160 107H178" />
      <rect x="90" y="96" width="48" height="8" rx="2" className="kf" />
      <rect x="110" y="97.6" width="8" height="4.8" rx="2.4" className="kb1 thin" />
      <circle cx="114" cy="100" r="1.4" className="kg-gold nostroke" />
      <path className="k thin" d="M96 100h6M126 100h6" />

      {/* ---- the new door, hung in its lining, with architrave and brass hinges ---- */}
      <rect x="198" y="96" width="64" height="114" className="kf" />
      <path className="k thin" d="M202 210V100H258V210" />
      <rect x="206" y="104" width="48" height="106" className="kgl" />
      <g className="a-door" style={{ transformOrigin: "206px 0px" }}>
        <rect x="206" y="104" width="48" height="106" className="kdoor" />
        <rect x="212" y="112" width="15" height="36" rx="1" className="k thin" />
        <rect x="233" y="112" width="15" height="36" rx="1" className="k thin" />
        <rect x="212" y="156" width="15" height="44" rx="1" className="k thin" />
        <rect x="233" y="156" width="15" height="44" rx="1" className="k thin" />
        <path className="k" d="M248 160h-7" />
        <circle cx="248" cy="160" r="2.2" className="kf" />
      </g>
      <rect x="203.6" y="114" width="2.8" height="9" rx=".8" className="kg-gold thin" />
      <rect x="203.6" y="186" width="2.8" height="9" rx=".8" className="kg-gold thin" />

      {/* ---- the toolbox ---- */}
      <ellipse cx="42" cy="210" rx="26" ry="2.5" className="sh" />
      <path className="k" d="M33 182v-5q0 -3 3 -3h12q3 0 3 3v5" />
      <rect x="20" y="188" width="44" height="22" rx="2" className="kf" />
      <rect x="18" y="182" width="48" height="8" rx="2" className="kb2" />
      <rect x="39" y="190" width="6" height="6" rx="1" className="kg-gold" />

      {/* ---- the sawhorse, the skirting on it, the cut and the sawdust ---- */}
      <ellipse cx="130" cy="210" rx="54" ry="2.5" className="sh" />
      <path className="kplank" d="M92 195h6l-9 15h-6z" />
      <path className="kplank" d="M162 195h6l9 15h-6z" />
      <rect x="92" y="202" width="76" height="3" className="kplank" />
      <rect x="86" y="190" width="88" height="5" className="kplank" />
      <rect x="70" y="182" width="120" height="8" rx="1" className="kplank" />
      <path className="k thin" d="M72 185H188" />
      <path className="cut" d="M149 182v8" />
      <path className="k thin" d="M143.5 178.5l2.6 3l2.6 -3" />
      <path className="kgl" d="M134 210q7 -4 15 -4.2q9 0 15 4.2z" />
      <circle cx="149" cy="194" r="1.6" className="kgl a-dust" />
      <circle cx="152.5" cy="195.5" r="1.3" className="kgl a-dust d2" />
      <circle cx="146" cy="196" r="1.4" className="kgl a-dust d3" />

      {/* ---- the panel saw, working in the cut ---- */}
      <g className="a-saw">
        <g transform="translate(113.9 155.4) rotate(30) scale(.78)">
          <path className="kf" d="M0 -7L56 -1V7L0 13Z" />
          <path className="k thin" d={teeth} />
          <path className="k thin" d="M8 -3.6L42 -.4" />
          <path className="kg-gold" d="M2 -7L-1 -14Q-4 -19 -10 -19L-18 -15Q-23 -12 -25 -4L-27 6Q-28 13 -23 16L-15 18Q-4 19 2 13Z" />
          <path className="kf" d="M-8 -12Q-5 -12 -5.6 -8.6L-8.4 7Q-9 10.6 -12.4 10.6H-15Q-18.4 10.6 -17.8 7.2L-14.6 -8.6Q-13.8 -12 -10.6 -12Z" />
          <circle cx="-2" cy="-2" r="1.4" className="k thin" />
          <circle cx="-2" cy="8" r="1.4" className="k thin" />
        </g>
      </g>
    </Base>
  );
}
