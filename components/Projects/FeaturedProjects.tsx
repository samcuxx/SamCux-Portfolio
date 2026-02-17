"use client";

import React, { useState } from "react";
import { Star, ExternalLink, Github } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
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

// Create a component for featured project card to handle image loading
function FeaturedProjectCard({
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
      className="group relative bg-white dark:bg-[#131C31] rounded-2xl overflow-hidden
        border border-gray-100 dark:border-[#222F43] hover:border-[#ffe400] 
        dark:hover:border-[#ffe400] transition-all duration-300 animate-slideInUp
        shadow-sm hover:shadow-md cursor-pointer"
      style={{ animationDelay: `${0.1}s` }}
      onClick={() => onClick(project)}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Section - Fixed height to maintain consistent sizing */}
        <div className="relative overflow-hidden" style={{ minHeight: "250px" }}>
          {hasValidImage ? (
            <>
              {/* Skeleton placeholder that maintains the space */}
              <div
                className={`absolute inset-0 bg-gray-200 dark:bg-[#222F43] animate-pulse rounded-l-2xl md:rounded-l-2xl md:rounded-r-none transition-opacity duration-500 ${
                  imageLoaded || imageError ? "opacity-0" : "opacity-100"
                }`}
              />

              {imageError ? (
                <OptimizedImage
                  src="/placeholder-image.jpg"
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover w-full h-full absolute inset-0 transition-opacity duration-500 opacity-100"
                />
              ) : (
                <OptimizedImage
                  src={displayImageUrl as string}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
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
            <div className="absolute inset-0 bg-gray-200 dark:bg-[#1E2A45] flex items-center justify-center rounded-l-2xl md:rounded-l-2xl md:rounded-r-none">
              <span className="text-gray-400 dark:text-[#66768f] text-sm">No image available</span>
            </div>
          )}

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 flex items-end justify-start p-6 z-20"
          >
            <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
              <MagneticLink
                href={project.liveUrl}
                className="p-2 bg-[#ffe400] rounded-lg hover:scale-110 transition-transform"
              >
                <ExternalLink className="w-5 h-5 text-[#101010]" />
              </MagneticLink>
              <MagneticLink
                href={project.githubUrl}
                className="p-2 bg-[#ffe400] rounded-lg hover:scale-110 transition-transform"
              >
                <Github className="w-5 h-5 text-[#101010]" />
              </MagneticLink>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col justify-center">
          <h4 className="text-xl font-semibold text-[#101010] dark:text-[#94A9C9] mb-3">
            {project.title}
          </h4>
          <p className="text-gray-600 dark:text-[#66768f] mb-4 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#ffe400] bg-opacity-10 text-[#101010] 
                  dark:text-[#94A9C9] rounded-lg text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type FeaturedProjectsProps = {
  initialProjects: Project[];
};

export function FeaturedProjects({ initialProjects }: FeaturedProjectsProps) {
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

  // Filter featured projects from initial data
  const featuredProjects = (initialProjects || []).filter(
    (project) => project.featured === true
  );

  if (!featuredProjects || featuredProjects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-6 h-6 text-[#ffe400]" />
        <h3 className="font-dynapuff text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]">
          Featured Projects
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {featuredProjects.map((project) => (
          <FeaturedProjectCard
            key={project._id}
            project={project}
            onClick={handleProjectClick}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
