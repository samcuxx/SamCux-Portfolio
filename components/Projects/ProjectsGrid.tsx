"use client";

import React from "react";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import MagneticLink from "../ui/MagneticLink";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";
import { ProjectsPagination } from "./ProjectsPagination";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectsGrid() {
  const { 
    filteredProjects,
    currentPage,
    totalPages,
    handlePageChange
  } = useProjectsFilter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const imageOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  if (filteredProjects.length === 0) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <p className="text-gray-500 dark:text-[#66768f]">
          No projects found. Try adjusting your search or filter.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={projectVariants}
              whileHover="hover"
              layout
              className="group relative bg-white dark:bg-[#131C31] rounded-xl overflow-hidden
                border border-gray-100 dark:border-[#222F43] hover:border-[#ffe400] 
                dark:hover:border-[#ffe400] transition-all duration-300
                shadow-sm hover:shadow-md flex flex-col"
            >
              <motion.div 
                className="relative aspect-[16/10] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full transition-transform duration-300"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                    flex items-end justify-start p-4"
                  initial="hidden"
                  whileHover="visible"
                  variants={imageOverlayVariants}
                >
                  <motion.div 
                    className="flex gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
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
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="p-5 flex flex-col flex-grow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h4 
                  className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  {project.title}
                </motion.h4>
                <motion.p 
                  className="text-gray-600 dark:text-[#66768f] mb-4 text-sm line-clamp-2 flex-grow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.description}
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-1.5"
                  variants={containerVariants}
                >
                  {project.tags.slice(0, 3).map((tag: string, i: number) => (
                    <motion.span
                      key={i}
                      variants={tagVariants}
                      className="px-2 py-1 bg-[#ffe400] bg-opacity-10 text-[#101010] 
                        dark:text-[#94A9C9] rounded-lg text-xs font-medium"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                  {project.tags.length > 3 && (
                    <motion.span 
                      className="px-2 py-1 text-xs text-gray-500 dark:text-[#66768f]"
                      variants={tagVariants}
                    >
                      +{project.tags.length - 3}
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      <ProjectsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}