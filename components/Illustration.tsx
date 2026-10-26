/*
  CM MainWorks illustrations.

  Style: little scenes drawn in ink line over flat colour, framed in a white arch.
  Each section uses its own colour in three tones (light, main, deep, all mixed from
  the section token), brand gold for brass and timber details, and a dot texture
  for shadows. Key objects sit on an offset block of the deep tone, like the gold
  shadow behind the C in the badge.

  Classes (styled in globals.css):
    .bg   white arch              .off  offset shadow group (slides into place)
    .f    main colour             .fs   main colour + ink outline
    .fl   light colour            .fls  light colour + ink outline
    .fd   deep colour             .fds  deep colour + ink outline
    .g    gold + ink outline      .p    white + ink outline
    .l    ink line                .lt   thin ink line
    .lw   thin white line         .lg   thin deep-colour line (grain)
    .lc   colour line             .d    solid ink
    .ht   dot texture             .roll paint that rolls down the wall
  Motion.tsx draws the lines in and fills the colour on scroll.
*/

export type IllustrationKind = "carpentry" | "building" | "joinery" | "decorating" | "photos" | "quote" | "done";

const r = (n: number) => Math.round(n * 100) / 100;
const ARCH = "M34 360V170a126 126 0 0 1 252 0v190z";

/** Saw teeth along a line: n teeth of depth d, pointing left of the direction of travel. */
function teeth(x1: number, y1: number, x2: number, y2: number, n: number, d: number) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const nx = -(y2 - y1) / len, ny = (x2 - x1) / len;
  const pts: string[] = [];
  for (let i = 0; i <= n * 2; i++) {
    const t = i / (n * 2);
    const o = i % 2 ? d : 0;
    pts.push(`${r(x1 + (x2 - x1) * t - nx * o)},${r(y1 + (y2 - y1) * t - ny * o)}`);
  }
  return pts.join(" ");
}

/** Mortar lines for a brick wall filling a box. */
function mortar(x: number, y: number, w: number, h: number, bh = 10, bw = 22) {
  let d = "";
  for (let row = 0, yy = y + h; yy > y; row++, yy -= bh) {
    d += `M${x} ${yy}h${w}`;
    const start = row % 2 ? bw / 2 : 0;
    for (let xx = x + start + bw; xx < x + w; xx += bw) d += `M${xx} ${yy}v${-bh}`;
  }
  return d;
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`ht-${id}`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <circle className="htd" cx="2.5" cy="2.5" r="1.05" />
      </pattern>
      <clipPath id={`arch-${id}`}><path d={ARCH} /></clipPath>
    </defs>
  );
}

const ht = (id: string) => `url(#ht-${id})`;

