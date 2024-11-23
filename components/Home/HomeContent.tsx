'use client';

import React from "react";
import { HeroSection } from "./HeroSection";
import { SkillsSection } from "./SkillsSection";
import { LatestProjects } from "./LatestProjects";
import { ContactSection } from "./ContactSection";
import { StaggerChildren, FadeIn } from "../ui/motion";

export function HomeContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <StaggerChildren className="space-y-24">
        <FadeIn>
          <HeroSection />
        </FadeIn>
        
        <FadeIn>
          <LatestProjects />
        </FadeIn>
        
        <FadeIn>
          <div className="hidden md:block">
            <SkillsSection />
          </div>
        </FadeIn>
        
        <FadeIn>
          <ContactSection />
        </FadeIn>
      </StaggerChildren>
    </div>
  );
}