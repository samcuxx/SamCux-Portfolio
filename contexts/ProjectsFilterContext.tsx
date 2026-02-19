"use client";
import React, { createContext, useState, useMemo } from "react";

type ViewMode = "list" | "grid";

type ProjectsFilterContextType = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filters: { label: string; count: number }[];
  filteredProjects: any[];
  totalProjects: number;
};

export const ProjectsFilterContext =
  createContext<ProjectsFilterContextType | null>(null);

type ProjectsFilterProviderProps = {
  children: React.ReactNode;
  initialProjects: any[];
};

export function ProjectsFilterProvider({
  children,
  initialProjects = [],
}: ProjectsFilterProviderProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const filters = useMemo(() => {
    if (!initialProjects || initialProjects.length === 0)
      return [{ label: "All", count: 0 }];

    const categoryMap: Record<string, number> = {};
    for (const project of initialProjects) {
      const cat = project.category || "Other";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    }

    return [
      { label: "All", count: initialProjects.length },
      ...Object.entries(categoryMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([label, count]) => ({ label, count })),
    ];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (!initialProjects || initialProjects.length === 0) return [];

    if (activeFilter === "All") return initialProjects;

    return initialProjects.filter(
      (project) => project.category === activeFilter,
    );
  }, [activeFilter, initialProjects]);

  const value = useMemo(
    () => ({
      activeFilter,
      setActiveFilter,
      viewMode,
      setViewMode,
      filters,
      filteredProjects,
      totalProjects: filteredProjects.length,
    }),
    [activeFilter, viewMode, filters, filteredProjects],
  );

  return (
    <ProjectsFilterContext.Provider value={value}>
      {children}
    </ProjectsFilterContext.Provider>
  );
}
