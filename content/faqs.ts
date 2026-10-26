import type { SectionSlug } from "./site";
import { business } from "./site";

// Draft answers, waiting on Connor to approve. No prices, insurance or guarantees.
export type Faq = { q: string; a: string; color: SectionSlug };

const areaList = `${business.areas.slice(1, -1).join(", ")} and ${business.areas[business.areas.length - 1]}`;

export const homeFaqs: Faq[] = [
  { q: "Do you take on small jobs?", a: "Yes. Hanging a single door is as welcome as a full renovation.", color: "carpentry" },
  { q: "Is the quote free?", a: "Yes, with no obligation to go ahead.", color: "building" },
  { q: "Do you supply materials?", a: "Connor can supply everything, or work with materials you’ve chosen. It’s all set out in the quote.", color: "joinery" },
  { q: "Which areas do you cover?", a: `Lichfield and nearby, including ${areaList}.`, color: "decorating" },
];

export const faqGroups: { title: string; faqs: Faq[] }[] = [
  {
    title: "Quotes and prices",
    faqs: [
      { q: "Is the quote free?", a: "Yes, with no obligation to go ahead.", color: "building" },
      { q: "How do I get a price?", a: "Send a few photos and a line about the job through the form or WhatsApp. Connor looks at them, visits if he needs to, and sends a written quote.", color: "carpentry" },
      { q: "Can you price a job from photos?", a: "Often, yes. Smaller jobs can usually be priced from a few clear photos. Bigger or structural jobs normally need a visit first.", color: "joinery" },
      { q: "Will I know the full price before you start?", a: "Yes. You’ll have a written quote setting out what’s included before any work starts.", color: "decorating" },
    ],
  },
  {
    title: "The work",
    faqs: [
      { q: "Do you take on small jobs?", a: "Yes. Hanging a single door is as welcome as a full renovation.", color: "carpentry" },
      { q: "Do you supply materials?", a: "Connor can supply everything, or work with materials you’ve chosen. It’s all set out in the quote.", color: "joinery" },
      { q: "Will I deal with the same person throughout?", a: "Yes. Connor looks after the job from the first visit to the final clean-up.", color: "building" },
      { q: "Do you tidy up afterwards?", a: "Yes. The place is left tidy when the job’s finished.", color: "decorating" },
      { q: "Can you work around us living in the house?", a: "Usually, yes. Talk it through when you ask for a quote and it’ll be planned in.", color: "building" },
      { q: "Can you do more than one trade on the same job?", a: "Yes. A job can include carpentry, joinery, building and decorating, so one person sees it through to the finish.", color: "carpentry" },
    ],
  },
  {
    title: "Areas and getting in touch",
    faqs: [
      { q: "Which areas do you cover?", a: `Lichfield and nearby, including ${areaList}.`, color: "decorating" },
      { q: "I’m just outside those areas. Can you still help?", a: "Possibly. Send a few details and Connor will let you know.", color: "joinery" },
      { q: "What’s the best way to get in touch?", a: `Use the quote form, call ${business.phoneDisplay}, or send a WhatsApp with a few photos of the job.`, color: "building" },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);
