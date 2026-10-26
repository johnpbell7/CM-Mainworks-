import type { SectionSlug } from "./site";
import { business } from "./site";

// Written in Connor’s voice. Draft answers, waiting on Connor to approve.
// No prices, insurance or guarantees.
export type Faq = { q: string; a: string; color: SectionSlug };

const areaList = `${business.areas.slice(1, -1).join(", ")} and ${business.areas[business.areas.length - 1]}`;

export const homeFaqs: Faq[] = [
  { q: "Do you take on small jobs?", a: "Yes. Hanging one door is as welcome as a full renovation.", color: "carpentry" },
  { q: "Is the quote free?", a: "Yes, and there’s no obligation to go ahead.", color: "building" },
  { q: "Do you supply materials?", a: "I can supply everything, or work with materials you’ve chosen. Either way, it’s set out in the quote.", color: "joinery" },
  { q: "Which areas do you cover?", a: `Lichfield and the places around it, including ${areaList}.`, color: "decorating" },
];

export const faqGroups: { title: string; faqs: Faq[] }[] = [
  {
    title: "Quotes and prices",
    faqs: [
      { q: "Is the quote free?", a: "Yes, and there’s no obligation to go ahead.", color: "building" },
      { q: "How do I get a price?", a: "Send me a few photos and a line about the job, through the form or on WhatsApp. I’ll look at them, come round if I need to, and send you a written quote.", color: "carpentry" },
      { q: "Can you price a job from photos?", a: "Often, yes. I can usually price smaller jobs from a few clear photos. Bigger or structural work normally needs a visit first.", color: "joinery" },
      { q: "Will I know the full price before you start?", a: "Yes. You’ll have a written quote that says what’s included before any work starts.", color: "decorating" },
    ],
  },
  {
    title: "The work",
    faqs: [
      { q: "Do you take on small jobs?", a: "Yes. Hanging one door is as welcome as a full renovation.", color: "carpentry" },
      { q: "Do you supply materials?", a: "I can supply everything, or work with materials you’ve chosen. Either way, it’s set out in the quote.", color: "joinery" },
      { q: "Will I be dealing with you the whole way through?", a: "Yes. You deal with me from the first visit to the final clean-up.", color: "building" },
      { q: "Do you tidy up afterwards?", a: "Yes. I leave the place tidy when the job’s done.", color: "decorating" },
      { q: "Can you work around us living in the house?", a: "Usually, yes. Mention it when you ask for a quote and we’ll plan around it.", color: "building" },
      { q: "Can one job cover more than one trade?", a: "Yes. I do carpentry, joinery, building and decorating, so a job doesn’t need handing between different people.", color: "carpentry" },
    ],
  },
  {
    title: "Areas and getting in touch",
    faqs: [
      { q: "Which areas do you cover?", a: `Lichfield and the places around it, including ${areaList}.`, color: "decorating" },
      { q: "I’m just outside those areas. Can you still help?", a: "Possibly. Send me a few details and I’ll let you know.", color: "joinery" },
      { q: "What’s the best way to get in touch?", a: `Use the quote form, ring me on ${business.phoneDisplay}, or send a WhatsApp with a few photos of the job.`, color: "building" },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);
