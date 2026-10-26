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

export type IllustrationKind =
  | "carpentry" | "building" | "joinery" | "decorating"
  | "renovation" | "kitchen" | "bathroom" | "flooring" | "stairs" | "roof"
  | "photos" | "quote" | "done";

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

/** Square tile grid filling a box. */
function grid(x: number, y: number, w: number, h: number, s: number) {
  let d = "";
  for (let yy = y + s; yy < y + h; yy += s) d += `M${x} ${r(yy)}h${w}`;
  for (let xx = x + s; xx < x + w; xx += s) d += `M${r(xx)} ${y}v${h}`;
  return d;
}

/* ---------------- Renovation: a cut-away house, every room mid-job ---------------- */
function Renovation() {
  const id = "renovation";
  // stairs in the hall rise from the front door up to the landing
  const rise = 86 / 6, go = 15, sx = 150;
  let stair = `${sx},340`;
  for (let i = 0; i < 6; i++) stair += ` ${r(sx + go * i)},${r(340 - rise * (i + 1))} ${r(sx + go * (i + 1))},${r(340 - rise * (i + 1))}`;
  stair += ` ${sx + go * 6},340`;
  const rail = (x: number) => 300 - ((x - 152) * rise) / go;
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* shadow of the whole house */}
        <g className="off" transform="translate(8 9)">
          <polygon className="fd" points="40,172 160,80 280,172" />
          <rect className="fd" x="52" y="170" width="216" height="170" />
        </g>

        {/* chimney and roof */}
        <rect className="fs" x="206" y="96" width="22" height="44" />
        <rect className="g" x="210" y="86" width="14" height="11" rx="1" />
        <polygon className="fds" points="40,172 160,80 280,172" />
        <path className="lw" d="M126 106h68M100 126h120M74 146h172" />

        {/* the house, opened up */}
        <rect className="p" x="52" y="170" width="216" height="170" />

        {/* upstairs left: new bathroom */}
        <rect className="fl" x="52" y="200" width="98" height="46" />
        <path className="lt" d={grid(52, 200, 98, 46, 11.5)} />
        <path className="l" d="M66 222v-36h10" />
        <polygon className="p" points="72,182 86,182 84,190 74,190" />
        <path className="lc" d="M76 196v5M80 196v7M84 196v5" />
        <rect className="p" x="56" y="220" width="62" height="7" rx="2" />
        <rect className="fs" x="59" y="227" width="56" height="19" />
        <rect className="p" x="126" y="178" width="18" height="24" rx="8" />
        <rect className="fls" x="130" y="182" width="10" height="16" rx="5" />
        <rect className="p" x="122" y="216" width="26" height="6" rx="2" />
        <rect className="p" x="131" y="222" width="8" height="24" />

        {/* upstairs right: bedroom halfway through a fresh coat */}
        <path className="f roll" d="M156 170h56c-3 14 3 26 0 40s3 22 0 36h-56z" />
        <path className="lc" d="M212 170c-3 14 3 26 0 40s3 22 0 36" style={{ stroke: "var(--c)" }} />
        <rect className="p" x="240" y="182" width="22" height="28" rx="1" />
        <rect className="fls" x="243" y="185" width="16" height="22" />
        <path className="l" d="M251 185v22" />
        <path className="pole-o" d="M232 198l-6 46" />
        <path className="pole-i" d="M232 198l-6 46" />
        <path className="l" d="M226 186h6v12" />
        <rect className="fs" x="206" y="181" width="20" height="10" rx="4" />
        <path className="fl" d="M216 246c4-6 44-6 50 0z" />
        <path className="lt" d="M226 244q8 2 14 0" />
        <path className="p" d="M178 236v8c0 3 14 3 14 0v-8" />
        <ellipse className="p" cx="185" cy="236" rx="7" ry="2.4" />

        {/* floor between storeys, with the stairwell open */}
        <rect className="fds" x="52" y="246" width="148" height="8" />
        <rect className="fds" x="246" y="246" width="22" height="8" />
        <rect className="fds" x="150" y="170" width="6" height="76" />

        {/* ground floor left: new kitchen */}
        <path className="l" d="M80 254v10" />
        <polygon className="g" points="72,272 88,272 84,264 76,264" />
        <rect className="fl" x="54" y="286" width="84" height="12" />
        <path className="lt" d={grid(54, 286, 84, 12, 6)} />
        <rect className="fs" x="100" y="258" width="38" height="24" />
        <path className="lt" d="M119 258v24" />
        <circle className="g" cx="116" cy="276" r="1.8" />
        <circle className="g" cx="122" cy="276" r="1.8" />
        <rect className="g" x="52" y="296" width="88" height="7" rx="1" />
        <rect className="d" x="104" y="293" width="24" height="3" rx="1" />
        <rect className="fs" x="54" y="303" width="84" height="37" />
        <path className="lt" d="M82 303v37M110 303v37" />
        <circle className="g" cx="78" cy="314" r="1.8" />
        <circle className="g" cx="86" cy="314" r="1.8" />
        <circle className="g" cx="114" cy="314" r="1.8" />
        <rect className="fds" x="140" y="254" width="6" height="86" />

        {/* ground floor right: hall stairs */}
        <polygon className="fls" points={stair} />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} className="g" x={r(sx + go * i - 2)} y={r(340 - rise * (i + 1) - 2)} width={go + 3} height="4" rx="1" />
        ))}
        <path
          className="l"
          d={Array.from({ length: 5 }, (_, i) => {
            const x = sx + go * i + 7.5;
            return `M${x} ${r(340 - rise * (i + 1))}V${r(rail(x))}`;
          }).join("")}
        />
        <polygon className="g" points={`152,${r(rail(152) - 3)} 216,${r(rail(216) - 3)} 216,${r(rail(216) + 3)} 152,${r(rail(152) + 3)}`} />
        <rect className="fs" x="146" y={r(rail(152) - 4)} width="9" height={r(340 - rail(152) + 4)} />
        <rect className="g" x="144" y={r(rail(152) - 9)} width="13" height="6" rx="2" />
        <rect className="fls" x="246" y="280" width="16" height="60" />
        <circle className="g" cx="250" cy="312" r="1.8" />

        {/* front step and ground */}
        <rect className="fl" x="30" y="340" width="260" height="22" />
        <ellipse className="ht" style={{ fill: ht(id) }} cx="160" cy="349" rx="120" ry="6" />
        <path className="l" d="M24 340h272" />
      </g>
    </>
  );
}

