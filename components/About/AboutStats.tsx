import React from "react";
import { Trophy, Code, Users, Coffee } from "lucide-react";

const STATS = [
  { icon: Trophy, value: "5+", label: "Years Experience" },
  { icon: Code, value: "50+", label: "Projects" },
  { icon: Users, value: "20+", label: "Clients" },
  { icon: Coffee, value: "∞", label: "Coffee Cups" },
] as const;

export function AboutStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {STATS.map((stat, index) => (
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
              <stat.icon className="w-5 h-5 text-[#ffe400]" />
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
