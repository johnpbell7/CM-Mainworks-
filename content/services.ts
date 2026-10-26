import type { SectionSlug } from "./site";
import type { Faq } from "./faqs";

/*
  Long-form copy for each service page. DRAFT for Connor to approve.
  Nothing here states prices, insurance, qualifications or guarantees.
*/

export type ServiceContent = {
  /** <title> and H1 are written for search: "<service> in Lichfield" */
  title: string;
  h1: string;
  description: string;
  lede: string;
  body: string[];
  items: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: Omit<Faq, "color">[];
};

export const serviceContent: Record<SectionSlug, ServiceContent> = {
  carpentry: {
    title: "Carpenter in Lichfield",
    h1: "Carpentry in Lichfield, done properly",
    description:
      "Carpenter in Lichfield for internal doors, skirting, staircases, kitchen fitting and fitted wardrobes. Send a few photos for a free, written quote.",
    lede: "The woodwork that makes a house feel finished, hung, fitted and trimmed so it sits right and stays right.",
    body: [
      "Good carpentry is mostly the bits you don’t notice. Doors that close without a shove, skirting that meets the floor without a gap, stairs that don’t creak. Connor takes the time to get those details right, whether it’s one door or a whole house.",
      "Most carpentry jobs can be priced from a few photos, so you’ll usually know the cost before anyone visits. Where it helps to measure up first, Connor will come and have a look.",
    ],
    items: [
      { title: "Internal doors", text: "New doors hung, old ones planed and rehung, handles, hinges and latches fitted so they close cleanly." },
      { title: "Skirting and architrave", text: "Replaced or fitted new, with tight mitres and neat scribes where floors and walls aren’t straight." },
      { title: "Staircases", text: "Spindles, handrails, newel posts and treads repaired or replaced, and squeaks sorted." },
      { title: "Kitchen fitting", text: "Units, worktops, doors and trims fitted level and square, ready for the trades that follow." },
      { title: "Fitted wardrobes", text: "Built to the room, using the awkward corners and sloping ceilings that freestanding furniture can’t." },
      { title: "Garden canopies and outdoor timber", text: "Oak-framed canopies, pergolas and slatted screens built to stand up to British weather." },
    ],
    steps: [
      { title: "Send a few photos", text: "Snap the doors, stairs or space and add a line about what you’d like done." },
      { title: "Get a written quote", text: "Connor prices the job from the photos, or visits to measure if he needs to." },
      { title: "Fitted and finished", text: "The work is done on the agreed date and the place is left tidy." },
    ],
    faqs: [
      { q: "Can you fit doors I’ve already bought?", a: "Yes. If you’ve chosen your own doors or handles, Connor can hang and fit them. He can also supply them if you’d rather. It’s all set out in the quote." },
      { q: "Is one door too small a job?", a: "No. Hanging a single door is as welcome as fitting out a whole house." },
      { q: "Can you work on older houses with uneven walls?", a: "Yes. Skirting, architrave and doors are scribed and trimmed to suit the walls and floors you’ve got, rather than forced to fit." },
    ],
  },
  building: {
    title: "Builder in Lichfield",
    h1: "Building work in Lichfield, run by one person",
    description:
      "Builder in Lichfield for extensions, knock-throughs, structural alterations, bathroom refits and renovations. One person looking after the job from start to finish.",
    lede: "Bigger changes to the shape of your home, planned clearly and run by one person from start to finish.",
    body: [
      "Building work goes better when one person is responsible for it. Connor plans the job with you, keeps you up to date as it goes, and sees it through to the finish, so you’re not chasing different people for different stages.",
      "Larger jobs usually start with a visit, so Connor can see the space, talk through what you want and give you a clear, written quote before anything starts.",
    ],
    items: [
      { title: "Extensions", text: "Single-storey and kitchen extensions, planned and built through to the finishing trim." },
      { title: "Knock-throughs", text: "Opening up rooms and removing walls, with the structural side planned properly first." },
      { title: "Renovations", text: "Tired rooms and whole houses brought up to date, one stage at a time or all at once." },
      { title: "Bathroom refits", text: "Old suites stripped out and new ones fitted, with the boxing-in, flooring and finishing done neatly." },
      { title: "Stud walls and partitions", text: "New rooms, dividing walls and boxing-in, framed, boarded and ready to decorate." },
      { title: "Landscaping and outdoor projects", text: "Garden structures, landscaping and outdoor spaces that finish off the house." },
    ],
    steps: [
      { title: "Tell Connor what you’re planning", text: "Send photos and a line about the job. Bigger jobs usually start with a visit." },
      { title: "Get a clear, written quote", text: "You’ll see what’s included and the price before any work starts." },
      { title: "One person runs the job", text: "Connor sees it through from the first day to the final clean-up." },
    ],
    faqs: [
      { q: "Do you handle the whole job?", a: "Connor looks after the job from start to finish, so you have one person to deal with. If a specialist is needed for part of it, that’s explained in the quote." },
      { q: "Will you visit before quoting for building work?", a: "Usually, yes. For extensions and structural work Connor will come and see the space before giving a written quote." },
      { q: "Can we stay in the house while the work is done?", a: "Often, yes. It depends on the job, so it’s talked through and planned in when you get your quote." },
    ],
  },
  joinery: {
    title: "Joiner in Lichfield",
    h1: "Joinery in Lichfield, made to fit",
    description:
      "Joiner in Lichfield for made-to-measure media walls, alcove units, shelving and under-stairs storage. Built to fit your room exactly. Free, written quotes.",
    lede: "Built-in pieces made to fit your rooms exactly, rather than flat-pack that nearly fits.",
    body: [
      "Fitted joinery makes the most of every awkward alcove, chimney breast and sloping ceiling. Each piece is measured and built for the space it’s going into, so it looks like it’s always been there.",
      "Send a few photos of the room and the kind of thing you have in mind, even a picture you’ve saved online. Connor will talk through the options and come back with a written quote.",
    ],
    items: [
      { title: "Media walls", text: "A built-in wall for the TV, with space for speakers, cables, lighting and storage, all hidden neatly away." },
      { title: "Alcove units", text: "Cupboards below and shelves above, built into the alcoves either side of a chimney breast." },
      { title: "Shelving", text: "Floating shelves and built-in bookcases, fitted level and strong enough for what you’ll put on them." },
      { title: "Under-stairs storage", text: "Pull-out drawers and cupboards that turn dead space into somewhere useful." },
      { title: "Window seats and benches", text: "Built-in seating with storage underneath, made to the size of the space." },
      { title: "Painted finish", text: "Units filled, sanded and painted in the colour you choose, ready to use." },
    ],
    steps: [
      { title: "Share the space and an idea", text: "Photos of the room and anything you’ve seen that you like." },
      { title: "Agree the design and price", text: "Connor measures up and sets out what will be built in a written quote." },
      { title: "Built in, made to fit", text: "Fitted on the agreed date and finished so it’s ready to use." },
    ],
    faqs: [
      { q: "Can you build something from a picture I’ve seen online?", a: "Yes. Send the picture with photos of your room and Connor will tell you how it can be adapted to fit your space." },
      { q: "Do you paint the units too?", a: "Yes, units can be finished and painted in the colour you choose. It’s set out in the quote." },
      { q: "Can you hide the TV cables?", a: "Yes. Media walls are planned so cables and sockets are tucked away behind the unit." },
    ],
  },
  decorating: {
    title: "Painter and decorator in Lichfield",
    h1: "Decorating in Lichfield, right to the last coat",
    description:
      "Painter and decorator in Lichfield for walls, ceilings, woodwork, windows and finishing after building work. Proper preparation underneath every finish.",
    lede: "The finish that people actually see, with the prep done properly underneath it.",
    body: [
      "A good paint finish is mostly preparation. Filling, sanding, sealing and masking take time, and they’re what make the final coat look sharp and last. Connor doesn’t skip them.",
      "Decorating can be booked on its own or as the final stage of a carpentry or building job, so the whole thing is finished by the same person.",
    ],
    items: [
      { title: "Walls and ceilings", text: "Rooms filled, sanded and painted with clean lines where walls meet ceilings and woodwork." },
      { title: "Woodwork", text: "Doors, skirting, frames and spindles prepared and finished in satin or gloss." },
      { title: "Windows and bay windows", text: "Old timber windows repaired, filled, primed and repainted inside and out." },
      { title: "Exterior painting", text: "Sills, fascias, doors and render brought back to life and protected from the weather." },
      { title: "Finishing after building work", text: "New plaster and joinery sealed and decorated so the job is truly finished." },
      { title: "Flooring and finishing touches", text: "Floors laid and trims fitted as part of finishing a room." },
    ],
    steps: [
      { title: "Show Connor the rooms", text: "A few photos of each room, and the colours if you’ve chosen them." },
      { title: "Get a clear price", text: "A written quote that sets out the prep and the number of coats." },
      { title: "Prepared and painted", text: "Furniture and floors protected, the work done, and the room left tidy." },
    ],
    faqs: [
      { q: "Do you do exterior painting?", a: "Yes, including windows, sills, doors and fascias. Connor recently brought a 140-year-old bay window back to life." },
      { q: "Do you supply the paint?", a: "Connor can supply it, or use paint you’ve already chosen. It’s set out in the quote." },
      { q: "Can you decorate after other building work?", a: "Yes. It’s often the final stage of a carpentry or building job, so the same person finishes it." },
    ],
  },
};
