"use client";

import React from "react";
import { Filter, Search } from "lucide-react";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";


export function ProjectsFilter() {
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filters,
    totalProjects,
  } = useProjectsFilter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-6 h-6 text-[#ffe400]" />
          <h3
            className={`font-dynapuff text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}
          >
            {activeFilter} Projects
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-[#66768f]">
          {totalProjects} projects
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-2">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeFilter === filter
                    ? "bg-[#ffe400] text-[#101010]"
                    : "bg-gray-100 dark:bg-[#131C31] text-gray-600 dark:text-[#66768f] hover:bg-[#ffe400] hover:text-[#101010]"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-[#222F43] 
              bg-white dark:bg-[#131C31] text-gray-800 dark:text-[#94A9C9] 
              focus:border-[#ffe400] dark:focus:border-[#ffe400] outline-none
              transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
