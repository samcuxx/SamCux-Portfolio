import React from "react";
import { HeroSection } from "./HeroSection";
// import { SkillsSection } from "./SkillsSection";
// import { LatestProjects } from "./LatestProjects";
// import { ContactSection } from "./ContactSection";

export function HomeContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <div className="space-y-24">
        <HeroSection />
        {/* <LatestProjects /> */}
        
        {/* <div className="hidden md:block">
          <SkillsSection />
        </div> */}
        {/* <ContactSection /> */}
      </div>
    </div>
  );
} 