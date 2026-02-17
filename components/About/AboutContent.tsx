import React from "react";
import { AboutHeader } from "./AboutHeader";
import { AboutIntro } from "./AboutIntro";
import AboutExperience from "./AboutExperience";
import { AboutTechStack } from "./AboutTechStack";
import { AboutImage } from "./AboutImage";
import { AboutStats } from "./AboutStats";
import { AboutEducation } from "./AboutEducation";

type AboutContentProps = {
  aboutMeData: any;
  experienceData: any;
  educationData: any;
  techStackData: any;
};

export function AboutContent({
  aboutMeData,
  experienceData,
  educationData,
  techStackData,
}: AboutContentProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <AboutHeader />
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 animate-slideInLeft">
          <AboutIntro aboutMeData={aboutMeData} />
          <AboutStats aboutMeData={aboutMeData} />
          <AboutExperience experienceData={experienceData} />
        </div>

        <div className="space-y-12 animate-slideInRight">
          <AboutImage aboutMeData={aboutMeData} />
          <AboutTechStack techStackData={techStackData} />
          <AboutEducation educationData={educationData} />
        </div>
      </div>
    </div>
  );
}
