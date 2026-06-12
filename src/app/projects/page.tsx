import { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectsPage } from "@/components/sections/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | House of Software",
  description: "Explore our portfolio of enterprise software, web applications, CRM, ERP, and AI solutions.",
};

export default function Projects() {
  return (
    <PageShell>
      <ProjectsPage />
    </PageShell>
  );
}
