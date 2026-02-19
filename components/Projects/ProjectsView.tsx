"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";
import { getOptimizedImageUrl } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ProjectModal } from "./ProjectModal";


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
  createdAt: number;
}

function getProjectYear(project: Project): string {
  if (project.createdAt) {
    return new Date(project.createdAt).getFullYear().toString();
  }
  return "";
}

function getProjectServices(project: Project): string {
  return project.category || "Development";
}

function getDisplayImageUrl(imageUrl: string): string | null {
  if (!imageUrl) return null;
  const isStorageId = !imageUrl.includes("://") && !imageUrl.startsWith("/");
  return isStorageId ? getOptimizedImageUrl(imageUrl) : imageUrl;
}

// ─── Hover Image Preview (follows cursor) ────────────────────

function HoverImagePreview({
  projects,
  hoveredIndex,
}: {
  projects: Project[];
  hoveredIndex: number | null;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 30, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const activeProject = hoveredIndex !== null ? projects[hoveredIndex] : null;
  const displayImageUrl = activeProject
    ? getDisplayImageUrl(activeProject.imageUrl)
    : null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <AnimatePresence mode="popLayout">
        {hoveredIndex !== null && displayImageUrl && (
          <motion.div
            key={hoveredIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="relative -translate-x-1/2 -translate-y-1/2 w-[350px] h-[220px] rounded-lg overflow-hidden shadow-2xl"
          >
            <OptimizedImage
              src={displayImageUrl}
              alt={activeProject?.title || ""}
              fill
              sizes="350px"
              className="object-cover w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── List View ───────────────────────────────────────────────

function ProjectListItem({
  project,
  index,
  onClick,
  onHover,
  onLeave,
}: {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      onClick={() => onClick(project)}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      className="group cursor-pointer"
    >
      <div
        className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[2fr_1fr_auto] items-center gap-4 md:gap-8 py-6 md:py-8
          border-b border-gray-200 dark:border-[#222F43]
          transition-opacity duration-150 -mx-4 px-4 md:-mx-6 md:px-6"
      >
        <h3 className="text-xl md:text-xl lg:text-2xl font-medium tracking-tight text-[#101010] dark:text-[#94A9C9] group-hover:opacity-50 transition-opacity duration-150 leading-tight">
          {project.title}
        </h3>
        <span className="text-sm md:text-base text-gray-500 dark:text-[#66768f] whitespace-nowrap group-hover:opacity-50 transition-opacity duration-150">
          {getProjectServices(project)}
        </span>
        <span className="text-sm md:text-base text-gray-500 dark:text-[#66768f] tabular-nums group-hover:opacity-50 transition-opacity duration-150">
          {getProjectYear(project)}
        </span>
      </div>
    </motion.div>
  );
}

function ListView({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <div>
      <HoverImagePreview projects={projects} hoveredIndex={hoveredIndex} />

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[2fr_1fr_auto] items-center gap-4 md:gap-8 pb-4 -mx-4 px-4 md:-mx-6 md:px-6 border-b border-gray-300 dark:border-[#222F43]">
        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-[#66768f] font-medium">
          Client
        </span>
        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-[#66768f] font-medium">
          Services
        </span>
        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-[#66768f] font-medium">
          Year
        </span>
      </div>

      {projects.map((project, index) => (
        <ProjectListItem
          key={project._id}
          project={project}
          index={index}
          onClick={onProjectClick}
          onHover={handleHover}
          onLeave={handleLeave}
        />
      ))}
    </div>
  );
}

// ─── Grid View ───────────────────────────────────────────────

function ProjectGridCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}) {
  const [imageError, setImageError] = useState(false);
  const displayImageUrl = getDisplayImageUrl(project.imageUrl);
  const hasValidImage = Boolean(displayImageUrl) && !imageError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      onClick={() => onClick(project)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-[#131C31] mb-4">
        {hasValidImage ? (
          <OptimizedImage
            src={displayImageUrl as string}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 dark:text-[#66768f] text-sm">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[#101010] dark:text-[#94A9C9]">
          {project.title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-[#66768f] whitespace-nowrap pt-1">
          <span>{getProjectServices(project)}</span>
          <span>{getProjectYear(project)}</span>
        </div>
      </div>
    </motion.div>
  );
}

function GridView({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
      {projects.map((project, index) => (
        <ProjectGridCard
          key={project._id}
          project={project}
          index={index}
          onClick={onProjectClick}
        />
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────

export function ProjectsView() {
  const { filteredProjects, viewMode } = useProjectsFilter();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-[#66768f] text-lg">
          No projects found.
        </p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {viewMode === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ListView
              projects={filteredProjects}
              onProjectClick={handleProjectClick}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <GridView
              projects={filteredProjects}
              onProjectClick={handleProjectClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
