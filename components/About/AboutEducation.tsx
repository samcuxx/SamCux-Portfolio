import React from "react";
import { GraduationCap, Award } from "lucide-react";


export function AboutEducation() {
  const education = [
    {
      type: "certification",
      title: "AWS Certified Developer",
      institution: "Amazon Web Services",
      year: "2023",
      icon: <Award className="w-4 h-4" />
    },
    {
      type: "education",
      title: "Computer Science",
      institution: "University Name",
      year: "2019 - 2023",
      icon: <GraduationCap className="w-4 h-4" />
    }
  ];

  return (
    <div className="pt-8">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-6 h-6 text-[#ffe400]" />
        <h3 className={`font-dynapuff text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}>
          Education & Certifications
        </h3>
      </div>
      <div className="space-y-4">
        {education.map((item, index) => (
          <div
            key={index}
            className="group p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 
              dark:border-[#222F43] hover:border-[#ffe400] dark:hover:border-[#ffe400] 
              transition-all duration-300 animate-slideInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg">
                {React.cloneElement(item.icon, { className: "text-[#ffe400]" })}
              </div>
              <span className="text-sm text-[#ffe400] font-medium">
                {item.type === 'certification' ? 'Certification' : 'Education'}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9]">
              {item.title}
            </h4>
            <div className="flex justify-between items-center mt-1">
              <p className="text-gray-600 dark:text-[#66768f]">{item.institution}</p>
              <span className="text-sm text-gray-500 dark:text-[#66768f]">{item.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 