"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Photo from "./Photo";
import { sections, type SectionSlug } from "@/content/site";
import type { Project } from "@/content/projects";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<SectionSlug | "all">("all");

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("section");
    if (sections.some((x) => x.slug === s)) setFilter(s as SectionSlug);
  }, []);

  const shown = filter === "all" ? projects : projects.filter((p) => p.section === filter);

  const showFilters = projects.length >= 4;

  return (
    <>
      {showFilters && <div className="filters" role="group" aria-label="Filter projects by service">
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All</button>
        {sections.filter((s) => projects.some((p) => p.section === s.slug)).map((s) => (
          <button key={s.slug} type="button" aria-pressed={filter === s.slug} onClick={() => setFilter(s.slug)}
            style={{ "--c": s.color } as React.CSSProperties}>{s.name}</button>
        ))}
      </div>}
      <p className="sr-only" aria-live="polite">{shown.length} {shown.length === 1 ? "project" : "projects"} shown</p>
      <div className="proj-grid">
        {shown.map((p) => {
          const s = sections.find((x) => x.slug === p.section)!;
          return (
            <Link className="proj" key={p.slug} href={`/projects/${p.slug}`}>
              <Photo media={p.after.src ? p.after : p.gallery[0]} sizes="(max-width: 720px) 100vw, 50vw" reveal={false} />
              <span className="proj-tag" style={{ "--c": s.color } as React.CSSProperties}>{s.name}</span>
              <h2>{p.name}</h2>
              <p>{p.summary}</p>
            </Link>
          );
        })}
        {shown.length === 0 && <p style={{ color: "var(--ink-2)" }}>No projects in this section yet.</p>}
      </div>
    </>
  );
}
