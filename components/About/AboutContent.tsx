import React from "react";
import { AboutHeader } from "./AboutHeader";
import { AboutIntro } from "./AboutIntro";
import { AboutExperience } from "./AboutExperience";
import { AboutTechStack } from "./AboutTechStack";
import { AboutImage } from "./AboutImage";
import { AboutStats } from "./AboutStats";
import { AboutEducation } from "./AboutEducation";

export function AboutContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <AboutHeader />
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 animate-slideInLeft">
          <AboutIntro />
          <AboutStats />
          <AboutExperience />
        </div>

        <div className="space-y-12 animate-slideInRight">
          <AboutImage />
          <AboutTechStack />
          <AboutEducation />
        </div>
      </div>
    </div>
  );
}
