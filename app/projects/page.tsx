import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ProjectGrid from "@/components/ProjectGrid";
import Closing from "@/components/Closing";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Recent work",
  description: "Recent carpentry, building, joinery and decorating jobs by CM MainWorks in Lichfield and nearby.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return (
    <>
      <PageHead title={<>Recent <span className="hl">work</span></>} lede="A few of Connor’s recent jobs. Filter by service to see the kind of work you’re planning." />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ProjectGrid projects={projects} />
        </div>
      </section>
      <Closing />
    </>
  );
}
