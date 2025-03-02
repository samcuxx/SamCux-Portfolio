"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import ProjectForm from "@/components/Admin/ProjectForm";
import { notFound } from "next/navigation";

export default function EditProjectClient({ id }: { id: string }) {
  const project = useQuery(api.projects.getById, { 
    id: id as Id<"projects"> 
  });

  if (project === undefined) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
      </div>
    );
  }

  if (project === null) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#222F43] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#101010] dark:text-[#94A9C9]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
            Edit Project
          </h1>
          <p className="text-gray-600 dark:text-[#66768f] mt-1">
            Update project details
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <ProjectForm mode="edit" initialData={project} />
      </div>
    </div>
  );
} 