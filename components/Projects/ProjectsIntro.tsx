import React from "react";
import { Github, ExternalLink } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";

export function ProjectsIntro() {
  return (
    <div className="space-y-6 animate-slideInUp">
      <div className="relative">
        <p className="text-gray-600 dark:text-[#66768f] leading-relaxed text-left md:text-center max-w-2xl mx-auto">
          Explore my portfolio of projects showcasing my expertise in web development,
          from responsive applications to innovative solutions using modern technologies.
        </p>
      </div>

      <div className="flex justify-start md:justify-center gap-4 pt-4">
        <MagneticLink
          href="https://github.com/samcuxx"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffe400] dark:bg-[#ffe400] 
            text-[#101010] rounded-full font-semibold hover:scale-105 transition-transform"
        >
          GitHub Profile <Github className="w-4 h-4" />
        </MagneticLink>

        <MagneticLink
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ffe400] 
            text-[#101010] dark:text-[#94A9C9] rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Work With Me <ExternalLink className="w-4 h-4" />
        </MagneticLink>
      </div>
    </div>
  );
} 