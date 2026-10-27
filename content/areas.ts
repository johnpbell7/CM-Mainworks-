import type { SectionSlug } from "./site";

/*
  Town pages for local search, written in Connor’s voice. Coverage confirmed by
  Connor (Oct 2026): Lichfield and the wider Midlands, including Birmingham, Solihull,
  Leicester and Redditch. Each has its own copy so
  they aren’t duplicates. Town descriptions are general, publicly known geography.
  Nothing here states prices, travel charges, past jobs or reviews in a town.
  Every town leads with renovation work (kitchens, bathrooms, extensions); smaller
  jobs are mentioned on the page but not featured.
  The villages around Lichfield (Fradley, Shenstone, Whittington and others) are
  covered on the Lichfield page; their old addresses redirect there (next.config.ts).
  DRAFT: the list of areas is waiting on Connor to confirm.
*/

export type Area = {
  slug: string;
  name: string;
  /** "local" = Lichfield and the town next to it; "midlands" = the wider area */
  group: "local" | "midlands";
  /** e.g. "about four miles west of Lichfield" */
  where: string;
  title: string;
  description: string;
  intro: string;
  /** "Homes in <town>": what the houses are like and the renovation work they suit */
  local: string[];
  /** Villages and places covered from this page, shown in its schema */
  alsoCovers?: string[];
  /** Which services to lead with, and why, for this town */
  focus: { service: SectionSlug; text: string }[];
  faqs: { q: string; a: string }[];
};

