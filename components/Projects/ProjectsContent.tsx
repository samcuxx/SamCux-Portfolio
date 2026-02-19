"use client";

import React from "react";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsView } from "./ProjectsView";
import { ProjectsFilterProvider } from "@/contexts/ProjectsFilterContext";
import { ProjectsIntro } from "./ProjectsIntro";

type ProjectsContentProps = {
  initialProjects: any[];
};

export function ProjectsContent({ initialProjects }: ProjectsContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-20">
      <ProjectsHeader />
      <ProjectsIntro />
      <ProjectsFilterProvider initialProjects={initialProjects}>
        <ProjectsFilter />
        <ProjectsView />
      </ProjectsFilterProvider>
    </div>
  );
}
