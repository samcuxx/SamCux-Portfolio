"use client";

import React from "react";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import MagneticLink from "../ui/MagneticLink";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";
import { ProjectsPagination } from "./ProjectsPagination";

export function ProjectsGrid() {
  const { 
    filteredProjects,
    currentPage,
    totalPages,
    handlePageChange
  } = useProjectsFilter();

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-[#66768f]">
          No projects found. Try adjusting your search or filter.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-[#131C31] rounded-xl overflow-hidden
              border border-gray-100 dark:border-[#222F43] hover:border-[#ffe400] 
              dark:hover:border-[#ffe400] transition-all duration-300 animate-slideInUp
              shadow-sm hover:shadow-md flex flex-col"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={250}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 flex items-end justify-start p-4">
                <div className="flex gap-2">
                  <MagneticLink
                    href={project.liveUrl}
                    className="p-2 bg-[#ffe400] rounded-lg hover:scale-110 transition-transform"
                  >
                    <ExternalLink className="w-4 h-4 text-[#101010]" />
                  </MagneticLink>
                  <MagneticLink
                    href={project.githubUrl}
                    className="p-2 bg-[#ffe400] rounded-lg hover:scale-110 transition-transform"
                  >
                    <Github className="w-4 h-4 text-[#101010]" />
                  </MagneticLink>
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h4 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-2">
                {project.title}
              </h4>
              <p className="text-gray-600 dark:text-[#66768f] mb-4 text-sm line-clamp-2 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[#ffe400] bg-opacity-10 text-[#101010] 
                      dark:text-[#94A9C9] rounded-lg text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-500 dark:text-[#66768f]">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <ProjectsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
} 