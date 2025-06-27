"use client";

import React, { useState } from "react";
import { Github, ExternalLink, AlertCircle } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";
import { ProjectsPagination } from "./ProjectsPagination";
import { getOptimizedImageUrl } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";
import { ProjectModal } from "./ProjectModal";

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
      <div className="relative overflow-hidden" style={{ minHeight: '200px' }}>
        {hasValidImage ? (
          <>
            {/* Skeleton placeholder that maintains the space */}
            <div className={`absolute inset-0 bg-gray-200 dark:bg-[#222F43] animate-pulse rounded-t-xl transition-opacity duration-500 ${
              imageLoaded || imageError ? 'opacity-0' : 'opacity-100'
            }`} />
            
            <img
              src={displayImageUrl}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className={`object-cover w-full h-full absolute inset-0 transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageError(true);
                e.currentTarget.src = "/placeholder-image.jpg";
                e.currentTarget.onerror = null;
                // Consider the image loaded once the fallback is set
                setImageLoaded(true);
              }}
            />
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
    isLoading,
    error
  } = useProjectsFilter();
  
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

  // Memoize the projects to prevent unnecessary re-renders
  const memoizedProjects = React.useMemo(() => {
    return filteredProjects;
  }, [filteredProjects]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (memoizedProjects.length === 0) {
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
        {memoizedProjects.map((project) => (
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