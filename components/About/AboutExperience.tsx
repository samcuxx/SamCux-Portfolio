"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutExperience() {
  const experienceItems = useQuery(api.experience.getAll);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback data in case the database is empty
  const fallbackExperience = [
    {
      year: "2022 - Present",
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      description: "Leading the frontend development team and implementing modern web applications.",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led the migration from legacy codebase to React and TypeScript",
        "Mentored junior developers and established coding standards"
      ]
    },
    {
      year: "2019 - 2022",
      title: "Web Developer",
      company: "Digital Innovations",
      description: "Developed responsive web applications using modern JavaScript frameworks.",
      achievements: [
        "Built and maintained client websites with 99.9% uptime",
        "Implemented CI/CD pipelines reducing deployment time by 50%",
        "Collaborated with design team to create intuitive user interfaces"
      ]
    }
  ];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Use fetched data or fallback if empty
  const displayExperience = experienceItems?.length ? experienceItems : fallbackExperience;

  return (
    <section className="py-16 bg-white dark:bg-[#131C31]">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="w-6 h-6 text-[#ffe400]" />
          <h2 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
            Work Experience
          </h2>
        </div>

        <div className="space-y-8">
          {isLoading || experienceItems === undefined ? (
            // Loading skeletons
            Array(2).fill(0).map((_, index) => (
              <div 
                key={index} 
                className="p-6 border border-gray-100 dark:border-[#222F43] rounded-lg"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-64 mb-2" />
                <Skeleton className="h-4 w-48 mb-3" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                </div>
              </div>
            ))
          ) : (
            displayExperience.map((item, index) => (
              <div 
                key={index}
                className="p-6 border border-gray-100 dark:border-[#222F43] rounded-lg transition-all hover:shadow-md hover:border-[#ffe400] dark:hover:border-[#ffe400]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#66768f] mb-1">
                  <span>{item.year}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#101010] dark:text-[#94A9C9] mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-[#66768f] mb-3 font-medium">
                  {item.company}
                </p>
                <p className="text-gray-600 dark:text-[#66768f] mb-4">
                  {item.description}
                </p>
                
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-600 dark:text-[#66768f]">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
