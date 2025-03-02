"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, User, Calendar, Code, Users, Coffee } from "lucide-react";
import AboutMeForm from "@/components/Admin/AboutMeForm";

export default function AboutMePage() {
  const aboutMeData = useQuery(api.aboutMe.get);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = () => {
    setError(null);
    // The query will automatically refresh
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
          About Me
        </h1>
        <p className="text-gray-600 dark:text-[#66768f] mt-1">
          Manage your personal information and stats displayed on the About page
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <div className="flex items-center mb-6">
          <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] flex items-center gap-2">
            <User className="w-5 h-5 text-[#ffe400]" />
            Personal Information
          </h2>
        </div>

        {aboutMeData === undefined ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
          </div>
        ) : (
          <AboutMeForm 
            initialData={aboutMeData || undefined} 
            onSuccess={handleSuccess} 
          />
        )}
      </div>

      {aboutMeData && (
        <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
          <div className="flex items-center mb-6">
            <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#ffe400]" />
              Preview Stats
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#ffe400]" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
                    {aboutMeData.yearsExperience}+
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-[#66768f]">
                    Years Experience
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg">
                  <Code className="w-5 h-5 text-[#ffe400]" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
                    {aboutMeData.projectsCount}+
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-[#66768f]">
                    Projects
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg">
                  <Users className="w-5 h-5 text-[#ffe400]" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
                    {aboutMeData.clientsCount}+
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-[#66768f]">
                    Clients
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg">
                  <Coffee className="w-5 h-5 text-[#ffe400]" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
                    {aboutMeData.coffeeCount}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-[#66768f]">
                    Coffee Cups
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 