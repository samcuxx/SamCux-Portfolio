"use client"
import React, { createContext, useState, useMemo, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

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
  isLoading: boolean;
  error: string | null;
};

export const ProjectsFilterContext = createContext<ProjectsFilterContextType | null>(null);

export function ProjectsFilterProvider({ children }: { children: React.ReactNode }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [localProjects, setLocalProjects] = useState<any[]>([]);
  const [localFeaturedProjects, setLocalFeaturedProjects] = useState<any[]>([]);

  // Fetch projects from Convex
  const allProjects = useQuery(api.projects.getAll);
  const featuredProjects = useQuery(api.projects.getFeatured);
  const isLoading = allProjects === undefined || featuredProjects === undefined;

  // Update local state when Convex data changes
  useEffect(() => {
    if (allProjects) {
      setLocalProjects(allProjects);
      setError(null);
    }
  }, [allProjects]);

  useEffect(() => {
    if (featuredProjects) {
      setLocalFeaturedProjects(featuredProjects);
      setError(null);
    }
  }, [featuredProjects]);

  // Handle potential errors
  useEffect(() => {
    if (allProjects === undefined && featuredProjects === undefined) {
      // Still loading, no error yet
      return;
    }
    
    if (allProjects === null || featuredProjects === null) {
      setError("Failed to load projects. Please try again later.");
    }
  }, [allProjects, featuredProjects]);

  const filters = ["All", "Web", "Mobile", "UI/UX", "Other"];
  
  const filteredProjects = useMemo(() => {
    if (isLoading) return [];
    
    return localProjects
      .filter(project => {
        const matchesFilter = activeFilter === "All" ? true : project.category === activeFilter;
        const matchesSearch = searchQuery.toLowerCase().trim() === "" ? true :
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesFilter && matchesSearch && !project.featured;
      });
  }, [activeFilter, searchQuery, localProjects, isLoading]);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const value = {
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
    isLoading,
    error
  };

  return (
    <ProjectsFilterContext.Provider value={value}>
      {children}
    </ProjectsFilterContext.Provider>
  );
} 