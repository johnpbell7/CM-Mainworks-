import { Calm, Eye, Pound, Team } from "./Icons";

const items = [
  { Icon: Team, c: "var(--gold)", t: "var(--t-gold)", title: "One team, one number to ring", text: "I manage the whole job, start to finish. No chasing five different trades." },
  { Icon: Calm, c: "var(--sage)", t: "var(--t-sage)", title: "Less stress", text: "The work is planned properly, so you’re never left with a half-finished room." },
  { Icon: Pound, c: "var(--steel)", t: "var(--t-steel)", title: "Competitive prices", text: "Fewer overheads, no days lost between trades, nobody paid twice." },
  { Icon: Eye, c: "var(--brick)", t: "var(--t-brick)", title: "Clear and honest", text: "Written quotes, invoices phase by phase and regular sit-downs." },
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
