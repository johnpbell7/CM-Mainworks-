import Illustration from "./Illustration";

type Step = { title: string; text: string };

const looks = [
  { k: "photos", c: "var(--oak)", t: "var(--t-oak)" },
  { k: "quote", c: "var(--steel)", t: "var(--t-steel)" },
  { k: "done", c: "var(--sage)", t: "var(--t-sage)" },
] as const;

export const defaultSteps: Step[] = [
  { title: "Send me a few photos", text: "Use the form or WhatsApp. A couple of pictures and a line about the job is plenty." },
  { title: "Get a clear price", text: "I look at the photos, come round if I need to, and give you a written quote." },
  { title: "The job, done properly", text: "I start on the day we agree, and leave the place tidy when I’m finished." },
];

/** Three illustrated steps joined by a dashed line. Headings are H3 under the section’s H2. */
export default function Steps({ steps = defaultSteps }: { steps?: Step[] }) {
  return (
    <ol className="steps">
      {steps.slice(0, 3).map((st, i) => (
        <li key={st.title} style={{ "--c": looks[i].c, "--pen": looks[i].t } as React.CSSProperties} data-reveal="up">
          <div className="step-mark"><Illustration kind={looks[i].k} decorative /></div>
          <div className="step-body">
            <p className="step-n">Step {i + 1}</p>
            <h3>{st.title}</h3>
            <p>{st.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