/* ---------------- Carpentry: a workbench, a plank being planed, tools on the wall ---------------- */
function Carpentry() {
  const id = "carpentry";
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* tool rail and pegs */}
        <rect className="fls" x="62" y="92" width="196" height="8" rx="2" />
        <circle className="d" cx="101" cy="96" r="2.6" />
        <circle className="d" cx="208" cy="96" r="2.6" />
        <circle className="d" cx="246" cy="96" r="2.6" />

        {/* hand saw hanging by its handle */}
        <polygon className="p" points="90,138 116,138 110,214 98,214" />
        <polyline className="lt" points={teeth(90, 140, 98, 213, 10, 3.2)} />
        <path className="lt" d="M108 146l-3 54" />
        <path className="fs" d="M84 108q0-8 8-8h20q8 0 8 8v26q0 8-8 8H92q-8 0-8-8z" />
        <rect className="p" x="93" y="110" width="18" height="16" rx="6" />
        <circle className="d" cx="96" cy="136" r="1.6" />
        <circle className="d" cx="108" cy="136" r="1.6" />

        {/* try square */}
        <rect className="fs" x="202" y="100" width="12" height="48" rx="2" />
        <rect className="p" x="214" y="104" width="44" height="9" rx="1" />
        <path className="lt" d="M222 104v4M230 104v3M238 104v4M246 104v3M254 104v4" />
        <circle className="g" cx="208" cy="112" r="2" />
        <circle className="g" cx="208" cy="136" r="2" />

        {/* chisel */}
        <rect className="fs" x="241" y="102" width="11" height="36" rx="4" />
        <rect className="g" x="241" y="136" width="11" height="6" />
        <path className="p" d="M243 142h7v30l-3.5 6-3.5-6z" />

        {/* bench, with its shadow */}
        <g className="off" transform="translate(7 8)">
          <rect className="fd" x="36" y="236" width="248" height="36" />
          <rect className="fd" x="54" y="272" width="16" height="68" />
          <rect className="fd" x="250" y="272" width="16" height="68" />
        </g>
        <ellipse className="ht" style={{ fill: ht(id) }} cx="160" cy="344" rx="132" ry="9" />
        <rect className="fs" x="54" y="270" width="16" height="70" />
        <rect className="fs" x="250" y="270" width="16" height="70" />
        <rect className="fls" x="70" y="308" width="180" height="9" />
        <rect className="fds" x="44" y="256" width="232" height="16" />
        <rect className="fs" x="36" y="236" width="248" height="22" rx="3" />
        <path className="lg" d="M48 244c34-4 64 4 96 0s66-4 96 0M60 251c30-3 56 3 84 0s58-3 92 0" />

        {/* plank, plane and shavings */}
        <rect className="fls" x="70" y="218" width="160" height="18" rx="2" />
        <path className="lg" d="M78 224c24-3 48 3 72 0s50-3 72 0M80 230c26-2 50 2 70 0" />
        <rect className="d" x="118" y="208" width="82" height="10" rx="2" />
        <path className="fds" d="M128 208c2-16 22-20 38-12l26 12z" />
        <polygon className="p" points="150,206 157,184 164,184 160,206" />
        <path className="g" d="M126 206c-6-14 2-26 12-26l3 6c-8 2-10 10-6 20z" />
        <circle className="g" cx="190" cy="198" r="6" />
        <path className="lc" d="M202 212c10-10 24-6 22 5s-15 9-15 0 9-8 13-2" />
        <path className="lc" d="M226 226c9 0 15 9 9 16s-15 1-11-6" />
        <path className="lc" d="M232 334c3-11 19-12 19-1s-13 9-13 2" />
        <path className="lc" d="M86 336c2-8 15-9 15 0" />
        <path className="lc" d="M106 334c5-6 14-3 11 4" />

        {/* pencil */}
        <polygon className="g" points="78,214 112,206 114,212 80,220" />
        <polygon className="p" points="112,206 122,207 114,212" />

        {/* floor */}
        <rect className="fl" x="30" y="340" width="260" height="22" />
        <path className="l" d="M24 340h272" />
      </g>
    </>
  );
}

