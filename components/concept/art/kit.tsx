/*
  Shared parts for the line drawings (see components/Illustration.tsx for the style).
  Every scene is drawn in a 320 x 240 box and stands on a ground line at y=210.
*/

export const r1 = (n: number) => Math.round(n * 10) / 10;

/** A gold tick badge that pops on (class a-pop loops it while on screen). */
export function Tick({ x, y, s = 1, className = "a-pop" }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={className}>
        <circle r="11" className="tk-c" />
        <path d="M-5 0.5L-1.5 4L5 -3.4" className="tk-v" />
      </g>
    </g>
  );
}

/**
  The street every scene stands on, the same as the homepage hero: far town in the
  palest blue, a cloud or two, and the pavement with its kerb. The scene's ground
  line is y=210 (top of the pavement). `ground={false}` for scenes that float
  (speech bubbles, a shield).
*/
export function Backdrop({ ground = true, clouds = true }: { ground?: boolean; clouds?: boolean }) {
  let kerb = "";
  for (let x = 12; x < 320; x += 30) kerb += `M${x} 210v10`;
  return (
    <>
      <g className="far">
        <path d="M6 210V118h38v-16h26v108zM76 210V146h30v64zM232 210V108h40v102zM278 210V138h36v72z" />
        <circle cx="58" cy="156" r="22" />
        <circle cx="258" cy="164" r="16" />
      </g>
      {clouds && <g className="vb">
        <path className="cloudf" d="M34 46q4 -14 20 -10q8 -12 24 -4q16 -4 16 10q10 4 6 12H32q-10 0 -6 -10z" />
        <path className="cloudf" d="M230 30q3 -10 15 -7q6 -9 18 -3q12 -3 12 8q8 3 4 9H228q-8 0 -4 -7z" />
      </g>}
      {ground && (
        <>
          <rect x="-40" y="210" width="400" height="10" className="pv" />
          <rect x="-40" y="220" width="400" height="30" className="rd" />
          <path className="kerb" d={kerb} />
          <path className="k" d="M-40 210H360M-40 220H360" />
        </>
      )}
    </>
  );
}

/** Backdrop plus the scene; kept as Base so every scene starts the same way. */
export function Base({ children, ground = true, clouds = true }: { children: React.ReactNode; ground?: boolean; clouds?: boolean }) {
  return (
    <>
      <Backdrop ground={ground} clouds={clouds} />
      {children}
    </>
  );
}

/**
  A pot plant, used in every room drawing so they all match: leaves fan out from inside
  the pot (their ends are tucked behind the rim, so nothing meets messily), each with a
  fine centre vein. (x, y) is where the pot stands; at s=1 it's about 60 tall.
*/
const LEAVES: [number, number][] = [[-58, 20], [54, 19], [-30, 29], [27, 30], [-3, 36]];
export function Plant({ x, y, s = 1, gold = false }: { x: number; y: number; s?: number; gold?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {LEAVES.map(([a, l]) => (
        <g key={a} transform={`translate(0 -21) rotate(${a})`}>
          <path className="kb1" d={`M0 0C${r1(-l * 0.3)} ${r1(-l * 0.3)} ${r1(-l * 0.24)} ${r1(-l * 0.8)} 0 ${-l}C${r1(l * 0.24)} ${r1(-l * 0.8)} ${r1(l * 0.3)} ${r1(-l * 0.3)} 0 0Z`} />
          <path className="k thin" d={`M0 -3V${r1(-l * 0.74)}`} />
        </g>
      ))}
      <path className={gold ? "kgl" : "kf"} d="M-11 0L-12.5 -19H12.5L11 0Z" />
      <rect x="-14" y="-24" width="28" height="5.5" rx="1.5" className={gold ? "kgl" : "kf"} />
    </g>
  );
}
