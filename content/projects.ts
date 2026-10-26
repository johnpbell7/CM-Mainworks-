import type { Media } from "./media";
import type { SectionSlug } from "./site";

// PLACEHOLDER projects. Replace names, write-ups and photos with Connor's real jobs.
export type Project = {
  slug: string;
  name: string;
  section: SectionSlug;
  place: string;
  summary: string;
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
    place: "Town to confirm",
    summary: "A 140-year-old bay window brought back to life after years of weather and neglect. The rotten sills and frames were repaired, then everything was filled, primed and painted.",
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
    summary: "A short write-up of the job goes here: what the customer wanted, what Connor did and how it turned out.",
    before: ph("Before"),
    after: ph("After"),
    gallery: [ph("Project photo"), ph("Project photo")],
    placeholder: true,
  },
  {
    slug: "project-three",
    name: "Project name",
    section: "building",
    place: "Town",
    summary: "A short write-up of the job goes here: what the customer wanted, what Connor did and how it turned out.",
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
    summary: "A short write-up of the job goes here: what the customer wanted, what Connor did and how it turned out.",
    before: ph("Before"),
    after: ph("After"),
    gallery: [ph("Project photo"), ph("Project photo")],
    placeholder: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
