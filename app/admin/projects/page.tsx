"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Plus, Search, Pencil, Trash2, Star, StarOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

// Define the Project type with the Id type from Convex
interface Project {
  _id: Id<"projects">;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean | undefined;
}

// Define the API response type
interface _ProjectFromAPI {
  _id: Id<"projects">;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export default function AdminProjects() {
  const projects = useQuery(api.projects.getAll);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  const deleteProject = useMutation(api.projects.remove);
  const updateProject = useMutation(api.projects.update);

  if (!projects) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject({ id });
        toast.success("Project deleted successfully");
      } catch (error) {
        toast.error("Failed to delete project");
        console.error(error);
      }
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      await updateProject({
        id: project._id,
        featured: !project.featured,
      });
      toast.success(`Project ${project.featured ? "unfeatured" : "featured"} successfully`);
    } catch (error) {
      toast.error("Failed to update project");
      console.error(error);
    }
  };

  // Filter and search projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = searchQuery
      ? project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesFilter =
      filter === "all" ? true : 
      filter === "featured" ? project.featured : 
      project.category.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const categories = ["all", "featured", "Web", "Mobile", "UI/UX", "Other"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-[#66768f] mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center px-4 py-2 bg-[#ffe400] text-[#101010] rounded-lg hover:bg-[#ffe400]/90 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-[#66768f]" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#131C31] border border-gray-200 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-[#ffe400] text-[#101010]"
                  : "bg-white dark:bg-[#131C31] text-gray-600 dark:text-[#66768f] border border-gray-200 dark:border-[#222F43] hover:bg-gray-100 dark:hover:bg-[#222F43]"
              }`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-[#131C31] rounded-xl shadow-sm border border-gray-100 dark:border-[#222F43] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-[#222F43]">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-[#66768f]">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-[#66768f]">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-[#66768f]">
                  Featured
                </th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-600 dark:text-[#66768f]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr
                  key={project._id}
                  className="border-b border-gray-100 dark:border-[#222F43] hover:bg-gray-50 dark:hover:bg-[#222F43]/50"
                >
                  <td className="py-3 px-4 text-sm text-[#101010] dark:text-[#94A9C9]">
                    {project.title}
                  </td>
                  <td className="py-3 px-4 text-sm text-[#101010] dark:text-[#94A9C9]">
                    <span className="px-2 py-1 bg-[#ffe400] bg-opacity-10 rounded-lg text-xs">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#101010] dark:text-[#94A9C9]">
                    {project.featured ? "Yes" : "No"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => toggleFeatured(project)}
                        className="p-1.5 text-gray-600 dark:text-[#66768f] hover:text-[#ffe400] dark:hover:text-[#ffe400] rounded-lg"
                        title={project.featured ? "Remove from featured" : "Add to featured"}
                      >
                        {project.featured ? (
                          <StarOff className="w-4 h-4" />
                        ) : (
                          <Star className="w-4 h-4" />
                        )}
                      </button>
                      <Link
                        href={`/admin/projects/edit/${project._id}`}
                        className="p-1.5 text-gray-600 dark:text-[#66768f] hover:text-[#ffe400] dark:hover:text-[#ffe400] rounded-lg"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="p-1.5 text-gray-600 dark:text-[#66768f] hover:text-red-500 dark:hover:text-red-500 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 px-4 text-center text-gray-500 dark:text-[#66768f]"
                  >
                    {searchQuery || filter !== "all"
                      ? "No projects match your search or filter criteria."
                      : "No projects found. Create your first project."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 