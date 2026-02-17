 "use client";

import React, { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";
import { ProjectsPagination } from "./ProjectsPagination";
import { getOptimizedImageUrl } from "@/lib/utils";
import { ProjectModal } from "./ProjectModal";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

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

// Create a component for project card to handle image loading
const ProjectCard = React.memo(function ProjectCard({ 
  project, 
  onClick 
}: { 
  project: Project;
  onClick: (project: Project) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Determine if the URL is a storage ID or a full URL
  const isStorageId = project.imageUrl && !project.imageUrl.includes("://") && !project.imageUrl.startsWith("/");
  
  // Use the optimized image URL function directly with the storage ID if applicable
  // If it's already a URL (external link), use it as is
  const displayImageUrl = isStorageId 
    ? getOptimizedImageUrl(project.imageUrl)
    : project.imageUrl;
  
  // Check if we have a valid image URL
  const hasValidImage = Boolean(displayImageUrl) && displayImageUrl !== null;
    
  return (
    <div
      key={project._id}
      className="group relative bg-white dark:bg-[#131C31] rounded-xl overflow-hidden
        border border-gray-100 dark:border-[#222F43] hover:border-[#ffe400] 
        dark:hover:border-[#ffe400] transition-all duration-300 animate-slideInUp
        shadow-sm hover:shadow-md flex flex-col h-full cursor-pointer"
      style={{ animationDelay: `${0.1}s` }}
      onClick={() => onClick(project)}
    >
      <div className="relative overflow-hidden" style={{ minHeight: "200px" }}>
        {hasValidImage ? (
          <>
            {/* Skeleton placeholder that maintains the space */}
            <div
              className={`absolute inset-0 bg-gray-200 dark:bg-[#222F43] animate-pulse rounded-t-xl transition-opacity duration-500 ${
                imageLoaded || imageError ? "opacity-0" : "opacity-100"
              }`}
            />
            
            {imageError ? (
              <OptimizedImage
                src="/placeholder-image.jpg"
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover w-full h-full absolute inset-0 transition-opacity duration-500 opacity-100"
              />
            ) : (
              <OptimizedImage
                src={displayImageUrl as string}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className={`object-cover w-full h-full absolute inset-0 transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoadingComplete={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
            )}
          </>
        ) : (
          // No image placeholder
          <div className="absolute inset-0 bg-gray-200 dark:bg-[#1E2A45] flex items-center justify-center rounded-t-xl">
            <span className="text-gray-400 dark:text-[#66768f] text-sm">No image available</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 flex items-end justify-start p-4 z-20">
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
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
  );
});

export function ProjectsGrid() {
  const { 
    filteredProjects,
    currentPage,
    totalPages,
    handlePageChange,
  } = useProjectsFilter();
  
  // State for modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle click on project
  const handleProjectClick = React.useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);
  
  // Handle modal close
  const handleCloseModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project._id} 
            project={project} 
            onClick={handleProjectClick}
          />
        ))}
      </div>
      
      <ProjectsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
} 