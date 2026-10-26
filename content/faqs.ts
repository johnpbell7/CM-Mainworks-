import type { SectionSlug } from "./site";
import { business } from "./site";

// Draft answers, waiting on Connor to approve.
export type Faq = { q: string; a: string; color: SectionSlug };

export const homeFaqs: Faq[] = [
  { q: "Do you take on small jobs?", a: "Yes. Hanging a single door is as welcome as a full renovation.", color: "carpentry" },
  { q: "Is the quote free?", a: "Yes, with no obligation to go ahead.", color: "building" },
  { q: "Do you supply materials?", a: "Connor can supply everything, or work with materials you’ve chosen. It’s all set out in the quote.", color: "joinery" },
  {
    q: "Which areas do you cover?",
    a: `Lichfield and nearby, including ${business.areas.slice(1, -1).join(", ")} and ${business.areas[business.areas.length - 1]}.`,
    color: "decorating",
  },
];

export const moreFaqs: Faq[] = [
  { q: "How do I get a price?", a: "Send a few photos and a line about the job through the form or WhatsApp. Connor looks at them, visits if he needs to, and sends a written quote.", color: "carpentry" },
  { q: "Will I deal with the same person throughout?", a: "Yes. Connor looks after the job from the first visit to the final clean-up.", color: "building" },
  { q: "Do you tidy up afterwards?", a: "Yes. The place is left tidy when the job’s finished.", color: "joinery" },
  { q: "Can you work around us living in the house?", a: "Usually, yes. Talk it through when you ask for a quote and it’ll be planned in.", color: "decorating" },
];
