import type { SectionSlug } from "./site";
import type { Faq } from "./faqs";

/*
  Long-form copy for each service page, written in Connor’s own voice.
  DRAFT for Connor to approve. House style: friendly, plain and open, British
  English, short sentences, real situations over adjectives. The main pitch is
  full renovations run by one team, so every page points back to that.
  Prices live only on /prices (content/prices.ts), as placeholders until Connor
  supplies them. No qualifications, guarantees or payment terms.
  TO CONFIRM WITH CONNOR: which specialist trades (electrics, plumbing, plastering,
  gas) he brings in and organises, and the roofing work he takes on.
*/

export type ServiceContent = {
  /** <title>, written for search */
  title: string;
  h1: string;
  description: string;
  lede: string;
  body: string[];
  items: { title: string; text: string }[];
  price: { intro: string; factors: string[] };
  steps: { title: string; text: string }[];
  /**
   * "How long, and how much disruption". typical is Connor's usual time on site
   * (e.g. "Around four to six weeks"); it stays null until he gives it, and shows
   * as "Typical time" once set. Never guess it.
   */
  time: { intro: string; typical: string | null; long: string; living: string; mess: string };
  faqs: Omit<Faq, "color">[];
};

export const serviceContent: Record<SectionSlug, ServiceContent> = {
  extensions: {
    title: "House extensions across the Midlands",
    h1: "Extensions, built and finished by one team",
    description:
      "I’m Connor. Single-storey, kitchen and rear extensions across the Midlands, planned with you and finished inside by one team. Free written quotes.",
    lede: "More room without moving house. Planned, built and finished inside by one team.",
    body: [
      "Most people who ask about an extension have the same worry: who’s going to pull it all together? Builders, roofers, electricians, plasterers, a kitchen fitter, a decorator. Normally that’s you, juggling phone calls. With me, it’s my job.",
      "I run the whole extension with one team, from the groundwork to the last coat of paint. Where it needs specialist trades, I bring in people I trust and organise them, so the work keeps moving and you’ve still only got one number to ring.",
      "It starts with a visit. We’ll talk about how you live, what’s not working now and what you’d love the space to be. Then you get a written quote split into clear phases, and we sit down to agree the timescales and targets before any work starts.",
    ],
    items: [
      { title: "Single-storey rear extensions", text: "A proper kitchen-diner or family room at the back." },
      { title: "Kitchen extensions", text: "The extension and its kitchen, as one job." },
      { title: "Knock-throughs", text: "Opening up the downstairs, structural side sorted first." },
      { title: "Side and wraparound extensions", text: "Getting the most out of the plot." },
      { title: "Garage conversions", text: "A garage turned into a room you’ll use." },
      { title: "Finished inside", text: "Floors, doors and decorating, ready to move into." },
    ],
    price: {
      intro: "Every job is different. What moves the price most:",
      factors: [
        "The size of the extension and the type of roof",
        "Structural work, like steels and knocking through",
        "Ground conditions and access to the back of the house",
        "The finish inside, and who’s supplying the kitchen or fittings",
        "Plans and approvals, and what they ask for",
      ],
    },
    steps: [
      { title: "Tell me what you’re hoping for", text: "Photos and a rough idea are plenty to start. Then I’ll come round and we’ll talk it through." },
      { title: "A plan and a written quote", text: "What’s included, what isn’t, and the price, before any work starts." },
      { title: "One team builds it, in phases", text: "Groundwork to decorating, invoiced phase by phase, with sit-downs to check timescales and targets." },
    ],
    time: {
      intro: "Every extension is different, so you get the timescale in writing before any work starts.",
      typical: null,
      long: "It depends on the size, the roof and the finish inside. We agree the timescale and targets for each phase at the start, then check them together at regular sit-downs.",
      living: "Usually, yes. Most of the work happens outside until we knock through, and we’ll plan that part around you.",
      mess: "Outside work stays outside. When we open up, I’ll talk you through what to expect first, and the mess is cleared as we go.",
    },
    faqs: [
      { q: "Do you handle the whole extension?", a: "Yes. I manage it from start to finish, so you’ve got one person to deal with. Where it needs specialist trades, I bring in people I trust and organise them for you." },
      { q: "Can you help with plans and approvals?", a: "Yes. I’ll talk you through what your extension is likely to need and help you get it in place before any work starts." },
      { q: "Are you insured?", a: "Yes, I’m insured. If you’d like to see the details before I start, just ask." },
      { q: "Can you fit the kitchen in the extension too?", a: "Yes. That’s one of the best reasons to use one team: the extension and the kitchen are planned together." },
    ],
  },

  kitchens: {
    title: "Kitchen renovations across the Midlands",
    h1: "Kitchen renovations, start to finish",
    description:
      "I’m Connor. Complete kitchen renovations across the Midlands: strip-out, layout changes, fitting, tiling, flooring and decorating, run by one team.",
    lede: "Old kitchen out, new one in, and the room finished around it. One team throughout.",
    body: [
      "A new kitchen usually means a lot of different people: someone to rip the old one out, a fitter, a plumber, an electrician, a tiler, a plasterer and a decorator. Get the order wrong and you’re without a kitchen for weeks longer than you need to be.",
      "I take care of all of it. I plan the order of work, bring in the specialist trades I trust, and fit the kitchen myself, so it goes in level and square and the room is finished around it.",
      "Already chosen your kitchen? That’s fine. I can fit a kitchen you’ve bought, or help you plan one that suits the room and your budget.",
    ],
    items: [
      { title: "Strip-out", text: "Old kitchen out and away, walls and floor made good." },
      { title: "Layout changes", text: "A new island, a moved sink or a knock-through." },
      { title: "Fitting", text: "Units level and square, worktops joined cleanly." },
      { title: "Tiling and flooring", text: "Done as part of the same job." },
      { title: "Electrics and plumbing", text: "Organised through trades I trust." },
      { title: "Decorated and ready", text: "Finished, so you can start cooking." },
    ],
    price: {
      intro: "Every job is different. What moves the price most:",
      factors: [
        "The size of the room and the number of units",
        "Whether the layout stays the same or changes",
        "Who supplies the kitchen and worktops",
        "Walls coming down, or new electrics and plumbing runs",
        "The flooring and tiling you choose",
      ],
    },
    steps: [
      { title: "Show me the room", text: "A few photos and any kitchens you’ve saved that you like. I’ll come round to measure up." },
      { title: "A plan and a written quote", text: "The order of work, what’s included and the price, before anything starts." },
      { title: "Fitted and finished", text: "One team from strip-out to the final coat, with the mess cleared as we go." },
    ],
    time: {
      intro: "The question everyone asks is how long they’ll be without a kitchen.",
      typical: null,
      long: "It depends on the job. A refit in the same layout is quicker than moving walls, sinks or cookers. You’ll get the timescale with your quote, before anything starts.",
      living: "You’ll be without a working kitchen for part of the job. Planning the order of work properly keeps that part as short as it can be, and you’ll know when it starts and ends before we begin.",
      mess: "Dust sheets down and the mess cleared as we go.",
    },
    faqs: [
      { q: "Can you fit a kitchen I’ve already bought?", a: "Yes. Plenty of people buy their own. I’ll fit it and finish the room around it." },
      { q: "Do you do the electrics and plumbing?", a: "I organise them through trades I trust, so you don’t have to find anyone else." },
      { q: "Can you move walls to make the kitchen bigger?", a: "Yes. Knock-throughs are a big part of what I do, with the structural side sorted first." },
    ],
  },

  bathrooms: {
    title: "Bathroom renovations across the Midlands",
    h1: "Bathroom renovations, done properly",
    description:
      "I’m Connor. Full bathroom renovations across the Midlands: strip-out, new suite, tiling, flooring and decorating, organised by one team.",
    lede: "Lots of trades in one small room. I organise them all, so you get a finished bathroom.",
    body: [
      "A tired bathroom is one of those jobs people put off, mostly because of the hassle. Who strips it out? Who does the plumbing? When does the tiler come? What if they all turn up on the same day?",
      "When you use me, you don’t have to think about any of that. I plan the job, organise the trades in the right order and do the carpentry, boxing-in and finishing myself, so it all fits together neatly.",
      "Bring me your ideas, a picture you’ve saved or just a list of what annoys you about the room now. We’ll work out the best bathroom for your space and budget together.",
    ],
    items: [
      { title: "Complete bathrooms", text: "Strip-out to final seal, as one job." },
      { title: "Shower rooms and en-suites", text: "Small spaces, including walk-in showers." },
      { title: "Tiling", text: "Straight, level and neatly cut." },
      { title: "Boxing-in and storage", text: "Pipes hidden, storage made to fit." },
      { title: "Plumbing and electrics", text: "Organised through trades I trust." },
      { title: "Flooring", text: "Tiles or waterproof flooring on a sound base." },
    ],
    price: {
      intro: "Every job is different. What moves the price most:",
      factors: [
        "The size of the room and how much tiling",
        "Moving the toilet, bath or shower to a new spot",
        "Who supplies the suite, tiles and fittings",
        "What’s behind the old tiles once they come off",
        "Extras like underfloor heating or a new window",
      ],
    },
    steps: [
      { title: "Show me the bathroom", text: "Photos of the room as it is, and any ideas you love. I’ll come round to measure up." },
      { title: "A plan and a written quote", text: "What’s included and the price, before any work starts." },
      { title: "One team finishes it", text: "Stripped out, fitted, tiled and decorated, with the trades organised for you." },
    ],
    time: {
      intro: "A bathroom is a small room with a lot going on, so the order of work matters.",
      typical: null,
      long: "It depends on the size, how much tiling there is and whether anything moves. You’ll get the timescale with your quote, and we agree it before any work starts.",
      living: "If it’s your only bathroom, we’ll talk it through first and plan the job to keep the time without one as short as possible.",
      mess: "Dust sheets down, the old bathroom taken away, and the mess cleared as we go.",
    },
    faqs: [
      { q: "Do you do the plumbing?", a: "I organise it through plumbers I trust, so you don’t have to find anyone else." },
      { q: "Can I choose my own suite and tiles?", a: "Of course. I can work with what you’ve picked, or help you choose." },
      { q: "Can you turn a bathroom into a shower room?", a: "Yes. Walk-in showers are one of the most popular changes I’m asked about." },
    ],
  },

  staircases: {
    title: "Staircases, doors and skirting across the Midlands",
    h1: "Stairs, doors and skirting that finish a home",
    description:
      "I’m Connor. Staircase renovations, internal doors, skirting and architrave across the Midlands, room by room or right through the house.",
    lede: "A solid staircase, doors that close with a click, and skirting and architrave that sit tight.",
    body: [
      "Stairs, doors, skirting and architrave are what make a renovated house feel finished. They’re also the first things you notice in a house that isn’t: a door that catches, a gap under the skirting, a wobbly newel post everyone has learned not to lean on.",
      "This is my trade. I started as a carpenter, and it’s still the part of a renovation I take most pride in. Older houses round here rarely have a square wall or a level floor, so I scribe and trim everything to suit what’s there rather than filling the gaps.",
      "I can do a single staircase or a full set of doors on their own, or as part of a bigger renovation.",
    ],
    items: [
      { title: "Staircase renovations", text: "New spindles, handrails, newels or a full staircase." },
      { title: "Stair repairs", text: "Creaks, loose treads and wobbly newels fixed." },
      { title: "Internal doors", text: "Hung right through, with handles that work." },
      { title: "Skirting", text: "Tight joints, scribed to uneven floors." },
      { title: "Architrave", text: "Neat frames, matched to the house." },
      { title: "Painted and finished", text: "Filled, sanded and painted if you want it." },
    ],
    price: {
      intro: "Every job is different. What moves the price most:",
      factors: [
        "How many doors or rooms, or how much of the staircase",
        "Who supplies the doors, spindles and timber",
        "Old work that has to come out first",
        "How far the walls and floors are out of true",
        "Left ready for paint, or fully finished",
      ],
    },
    steps: [
      { title: "Send me a few photos", text: "The stairs, doors or rooms, and a line about what you’d like done." },
      { title: "A clear, written quote", text: "I can price a lot of this from photos. If it needs measuring, I’ll come round." },
      { title: "Fitted and finished", text: "Done on the day we agree, with the sawdust gone before I leave." },
    ],
    time: {
      intro: "Most of this work goes on around you while you get on with your day.",
      typical: null,
      long: "It depends on how much there is. One door is a short visit; a staircase, or a whole house of doors and skirting, takes longer. You’ll know how long before I start.",
      living: "Yes, you can stay in the house. If the stairs themselves are being replaced, we’ll talk through how that part works first.",
      mess: "Dust sheets down, and the sawdust gone before I leave.",
    },
    faqs: [
      { q: "Can you change the spindles without replacing the whole staircase?", a: "Usually, yes. Swapping spindles, newels and the handrail is often all a staircase needs." },
      { q: "Can you hang doors I’ve already bought?", a: "Yes. I’ll hang and fit them, or supply them if you’d rather." },
      { q: "Our house is old and nothing’s straight. Is that a problem?", a: "No, that’s most houses. I fit everything to the walls and floors you’ve actually got." },
      { q: "Will you do just one door?", a: "Yes. One door is as welcome as a whole house." },
    ],
  },

  roofing: {
    title: "Roofing across the Midlands",
    h1: "Roofing, as part of the job or on its own",
    description:
      "I’m Connor. Roof repairs, new roofs on extensions, flat roofs, fascias, soffits and guttering across the Midlands. Free written quotes.",
    lede: "Repairs, new roofs on extensions, and the fascias and guttering that keep the weather out.",
    body: [
      "Roof work often comes up in the middle of something else. You’re planning an extension and it needs a roof. You’re renovating and spot a leak. Having it handled by the same team means it’s done at the right time, and done properly.",
      "I’ll always tell you honestly what I find up there, show you photos, and explain what needs doing now and what can wait.",
    ],
    items: [
      { title: "Roof repairs", text: "Slipped tiles replaced, leaks found and fixed." },
      { title: "Roofs on extensions", text: "Pitched or flat, built with your extension." },
      { title: "Flat roofs", text: "Garages, porches and dormers made watertight." },
      { title: "Fascias and soffits", text: "Rotten timber replaced, roofline tidied." },
      { title: "Guttering", text: "Leaking or sagging gutters repaired or replaced." },
      { title: "Chimney and lead work", text: "Flashings and pointing checked and repaired." },
    ],
    price: {
      intro: "Every job is different. What moves the price most:",
      factors: [
        "How big the roof is, and how easy it is to get to",
        "Whether scaffolding is needed",
        "Repair, re-cover or a brand-new roof",
        "What turns up once the old covering is off",
        "The materials you choose",
      ],
    },
    steps: [
      { title: "Tell me what’s happening", text: "A leak, a few slipped tiles or a new roof. Photos from the ground help." },
      { title: "A look and a written quote", text: "I’ll come out, check it over and show you what I find." },
      { title: "Fixed properly", text: "The work done safely and the area left tidy." },
    ],
    time: {
      intro: "Roof work depends on the weather, so I’ll keep you up to date as it goes.",
      typical: null,
      long: "A repair can be quick. A new roof on an extension is planned in with the rest of the build. Either way, you’ll get the timescale with your quote.",
      living: "Yes. Roof work happens outside, so you can carry on as normal inside.",
      mess: "Old materials taken away and the area left tidy.",
    },
    faqs: [
      { q: "Can you fix a leak?", a: "Yes. I’ll find where it’s coming in and fix it, and tell you if anything else needs attention." },
      { q: "Do you need scaffolding?", a: "Sometimes. It depends on the job and how high it is. If it’s needed, I’ll arrange it and it’ll be in the quote." },
      { q: "Can you do the roof on my extension?", a: "Yes. The roof is part of the extension, built by the same team." },
    ],
  },

  "flooring-and-tiling": {
    title: "Flooring and tiling across the Midlands",
    h1: "Floors and tiling, laid flat and straight",
    description:
      "I’m Connor. Wood, laminate and tiled floors, and wall tiling for kitchens and bathrooms, across the Midlands. Proper preparation underneath.",
    lede: "Floors laid flat and tiles set straight, on a properly prepared base.",
    body: [
      "A good floor is mostly about what you can’t see. A level base, the right underlay, room for expansion and doors trimmed to clear. Skip any of it and you get gaps, bounce and tiles that crack.",
      "I lay floors and tiles on their own or as part of a kitchen, bathroom or full renovation. When I’m doing the doors and skirting as well, everything is planned to finish neatly together.",
    ],
    items: [
      { title: "Wood and engineered floors", text: "On a level base, with neat thresholds." },
      { title: "Laminate and LVT", text: "Hard-wearing floors for busy homes." },
      { title: "Floor tiling", text: "Kitchens, bathrooms and halls, level and even." },
      { title: "Wall tiling", text: "Splashbacks, bathrooms and showers." },
      { title: "Floor preparation", text: "Levelling and new boards, so it stays flat." },
      { title: "Doors trimmed and skirting refitted", text: "So it all finishes neatly." },
    ],
    price: {
      intro: "Every job is different. What moves the price most:",
      factors: [
        "The size of the area and how many rooms",
        "The type of floor or tile you choose",
        "How much preparation the base needs",
        "Lifting and removing the old floor",
        "Doors that need trimming and skirting that needs refitting",
      ],
    },
    steps: [
      { title: "Show me the rooms", text: "Photos and rough sizes, and the floor or tiles you like." },
      { title: "A clear, written quote", text: "Including any preparation the base needs, so there are no surprises." },
      { title: "Laid and finished", text: "Floors down, trims fitted and the room put back." },
    ],
    time: {
      intro: "New floors mean moving furniture, so it’s worth planning which rooms go first.",
      typical: null,
      long: "It depends on the rooms and how much preparation the base needs. You’ll get the timescale with your quote, and we’ll plan the order of rooms together.",
      living: "Yes. We’ll work room by room where we can, so you can keep using the rest of the house.",
      mess: "The old floor lifted and taken away, and the room put back when it’s done.",
    },
    faqs: [
      { q: "Can you lay flooring I’ve already bought?", a: "Yes. Just let me know what it is so I can check the base suits it." },
      { q: "Do you lift the old floor?", a: "Yes, and take it away." },
      { q: "Do you tile walls too?", a: "Yes. Splashbacks, bathrooms and showers." },
    ],
  },

  carpentry: {
    title: "Carpenter across the Midlands",
    h1: "Carpentry jobs, big or small",
    description:
      "I’m Connor, a carpenter working across the Midlands. Doors eased and hung, fitted wardrobes, kitchen fitting and garden canopies. Free written quotes.",
    lede: "I started as a carpenter, and small jobs are still welcome. One sticking door included.",
    body: [
      "Most small carpentry jobs are in lived-in homes. A door that’s started catching since the new flooring went down. A cupboard door that’s never shut properly. A gap that’s been bugging you for months. Small things, but they’re what make a place feel unfinished.",
      "I give them the same care as a big job. If you’re not sure whether something is worth fixing or replacing, send me a photo and ask. You’ll get a straight answer.",
    ],
    items: [
      { title: "Doors eased and rehung", text: "Sticking doors sorted, shut with a click." },
      { title: "Fitted wardrobes", text: "Made for the room, alcoves and slopes included." },
      { title: "Kitchen fitting", text: "Your kitchen, fitted level and square." },
      { title: "Boxing-in and trims", text: "Pipes hidden and gaps finished off neatly." },
      { title: "Garden canopies and outdoor timber", text: "Oak canopies, pergolas and slatted screens." },
      { title: "Small repairs", text: "The odd jobs on your list." },
    ],
    price: {
      intro: "Every job is different. What moves the price most:",
      factors: [
        "How long the job will take",
        "Whether you’re buying the materials or I am",
        "Old work that has to come out first",
        "Left ready for paint, or fully finished",
      ],
    },
    steps: [
      { title: "Send me a few photos", text: "The door, the cupboard or the space, plus a line about what you’d like done." },
      { title: "Get a written quote", text: "I can price most small jobs from photos." },
      { title: "Fixed and tidied", text: "Done on the day we agree, with the sawdust gone before I leave." },
    ],
    time: {
      intro: "Small jobs fit in around you.",
      typical: null,
      long: "Most small jobs are quick. You’ll know how long it’ll take when you get the quote.",
      living: "Yes. Carpentry goes on around you, so you can get on with your day.",
      mess: "Dust sheets down, and the sawdust gone before I leave.",
    },
    faqs: [
      { q: "Is one small job worth getting you out for?", a: "Yes. Small jobs are a normal part of my week, and I can usually price them from a photo." },
      { q: "Can you fit a kitchen I’ve bought?", a: "Yes. Or I can take care of the whole kitchen renovation if you’d rather." },
      { q: "Do you fit handles and locks too?", a: "Yes, as part of a door job or on its own." },
    ],
  },

  joinery: {
    title: "Joiner across the Midlands",
    h1: "Joinery, made to fit",
    description:
      "I’m Connor, a joiner across the Midlands. Made-to-measure media walls, alcove units, shelving and under-stairs storage, built for your room, not flat-pack.",
    lede: "Media walls, alcove units and storage, made for the room they’re going in.",
    body: [
      "Shop-bought furniture never quite fits an alcove. There’s a gap down one side, a skirting board in the way, or a wall that leans. What I build is made for the actual space, so it runs right up to the walls and ceiling and looks like it’s always been there.",
      "Most people start with a picture they’ve saved and a rough idea of what they need to store. That’s plenty. I’ll measure up, suggest what will work in your room, and spell out exactly what I’ll build in the quote.",
    ],
    items: [
      { title: "Media walls", text: "Wires hidden, with lighting and storage." },
      { title: "Alcove units", text: "Cupboards below, shelves above, either side of the chimney." },
      { title: "Shelving", text: "Floating shelves and bookcases that won’t sag." },
      { title: "Under-stairs storage", text: "Drawers and cupboards for wasted space." },
      { title: "Window seats", text: "Seating with storage, sized to the window." },
      { title: "Painted on site", text: "Painted in your colour, ready to use." },
    ],
    price: {
      intro: "Every job is different. What moves the price most:",
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
    time: {
      intro: "Joinery is measured and planned first, so you know exactly what’s happening and when.",
      typical: null,
      long: "It depends on the size and the finish. A media wall or a pair of alcove units takes longer than a few shelves. You’ll know how long before I start.",
      living: "Yes. Only the room I’m working in is affected.",
      mess: "Dust sheets down and the room left tidy.",
    },
    faqs: [
      { q: "Can you build something I’ve seen on Instagram or Pinterest?", a: "Send it over with photos of your room. I’ll tell you what will work in your space and what I’d change." },
      { q: "Do you paint it as well?", a: "Yes. I can fill, sand and paint it on site in your colour." },
      { q: "Can you hide the TV wires?", a: "Yes. I plan the cable routes in from the start, so nothing’s left hanging." },
      { q: "What’s it made from?", a: "Usually MDF for painted pieces, because it stays flat and takes paint well. Solid timber where that makes more sense. The quote says which." },
    ],
  },

  decorating: {
    title: "Painter and decorator across the Midlands",
    h1: "Decorating, right to the last coat",
    description:
      "I’m Connor, a painter and decorator across the Midlands. Walls, ceilings, woodwork, timber windows and outside paintwork, with proper prep under each coat.",
    lede: "Clean lines, proper prep and paint that lasts, inside and out.",
    body: [
      "A paint job lives or dies on the preparation. Filling, sanding, sealing new plaster and masking off take longer than the painting, and they’re the reason a finish still looks sharp a year later, not just on the day.",
      "I decorate as a job on its own and as the last stage of every renovation. That second part matters. I know where the joints are in the skirting I’ve fitted, so they get filled properly before the gloss goes on.",
      "I take on outside work too, including old timber windows. A bay window I did recently started with rotten sills and peeling paint, and finished good for years yet.",
    ],
    items: [
      { title: "Walls and ceilings", text: "Filled, sanded and painted with crisp lines." },
      { title: "Woodwork", text: "Doors, skirting and frames in satin or gloss." },
      { title: "Timber and bay windows", text: "Repaired, primed and repainted." },
      { title: "Outside paintwork", text: "Sills, fascias and doors protected from the weather." },
      { title: "After building work", text: "New plaster and joinery finished properly." },
      { title: "Whole-house decorating", text: "Every room, to the same standard." },
    ],
    price: {
      intro: "Every job is different. What moves the price most:",
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
    time: {
      intro: "Decorating is mostly preparation, and that’s the part that makes it last.",
      typical: null,
      long: "It depends on the rooms and how much prep the walls and woodwork need. You’ll know how long when you get the quote.",
      living: "Yes. I’ll work room by room where I can, so you can use the rest of the house.",
      mess: "Furniture covered and floors protected, and the room left tidy.",
    },
    faqs: [
      { q: "Do you do outside painting?", a: "Yes. Windows, sills, doors and fascias, including repairing rotten timber before it’s painted." },
      { q: "Who buys the paint?", a: "Either. I can supply it, or use paint you’ve already picked. The quote spells out which." },
      { q: "Can you decorate once the building work’s done?", a: "Yes, and it’s often easier that way. Same team, no waiting for another trade." },
      { q: "Do I need to move the furniture?", a: "Small things and anything fragile, ideally. I’ll move and cover the rest." },
    ],
  },
};
