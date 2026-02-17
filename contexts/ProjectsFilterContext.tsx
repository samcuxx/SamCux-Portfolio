"use client"
import React, { createContext, useState, useMemo, useEffect } from "react";

const ITEMS_PER_PAGE = 9;

type ProjectsFilterContextType = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  filters: string[];
  filteredProjects: any[];
  totalProjects: number;
};

export const ProjectsFilterContext = createContext<ProjectsFilterContextType | null>(null);

type ProjectsFilterProviderProps = {
  children: React.ReactNode;
  initialProjects: any[];
};

export function ProjectsFilterProvider({ 
  children,
  initialProjects = []
}: ProjectsFilterProviderProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filters = ["All", "Web", "Mobile", "UI/UX", "Other"];
  
  const filteredProjects = useMemo(() => {
    if (!initialProjects || initialProjects.length === 0) return [];

    return (initialProjects as any[]).filter((project) => {
        const matchesFilter = activeFilter === "All" ? true : project.category === activeFilter;
        const matchesSearch = searchQuery.toLowerCase().trim() === "" ? true :
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch && !project.featured;
      });
  }, [activeFilter, searchQuery, initialProjects]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredProjects, currentPage]);

  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const value = useMemo(
    () => ({
      activeFilter,
      setActiveFilter,
      searchQuery,
      setSearchQuery,
      currentPage,
      totalPages,
      handlePageChange,
      filters,
      filteredProjects: paginatedProjects,
      totalProjects: filteredProjects.length,
    }),
    [
      activeFilter,
      searchQuery,
      currentPage,
      totalPages,
      filters,
      paginatedProjects,
    ]
  );

  return (
    <ProjectsFilterContext.Provider value={value}>
      {children}
    </ProjectsFilterContext.Provider>
  );
} 