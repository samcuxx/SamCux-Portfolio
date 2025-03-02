"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, FolderKanban, Users, Clock } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const projects = useQuery(api.projects.getAll);
  const user = useQuery(api.auth.getUser, {});

  if (!projects) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      name: "Total Projects",
      value: projects.length,
      icon: <FolderKanban className="w-6 h-6 text-[#ffe400]" />,
      href: "/admin/projects",
    },
    {
      name: "Featured Projects",
      value: projects.filter((p) => p.featured).length,
      icon: <Clock className="w-6 h-6 text-[#ffe400]" />,
      href: "/admin/projects?filter=featured",
    },
    {
      name: "Admin Users",
      value: 1,
      icon: <Users className="w-6 h-6 text-[#ffe400]" />,
      href: "/admin/settings",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
          Welcome back, {user?.name || "Admin"}
        </h1>
        <p className="text-gray-600 dark:text-[#66768f] mt-1">
          Here&apos;s what&apos;s happening with your portfolio.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-[#222F43] hover:border-[#ffe400] dark:hover:border-[#ffe400]"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-[#ffe400] bg-opacity-10">
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-[#66768f]">
                  {stat.name}
                </p>
                <p className="text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]">
                  {stat.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9]">
            Recent Projects
          </h2>
          <Link
            href="/admin/projects"
            className="text-sm text-[#ffe400] hover:underline"
          >
            View all
          </Link>
        </div>
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
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 5).map((project) => (
                <tr
                  key={project._id}
                  className="border-b border-gray-100 dark:border-[#222F43] hover:bg-gray-50 dark:hover:bg-[#222F43]/50"
                >
                  <td className="py-3 px-4 text-sm text-[#101010] dark:text-[#94A9C9]">
                    {project.title}
                  </td>
                  <td className="py-3 px-4 text-sm text-[#101010] dark:text-[#94A9C9]">
                    {project.category}
                  </td>
                  <td className="py-3 px-4 text-sm text-[#101010] dark:text-[#94A9C9]">
                    {project.featured ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-4 px-4 text-center text-sm text-gray-500 dark:text-[#66768f]"
                  >
                    No projects found. Create your first project.
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