/* ---------------- Kitchen: fitted units, worktop, sink and hob ---------------- */
function Kitchen() {
  const id = "kitchen";
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* window over the sink */}
        <rect className="p" x="54" y="104" width="66" height="76" rx="2" />
        <rect className="fls" x="60" y="110" width="54" height="64" />
        <path className="l" d="M87 110v64M60 142h54" />
        <path className="lw" d="M66 124l12-8M66 134l18-12" />

        {/* extractor hood */}
        <rect className="p" x="148" y="40" width="24" height="86" />
        <polygon className="p" points="128,150 192,150 180,124 140,124" />
        <path className="lt" d="M134 144h52" />

        {/* tiled splashback */}
        <rect className="fl" x="30" y="186" width="260" height="54" />
        <path className="lt" d={mortar(30, 186, 260, 54, 13.5, 24)} />
        <rect className="p" x="50" y="178" width="74" height="7" rx="1" />

        {/* shadows */}
        <g className="off" transform="translate(7 8)">
          <rect className="fd" x="196" y="108" width="66" height="62" />
          <rect className="fd" x="40" y="250" width="240" height="90" />
        </g>

        {/* wall cupboard */}
        <rect className="fs" x="196" y="108" width="66" height="62" />
        <rect className="lt" x="200" y="112" width="27" height="54" rx="2" />
        <rect className="lt" x="231" y="112" width="27" height="54" rx="2" />
        <circle className="g" cx="223" cy="156" r="2.4" />
        <circle className="g" cx="235" cy="156" r="2.4" />

        {/* worktop, with a sink and tap, and a pan on the hob */}
        <rect className="g" x="36" y="238" width="248" height="12" rx="2" />
        <rect className="d" x="60" y="236" width="50" height="4" rx="1" />
        <path className="l" d="M84 237v-20a8 8 0 0 1 16 0v4" />
        <circle className="g" cx="76" cy="232" r="3" />
        <circle className="g" cx="108" cy="232" r="3" />
        <rect className="d" x="134" y="234" width="52" height="5" rx="1" />
        <path className="fds" d="M142 234v-14h28v14z" />
        <path className="l" d="M170 224h14" />
        <path className="lc" d="M150 212c-4-6 4-8 0-14M160 212c-4-6 4-8 0-14" />

        {/* utensil pot and a plant */}
        <rect className="p" x="210" y="220" width="14" height="18" rx="2" />
        <path className="l" d="M214 220l-4-14M219 220v-16M222 220l5-12" />
        <path className="fs" d="M256 220c-10-6-12-16-6-21 7 3 9 12 6 21zM258 220c3-10 12-15 19-12-2 7-9 12-19 12zM256 220c-9 2-16-2-17-9 7-3 14 0 17 9z" />
        <polygon className="p" points="246,238 266,238 263,220 249,220" />

        {/* base units: sink cupboard, oven, drawers */}
        <rect className="fs" x="40" y="250" width="240" height="82" />
        <rect className="fds" x="40" y="332" width="240" height="8" />
        <path className="l" d="M122 250v82M198 250v82" />
        <rect className="lt" x="46" y="256" width="33" height="70" rx="2" />
        <rect className="lt" x="83" y="256" width="33" height="70" rx="2" />
        <rect className="g" x="74" y="268" width="3" height="16" rx="1.5" />
        <rect className="g" x="85" y="268" width="3" height="16" rx="1.5" />
        <rect className="p" x="128" y="256" width="64" height="70" rx="3" />
        <circle className="d" cx="140" cy="263" r="2" />
        <circle className="d" cx="150" cy="263" r="2" />
        <circle className="d" cx="170" cy="263" r="2" />
        <circle className="d" cx="180" cy="263" r="2" />
        <rect className="g" x="140" y="272" width="40" height="4" rx="2" />
        <rect className="d" x="136" y="282" width="48" height="36" rx="2" />
        <path className="lw" d="M142 290l10-6M142 298l16-10" />
        <rect className="lt" x="204" y="256" width="70" height="22" rx="2" />
        <rect className="lt" x="204" y="282" width="70" height="22" rx="2" />
        <rect className="lt" x="204" y="308" width="70" height="18" rx="2" />
        <rect className="g" x="229" y="265" width="20" height="3" rx="1.5" />
        <rect className="g" x="229" y="291" width="20" height="3" rx="1.5" />
        <rect className="g" x="229" y="315" width="20" height="3" rx="1.5" />

        <rect className="fl" x="30" y="340" width="260" height="22" />
        <path className="lt" d="M56 340v22M82 340v22M108 340v22M134 340v22M160 340v22M186 340v22M212 340v22M238 340v22M264 340v22" />
        <ellipse className="ht" style={{ fill: ht(id) }} cx="160" cy="348" rx="124" ry="6" />
        <path className="l" d="M24 340h272" />
      </g>
    </>
  );
}

