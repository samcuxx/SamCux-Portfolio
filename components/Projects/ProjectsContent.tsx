import React from "react";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsIntro } from "./ProjectsIntro";
import { FeaturedProjects } from "./FeaturedProjects";
import { ProjectsGrid } from "./ProjectsGrid";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsFilterProvider } from "@/contexts/ProjectsFilterContext";

export function ProjectsContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <ProjectsHeader />
      <div className="space-y-16">
        <ProjectsIntro />
        <FeaturedProjects />
        <ProjectsFilterProvider>
          <div className="space-y-8">
            <ProjectsFilter />
            <ProjectsGrid />
          </div>
        </ProjectsFilterProvider>
      </div>
    </div>
  );
} 