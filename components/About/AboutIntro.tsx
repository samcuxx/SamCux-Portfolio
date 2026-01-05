"use client";

import React from "react";
import MagneticLink from "@/components/ui/MagneticLink";
import { Download, ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function AboutIntro() {
  // Fetch about me data from the database
  const aboutMeData = useQuery(api.aboutMe.get);
  
  // Default values in case data is not available
  const defaultBio = "I am a professional Software Engineer and Content Creator based in Ghana. I am also the Founder of SamCux Development Consult, a software development company focused on building modern digital solutions for businesses and startups.";
  const defaultAdditionalText = "Through my work, I help businesses in Ghana leverage software solutions to grow and scale their operations. I create educational content through my YouTube channel and blog, sharing knowledge about software development, technology trends, and building digital solutions.";
  const defaultLocation = "Your Location";
  const defaultResumeUrl = "/resume.pdf";
  
  // Format bio by replacing [Your Location] with the actual location
  const formatBio = (bio: string, location: string) => {
    return bio.replace("[Your Location]", location);
  };
  
  // Format bio with link to SamCux Development Consult
  const formatBioWithLink = (bio: string) => {
    const parts = bio.split("SamCux Development Consult");
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <Link 
            href="https://services.samcux.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] underline decoration-2 underline-offset-2 hover:decoration-[#ffe400] transition-colors"
          >
            SamCux Development Consult
          </Link>
          {parts[1]}
        </>
      );
    }
    return bio;
  };
  
  // Determine what to display based on data availability
  const bioToDisplay = aboutMeData ? formatBio(aboutMeData.bio, aboutMeData.location) : defaultBio;
  const bioToRender = typeof bioToDisplay === 'string' ? formatBioWithLink(bioToDisplay) : bioToDisplay;
  const additionalTextToDisplay = aboutMeData?.additionalText || defaultAdditionalText;
  const resumeUrl = aboutMeData?.resumeUrl || defaultResumeUrl;
  
  // Loading state
  if (aboutMeData === undefined) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="relative">
          <div className="h-20 bg-gray-200 dark:bg-[#222F43] rounded-md"></div>
          <div className="absolute -left-4 top-0 w-1 h-full bg-[#ffe400] rounded-full"></div>
        </div>
        <div className="h-16 bg-gray-200 dark:bg-[#222F43] rounded-md"></div>
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-32 bg-gray-200 dark:bg-[#222F43] rounded-full"></div>
          <div className="h-12 w-32 bg-gray-200 dark:bg-[#222F43] rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <p className="text-gray-600 dark:text-[#66768f] leading-relaxed">
          {bioToRender}
        </p>
        <div className="absolute -left-4 top-0 w-1 h-full bg-[#ffe400] rounded-full"></div>
      </div>

      <p className="text-gray-600 dark:text-[#66768f] leading-relaxed">
        {additionalTextToDisplay}
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
          href={resumeUrl}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ffe400] 
          text-[#101010] dark:text-[#94A9C9] rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Resume <Download className="w-4 h-4" />
        </MagneticLink>
      </div>
    </div>
  );
} 