/* ---------------- Bathroom: a tiled bath with a shower, basin and towel rail ---------------- */
function Bathroom() {
  const id = "bathroom";
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* tiled walls */}
        <rect className="fl" x="30" y="172" width="260" height="168" />
        <path className="lt" d={grid(30, 172, 260, 168, 21)} />
        <path className="l" d="M30 172h260" />

        {/* shadows */}
        <g className="off" transform="translate(7 8)">
          <rect className="fd" x="36" y="266" width="150" height="74" />
          <rect className="fd" x="218" y="282" width="58" height="58" />
        </g>

        {/* shower: riser, mixer and head, with water */}
        <path className="l" d="M58 266V138h16" />
        <polygon className="p" points="70,132 98,132 94,142 74,142" />
        <path className="lc" d="M78 150v10M84 150v14M90 150v10M80 172v8M88 172v8" />
        <rect className="g" x="50" y="220" width="16" height="12" rx="3" />
        <circle className="p" cx="58" cy="226" r="3" />

        {/* bath */}
        <rect className="p" x="36" y="264" width="150" height="10" rx="3" />
        <rect className="fs" x="42" y="274" width="138" height="66" />
        <rect className="lt" x="50" y="282" width="122" height="50" rx="3" />

        {/* a rubber duck on the edge */}
        <ellipse className="g" cx="160" cy="257" rx="10" ry="7" />
        <circle className="g" cx="167" cy="248" r="5.5" />
        <polygon className="fs" points="172,247 179,249 172,251" />
        <circle className="d" cx="168" cy="246.5" r="1.2" />

        {/* towel rail with a towel */}
        <path className="l" d="M194 196v104M214 196v104" />
        <path className="l" d="M194 206h20M194 222h20M194 238h20M194 254h20M194 270h20M194 286h20" />
        <path className="fs" d="M190 210h28v42l-7 5-7-5-7 5-7-5z" />
        <path className="lw" d="M190 222h28M190 228h28" />

        {/* mirror, light and basin on a vanity unit */}
        <rect className="g" x="232" y="168" width="26" height="6" rx="3" />
        <rect className="p" x="224" y="182" width="42" height="60" rx="19" />
        <rect className="fls" x="230" y="188" width="30" height="48" rx="14" />
        <path className="lw" d="M237 206l10-10M237 216l16-16" />
        <rect className="p" x="214" y="272" width="66" height="10" rx="2" />
        <path className="p" d="M226 272c2-12 40-12 42 0z" />
        <path className="l" d="M247 262v-8h8" />
        <rect className="fs" x="218" y="282" width="58" height="58" />
        <rect className="lt" x="223" y="288" width="22" height="46" rx="2" />
        <rect className="lt" x="249" y="288" width="22" height="46" rx="2" />
        <circle className="g" cx="241" cy="310" r="2.2" />
        <circle className="g" cx="253" cy="310" r="2.2" />

        {/* tiled floor and a bath mat */}
        <rect className="fls" x="30" y="340" width="260" height="22" />
        <path className="lt" d="M50 340l-8 22M80 340l-6 22M110 340l-4 22M140 340l-2 22M170 340v22M200 340l2 22M230 340l4 22M260 340l6 22" />
        <rect className="p" x="70" y="338" width="64" height="8" rx="3" />
        <path className="l" d="M24 340h272" />
      </g>
    </>
  );
}

