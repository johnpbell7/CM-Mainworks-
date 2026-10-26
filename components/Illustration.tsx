/*
  CM MainWorks illustrations.
  Style: ink line drawings over a flat block of the section colour, offset down and
  to the right like the gold shadow behind the C in the badge. White "paper" shapes
  sit on top where a surface needs to read as solid. Strokes are 3px, round caps.
  Classes:
    .f  offset colour block (fills with --c)
    .p  white surface with ink outline
    .l  ink line
    .d  solid ink detail
  Motion.tsx draws the lines in and slides the colour blocks into place on scroll.
*/

export type IllustrationKind = "carpentry" | "building" | "joinery" | "decorating" | "photos" | "quote" | "done";

const OFF = "translate(9 11)";

function Carpentry() {
  return (
    <>
      <g className="f" transform={OFF}>
        <rect x="100" y="74" width="120" height="266" />
        <rect x="232" y="300" width="14" height="40" />
      </g>
      {/* architrave and door */}
      <path className="l" d="M88 340V62h144v278" />
      <rect className="p" x="100" y="74" width="120" height="266" />
      <rect className="l" x="114" y="92" width="38" height="96" rx="2" />
      <rect className="l" x="168" y="92" width="38" height="96" rx="2" />
      <rect className="l" x="114" y="206" width="38" height="116" rx="2" />
      <rect className="l" x="168" y="206" width="38" height="116" rx="2" />
      <circle className="d" cx="210" cy="216" r="4" />
      <path className="l" d="M210 216h-16" />
      {/* try square */}
      <rect className="p" x="232" y="300" width="14" height="40" rx="2" />
      <path className="l" d="M246 304h50v8h-50" />
      <path className="l" d="M256 304v4M266 304v4M276 304v4M286 304v4" />
      {/* shavings */}
      <path className="l" d="M46 334c2-10 16-10 15-1-1 6-9 6-9 1" />
      <path className="l" d="M62 338c4-7 14-5 12 2" />
      {/* floor */}
      <path className="l" d="M28 340h264" />
    </>
  );
}

function Building() {
  return (
    <>
      <g className="f" transform={OFF}>
        <rect x="40" y="150" width="140" height="190" />
        <rect x="180" y="238" width="104" height="102" />
      </g>
      {/* house */}
      <rect className="p" x="138" y="88" width="18" height="44" />
      <path className="p" d="M30 154l80-70 80 70z" />
      <rect className="p" x="40" y="152" width="140" height="188" />
      <rect className="l" x="60" y="176" width="36" height="30" rx="2" />
      <path className="l" d="M78 176v30" />
      <rect className="l" x="124" y="176" width="36" height="30" rx="2" />
      <path className="l" d="M142 176v30" />
      <rect className="l" x="62" y="268" width="30" height="72" rx="2" />
      <circle className="d" cx="86" cy="306" r="2.5" />
      <rect className="l" x="118" y="272" width="42" height="34" rx="2" />
      {/* extension */}
      <rect className="p" x="180" y="240" width="104" height="100" />
      <path className="l" d="M176 240h112" />
      <rect className="l" x="196" y="262" width="72" height="78" rx="2" />
      <path className="l" d="M232 262v78" />
      <path className="l" d="M184 256h8M184 268h8M184 280h8M184 292h8M184 304h8M184 316h8M184 328h8M272 256h8M272 268h8M272 280h8M272 292h8M272 304h8M272 316h8M272 328h8" />
      {/* spirit level on the roof */}
      <rect className="p" x="198" y="222" width="76" height="12" rx="3" />
      <rect className="l" x="228" y="224" width="16" height="8" rx="3" />
      <circle className="d" cx="236" cy="228" r="2" />
      <path className="l" d="M24 340h272" />
    </>
  );
}