export const areas: Area[] = [
  {
    slug: "lichfield",
    group: "local",
    name: "Lichfield",
    where: "Home ground",
    title: "Builder and home renovations in Lichfield",
    description:
      "I’m Connor. Full home renovations, extensions, kitchens and bathrooms in Lichfield and the villages around it, run by one team. Free written quotes.",
    intro:
      "CM MainWorks is based in Lichfield, so this is home ground. I work right across the city, from the older streets around the cathedral and Beacon Park to Boley Park, Darwin Park and Netherstowe, and in the villages around it.",
    local: [
      "Lichfield has a real mix of homes. The older houses in the middle of the city have character worth keeping, but often a kitchen and bathroom that haven’t kept up. The estates from the 60s onwards tend to be solid houses with a small, closed-off kitchen and a downstairs that could work much harder.",
      "Either way, they suit a whole-house renovation: a knock-through for a kitchen-diner, a new bathroom, new doors and skirting throughout, then floors and decorating to finish. I run it with one team, in clear phases, and we sit down regularly to check it’s on track.",
      "I cover the villages too: Whittington, Hopwas and Huddlesford to the east, Fradley, Alrewas and Streethay to the north-east, and Shenstone, Stonnall and Little Hay to the south. Older cottages there need a lighter touch. The newer homes around Fradley are more about making a plain new build feel like yours.",
    ],
    alsoCovers: ["Whittington", "Hopwas", "Huddlesford", "Fisherwick", "Fradley", "Alrewas", "Streethay", "Shenstone", "Stonnall", "Little Hay"],
    focus: [
      { service: "kitchens", text: "Kitchen renovations, from a refit in the same layout to a knock-through for a kitchen-diner." },
      { service: "extensions", text: "Rear and side extensions, built and finished inside by one team." },
      { service: "bathrooms", text: "Bathrooms and en-suites, stripped out and finished as one job." },
      { service: "staircases", text: "Stairs, doors and skirting, including in older houses where nothing is quite square." },
    ],
    faqs: [
      { q: "Are you actually based in Lichfield?", a: "Yes. CM MainWorks is a Lichfield business, so most jobs in the city are a short drive away." },
      { q: "Do you cover the villages around Lichfield?", a: "Yes. Whittington, Hopwas, Fradley, Alrewas, Streethay, Shenstone, Stonnall and Little Hay are all a few miles away, so they’re home ground too." },
      { q: "Do you work on older houses in the city centre?", a: "Yes. Old doors, windows and staircases are often worth repairing rather than replacing, and I’ll tell you honestly which makes more sense." },
      { q: "My house is in a conservation area. Can you still renovate it?", a: "Usually, yes. Inside work is rarely affected unless the house is listed, but some outside changes need permission first. It’s worth asking Lichfield District Council early, and I’ll work to whatever they agree." },
    ],
  },
  {
    slug: "burntwood",
    group: "local",
    name: "Burntwood",
    where: "About four miles west of Lichfield",
    title: "Builder and home renovations in Burntwood",
    description:
      "Full renovations, extensions, kitchens and bathrooms in Burntwood, Chase Terrace and Chasetown. I’m Connor, based in nearby Lichfield. Free written quotes.",
    intro:
      "Burntwood is about four miles west of Lichfield, a straight run along the A5190, so it’s well within my patch. I cover the whole town, including Chase Terrace, Chasetown, Boney Hay and the roads out towards Chasewater.",
    local: [
      "A lot of Burntwood went up between the 1960s and the 80s. Those houses are solid, but many are tired inside: a small kitchen cut off from the dining room, a dated bathroom, and the original doors and skirting all the way through.",
      "They’re ideal for renovating in phases. Knock through for a kitchen-diner, add a single-storey extension at the back if you need the room, refit the bathroom, then new doors, floors and decorating to finish. One team does the lot, and you know the cost of each phase before it starts.",
    ],
    focus: [
      { service: "extensions", text: "Single-storey rear extensions for a proper kitchen-diner." },
      { service: "kitchens", text: "Knocking through and refitting the kitchen in a 60s or 70s layout." },
      { service: "bathrooms", text: "Dated bathrooms stripped out and done properly." },
      { service: "staircases", text: "New doors, skirting and architrave right through the house." },
    ],
    faqs: [
      { q: "Do you cover Chase Terrace and Chasetown?", a: "Yes, along with the rest of Burntwood and Boney Hay." },
      { q: "Is Burntwood too far for a small job?", a: "No. It’s a few miles from Lichfield, so small jobs are fine." },
      { q: "Can you do the work in stages?", a: "Yes. Every full renovation I take on is done in phases. Each one is agreed and priced before it starts and invoiced when it’s done, so you always know where you are." },
    ],
  },
  {
    slug: "tamworth",
    group: "midlands",
    name: "Tamworth",
    where: "About seven miles south-east of Lichfield",
    title: "Builder and home renovations in Tamworth",
    description:
      "Full renovations, extensions, kitchens and bathrooms in Tamworth, Wilnecote, Amington and Fazeley. I’m Connor, based in Lichfield. Free written quotes.",
    intro:
      "Tamworth is about seven miles south-east of Lichfield along the A51, and I cover the whole town. That takes in Wilnecote, Amington, Glascote, Belgrave, Fazeley and the estates in between.",
    local: [
      "There’s a bit of everything in Tamworth: older terraces near the castle and the town centre, and big estates built from the 60s onwards as the town grew, in places like Glascote, Belgrave and Amington.",
      "Plenty of those estate houses are now ready for a proper update: a new kitchen, a new bathroom, floors throughout, and more room downstairs. Doing it as one renovation, in phases, means no gaps waiting for the next trade and one person to deal with from start to finish.",
    ],
    focus: [
      { service: "kitchens", text: "Kitchen refits, and knock-throughs for a kitchen-diner." },
      { service: "extensions", text: "Extensions for families who’ve run out of room." },
      { service: "bathrooms", text: "Bathrooms and shower rooms, start to finish." },
      { service: "flooring-and-tiling", text: "Floors and tiling right through the house, on a level base." },
    ],
    faqs: [
      { q: "Do you cover all of Tamworth?", a: "Yes, including Wilnecote, Amington, Glascote, Belgrave and Fazeley." },
      { q: "Can you price a Tamworth job from photos?", a: "Smaller jobs, usually. For extensions and building work I’ll come and see it first." },
      { q: "We’ve bought a house that needs everything doing. Where do we start?", a: "With a visit. We’ll walk round together and agree what matters most, then I’ll split the work into phases, so you know the order and the cost of each part before it starts." },
    ],
  },
  {
    slug: "sutton-coldfield",
    group: "midlands",
    name: "Sutton Coldfield",
    where: "About eight miles south of Lichfield",
    title: "Builder and home renovations in Sutton Coldfield",
    description:
      "Full renovations, extensions, kitchens and bathrooms in Sutton Coldfield, Four Oaks and Mere Green. I’m Connor, based in Lichfield. Free written quotes.",
    intro:
      "Sutton Coldfield is about eight miles south of Lichfield, straight down the A5127. I cover the town, including Four Oaks, Mere Green and Little Aston.",
    local: [
      "Sutton has plenty of Victorian, Edwardian and 1930s houses, and the original features are often the best thing about them. Panelled doors, turned spindles, bay windows and deep alcoves are worth keeping and working around.",
      "The kitchens and bathrooms are often a different story: small, tucked at the back and cut off from the garden. A rear extension or a knock-through gives you a proper kitchen-diner, while the period features in the rest of the house are repaired rather than ripped out, all as one job.",
    ],
    focus: [
      { service: "extensions", text: "Kitchen extensions and knock-throughs at the back of period and 1930s homes." },
      { service: "kitchens", text: "New kitchens that suit the age of the house." },
      { service: "bathrooms", text: "Bathrooms and en-suites, including awkward period rooms." },
      { service: "staircases", text: "Staircase repairs, spindles and handrails, and panelled doors." },
    ],
    faqs: [
      { q: "Do you cover Four Oaks and Mere Green?", a: "Yes, along with Little Aston and the rest of Sutton Coldfield." },
      { q: "Can you repair period features rather than replace them?", a: "Where it’s possible, yes. I’ll tell you honestly if something is past saving." },
      { q: "Can you build a kitchen extension on a 1930s semi?", a: "Yes. A single-storey extension across the back is one of the most common ways to get a kitchen-diner in a 1930s semi. I’ll come and look, then send a written quote split into phases." },
    ],
  },
  {
    slug: "walsall",
    name: "Walsall",
    group: "midlands",
    where: "About nine miles south-west of Lichfield",
    title: "Builder and home renovations in Walsall",
    description:
      "Full renovations, extensions, kitchens and bathrooms in Walsall, Aldridge and Pelsall. I’m Connor, based in Lichfield. Insured, free written quotes.",
    intro:
      "Walsall is about nine miles south-west of Lichfield, and I cover the town and the areas around it, including Aldridge, Pelsall, Bloxwich, Rushall and Walsall Wood.",
    local: [
      "Walsall has a real mix: Victorian terraces close to the town centre, interwar semis, and big post-war estates further out towards Bloxwich and Pelsall.",
      "Whatever the age, the wish list is often the same: opening up the back of the house, a new kitchen and bathroom, and new doors and floors throughout. I plan it all as one renovation, run it with one team and invoice it phase by phase, so you always know where you are.",
    ],
    focus: [
      { service: "kitchens", text: "Kitchen refits, and knocking through to open up the back." },
      { service: "extensions", text: "Rear extensions for more room downstairs." },
      { service: "bathrooms", text: "Bathrooms stripped out and finished as one job." },
      { service: "flooring-and-tiling", text: "Floors and tiling throughout, laid flat and straight." },
    ],
    faqs: [
      { q: "Do you cover Aldridge and Pelsall?", a: "Yes, along with Bloxwich, Rushall, Walsall Wood and the rest of Walsall." },
      { q: "Can you price a Walsall job from photos?", a: "Smaller jobs, usually. For building work I’ll come and see it first." },
      { q: "Do you work on Victorian terraces near the town centre?", a: "Yes. Narrow rooms, uneven walls and old floors are normal in a terrace. I fit everything to the house you’ve actually got, and repair the original features where they’re worth saving." },
    ],
  },
  {
    slug: "cannock",
    name: "Cannock",
    group: "midlands",
    where: "About eight miles west of Lichfield",
    title: "Builder and home renovations in Cannock",
    description:
      "Full renovations, extensions, kitchens and bathrooms in Cannock, Hednesford and Heath Hayes. I’m Connor, based in Lichfield. Insured, free written quotes.",
    intro:
      "Cannock is about eight miles west of Lichfield, on the edge of Cannock Chase. I cover the town along with Hednesford, Heath Hayes, Norton Canes and Huntington.",
    local: [
      "A lot of Cannock’s housing is post-war and newer estate homes, alongside older terraces in Hednesford and Chadsmoor from the mining days. Plenty of them are now ready for a new kitchen, a new bathroom or more room downstairs.",
      "Many homes here have room at the back for a single-storey extension, which is often the simplest way to get a big kitchen-diner. I build it, roof it and finish it inside with one team, so you’re handed a room, not a shell.",
    ],
    focus: [
      { service: "extensions", text: "Single-storey extensions, built and finished inside." },
      { service: "kitchens", text: "New kitchens and knock-throughs." },
      { service: "bathrooms", text: "Bathrooms and shower rooms, start to finish." },
      { service: "staircases", text: "Internal doors, skirting and staircases throughout." },
    ],
    faqs: [
      { q: "Do you cover Hednesford and Heath Hayes?", a: "Yes, along with Norton Canes, Huntington and the rest of Cannock." },
      { q: "Can you do the extension and the kitchen together?", a: "Yes. That’s the best reason to use one team: the extension and the kitchen inside it are planned together, so nothing’s left waiting on anyone else." },
      { q: "Do you build garden canopies?", a: "Yes, including oak-framed canopies and pergolas." },
    ],
  },
  {
    slug: "burton-upon-trent",
    name: "Burton upon Trent",
    group: "midlands",
    where: "About eleven miles north-east of Lichfield",
    title: "Builder and home renovations in Burton upon Trent",
    description:
      "Full renovations, extensions, kitchens and bathrooms in Burton upon Trent, Stapenhill and Winshill. I’m Connor, based in Lichfield. Free written quotes.",
    intro:
      "Burton upon Trent is about eleven miles north-east of Lichfield, straight up the A38. I cover the town, including Stapenhill, Winshill, Horninglow and Branston.",
    local: [
      "Burton’s older streets are full of Victorian terraces from its brewing days. Newer areas like Branston are mostly modern estates.",
      "A terrace usually has the same wish list: a kitchen that opens onto the dining room, a bathroom that isn’t squeezed in at the back, and the original doors and stairs looked after. On the newer estates it’s more often a kitchen you actually chose, an en-suite, and doors that don’t feel hollow.",
    ],
    focus: [
      { service: "kitchens", text: "Knocking through and refitting the kitchen in a Victorian terrace." },
      { service: "bathrooms", text: "Bathrooms and en-suites, start to finish." },
      { service: "extensions", text: "Rear extensions for more room downstairs." },
      { service: "staircases", text: "Doors, skirting and staircase repairs in older terraces." },
    ],
    faqs: [
      { q: "Do you cover Branston and Stapenhill?", a: "Yes, along with Winshill, Horninglow and the rest of Burton." },
      { q: "Do you work on Victorian terraces?", a: "Yes. Older doors, stairs and windows are often worth repairing, and I’ll tell you honestly when they’re not." },
      { q: "Can you make a new build feel like ours?", a: "Yes. A kitchen you chose, an en-suite, better internal doors or fitted storage all make a big difference. We’ll start with whatever bothers you most." },
    ],
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    group: "midlands",
    where: "About fifteen miles south-west of Lichfield",
    title: "Builder and home renovations in Birmingham",
    description:
      "Full renovations, extensions, kitchens and bathrooms across Birmingham, from Erdington to Moseley and Harborne. I’m Connor. Insured, free written quotes.",
    intro:
      "Birmingham is about fifteen miles south-west of Lichfield, down the A38. I work across the city, from Erdington, Kingstanding and Great Barr in the north to Moseley, Kings Heath and Harborne.",
    local: [
      "Birmingham has every kind of house going: Victorian and Edwardian terraces in places like Moseley and Kings Heath, 1930s semis right across the north of the city, and newer town houses and flats.",
      "The 1930s semis in Erdington, Kingstanding and Great Barr are ideal for a renovation. Most have room at the back for an extension and a layout that opens up well into a kitchen-diner. Add a new bathroom, bring the rest of the house up to date in phases, and it’s a different home.",
    ],
    focus: [
      { service: "extensions", text: "Rear extensions and knock-throughs on 1930s semis." },
      { service: "kitchens", text: "Kitchen renovations, from a refit to a full kitchen-diner." },
      { service: "bathrooms", text: "Bathrooms and en-suites, start to finish." },
      { service: "staircases", text: "Staircases, panelled doors and skirting in period homes." },
    ],
    faqs: [
      { q: "Which parts of Birmingham do you cover?", a: "All of it, including Erdington, Kingstanding, Great Barr, Moseley, Kings Heath and Harborne. If you’re not sure, send me your postcode." },
      { q: "Do you take on big jobs in Birmingham?", a: "Yes, that’s my main work. I manage extensions and full renovations with one team, in clear phases, and I’m the one you deal with throughout." },
      { q: "Do you work on Victorian and Edwardian houses?", a: "Yes. Original doors, stairs and bay windows are often worth repairing, and I’ll tell you honestly when they’re not." },
    ],
  },
  {
    slug: "solihull",
    name: "Solihull",
    group: "midlands",
    where: "About nineteen miles south of Lichfield",
    title: "Builder and home renovations in Solihull",
    description:
      "Full renovations, extensions, kitchens and bathrooms in Solihull, Shirley, Knowle, Dorridge and Olton. I’m Connor. Insured, free written quotes.",
    intro:
      "Solihull is about nineteen miles south of Lichfield, and I cover the town and the villages around it, including Shirley, Olton, Knowle, Dorridge and Hockley Heath.",
    local: [
      "Solihull is mostly interwar semis and bigger detached houses, with Knowle and Dorridge leaning towards the larger end.",
      "Houses like these suit a kitchen extension across the back, a new bathroom or en-suite, and floors that run through without a step. I plan it as one renovation, so the extension, the kitchen and the finishing all come together rather than one trade at a time.",
    ],
    focus: [
      { service: "extensions", text: "Kitchen extensions and opening up the back of the house." },
      { service: "kitchens", text: "New kitchens, fitted level and square, with the room finished around them." },
      { service: "bathrooms", text: "Bathrooms and en-suites to a high finish." },
      { service: "flooring-and-tiling", text: "Floors and tiling that run right through." },
    ],
    faqs: [
      { q: "Do you cover Knowle and Dorridge?", a: "Yes, along with Shirley, Olton, Hockley Heath and the rest of Solihull." },
      { q: "Will you come out to quote in Solihull?", a: "For extensions and bigger jobs, yes. Smaller jobs I can often price from photos." },
      { q: "Do you take on bigger houses?", a: "Yes. A bigger house just means a bigger plan. I split the work into clear phases, and we sit down regularly to check timescales and targets." },
    ],
  },
  {
    slug: "redditch",
    name: "Redditch",
    group: "midlands",
    where: "About twenty-five miles south of Lichfield",
    title: "Builder and home renovations in Redditch",
    description:
      "Full renovations, extensions, kitchens and bathrooms in Redditch, Headless Cross, Webheath and Matchborough. I’m Connor. Insured, free written quotes.",
    intro:
      "Redditch is about twenty-five miles south of Lichfield, on the Worcestershire side of Birmingham. I cover the whole town, including Headless Cross, Webheath, Matchborough, Winyates and Church Hill.",
    local: [
      "Much of Redditch was built as a new town in the 60s, 70s and 80s, so a lot of houses in places like Matchborough, Winyates and Church Hill share the same layouts.",
      "Those layouts tend to want the same things: knocking through downstairs, a new kitchen and bathroom, and the original doors and skirting replaced. Because the houses are so alike, it’s easy to see what’s possible and to plan the whole job in phases from the first visit.",
    ],
    focus: [
      { service: "kitchens", text: "Knock-throughs and new kitchens for new-town layouts." },
      { service: "bathrooms", text: "Bathrooms stripped out and finished as one job." },
      { service: "extensions", text: "Extensions for more living space." },
      { service: "staircases", text: "Replacing original doors, skirting and architrave." },
    ],
    faqs: [
      { q: "Is Redditch too far for you?", a: "No. I cover Redditch and the areas around it, and bigger jobs are well worth the drive." },
      { q: "Our house still has its original 70s layout. Can it be opened up?", a: "Often, yes. The wall between the kitchen and dining room is the usual one. Whether it holds anything up changes the job, so I’ll look at it on the first visit and tell you what’s involved." },
      { q: "Can you do a whole house of doors in one go?", a: "Yes. Doing every internal door and the skirting together is quicker, and neater, than doing them bit by bit." },
    ],
  },
  {
    slug: "leicester",
    name: "Leicester",
    group: "midlands",
    where: "About thirty miles east of Lichfield",
    title: "Builder and home renovations in Leicester",
    description:
      "Full renovations, extensions, kitchens and bathrooms in Leicester, Oadby, Wigston and Birstall. I’m Connor. Insured, managed by one team. Free quotes.",
    intro:
      "Leicester is about thirty miles east of Lichfield, along the A5 and M69. I cover the city and the areas around it, including Oadby, Wigston, Birstall, Glenfield and Braunstone.",
    local: [
      "Leicester has streets of Victorian terraces in places like Clarendon Park and Westcotes, and plenty of interwar and post-war semis in the suburbs.",
      "The terraces tend to want their kitchens opened up and their original features looked after. The semis are more often ready for an extension and a full update. Either way, it’s one renovation, run by one team, in phases you agree up front.",
    ],
    focus: [
      { service: "extensions", text: "Extensions and full renovations, managed by one team in clear phases." },
      { service: "kitchens", text: "Kitchens opened up and refitted, in terraces and semis." },
      { service: "bathrooms", text: "Bathrooms stripped out and finished as one job." },
      { service: "staircases", text: "Staircases, doors and skirting, repaired or replaced." },
    ],
    faqs: [
      { q: "Do you really cover Leicester?", a: "Yes. I cover Leicester and the areas around it, including Oadby, Wigston and Birstall." },
      { q: "Who will be working on my job?", a: "My team: labourers I trust, plus any specialist trades the job needs, organised by me. I run the job, and I’m the one you deal with." },
      { q: "Is Leicester too far for a full renovation?", a: "No. Full renovations are my main work and well worth the drive. We agree the timescales up front and check them together as we go." },
    ],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}

export const localAreas = areas.filter((a) => a.group === "local");
export const midlandsAreas = areas.filter((a) => a.group === "midlands");