/* ---------------- Flooring: boards going down, half the room still on underlay ---------------- */
function Flooring() {
  const id = "flooring";
  // floorboards run away from you towards a point on the far wall
  const VP = { x: 160, y: 40 }, back = 230, front = 362;
  const at = (xb: number, y: number) => r(VP.x + ((xb - VP.x) * (y - VP.y)) / (back - VP.y));
  const lines = [40, 60, 80, 100, 120, 140, 160];
  const joints = [262, 300, 246, 330, 284, 252, 316, 270];
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* window, and a door with new architrave */}
        <rect className="p" x="62" y="118" width="62" height="74" rx="2" />
        <rect className="fls" x="68" y="124" width="50" height="62" />
        <path className="l" d="M93 124v62M68 155h50" />
        <path className="lw" d="M74 138l12-8M74 148l18-12" />
        <rect className="p" x="198" y="106" width="64" height="124" />
        <rect className="fls" x="208" y="116" width="44" height="114" />
        <rect className="lt" x="214" y="124" width="32" height="40" rx="2" />
        <rect className="lt" x="214" y="172" width="32" height="50" rx="2" />
        <circle className="g" cx="244" cy="176" r="3" />

        {/* skirting, with spacers along the wall */}
        <rect className="p" x="30" y="214" width="260" height="16" />

        {/* underlay where the boards haven't reached yet */}
        <polygon className="fl" points={`180,${back} 300,${back} 300,${front} ${at(180, front)},${front}`} />
        <polygon className="ht" style={{ fill: ht(id) }} points={`180,${back} 300,${back} 300,${front} ${at(180, front)},${front}`} />

        {/* boards laid so far */}
        <polygon className="fls" points={`20,${back} 180,${back} ${at(180, front)},${front} ${at(20, front)},${front}`} />
        <path className="lg" d={lines.map((x) => `M${x} ${back}L${at(x, front)} ${front}`).join("")} />
        <path className="lt" d={[20, ...lines].map((x, i) => `M${at(x, joints[i])} ${joints[i]}L${at(x + 20, joints[i])} ${joints[i]}`).join("")} />
        <path className="l" d={`M180 ${back}L${at(180, front)} ${front}`} />
        <path className="g" d="M60 226h7v4h-7zM110 226h7v4h-7zM160 226h7v4h-7z" />
        <path className="l" d={`M30 ${back}h260`} />

        {/* stack of boards waiting */}
        <g className="off" transform="translate(6 7)">
          <rect className="fd" x="204" y="296" width="78" height="34" />
        </g>
        <rect className="fs" x="204" y="318" width="78" height="12" rx="1" />
        <rect className="fls" x="210" y="306" width="72" height="12" rx="1" />
        <rect className="fs" x="206" y="294" width="74" height="12" rx="1" />
        <path className="lg" d="M214 324c16-2 30 2 46 0M218 312c16-2 30 2 46 0M214 300c16-2 30 2 46 0" />

        {/* spirit level and mallet on the new floor */}
        <g transform="rotate(-6 104 324)">
          <rect className="g" x="56" y="318" width="96" height="12" rx="2" />
          <rect className="fls" x="96" y="320" width="18" height="8" rx="4" />
          <circle className="p" cx="105" cy="324" r="2.4" />
          <rect className="d" x="56" y="318" width="8" height="12" rx="2" />
          <rect className="d" x="144" y="318" width="8" height="12" rx="2" />
        </g>
        <g transform="rotate(24 166 300)">
          <rect className="g" x="164" y="306" width="6" height="34" rx="3" />
          <rect className="d" x="152" y="292" width="30" height="16" rx="4" />
        </g>
      </g>
    </>
  );
}

