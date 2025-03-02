"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProjectForm from "@/components/Admin/ProjectForm";

export default function NewProject() {
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
            Create New Project
          </h1>
          <p className="text-gray-600 dark:text-[#66768f] mt-1">
            Add a new project to your portfolio
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <ProjectForm mode="create" />
      </div>
    </div>
  );
} 