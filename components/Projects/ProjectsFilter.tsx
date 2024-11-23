"use client";

import React from "react";
import { Filter, Search } from "lucide-react";
import { DynaPuff } from "next/font/google";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";
import { motion, AnimatePresence } from "framer-motion";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function ProjectsFilter() {
  const { 
    activeFilter, 
    setActiveFilter, 
    searchQuery,
    setSearchQuery,
    filters,
    totalProjects 
  } = useProjectsFilter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const filterButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    tap: { scale: 0.95 }
  };

  const searchBarVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 180, 360] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut"
            }}
          >
            <Filter className="w-6 h-6 text-[#ffe400]" />
          </motion.div>
          <motion.h3 
            className={`${dynaPuff.className} text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}
            layout
          >
            {activeFilter} Projects
          </motion.h3>
        </div>
        <motion.span 
          className="text-sm text-gray-500 dark:text-[#66768f]"
          variants={itemVariants}
        >
          {totalProjects} projects
        </motion.span>
      </motion.div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-2">
        {/* Filters */}
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            {filters.map((filter, index) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variants={filterButtonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap="tap"
                custom={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeFilter === filter
                    ? "bg-[#ffe400] text-[#101010]"
                    : "bg-gray-100 dark:bg-[#131C31] text-gray-600 dark:text-[#66768f] hover:bg-[#ffe400] hover:text-[#101010]"
                  }`}
              >
                {filter}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="relative w-full md:w-72"
          variants={searchBarVariants}
        >
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </motion.div>
          <motion.input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            whileFocus={{ scale: 1.02 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-[#222F43] 
              bg-white dark:bg-[#131C31] text-gray-800 dark:text-[#94A9C9] 
              focus:border-[#ffe400] dark:focus:border-[#ffe400] outline-none
              transition-all duration-300"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}