/* ---------------- Stairs: a staircase with newel, spindles and a door with architrave ---------------- */
function Stairs() {
  const id = "stairs";
  const n = 8, rise = 22, go = 17, x0 = 110;
  const top = x0 + go * n;
  let side = `${x0},340`;
  for (let i = 0; i < n; i++) side += ` ${x0 + go * i},${340 - rise * (i + 1)} ${x0 + go * (i + 1)},${340 - rise * (i + 1)}`;
  side += ` ${top},340`;
  const rail = (x: number) => 276 - ((x - x0) * rise) / go;
  const spindles: string[] = [];
  for (let i = 0; i < n; i++) {
    for (const dx of [5, 12]) {
      const x = x0 + go * i + dx;
      spindles.push(`M${x} ${340 - rise * (i + 1)}V${r(rail(x) + 4)}`);
    }
  }
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* a picture on the stairwell wall */}
        <rect className="g" x="126" y="132" width="40" height="32" rx="1" />
        <rect className="fls" x="131" y="137" width="30" height="22" />
        <path className="fs" d="M131 159l10-10 7 6 5-5 8 9z" />

        {/* door with architrave */}
        <rect className="p" x="38" y="198" width="54" height="142" />
        <rect className="fls" x="46" y="206" width="38" height="134" />
        <rect className="lt" x="52" y="214" width="26" height="48" rx="2" />
        <rect className="lt" x="52" y="270" width="26" height="62" rx="2" />
        <circle className="g" cx="78" cy="276" r="3" />

        {/* skirting */}
        <rect className="p" x="92" y="328" width="20" height="12" />
        <rect className="p" x={top} y="328" width="60" height="12" />

        {/* shadow */}
        <g className="off" transform="translate(7 8)">
          <polygon className="fd" points={side} />
        </g>

        {/* the staircase: painted side, oak treads, cupboard underneath */}
        <polygon className="fs" points={side} />
        <rect className="fls" x="208" y="236" width="30" height="104" rx="1" />
        <rect className="lt" x="213" y="244" width="20" height="88" rx="2" />
        <circle className="g" cx="230" cy="290" r="2.4" />
        {Array.from({ length: n }, (_, i) => (
          <rect key={i} className="g" x={x0 + go * i - 3} y={340 - rise * (i + 1) - 4} width={go + 4} height="6" rx="1.5" />
        ))}

        {/* landing */}
        <rect className="fds" x={top} y={340 - rise * n} width={300 - top} height="8" />

        {/* spindles, handrail and newel posts */}
        <path className="l" d={spindles.join("")} />
        <polygon className="g" points={`${x0},${rail(x0) - 4} ${top + 4},${r(rail(top + 4) - 4)} ${top + 4},${r(rail(top + 4) + 4)} ${x0},${rail(x0) + 4}`} />
        <rect className="fs" x={x0 - 14} y="244" width="16" height="96" />
        <rect className="g" x={x0 - 18} y="236" width="24" height="9" rx="2" />
        <circle className="g" cx={x0 - 6} cy="230" r="6" />
        <rect className="fs" x={top - 2} y={r(rail(top) - 6)} width="12" height={r(340 - rise * n - rail(top) + 6)} />
        <rect className="g" x={top - 5} y={r(rail(top) - 12)} width="18" height="7" rx="2" />

        <rect className="fl" x="30" y="340" width="260" height="22" />
        <ellipse className="ht" style={{ fill: ht(id) }} cx="170" cy="348" rx="110" ry="6" />
        <path className="l" d="M24 340h272" />
      </g>
    </>
  );
}