/* ---------------- Building: a house with a brick extension going up ---------------- */
function Building() {
  const id = "building";
  const wall = "168,340 168,270 228,270 228,280 248,280 248,290 270,290 270,340";
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* sun and a cloud */}
        <circle className="g" cx="236" cy="104" r="15" />
        <path className="p" d="M66 110a10 10 0 0 1 17-7 13 13 0 0 1 24 4 8 8 0 0 1 1 16H72a8 8 0 0 1-6-13z" />

        {/* shadows */}
        <g className="off" transform="translate(8 9)">
          <rect className="fd" x="52" y="176" width="116" height="164" />
          <polygon className="fd" points={wall} />
        </g>

        {/* house */}
        <rect className="fs" x="130" y="116" width="18" height="40" />
        <rect className="p" x="127" y="110" width="24" height="7" rx="1" />
        <polygon className="fds" points="40,180 110,118 180,180" />
        <path className="lw" d="M90 138h40M74 152h72M58 166h104" />
        <rect className="p" x="52" y="178" width="116" height="162" />
        <rect className="fls" x="66" y="194" width="32" height="36" />
        <path className="l" d="M82 194v36M66 212h32" />
        <rect className="p" x="62" y="229" width="40" height="6" rx="1" />
        <rect className="fls" x="122" y="194" width="32" height="36" />
        <path className="l" d="M138 194v36M122 212h32" />
        <rect className="p" x="118" y="229" width="40" height="6" rx="1" />
        <rect className="fs" x="68" y="276" width="30" height="64" />
        <path className="lt" d="M68 276a15 15 0 0 1 30 0" />
        <rect className="lt" x="73" y="286" width="20" height="20" rx="1" />
        <rect className="lt" x="73" y="312" width="20" height="22" rx="1" />
        <circle className="g" cx="92" cy="306" r="2.4" />
        <rect className="fls" x="116" y="282" width="38" height="34" />
        <path className="l" d="M135 282v34M116 299h38" />
        <rect className="p" x="112" y="315" width="46" height="6" rx="1" />

        {/* extension, half built */}
        <polygon className="fs" points={wall} />
        <clipPath id="bk-building"><polygon points={wall} /></clipPath>
        <path className="lw" clipPath="url(#bk-building)" d={mortar(168, 270, 102, 70)} />

        {/* scaffold */}
        <path className="l" d="M180 204V340M258 204V340M174 238H264M174 300H264" />
        <path className="lt" d="M180 300L258 238" />
        <rect className="g" x="172" y="228" width="94" height="8" rx="1" />

        {/* ladder */}
        <path className="l" d="M258 340L236 208M274 340L252 208" />
        <path className="l" d="M254 316h16M250 292h16M246 268h16M242 244h16M238 220h16" />

        {/* bucket and trowel, stack of bricks */}
        <rect className="g" x="207" y="292" width="6" height="22" rx="2" transform="rotate(-18 210 303)" />
        <polygon className="p" points="214,292 226,270 232,286" />
        <polygon className="p" points="194,314 228,314 224,340 198,340" />
        <path className="lt" d="M195 322h32" />
        <rect className="fds" x="276" y="330" width="16" height="10" />

        <rect className="fl" x="30" y="340" width="260" height="22" />
        <ellipse className="ht" style={{ fill: ht(id) }} cx="160" cy="348" rx="120" ry="6" />
        <path className="l" d="M24 340h272" />
      </g>
    </>
  );
}

