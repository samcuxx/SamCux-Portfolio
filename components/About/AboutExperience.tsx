import { Briefcase, Calendar, Building2 } from "lucide-react";

const FALLBACK_EXPERIENCE = [
  {
    year: "2022 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    description:
      "Leading the frontend development team and implementing modern web applications.",
    achievements: [
      "Improved application performance by 40% through code optimization",
      "Led the migration from legacy codebase to React and TypeScript",
      "Mentored junior developers and established coding standards",
    ],
  },
  {
    year: "2019 - 2022",
    title: "Web Developer",
    company: "Digital Innovations",
    description:
      "Developed responsive web applications using modern JavaScript frameworks.",
    achievements: [
      "Built and maintained client websites with 99.9% uptime",
      "Implemented CI/CD pipelines reducing deployment time by 50%",
      "Collaborated with design team to create intuitive user interfaces",
    ],
  },
];

type AboutExperienceProps = {
  experienceData: any;
};

export default function AboutExperience({
  experienceData,
}: AboutExperienceProps) {
  const displayExperience =
    experienceData?.length ? experienceData : FALLBACK_EXPERIENCE;

  return (
    <div className="pt-8">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-6 h-6 text-[#ffe400]" />
        <h3 className="text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]">
          Experience
        </h3>
      </div>
      <div className="space-y-6">
        {displayExperience.map((item, index) => (
            <div 
              key={index}
              className="relative pl-6 border-l-2 border-[#ffe400] dark:border-[#ffe400] 
                animate-slideInUp group hover:bg-gray-50 dark:hover:bg-[#131C31] p-6 
                rounded-xl transition-all duration-300 hover:border-l-4"
            >
              <div
                className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-[#ffe400] 
                group-hover:scale-125 transition-transform duration-300"
              ></div>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#66768f] mb-2">
                <Calendar className="w-4 h-4" />
                <span className="group-hover:text-[#ffe400] transition-colors">
                  {item.year}
                </span>
              </div>

              <h4 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-1">
                {item.title}
              </h4>

              <div className="flex items-center gap-2 text-gray-600 dark:text-[#66768f] mb-3">
                <Building2 className="w-4 h-4" />
                <p>{item.company}</p>
              </div>

              <p className="text-gray-600 dark:text-[#66768f] mb-4">
                {item.description}
              </p>
              {item.achievements?.length > 0 && (
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#66768f]"
                    >
                      <span className="w-1.5 h-1.5 bg-[#ffe400] rounded-full shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
