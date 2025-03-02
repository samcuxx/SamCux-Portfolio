"use client";

import React from "react";
import Image from "next/image";
import ProfileImage from "@/public/images/profile.jpg";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";

export function AboutImage() {
  // Fetch about me data from the database
  const aboutMeData = useQuery(api.aboutMe.get);
  
  // Use the profile image from the database if available, otherwise use the default
  const profileImageUrl = aboutMeData?.profileImageUrl;
  
  // Loading state
  if (aboutMeData === undefined) {
    return (
      <div className="relative group animate-pulse">
        <div className="relative z-10 rounded-2xl overflow-hidden bg-gray-200 dark:bg-[#222F43] w-full h-[500px] flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-gray-400 dark:text-[#66768f] animate-spin" />
        </div>
        <div className="absolute inset-0 bg-[#ffe400] dark:bg-[#ffe400] opacity-20 rounded-2xl 
          transform rotate-3">
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="relative z-10 rounded-2xl overflow-hidden">
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt="Profile"
            width={500}
            height={600}
            className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Image
            src={ProfileImage}
            alt="Profile"
            width={500}
            height={600}
            className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-[#ffe400] dark:bg-[#ffe400] opacity-20 rounded-2xl 
        transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
      </div>
    </div>
  );
} 