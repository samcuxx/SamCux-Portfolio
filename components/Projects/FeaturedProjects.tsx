"use client";

import React, { useState, useEffect } from "react";
import { Star, ExternalLink, Github, AlertCircle } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getOptimizedImageUrl } from "@/lib/utils";
import { FeaturedProjectCardSkeleton } from "./ProjectCardSkeleton";
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
        <div className="relative overflow-hidden" style={{ minHeight: '250px' }}>
          {hasValidImage ? (
            <>
              {/* Skeleton placeholder that maintains the space */}
              <div className={`absolute inset-0 bg-gray-200 dark:bg-[#222F43] animate-pulse rounded-l-2xl md:rounded-l-2xl md:rounded-r-none transition-opacity duration-500 ${imageLoaded || imageError ? 'opacity-0' : 'opacity-100'
                }`} />

              <img
                src={displayImageUrl}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className={`object-cover w-full h-full absolute inset-0 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
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

export function FeaturedProjects() {
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const featuredProjects = useQuery(api.projects.getFeatured);

  // Update local state when Convex data changes
  useEffect(() => {
    if (featuredProjects) {
      setLocalProjects(featuredProjects as Project[]);
      setError(null);
    } else if (featuredProjects === null) {
      setError("Failed to load featured projects. Please try again later.");
    }
  }, [featuredProjects]);

  // Memoize the projects to prevent unnecessary re-renders
  const memoizedProjects = React.useMemo(() => {
    return localProjects;
  }, [localProjects]);

  if (featuredProjects === undefined) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-2 mb-8">
          <Star className="w-6 h-6 text-[#ffe400]" />
          <h3 className="font-dynapuff text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]">
            Featured Projects
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <FeaturedProjectCardSkeleton key={index} />
          ))}
        </div>
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
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-6 h-6 text-[#ffe400]" />
        <h3
          className={`font-dynapuff text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}
        >
          Featured Projects
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {memoizedProjects.map((project) => (
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
