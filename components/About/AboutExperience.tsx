import React from "react";
import { Briefcase, Building2, Calendar } from "lucide-react";
import { DynaPuff } from "next/font/google";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function AboutExperience() {
  const experiences = [
    {
      year: "2023 - Present",
      title: "Senior Software Engineer",
      company: "Company Name",
      description: "Leading development of modern web applications using React and Next.js",
      achievements: [
        "Led team of 5 developers",
        "Improved performance by 40%",
        "Implemented CI/CD pipeline"
      ]
    },
    {
      year: "2021 - 2023",
      title: "Full Stack Developer",
      company: "Previous Company",
      description: "Developed and maintained full-stack applications",
      achievements: [
        "Developed 10+ features",
        "Reduced bug count by 60%",
        "Mentored junior developers"
      ]
    },
  ];

  return (
    <div className="pt-8">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-6 h-6 text-[#ffe400]" />
        <h3 className={`${dynaPuff.className} text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}>
          Experience
        </h3>
      </div>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative pl-6 border-l-2 border-[#ffe400] dark:border-[#ffe400] 
              animate-slideInUp group hover:bg-gray-50 dark:hover:bg-[#131C31] p-6 
              rounded-xl transition-all duration-300 hover:border-l-4"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-[#ffe400] 
              group-hover:scale-125 transition-transform duration-300"></div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#66768f] mb-2">
              <Calendar className="w-4 h-4" />
              <span className="group-hover:text-[#ffe400] transition-colors">
                {exp.year}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-1">
              {exp.title}
            </h4>

            <div className="flex items-center gap-2 text-gray-600 dark:text-[#66768f] mb-3">
              <Building2 className="w-4 h-4" />
              <p>{exp.company}</p>
            </div>

            <p className="text-gray-600 dark:text-[#66768f] mb-4">
              {exp.description}
            </p>

            <ul className="space-y-2">
              {exp.achievements.map((achievement, i) => (
                <li 
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#66768f]"
                >
                  <span className="w-1.5 h-1.5 bg-[#ffe400] rounded-full"></span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 