import { Calm, Eye, Pound, Team } from "./Icons";

const items = [
  { Icon: Team, c: "var(--gold)", t: "var(--t-gold)", title: "One team, one number to ring", text: "I manage the whole job, from the first plan to the final coat of paint. No chasing five different trades." },
  { Icon: Calm, c: "var(--sage)", t: "var(--t-sage)", title: "Less stress", text: "I plan the order of work so trades aren’t tripping over each other, and you’re never left with a half-finished room." },
  { Icon: Pound, c: "var(--steel)", t: "var(--t-steel)", title: "Competitive prices", text: "One team means fewer overheads, no days lost between trades and nobody paid twice to put things right." },
  { Icon: Eye, c: "var(--brick)", t: "var(--t-brick)", title: "Clear and honest", text: "A written quote before anything starts, invoices phase by phase, and regular sit-downs to check we’re on target." },
];

/** The four reasons to use one team. Headings are H3 under the section’s H2. */
export default function Benefits() {
  return (
    <ul className="benefits" data-reveal="stagger">
      {items.map(({ Icon, c, t, title, text }) => (
        <li key={title} style={{ "--c": c, "--pen": t } as React.CSSProperties}>
          <span className="benefit-ico"><Icon /></span>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ul>
  );
}
