import type { Media } from "./media";
import type { SectionSlug } from "./site";

// PLACEHOLDER projects. Replace names, write-ups and photos with Connor's real jobs.
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

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}
