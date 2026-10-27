import { Calendar, Check, Layers, QuoteDoc } from "./Icons";

/*
  How a full renovation runs: planned together, built in phases, invoiced phase by
  phase, with sit-downs to check timescales and targets. Confirmed by Connor via John
  (Oct 2026). The phase names are an EXAMPLE; each job's phases are planned to suit it.
*/

const principles = [
  { Icon: Layers, title: "Planned together", text: "We agree the phases, timescales and targets before anything starts." },
  { Icon: QuoteDoc, title: "Paid phase by phase", text: "An invoice for each phase, never the whole job at once." },
  { Icon: Calendar, title: "Regular sit-downs", text: "We check we’re on target. If anything slips, you hear it from me first." },
];

const phases = [
  { title: "Strip-out and structure", text: "Rooms protected and stripped back. Walls taken out, extensions and roofs built." },
  { title: "First fix", text: "New wiring, pipework and heating routed in by the trades I trust, and new walls framed up." },
  { title: "Plaster and floors", text: "Walls and ceilings plastered, and floors levelled and prepared." },
  { title: "Fitting", text: "Kitchen and bathroom fitted, with floors, tiling, stairs, doors, skirting and architrave." },
  { title: "Decorating and finishing", text: "Every room decorated and finished, right through to the last coat." },
];

export default function Phases({ titleId }: { titleId: string }) {
  return (
    <div className="faq-wrap phases-wrap">
      <div className="faq-side" data-reveal="up">
        <h2 id={titleId}>Built in phases, always in the open</h2>
        <p>Phases keep a big job clear, on track and in your control.</p>
        <ul className="principles">
          {principles.map(({ Icon, title, text }) => (
            <li key={title}>
              <span className="benefit-ico" style={{ "--c": "var(--gold)", "--pen": "var(--t-gold)" } as React.CSSProperties}><Icon /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ol className="phases" data-reveal="stagger">
          <li className="ends">
            <span className="mark" aria-hidden="true"><Calendar /></span>
            <div>
              <p className="ph-n">Before we start</p>
              <h3>Visit, plan and sit down</h3>
              <p>I come round, you get a written quote split into phases, and we agree the timescales and targets.</p>
            </div>
          </li>
          {phases.map((ph, i) => (
            <li key={ph.title}>
              <span className="mark" aria-hidden="true">{i + 1}</span>
              <div>
                <p className="ph-n">Phase {i + 1}</p>
                <h3>{ph.title}</h3>
                <p>{ph.text}</p>
                <p className="ph-after">
                  <span><QuoteDoc />Invoiced</span>
                  <span><Calendar />Sit-down: on target?</span>
                </p>
              </div>
            </li>
          ))}
          <li className="ends">
            <span className="mark" aria-hidden="true"><Check /></span>
            <div>
              <p className="ph-n">Handover</p>
              <h3>A final walk-round</h3>
              <p>We go round together, and I put right anything you’re not happy with.</p>
            </div>
          </li>
        </ol>
        <p className="price-note">An example. Your phases are planned around your home.</p>
      </div>
    </div>
  );
}
