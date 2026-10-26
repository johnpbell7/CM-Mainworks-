import type { SectionSlug } from "./site";
import { business } from "./site";

// Written in Connor’s voice. Draft answers, waiting on Connor to approve.
// No prices (those live on /prices as placeholders), qualifications or guarantees.
export type Faq = { q: string; a: string; color: SectionSlug | "renovation" };

const areaList = `${business.areas.slice(1, -1).join(", ")} and ${business.areas[business.areas.length - 1]}`;
const areasAnswer = `I’m based in Lichfield and work across the Midlands, including ${areaList}, plus the towns and villages in between.`;

const oneTeam: Faq = { q: "What does “one team” actually mean?", a: "It means you deal with me, and I take care of everything else. I plan the job, run it on site, and bring in the trades I trust for things like electrics and plumbing. You’re not chasing five different firms or wondering who turns up next.", color: "renovation" };
const smallJobs: Faq = { q: "Do you still take on small jobs?", a: "Yes. Renovations are my main work, but one sticking door is still welcome. Send me a photo and I’ll let you know.", color: "carpentry" };
const freeQuote: Faq = { q: "Is the quote free?", a: "Yes, and there’s no obligation to go ahead.", color: "extensions" };
const insured: Faq = { q: "Are you insured?", a: "Yes, I’m insured. If you’d like to see the details before I start, just ask.", color: "kitchens" };
const budget: Faq = { q: "Can you work to a budget?", a: "Yes. Tell me what you’ve got to spend and I’ll be honest about what it can do, and where it’s worth spending a bit more or saving.", color: "bathrooms" };
const surprises: Faq = { q: "What if something unexpected turns up?", a: "In older houses it sometimes does. If I find something, I’ll show you, explain your options and agree the cost with you before I carry on. No surprises on the bill.", color: "renovation" };

const pay: Faq = { q: "How do I pay for a renovation?", a: "In phases. Before we start, the job is split into clear phases and you’re invoiced phase by phase, so you never pay for the whole job at once and you can see exactly what each invoice covers.", color: "renovation" };
const onTrack: Faq = { q: "How will I know it’s on track?", a: "Before we start, we sit down and agree the process, timescales and targets for each phase. Then we sit down again as the job goes on to check they’re being met. If anything’s slipping, you’ll hear it from me first, with a plan to put it right.", color: "staircases" };
const howLong: Faq = { q: "How long will it take?", a: "It depends on the job. You’ll have timescales for each phase before we start, and we’ll check progress against them together as we go.", color: "extensions" };

export const homeFaqs: Faq[] = [
  oneTeam,
  { q: "Can you manage a whole renovation?", a: "Yes, that’s my main work. Kitchens, bathrooms, extensions, floors, stairs and decorating, planned and managed by me from start to finish.", color: "extensions" },
  pay,
  budget,
  smallJobs,
  { q: "Which areas do you cover?", a: areasAnswer, color: "staircases" },
];

export const renovationFaqs: Faq[] = [
  oneTeam,
  pay,
  onTrack,
  { q: "Can we live in the house while you work?", a: "Often, yes. We’ll plan it together so you always have somewhere to cook, wash and sleep, and I’ll keep the mess under control.", color: "bathrooms" },
];

export const priceFaqs: Faq[] = [
  pay,
  { q: "Why do you show “from” prices?", a: "So you’ve got a rough idea before you get in touch. Every home is different, so your written quote is based on your job, not a price list.", color: "renovation" },
  budget,
  { q: "Why can one team cost less?", a: "Fewer people each adding their own margin, no days lost waiting between trades, and nobody paid twice to fix what someone else left.", color: "extensions" },
];

export const faqGroups: { title: string; faqs: Faq[] }[] = [
  {
    title: "Renovations",
    faqs: [
      oneTeam,
      { q: "What can you take on?", a: "Full renovations, extensions, kitchens, bathrooms, floors and tiling, stairs, doors and skirting, roofing and decorating. Plus smaller carpentry and joinery jobs.", color: "extensions" },
      { q: "Do I have to do the whole house at once?", a: "No. I can plan and price the lot and we’ll go in an order that suits you and your budget.", color: "kitchens" },
      { q: "Can we live in the house while you work?", a: "Often, yes. We’ll plan it together so you always have somewhere to cook, wash and sleep.", color: "bathrooms" },
      onTrack,
      howLong,
      { q: "Do you work on your own?", a: "No. On a renovation I run a team: labourers I trust, and trusted trades for things like electrics and plumbing. I’m on site, I run it, and I’m the one you deal with.", color: "staircases" },
      { q: "Do you tidy up afterwards?", a: "Yes. I keep the site tidy as we go and leave the place clean when we’re done.", color: "decorating" },
    ],
  },
  {
    title: "Quotes and prices",
    faqs: [
      freeQuote,
      { q: "How do I get a price?", a: "Send me a few photos and a line about the job, through the form or on WhatsApp. For bigger jobs I’ll come round, then send you a written quote.", color: "kitchens" },
      { q: "Will I know the full price before you start?", a: "Yes. You’ll have a written quote that says what’s included before any work starts.", color: "bathrooms" },
      pay,
      budget,
      surprises,
      { q: "Do you supply materials?", a: "I can supply everything, or work with things you’ve chosen. Either way, it’s set out in the quote.", color: "joinery" },
      insured,
    ],
  },
  {
    title: "Smaller jobs",
    faqs: [
      smallJobs,
      { q: "Can you price a small job from photos?", a: "Often, yes. A few clear photos are usually enough for smaller jobs.", color: "joinery" },
    ],
  },
  {
    title: "Areas and getting in touch",
    faqs: [
      { q: "Which areas do you cover?", a: areasAnswer, color: "decorating" },
      { q: "I’m just outside those areas. Can you still help?", a: "Possibly, especially for bigger jobs. Send me a few details and I’ll let you know.", color: "roofing" },
      { q: "What’s the best way to get in touch?", a: `Use the quote form, ring me on ${business.phoneDisplay}, or send a WhatsApp with a few photos of the job.`, color: "extensions" },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);
