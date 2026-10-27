import type { Media } from "./media";
import type { SectionSlug } from "./site";

// Connor's jobs. One entry per job feeds its own page (/projects/<slug>), the projects
// page, its service page ("Recent … work"), its town page ("Recent work in …", matched
// by `place`), the sitemap (with its photos) and, with `homepage: true`, the homepage
// before and afters. Photos go in public/images/projects/<slug>/.
// Entries with `placeholder: true` stay hidden everywhere until replaced.
export type Project = {
  slug: string;
  name: string;
  section: SectionSlug;
  place: string;
  summary: string;
  /** Longer write-up for the project page */
  body?: string[];
  done?: string[];
  review?: { quote: string; name: string };
  before: Media;
  after: Media;
  gallery: Media[];
  placeholder: boolean;
  /** Put this job's before and after on the homepage (up to three jobs; both photos needed) */
  homepage?: boolean;
};

const ph = (label: string): Media => ({ src: null, alt: label, label });

export const projects: Project[] = [
  {
    // Real job, from Connor's Facebook post (1 Aug). Before photo and town still to come.
    slug: "bay-window-restoration",
    name: "Bay window restoration",
    section: "carpentry",
    place: "",
    summary: "A 140-year-old bay window, repaired rather than replaced, after years of weather and neglect.",
    body: [
      "This bay window had been on the house for around 140 years, and the weather had finally got the better of it. The sills and the bottom of the frames had started to rot, the paint had given up, and water was getting in.",
      "The easy answer would have been to rip it out. Instead I cut out the rotten timber, rebuilt the sills, and filled, sanded, primed and painted the lot. It still looks like it belongs on the house, and it’s protected for years yet.",
    ],
    done: ["Rotten timber cut out and repaired", "Sills rebuilt", "Frames filled and sanded", "Primed and painted inside and out"],
    review: {
      quote: "My bay window has been saved, from the perils of 140 years of time, weather and neglect, by an experienced tradesman. Someone who turns up to quote and returns to actually do the job. Thanks so much Connor. Would recommend.",
      name: "Alice Walsh",
    },
    before: ph("Before photo"),
    after: { src: "/images/bay-window-after.jpg", alt: "Restored bay window, freshly painted white, with the sill repaired", label: "After" },
    gallery: [
      { src: "/images/bay-window-after.jpg", alt: "Restored bay window, freshly painted white, with the sill repaired", label: "Bay window" },
      ph("Project photo"),
    ],
    placeholder: false,
  },
  {
    slug: "project-two",
    name: "Project name",
    section: "joinery",
    place: "Town",
    summary: "A short write-up of the job goes here: what the customer wanted, what I did and how it turned out.",
    before: ph("Before"),
    after: ph("After"),
    gallery: [ph("Project photo"), ph("Project photo")],
    placeholder: true,
  },
  {
    slug: "project-three",
    name: "Project name",
    section: "extensions",
    place: "Town",
    summary: "A short write-up of the job goes here: what the customer wanted, what I did and how it turned out.",
    before: ph("Before"),
    after: ph("After"),
    gallery: [ph("Project photo"), ph("Project photo")],
    placeholder: true,
  },
  {
    slug: "project-four",
    name: "Project name",
    section: "decorating",
    place: "Town",
    summary: "A short write-up of the job goes here: what the customer wanted, what I did and how it turned out.",
    before: ph("Before"),
    after: ph("After"),
    gallery: [ph("Project photo"), ph("Project photo")],
    placeholder: true,
  },
];

/** Real projects only. Placeholders stay off the projects page, the sitemap and search. */
export const publishedProjects = projects.filter((p) => !p.placeholder);

/** Every real photo of a job, after first, without repeats. */
export function projectPhotos(p: Project): (Media & { src: string })[] {
  const seen = new Set<string>();
  return [p.after, p.before, ...p.gallery].filter((m): m is Media & { src: string } => {
    if (!m.src || seen.has(m.src)) return false;
    seen.add(m.src);
    return true;
  });
}

/** Real jobs in a town, or in one of the villages its page covers. Matches `place` by name. */
export function projectsIn(town: string, alsoCovers: string[] = []) {
  const names = [town, ...alsoCovers].map((n) => n.toLowerCase());
  return publishedProjects.filter((p) => p.place && names.includes(p.place.toLowerCase()));
}

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}

/*
  Homepage before-and-after sliders. Keep it to three. Jobs without a before photo
  belong on the projects page as single photos instead. Until Connor's photos come in,
  empty slots show as clearly labelled "Photo to come" tiles.
  TODO: swap in real pairs from Connor's Facebook.
*/
export type BeforeAfterPair = { name: string; section: SectionSlug; before: Media; after: Media; href?: string };

// Real pairs come from jobs marked `homepage: true` with both photos. Until there are
// three, the slots below fill the gaps (the bay window is waiting on its before photo).
const realPairs: BeforeAfterPair[] = publishedProjects
  .filter((p) => p.homepage && p.before.src && p.after.src)
  .map((p) => ({ name: p.name, section: p.section, before: p.before, after: p.after, href: `/projects/${p.slug}` }));

const stopgaps: BeforeAfterPair[] = ([
  { name: "Bay window restoration", section: "carpentry", before: projects[0].before, after: projects[0].after, href: "/projects/bay-window-restoration" },
  { name: "Kitchen renovation", section: "kitchens", before: ph("Before photo"), after: ph("After photo") },
  { name: "Bathroom renovation", section: "bathrooms", before: ph("Before photo"), after: ph("After photo") },
] satisfies BeforeAfterPair[]).filter((g) => !realPairs.some((r) => r.name === g.name || r.section === g.section));

export const beforeAfters = [...realPairs, ...stopgaps].slice(0, 3);

