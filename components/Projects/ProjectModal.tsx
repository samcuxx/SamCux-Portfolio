 "use client";

import React, { useEffect, useRef } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

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

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle image URL for Convex storage
  const isStorageId =
    project?.imageUrl &&
    !project.imageUrl.includes("://") &&
    !project.imageUrl.startsWith("/");

  // Use the optimized image URL function directly with the storage ID if applicable
  const displayImageUrl = project
    ? isStorageId
      ? getOptimizedImageUrl(project.imageUrl)
      : project.imageUrl
    : null;

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#131C31] rounded-2xl w-full max-w-4xl my-4 shadow-xl flex flex-col"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        {/* Header - Fixed position */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-[#222F43] sticky top-0 bg-white dark:bg-[#131C31] z-10">
          <h3 className="text-xl font-bold text-[#101010] dark:text-[#94A9C9] truncate pr-2">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E2A45] transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[#101010] dark:text-[#94A9C9]" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto">
          {/* Project Image */}
          <div className="relative aspect-video w-full">
            <OptimizedImage
              src={displayImageUrl || "/placeholder-image.jpg"}
              alt={project.title}
              fill
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Details */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#ffe400]/10 text-sm rounded-full text-[#101010] dark:text-[#94A9C9]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-8 whitespace-pre-line">
              {project.description}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ffe400] text-[#101010] font-bold hover:bg-[#ffec4d] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Project
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 dark:border-[#222F43] text-[#101010] dark:text-white hover:bg-gray-50 dark:hover:bg-[#1E2A45] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 