/* ---------------- Joinery: a fitted media wall with alcove units ---------------- */
function Joinery() {
  const id = "joinery";
  const cab = (x: number) => (
    <g key={x}>
      <rect className="fs" x={x} y="248" width="78" height="92" />
      <rect className="lt" x={x + 6} y="258" width="29" height="74" rx="2" />
      <rect className="lt" x={x + 43} y="258" width="29" height="74" rx="2" />
      <path className="l" d={`M${x + 39} 248v92`} />
      <circle className="g" cx={x + 33} cy="294" r="2.6" />
      <circle className="g" cx={x + 45} cy="294" r="2.6" />
      <rect className="g" x={x - 4} y="240" width="86" height="9" rx="2" />
    </g>
  );
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* alcove backs */}
        <rect className="fl" x="44" y="30" width="78" height="212" />
        <rect className="fl" x="198" y="30" width="78" height="212" />

        {/* shadows */}
        <g className="off" transform="translate(7 8)">
          <rect className="fd" x="44" y="248" width="78" height="92" />
          <rect className="fd" x="198" y="248" width="78" height="92" />
          <rect className="fd" x="132" y="118" width="56" height="36" />
        </g>

        {/* chimney breast with TV, mantel and log store */}
        <rect className="p" x="122" y="30" width="76" height="310" />
        <rect className="d" x="132" y="118" width="56" height="36" rx="2" />
        <path className="lw" d="M138 124h12M138 129h6" />
        <rect className="g" x="128" y="258" width="64" height="8" rx="2" />
        <path className="fds" d="M142 340v-46a18 18 0 0 1 36 0v46z" />
        <circle className="fs" cx="152" cy="331" r="7" />
        <circle className="fs" cx="168" cy="331" r="7" />
        <circle className="fs" cx="160" cy="318" r="7" />
        <path className="lt" d="M152 331m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M168 331m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M160 318m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />

        {/* left shelves: books and a plant, a vase and a frame */}
        <rect className="p" x="44" y="132" width="78" height="6" />
        <rect className="p" x="44" y="186" width="78" height="6" />
        <rect className="fs" x="52" y="102" width="8" height="30" />
        <rect className="g" x="61" y="108" width="6" height="24" />
        <rect className="fds" x="68" y="104" width="9" height="28" />
        <rect className="p" x="78" y="110" width="6" height="22" />
        <path className="fs" d="M104 116c-12-6-14-18-8-24 8 4 11 14 8 24zM106 116c4-12 14-18 22-14-2 8-10 14-22 14zM104 116c-10 2-18-2-20-10 8-4 16 0 20 10z" />
        <polygon className="p" points="94,132 116,132 113,116 97,116" />
        <path className="p" d="M58 186c-6-6-6-16 0-22h10c6 6 6 16 0 22z" />
        <rect className="p" x="60" y="156" width="6" height="8" />
        <rect className="p" x="84" y="160" width="26" height="26" rx="1" />
        <rect className="fls" x="89" y="165" width="16" height="16" />

        {/* right shelves: a stack of books, a row of books, a lamp */}
        <rect className="p" x="198" y="132" width="78" height="6" />
        <rect className="p" x="198" y="186" width="78" height="6" />
        <rect className="fds" x="206" y="124" width="32" height="8" />
        <rect className="g" x="208" y="116" width="28" height="8" />
        <rect className="p" x="211" y="108" width="22" height="8" />
        <circle className="fs" cx="258" cy="118" r="12" />
        <path className="lt" d="M258 110v8l5 4" />
        <rect className="fs" x="206" y="158" width="8" height="28" />
        <rect className="p" x="215" y="162" width="7" height="24" />
        <rect className="fds" x="223" y="156" width="9" height="30" />
        <rect className="g" x="233" y="164" width="7" height="22" />
        <polygon className="fs" points="241,186 250,186 262,162 254,160" />

        {cab(44)}
        {cab(198)}

        {/* lamp on the right worktop */}
        <path className="l" d="M254 238v-22" />
        <rect className="d" x="246" y="236" width="16" height="4" rx="1" />
        <polygon className="g" points="242,216 266,216 262,200 246,200" />

        <rect className="fl" x="30" y="340" width="260" height="22" />
        <ellipse className="ht" style={{ fill: ht(id) }} cx="160" cy="350" rx="118" ry="7" />
        <path className="l" d="M24 340h272" />
      </g>
    </>
  );
}

