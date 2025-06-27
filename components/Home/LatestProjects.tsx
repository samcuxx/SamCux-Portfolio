"use client";

import React, { useState } from "react";
import { ArrowRight, Github, ExternalLink, Loader2 } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getOptimizedImageUrl } from "@/lib/utils";
import { ProjectModal } from "../Projects/ProjectModal";

// Define the Project interface
interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
}

export function LatestProjects() {
  // Fetch latest projects from Convex
  const allProjects = useQuery(api.projects.getAll);
  
  // State for modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle click on project
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Get the latest 2 projects
  const latestProjects = allProjects 
    ? allProjects.slice(0, 2) 
    : [];
    
  // Loading state
  if (!allProjects) {
    return (
      <div className="py-12">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-dynapuff text-3xl font-bold text-[#101010] dark:text-[#94A9C9]">
            Latest Projects
          </h2>
        </div>
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
        </div>
      </div>
    );
  }
  
  // No projects state
  if (latestProjects.length === 0) {
    return null;
  }

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-dynapuff text-3xl font-bold text-[#101010] dark:text-[#94A9C9]">
          Latest Projects
        </h2>
        <MagneticLink
          href="/projects"
          className="inline-flex items-center gap-2 text-[#101010] dark:text-[#94A9C9] 
            hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </MagneticLink>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {latestProjects.map((project, index) => {
          // Get the image URL directly from Convex if it's a storage ID
          const isStorageId = project.imageUrl && !project.imageUrl.includes("://") && !project.imageUrl.startsWith("/");
          const imageUrl = useQuery(
            api.files.getUrl, 
            isStorageId ? { storageId: project.imageUrl } : "skip"
          );
          
          // Use the optimized image URL function
          const displayImageUrl = getOptimizedImageUrl(
            isStorageId && imageUrl ? imageUrl : project.imageUrl,
            { width: 600, quality: 80 }
          );
          
          return (
            <div
              key={project._id}
              className="group relative animate-slideInUp bg-white dark:bg-[#131C31] 
                rounded-xl overflow-hidden border border-gray-100 dark:border-[#222F43] 
                hover:border-[#ffe400] dark:hover:border-[#ffe400] transition-all duration-300
                cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={displayImageUrl || "/placeholder-image.jpg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#101010] dark:text-[#94A9C9]">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-[#66768f] mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#ffe400] bg-opacity-10 text-[#101010] 
                        dark:text-[#94A9C9] rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                  <MagneticLink
                    href={project.githubUrl}
                    className="p-2 rounded-lg hover:bg-[#ffe400] hover:bg-opacity-10 
                      text-[#101010] dark:text-[#94A9C9] transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </MagneticLink>
                  <MagneticLink
                    href={project.liveUrl}
                    className="p-2 rounded-lg hover:bg-[#ffe400] hover:bg-opacity-10 
                      text-[#101010] dark:text-[#94A9C9] transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </MagneticLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
