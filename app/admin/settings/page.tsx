"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, User, Github } from "lucide-react";

export default function AdminSettings() {
  const user = useQuery(api.auth.getUser, {});

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-[#66768f] mt-1">
          Manage your account settings
        </p>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-4">
          Account Information
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || "User"}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#ffe400] bg-opacity-10 flex items-center justify-center">
                <User className="w-8 h-8 text-[#ffe400]" />
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-medium text-[#101010] dark:text-[#94A9C9]">
                {user?.name || "Admin User"}
              </h3>
              <p className="text-gray-600 dark:text-[#66768f]">
                {user?.email || ""}
              </p>
              <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-[#66768f]">
                <Github className="w-4 h-4" />
                <span>GitHub Authentication</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 dark:border-[#222F43]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[#101010] dark:text-[#94A9C9]">
                  Admin Status
                </h4>
                <p className="text-sm text-gray-600 dark:text-[#66768f]">
                  You have administrator privileges
                </p>
              </div>
              <div className="px-3 py-1 bg-[#ffe400] bg-opacity-10 rounded-lg text-sm font-medium text-[#ffe400]">
                Admin
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-4">
          About
        </h2>
        
        <div className="space-y-4 text-gray-600 dark:text-[#66768f]">
          <p>
            This admin panel is built with Next.js, Tailwind CSS, and Convex.
          </p>
          <p>
            Convex is used for the database, authentication, and file storage.
          </p>
          <p>
            GitHub OAuth is used for authentication, and the first user to sign in is automatically made an admin.
          </p>
        </div>
      </div>
    </div>
  );
} 