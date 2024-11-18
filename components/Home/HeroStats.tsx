import React from "react";

export function HeroStats() {
  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 animate-slideInUp"
      style={{ animationDelay: '0.8s' }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative group"
        >
          <div className="absolute inset-0 bg-[#ffe400] rounded-2xl rotate-1 
            group-hover:rotate-3 transition-transform opacity-10"
          />
          <div className="relative p-6 bg-white dark:bg-sa-dark-foregroung rounded-2xl
            border border-gray-200 dark:border-sa-dark-border group-hover:border-[#ffe400]
            transition-all duration-300"
          >
            <div className="text-3xl font-bold text-[#101010] dark:text-[#94A9C9] mb-2">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600 dark:text-sa-dark-text-low">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 