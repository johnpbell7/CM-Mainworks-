import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ProjectGrid from "@/components/ProjectGrid";
import Closing from "@/components/Closing";
import { publishedProjects } from "@/content/projects";
import { business } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Recent work",
  description: "Recent carpentry, building, joinery and decorating jobs from CM MainWorks, including a 140-year-old bay window I repaired and repainted.",
  path: "/projects",
});

export default function Projects() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/projects", label: "Recent work" }]}
        title={<>Recent <span className="hl">work</span></>}
        lede="A few of my recent jobs. I’m adding more as I get them photographed."
      />
      <section className="sec" style={{ paddingTop: 0 }} aria-label="Projects">
        <div className="wrap">
          <ProjectGrid projects={publishedProjects} />
          <p className="more-note">
            There’s more of my work on the <a href={business.facebook} target="_blank" rel="noopener">CM MainWorks Facebook page</a>.
          </p>
        </div>
      </section>
      <Closing />
    </>
  );
}
