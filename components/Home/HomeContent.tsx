import React from "react";
import { HeroSection } from "./HeroSection";
import { LatestProjects } from "./LatestProjects";

type HomeContentProps = {
  initialProjects: any[];
};

export function HomeContent({ initialProjects }: HomeContentProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <div className="space-y-24">
        <HeroSection />
        <LatestProjects initialProjects={initialProjects} />
      </div>
    </div>
  );
} 