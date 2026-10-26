import type { SectionSlug } from "./site";
import type { Faq } from "./faqs";

/*
  Long-form copy for each service page, written in Connor’s own voice.
  DRAFT for Connor to approve. House style: plain, specific, British English,
  short sentences, real situations over adjectives. No prices, insurance,
  qualifications or guarantees.
*/

export type ServiceContent = {
  /** <title>, written for search: "<trade> in Lichfield" */
  title: string;
  h1: string;
  description: string;
  lede: string;
  body: string[];
  items: { title: string; text: string }[];
  price: { intro: string; factors: string[] };
  steps: { title: string; text: string }[];
  faqs: Omit<Faq, "color">[];
};

export const serviceContent: Record<SectionSlug, ServiceContent> = {
  carpentry: {
    title: "Carpenter in Lichfield",
    h1: "Carpentry in Lichfield, done properly",
    description:
      "I’m Connor, a carpenter in Lichfield. Internal doors, skirting, staircases, kitchens and fitted wardrobes. Send me a few photos for a free written quote.",
    lede: "Doors that close properly, skirting that sits tight to the floor, stairs that don’t creak. The woodwork you only notice when it’s wrong.",
    body: [
      "Most of my carpentry is in lived-in homes. A door that’s started catching since the new flooring went down. Skirting that never quite met the wall. A newel post everyone in the house has learned not to lean on. Small things, but they’re what make a place feel unfinished.",
      "One door that sticks is as welcome as a whole house of new ones. Older houses round here rarely have a square wall or a level floor, so I scribe and trim everything to suit what’s there, rather than forcing it in and filling the gaps.",
      "Not sure if something’s worth fixing or replacing? Send me a photo and ask. You’ll get a straight answer.",
    ],
    items: [
      { title: "Internal doors", text: "New doors hung and old ones eased and rehung. Hinges, latches and handles fitted so the door shuts with a click, not a shove." },
      { title: "Skirting and architrave", text: "Tight joints in the corners and scribed to uneven floors, so you’re not relying on filler to hide the gaps." },
      { title: "Staircases", text: "Loose spindles, wobbly newels, worn treads and creaks. I repair what I can and replace what I can’t." },
      { title: "Kitchen fitting", text: "Units set level and square, worktops cut and joined cleanly, end panels and plinths fitted neatly." },
      { title: "Fitted wardrobes", text: "Made for the room, including alcoves, chimney breasts and the awkward space under a sloping ceiling." },
      { title: "Garden canopies and outdoor timber", text: "Oak-framed canopies, pergolas and slatted screens, like the canopy on my homepage." },
    ],
    price: {
      intro: "I don’t have a price list, because no two jobs are quite the same. These are the things that make the biggest difference to a carpentry quote:",
      factors: [
        "How many doors, rooms or lengths of skirting there are",
        "Whether you’re buying the doors and materials or I am",
        "Old work that has to come out first, and what turns up behind it",
        "How far the walls and floors are out of true",
        "Whether it’s left ready for paint or fully finished",
      ],
    },
    steps: [
      { title: "Send me a few photos", text: "The door, the stairs or the space, plus a line about what you’d like done." },
      { title: "Get a written quote", text: "I can price most carpentry from photos. If it needs measuring, I’ll pop round." },
      { title: "Fitted and finished", text: "Done on the day we agree, with the sawdust gone before I leave." },
    ],
    faqs: [
      { q: "Can you hang doors I’ve already bought?", a: "Yes. Plenty of people pick their own doors and handles. I’ll hang and fit them, or supply them if you’d rather. Just say which when you ask for a quote." },
      { q: "Is one door worth getting a carpenter out for?", a: "Yes. Single doors are a normal part of my week, and I can usually price them from a photo." },
      { q: "Our house is old and nothing’s straight. Is that a problem?", a: "No, that’s most houses. I scribe skirting, architrave and doors to the walls and floors you’ve actually got." },
      { q: "Do you fit handles and locks too?", a: "Yes, when I’m hanging a door or as a job on its own." },
    ],
  },

  building: {
    title: "Builder in Lichfield",
    h1: "Building work in Lichfield, run by me",
    description:
      "I’m Connor, an insured builder in Lichfield covering the Midlands. Extensions, knock-throughs and renovations, run by me with labourers I trust when needed.",
    lede: "Extensions, knocking through and full renovations. I run every job myself, and bring in labourers I trust when it needs more hands.",
    body: [
      "The hard part of building work often isn’t the building. It’s working out who’s doing what, when they’re turning up and who to ring when something changes. When you use me, that’s me, from the first visit to the final sweep-up.",
      "On bigger jobs I bring in labourers I’ve worked with and trust, so the work keeps moving. I’m still on site, I still run it, and I’m still the one you ring. Because I do the carpentry, joinery and decorating as well, a lot of the finishing that usually gets passed between trades stays with me too.",
      "Bigger jobs start with a visit. I’ll look at the space, talk through what you’re after, and put together a written quote that sets out what’s included and what isn’t.",
    ],
    items: [
      { title: "Extensions", text: "Single-storey and kitchen extensions, planned properly and finished inside, not handed over as a shell." },
      { title: "Knock-throughs", text: "Opening up a kitchen and dining room or taking a wall out, with the structural side sorted before anything comes down." },
      { title: "Renovations", text: "A tired room or a whole house brought up to date, in stages if that suits you better." },
      { title: "Bathroom refits", text: "Old suite out, new one in, with the boxing-in, flooring and trims done neatly." },
      { title: "Stud walls and partitions", text: "A new room, a walk-in wardrobe or a wall to split a space, framed, boarded and ready to decorate." },
      { title: "Outdoor projects", text: "Garden structures and landscaping, finished to the same standard as the inside." },
    ],
    price: {
      intro: "I always quote building work after a proper look. These are the things that move the price most:",
      factors: [
        "The size of the job and how much of the house it touches",
        "Any structural work, and the approvals it needs",
        "What’s already there and has to be stripped out",
        "The finish you want, and who’s supplying the fittings",
        "Access, and whether you’re living in the house while it’s done",
      ],
    },
    steps: [
      { title: "Tell me what you’re planning", text: "Photos and a rough idea are enough to start. Bigger jobs usually need a visit." },
      { title: "Get a clear, written quote", text: "What’s included, what isn’t, and the price, before any work starts." },
      { title: "I run the job", text: "With labourers I trust when it needs them, and me in charge from the first day to the last bit of trim." },
    ],
    faqs: [
      { q: "Do you handle the whole job?", a: "Yes. I run it from start to finish, so you’ve got one person to deal with. On bigger jobs I bring in labourers I trust, and if part of it needs a specialist, the quote says so up front." },
      { q: "Are you insured?", a: "Yes, I’m insured. If you’d like to see the details before I start, just ask." },
      { q: "Will you come out before quoting?", a: "For extensions and structural work, yes. It’s hard to price that properly from photos." },
      { q: "Can we live in the house while the work’s going on?", a: "Usually. It depends on the job, so we’ll talk it through and plan it before anything starts." },
      { q: "Can you do a renovation in stages?", a: "Yes. Plenty of people do one room at a time. I can quote for the lot and work through it in an order that suits you." },
    ],
  },

  joinery: {
    title: "Joiner in Lichfield",
    h1: "Joinery in Lichfield, made to fit",
    description:
      "I’m Connor, a joiner in Lichfield. Made-to-measure media walls, alcove units, shelving and under-stairs storage, built for your room, not adapted from flat-pack.",
    lede: "Media walls, alcove units and storage, made for the room they’re going in.",
    body: [
      "Shop-bought furniture never quite fits an alcove. There’s a gap down one side, a skirting board in the way, or a wall that leans. What I build is made for the actual space, so it runs right up to the walls and ceiling and looks like it’s always been there.",
      "Most people start with a picture they’ve saved and a rough idea of what they need to store. That’s plenty. I’ll measure up, suggest what will work in your room, and spell out exactly what I’ll build in the quote.",
    ],
    items: [
      { title: "Media walls", text: "A built-out wall for the TV, with the wires hidden and room for a soundbar, lighting and storage." },
      { title: "Alcove units", text: "Cupboards below and shelves above, either side of a chimney breast. The classic, and still the one I get asked about most." },
      { title: "Shelving", text: "Floating shelves and built-in bookcases, fixed properly so they don’t sag once the books go on." },
      { title: "Under-stairs storage", text: "Pull-out drawers and cupboards for the space most houses waste." },
      { title: "Window seats", text: "Built-in seating with storage underneath, sized to the window." },
      { title: "Painted on site", text: "Filled, sanded and painted in the colour you pick, so it’s ready to use the day I finish." },
    ],
    price: {
      intro: "Everything I build is designed for one room, so it’s priced individually. The main things that affect it:",
      factors: [
        "Overall size, and how many doors, drawers and shelves",
        "The material, from MDF to solid timber",
        "Painted on site, or left ready for your decorator",
        "Space for lighting, sockets and cable routes",
        "Any skirting, coving or alterations needed to fit it in",
      ],
    },
    steps: [
      { title: "Show me the space", text: "Photos of the room and any pictures you’ve saved that you like." },
      { title: "Agree the design and price", text: "I measure up and set out exactly what I’ll build." },
      { title: "Built in, made to fit", text: "Fitted on the day we agree and finished so it’s ready to fill." },
    ],
    faqs: [
      { q: "Can you build something I’ve seen on Instagram or Pinterest?", a: "Send it over with photos of your room. I’ll tell you what will work in your space and what I’d change." },
      { q: "Do you paint it as well?", a: "Yes. I can fill, sand and paint it on site in your colour." },
      { q: "Can you hide the TV wires?", a: "Yes. I plan the cable routes in from the start, so nothing’s left hanging." },
      { q: "What’s it made from?", a: "Usually MDF for painted pieces, because it stays flat and takes paint well. Solid timber where that makes more sense. The quote says which." },
    ],
  },

  decorating: {
    title: "Painter and decorator in Lichfield",
    h1: "Decorating in Lichfield, right to the last coat",
    description:
      "I’m Connor, a painter and decorator in Lichfield. Walls, ceilings, woodwork, timber windows and outside paintwork, with proper prep under every coat.",
    lede: "Clean lines, proper prep and paint that lasts, inside and out.",
    body: [
      "A paint job lives or dies on the preparation. Filling, sanding, sealing new plaster and masking off take longer than the painting, and they’re the reason a finish still looks sharp a year later, not just on the day.",
      "I decorate as a job on its own and as the last stage of my carpentry and building work. That second part matters. I know where the joints are in the skirting I’ve fitted, so they get filled properly before the gloss goes on.",
      "I take on outside work too, including old timber windows. A bay window I did recently started with rotten sills and peeling paint, and finished good for years yet.",
    ],
    items: [
      { title: "Walls and ceilings", text: "Filled, sanded and painted, with straight cut-in lines where walls meet ceilings and woodwork." },
      { title: "Woodwork", text: "Doors, skirting, frames and spindles rubbed down and finished in satin or gloss." },
      { title: "Timber and bay windows", text: "Rotten sections repaired, then filled, primed and repainted inside and out." },
      { title: "Outside paintwork", text: "Sills, fascias, doors and render cleaned up and protected from the weather." },
      { title: "After building work", text: "New plaster mist-coated and new joinery sealed, so the job’s actually finished." },
      { title: "Floors and trims", text: "Floors laid and trims fitted as part of finishing a room." },
    ],
    price: {
      intro: "I price decorating by the job, not by the day. What makes the most difference:",
      factors: [
        "How many rooms, and how high the ceilings are",
        "The state of what’s there now, and how much filling it needs",
        "How much woodwork, which takes longer than walls",
        "Big colour changes that need extra coats",
        "Outside work that needs repairs before it can be painted",
      ],
    },
    steps: [
      { title: "Show me the rooms", text: "A few photos of each room, and the colours if you’ve picked them." },
      { title: "Get a clear price", text: "A written quote that sets out the prep and the number of coats." },
      { title: "Prepared and painted", text: "Furniture and floors covered, the work done, and the room put back." },
    ],
    faqs: [
      { q: "Do you do outside painting?", a: "Yes. Windows, sills, doors and fascias, including repairing rotten timber before it’s painted." },
      { q: "Who buys the paint?", a: "Either. I can supply it, or use paint you’ve already picked. The quote spells out which." },
      { q: "Can you decorate once the building work’s done?", a: "Yes, and it’s often easier that way. Same person, no waiting for another trade." },
      { q: "Do I need to move the furniture?", a: "Small things and anything fragile, ideally. I’ll move and cover the rest." },
    ],
  },
};