function Joinery() {
  return (
    <>
      <g className="f" transform={OFF}>
        <rect x="40" y="262" width="76" height="78" />
        <rect x="204" y="262" width="76" height="78" />
        <rect x="132" y="118" width="56" height="36" />
      </g>
      {/* chimney breast and alcoves */}
      <path className="l" d="M36 40v300M120 40v300M200 40v300M284 40v300" />
      {/* media recess and fire */}
      <rect className="p" x="132" y="118" width="56" height="36" rx="2" />
      <path className="l" d="M150 250a10 10 0 0 1 20 0v40h-20z" />
      <path className="l" d="M136 290h48" />
      {/* left shelves */}
      <path className="l" d="M40 116h76M40 182h76" />
      <path className="l" d="M50 116V84M58 116V78M66 116V88M74 116l8-30" />
      <path className="p" d="M86 182l4-18h18l4 18z" />
      <path className="l" d="M98 164c-6-12-2-20 4-24M100 164c4-10 12-12 16-10M98 164c-10-4-14-10-12-18" />
      <rect className="p" x="40" y="262" width="76" height="78" />
      <path className="l" d="M78 262v78" />
      <circle className="d" cx="72" cy="296" r="2.5" />
      <circle className="d" cx="84" cy="296" r="2.5" />
      {/* right shelves */}
      <path className="l" d="M204 116h76M204 182h76" />
      <path className="l" d="M216 182v-26M224 182v-34M232 182v-22M240 182v-30M248 182l10-26" />
      <circle className="l" cx="258" cy="104" r="12" />
      <path className="l" d="M258 96v8l6 4" />
      <rect className="p" x="204" y="262" width="76" height="78" />
      <path className="l" d="M242 262v78" />
      <circle className="d" cx="236" cy="296" r="2.5" />
      <circle className="d" cx="248" cy="296" r="2.5" />
      <path className="l" d="M24 340h272" />
    </>
  );
}

function Decorating() {
  return (
    <>
      <g className="f roll">
        <path d="M70 150h88v150c-6 10-12-8-20 4-8 12-12-6-22 2-8 7-14-6-22 0-10 7-16-4-24 2z" />
        <path d="M216 300h64v36h-64z" />
      </g>
      {/* roller */}
      <rect className="p" x="62" y="126" width="104" height="28" rx="10" />
      <path className="l" d="M166 140h18v-48L130 78" />
      <rect className="p" x="108" y="34" width="22" height="46" rx="6" transform="rotate(-24 119 57)" />
      {/* drips */}
      <path className="l" d="M96 316v8M134 322v6" />
      {/* paint tin and brush */}
      <path className="p" d="M214 300v36c0 6 66 6 66 0v-36" />
      <ellipse className="p" cx="247" cy="300" rx="33" ry="8" />
      <path className="l" d="M220 312c10 4 44 4 54 0" />
      <path className="l" d="M272 262l14-38" />
      <rect className="p" x="263" y="262" width="14" height="20" rx="2" transform="rotate(19 270 272)" />
      <path className="l" d="M266 292l1-9" />
      <path className="l" d="M24 340h272" />
    </>
  );
}

function Photos() {
  return (
    <>
      <g className="f" transform="translate(6 7)"><rect x="34" y="12" width="52" height="96" rx="9" /></g>
      <rect className="p" x="34" y="12" width="52" height="96" rx="9" />
      <rect className="l" x="41" y="26" width="38" height="56" rx="3" />
      <path className="l" d="M43 74l12-14 9 9 6-6 9 9" />
      <circle className="d" cx="69" cy="38" r="3.5" />
      <path className="l" d="M54 96h12" />
    </>
  );
}

function Quote() {
  return (
    <>
      <g className="f" transform="translate(6 7)"><path d="M30 14h44l16 16v76H30z" /></g>
      <path className="p" d="M30 14h44l16 16v76H30z" />
      <path className="l" d="M74 14v16h16" />
      <path className="l" d="M40 44h34M40 56h40M40 68h28" />
      <path className="l" d="M58 92c-4 0-6-3-6-6s1-5 1-7a5 5 0 0 1 9-3M50 86h10M48 94h16" />
      <path className="l" d="M70 88l4 4 8-9" />
    </>
  );
}

function Done() {
  return (
    <>
      <g className="f" transform="translate(6 7)"><rect x="14" y="58" width="92" height="20" rx="4" /></g>
      <rect className="p" x="14" y="58" width="92" height="20" rx="4" />
      <rect className="l" x="50" y="62" width="20" height="12" rx="5" />
      <circle className="d" cx="60" cy="68" r="3" />
      <path className="l" d="M24 62v12M96 62v12" />
      <path className="l" d="M44 34l10 10 22-22" />
    </>
  );
}

const map = {
  carpentry: { C: Carpentry, box: "0 0 320 400" },
  building: { C: Building, box: "0 0 320 400" },
  joinery: { C: Joinery, box: "0 0 320 400" },
  decorating: { C: Decorating, box: "0 0 320 400" },
  photos: { C: Photos, box: "0 0 120 120" },
  quote: { C: Quote, box: "0 0 120 120" },
  done: { C: Done, box: "0 0 120 120" },
} as const;

export default function Illustration({ kind, className = "", label }: { kind: IllustrationKind; className?: string; label?: string }) {
  const { C, box } = map[kind];
  return (
    <svg
      className={`il ${className}`}
      viewBox={box}
      data-illustration
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <C />
    </svg>
  );
}
