import React from "react";
import MagneticLink from "@/components/ui/MagneticLink";
import { Download, ArrowRight } from "lucide-react";

export function AboutIntro() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <p className="text-gray-600 dark:text-[#66768f] leading-relaxed">
          Hey there! I&apos;m a passionate Software Engineer and Content Creator
          based in [Your Location]. I love building beautiful, responsive,
          and user-friendly web applications while sharing my journey and
          knowledge with others.
        </p>
        <div className="absolute -left-4 top-0 w-1 h-full bg-[#ffe400] rounded-full"></div>
      </div>

      <p className="text-gray-600 dark:text-[#66768f] leading-relaxed">
        When I&apos;m not coding, you can find me creating content, exploring new
        technologies, or contributing to open-source projects. I believe in
        continuous learning and sharing knowledge with the developer community.
      </p>

      <div className="flex gap-4 pt-4">
        <MagneticLink
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffe400] dark:bg-[#ffe400] 
          text-[#101010] rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Get in Touch <ArrowRight className="w-4 h-4" />
        </MagneticLink>

        <MagneticLink
          href="/resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ffe400] 
          text-[#101010] dark:text-[#94A9C9] rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Resume <Download className="w-4 h-4" />
        </MagneticLink>
      </div>
    </div>
  );
} 