import React from "react";
import { Code2 } from "lucide-react";
import { DynaPuff } from "next/font/google";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function AboutTechStack() {
  const skills = [
    { name: "JavaScript", icon: "💛" },
    { name: "TypeScript", icon: "💙" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "💚" },
    { name: "Python", icon: "🐍" },
    { name: "TailwindCSS", icon: "🎨" },
    { name: "Git", icon: "📚" }
  ];

  return (
    <div className="pt-6">
      <div className="flex items-center gap-2 mb-6">
        <Code2 className="w-6 h-6 text-[#ffe400]" />
        <h3 className={`${dynaPuff.className} text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}>
          Tech Stack
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group relative animate-slideInRight"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute inset-0 bg-[#ffe400] rounded-xl rotate-1 
              group-hover:rotate-3 transition-transform opacity-20"></div>
            <div className="relative p-4 bg-white dark:bg-[#131C31] rounded-xl 
              text-gray-700 dark:text-[#94A9C9] font-medium hover:scale-105 
              transition-all duration-300 cursor-default border border-gray-100 
              dark:border-[#222F43] group-hover:border-[#ffe400] 
              dark:group-hover:border-[#ffe400]"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{skill.icon}</span>
                <span>{skill.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 