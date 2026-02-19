"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlignJustify, LayoutGrid } from "lucide-react";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";

export function ProjectsFilter() {
  const { activeFilter, setActiveFilter, viewMode, setViewMode, filters } =
    useProjectsFilter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex items-center justify-between gap-4 pb-10"
    >
      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
              ${
                activeFilter === filter.label
                  ? "bg-[#101010] dark:bg-white text-white dark:text-[#101010] border-transparent"
                  : "bg-transparent text-[#101010] dark:text-[#94A9C9] border-gray-200 dark:border-[#222F43] hover:border-gray-400 dark:hover:border-[#66768f]"
              }`}
          >
            {filter.label}
            {filter.label !== "All" && (
              <sup className="ml-0.5 text-[10px] opacity-60">
                {filter.count}
              </sup>
            )}
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setViewMode("list")}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border
            ${
              viewMode === "list"
                ? "bg-[#101010] dark:bg-white text-white dark:text-[#101010] border-transparent"
                : "bg-transparent text-[#101010] dark:text-[#94A9C9] border-gray-200 dark:border-[#222F43] hover:border-gray-400 dark:hover:border-[#66768f]"
            }`}
          aria-label="List view"
        >
          <AlignJustify className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border
            ${
              viewMode === "grid"
                ? "bg-[#101010] dark:bg-white text-white dark:text-[#101010] border-transparent"
                : "bg-transparent text-[#101010] dark:text-[#94A9C9] border-gray-200 dark:border-[#222F43] hover:border-gray-400 dark:hover:border-[#66768f]"
            }`}
          aria-label="Grid view"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