/* ---------------- Roof: new tiles going on over the battens, ladder at the gutter ---------------- */
function Roof() {
  const id = "roof";
  const eaves = 244, ridge = 120, slope = 42 / 124;
  const left = (y: number) => r(36 + (eaves - y) * slope);
  const right = (y: number) => r(284 - (eaves - y) * slope);
  const plane = `36,${eaves} 284,${eaves} ${right(ridge)},${ridge} ${left(ridge)},${ridge}`;
  // four full courses of tiles from the eaves, and a fifth half laid
  const courses = [0, 1, 2, 3, 4].map((k) => {
    const y = eaves - 16 * (k + 1);
    const x1 = 20, x2 = k === 4 ? 150 : 300;
    let joins = "";
    for (let x = x1 + (k % 2 ? 10 : 20); x < x2; x += 20) joins += `M${r(x)} ${y}v16`;
    return { y, x1, x2, joins };
  });
  return (
    <>
      <Defs id={id} />
      <path className="bg" d={ARCH} />
      <g clipPath={`url(#arch-${id})`}>
        {/* sun and a cloud */}
        <circle className="g" cx="96" cy="86" r="14" />
        <path className="p" d="M128 84a10 10 0 0 1 17-7 13 13 0 0 1 24 4 8 8 0 0 1 1 16h-36a8 8 0 0 1-6-13z" />

        {/* shadow */}
        <g className="off" transform="translate(8 9)">
          <polygon className="fd" points={plane} />
          <rect className="fd" x="44" y="252" width="232" height="88" />
        </g>

        {/* brick wall below the eaves, with a window */}
        <rect className="fl" x="44" y="252" width="232" height="88" />
        <path className="lt" d={mortar(44, 252, 232, 88, 11, 24)} />
        <rect className="p" x="122" y="272" width="76" height="52" rx="1" />
        <rect className="fls" x="128" y="278" width="64" height="40" />
        <path className="l" d="M160 278v40" />
        <rect className="p" x="118" y="322" width="84" height="6" rx="1" />

        {/* roof: membrane and battens, then tiles from the eaves up */}
        <polygon className="fls" points={plane} />
        <path className="lc" d={Array.from({ length: 7 }, (_, k) => {
          const y = eaves - 16 * (k + 1);
          return `M${left(y)} ${y}H${right(y)}`;
        }).join("")} />
        <clipPath id="plane-roof"><polygon points={plane} /></clipPath>
        {courses.map((c) => (
          <g key={c.y} clipPath="url(#plane-roof)">
            <rect className="fs" x={c.x1} y={c.y} width={r(c.x2 - c.x1)} height="16" />
            <path className="lw" d={c.joins} />
          </g>
        ))}
        <polygon className="l" style={{ fill: "none" }} points={plane} />
        <rect className="fds" x={left(ridge) - 2} y={ridge - 8} width={r(right(ridge) - left(ridge) + 4)} height="9" rx="3" />

        {/* chimney */}
        <rect className="fs" x="200" y="88" width="30" height="66" />
        <path className="lw" d={mortar(200, 88, 30, 66, 11, 15)} />
        <rect className="p" x="196" y="84" width="38" height="7" rx="1" />
        <rect className="g" x="206" y="70" width="8" height="14" rx="1" />
        <rect className="g" x="216" y="72" width="8" height="12" rx="1" />
        <path className="p" d="M194 154h42l4 8h-50z" />

        {/* gutter and downpipe */}
        <rect className="p" x="28" y="244" width="264" height="9" rx="4" />
        <rect className="p" x="262" y="253" width="8" height="87" />

        {/* ladder up to the gutter */}
        <path className="l" d="M50 340L80 226M66 340L96 226" />
        <path className="l" d="M54 324h16M60 302h16M66 280h16M72 258h16M78 236h16" />

        {/* a few tiles waiting on the roof */}
        <rect className="fds" x="168" y="164" width="22" height="8" rx="1" transform="rotate(-4 179 168)" />
        <rect className="fs" x="170" y="158" width="22" height="8" rx="1" transform="rotate(3 181 162)" />

        <rect className="fl" x="30" y="340" width="260" height="22" />
        <ellipse className="ht" style={{ fill: ht(id) }} cx="160" cy="348" rx="124" ry="6" />
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
  carpentry: { C: Carpentry, box: "0 0 320 400", label: "Illustration of a carpenter’s workbench with a hand plane, shavings, a saw, a try square and a chisel" },
  building: { C: Building, box: "0 0 320 400", label: "Illustration of a house with a brick extension being built, with scaffolding and a ladder" },
  joinery: { C: Joinery, box: "0 0 320 400", label: "Illustration of a fitted media wall with alcove shelves and painted cabinets" },
  decorating: { C: Decorating, box: "0 0 320 400", label: "Illustration of a wall being painted with a roller, with a stepladder and paint tins" },
  renovation: { C: Renovation, box: "0 0 320 400", label: "Illustration of a house opened up to show every room being renovated: a new kitchen, a bathroom, the stairs and a bedroom being painted" },
  kitchen: { C: Kitchen, box: "0 0 320 400", label: "Illustration of a fitted kitchen with a tiled splashback, sink, hob, oven and wall cupboard" },
  bathroom: { C: Bathroom, box: "0 0 320 400", label: "Illustration of a tiled bathroom with a bath and shower, a towel rail, and a basin with a mirror" },
  flooring: { C: Flooring, box: "0 0 320 400", label: "Illustration of a new wooden floor being laid, with a stack of boards, a spirit level and a mallet" },
  stairs: { C: Stairs, box: "0 0 320 400", label: "Illustration of a staircase with a newel post, spindles and oak treads, next to a door with new architrave" },
  roof: { C: Roof, box: "0 0 320 400", label: "Illustration of a roof being retiled over new battens, with a chimney and a ladder up to the gutter" },
  photos: { C: Photos, box: "0 0 120 120", label: "Phone showing a photo" },
  quote: { C: Quote, box: "0 0 120 120", label: "Written quote" },
  done: { C: Done, box: "0 0 120 120", label: "Spirit level with a tick" },
} as const;

/** Inline SVG illustration. Labelled for screen readers and search unless `decorative`. */
export default function Illustration({ kind, className = "", label, decorative = false, fit }: { kind: IllustrationKind; className?: string; label?: string; decorative?: boolean; fit?: "bottom" }) {
  const { C, box } = map[kind];
  if (!decorative) label = label ?? map[kind].label;
  return (
    <svg
      className={`il il-${kind} ${className}`}
      viewBox={box}
      preserveAspectRatio={fit === "bottom" ? "xMidYMax meet" : undefined}
      data-illustration
      {...(label && !decorative ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {label && !decorative && <title>{label}</title>}
      <C />
    </svg>
  );
}
