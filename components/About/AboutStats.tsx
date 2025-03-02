"use client";

import React from "react";
import { Trophy, Code, Users, Coffee, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function AboutStats() {
  // Fetch about me data from the database
  const aboutMeData = useQuery(api.aboutMe.get);
  
  // Default stats in case data is not available
  const defaultStats = [
    { icon: <Trophy className="w-5 h-5" />, value: "5+", label: "Years Experience" },
    { icon: <Code className="w-5 h-5" />, value: "50+", label: "Projects" },
    { icon: <Users className="w-5 h-5" />, value: "20+", label: "Clients" },
    { icon: <Coffee className="w-5 h-5" />, value: "∞", label: "Coffee Cups" },
  ];
  
  // Create stats array from database data if available
  const stats = aboutMeData ? [
    { 
      icon: <Trophy className="w-5 h-5" />, 
      value: `${aboutMeData.yearsExperience}+`, 
      label: "Years Experience" 
    },
    { 
      icon: <Code className="w-5 h-5" />, 
      value: `${aboutMeData.projectsCount}+`, 
      label: "Projects" 
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      value: `${aboutMeData.clientsCount}+`, 
      label: "Clients" 
    },
    { 
      icon: <Coffee className="w-5 h-5" />, 
      value: aboutMeData.coffeeCount, 
      label: "Coffee Cups" 
    },
  ] : defaultStats;
  
  // Loading state
  if (aboutMeData === undefined) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 
              dark:border-[#222F43] animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 dark:bg-[#222F43] rounded-lg w-9 h-9"></div>
              <div>
                <div className="h-6 w-12 bg-gray-200 dark:bg-[#222F43] rounded-md mb-1"></div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-[#222F43] rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 
            dark:border-[#222F43] hover:border-[#ffe400] dark:hover:border-[#ffe400] 
            transition-all duration-300 animate-slideInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg 
              group-hover:bg-opacity-20 transition-all duration-300">
              {React.cloneElement(stat.icon, { 
                className: "w-5 h-5 text-[#ffe400]" 
              })}
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
                {stat.value}
              </h4>
              <p className="text-sm text-gray-500 dark:text-[#66768f]">
                {stat.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 