/* ---------------- Decorating: a wall half rolled in fresh paint ---------------- */
function Decorating() {
  const id = "decorating";
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* fresh paint, with a soft rolled edge */}
        <path className="f roll" d="M30 30H150c-5 34 5 64 0 98s5 66 0 100 5 70 0 112H30z" />
        <path className="lw" d="M60 60v270M92 40v300M124 50v280" style={{ opacity: 0.35 }} />
        <path className="lc" d="M150 128c-5 34 5 66 0 100s5 70 0 112" style={{ stroke: "var(--c)" }} />

        {/* stepladder with a tin on top */}
        <g className="off" transform="translate(7 8)">
          <polygon className="fd" points="220,340 228,340 250,168 242,168" />
        </g>
        <polygon className="p" points="272,340 280,340 260,168 252,168" />
        <polygon className="p" points="220,340 228,340 250,168 242,168" />
        <rect className="p" x="231" y="293" width="38" height="6" rx="1" />
        <rect className="p" x="237" y="249" width="26" height="6" rx="1" />
        <rect className="p" x="243" y="205" width="14" height="6" rx="1" />
        <rect className="p" x="238" y="160" width="26" height="9" rx="2" />
        <path className="p" d="M242 160v-14h18v14" />
        <ellipse className="p" cx="251" cy="146" rx="9" ry="3" />
        <ellipse className="f" cx="251" cy="146" rx="6.5" ry="2" />
        <path className="f" d="M244 148v7a2 2 0 0 0 4 0v-6z" />

        {/* dust sheet */}
        <path className="fl" d="M30 340h260v22H30z" />
        <path className="lt" d="M60 348q20 6 40 0M140 352q26 6 52 0M218 346q20 6 40 0" />

        {/* roller pole resting into the tray, roller on the paint edge */}
        <path className="pole-o" d="M112 196l-30 136" />
        <path className="pole-i" d="M112 196l-30 136" />
        <path className="l" d="M126 162h-14v34" />
        <rect className="fs" x="126" y="150" width="58" height="24" rx="9" />
        <path className="lw" d="M134 157h40M134 163h44" style={{ opacity: 0.6 }} />
        <rect className="d" x="184" y="158" width="4" height="8" rx="1" />

        {/* paint tray with roller marks */}
        <polygon className="p" points="48,340 116,340 124,324 58,324" />
        <polygon className="f" points="58,338 96,338 102,328 64,328" />

        {/* tin and brush on the floor */}
        <path className="p" d="M172 314v22c0 7 36 7 36 0v-22" />
        <ellipse className="p" cx="190" cy="314" rx="18" ry="5" />
        <ellipse className="f" cx="190" cy="314" rx="13.5" ry="3.4" />
        <path className="f" d="M178 316v12a2.4 2.4 0 0 0 4.8 0v-11z" />
        <rect className="g" x="196" y="284" width="7" height="26" rx="3" transform="rotate(28 199 297)" />
        <rect className="p" x="187" y="303" width="12" height="8" rx="1" transform="rotate(28 193 307)" />
        <path className="l" d="M24 340h272" />
      </g>
    </>
  );
}

/* ---------------- How it works: small icons ---------------- */
function Photos() {
  return (
    <>
      <g className="off" transform="translate(6 7)"><rect className="fd" x="34" y="12" width="52" height="96" rx="9" /></g>
      <rect className="p" x="34" y="12" width="52" height="96" rx="9" />
      <rect className="fls" x="41" y="26" width="38" height="56" rx="3" />
      <path className="fs" d="M41 74l13-15 9 9 6-6 10 10v6a3 3 0 0 1-3 3H44a3 3 0 0 1-3-3z" />
      <circle className="g" cx="69" cy="38" r="4" />
      <path className="l" d="M54 96h12" />
    </>
  );
}

function Quote() {
  return (
    <>
      <g className="off" transform="translate(6 7)"><path className="fd" d="M30 14h44l16 16v76H30z" /></g>
      <path className="p" d="M30 14h44l16 16v76H30z" />
      <path className="fls" d="M74 14v16h16z" />
      <path className="l" d="M40 44h34M40 56h40M40 68h28" />
      <path className="l" d="M58 92c-4 0-6-3-6-6s1-5 1-7a5 5 0 0 1 9-3M50 86h10M48 94h16" />
      <circle className="g" cx="77" cy="88" r="8" />
      <path className="l" d="M73 88l3 3 5-6" />
    </>
  );
}

function Done() {
  return (
    <>
      <g className="off" transform="translate(6 7)"><rect className="fd" x="14" y="58" width="92" height="20" rx="4" /></g>
      <rect className="fls" x="14" y="58" width="92" height="20" rx="4" />
      <rect className="p" x="50" y="62" width="20" height="12" rx="5" />
      <circle className="g" cx="60" cy="68" r="3" />
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
      className={`il il-${kind} ${className}`}
      viewBox={box}
      data-illustration
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <C />
    </svg>
  );
}
