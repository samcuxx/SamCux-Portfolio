"use client";

import React from "react";
import ProfileImage from "@/public/images/profile.jpg";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export function AboutImage() {
  const aboutMeData = useQuery(api.aboutMe.get);
  const profileImageUrl = aboutMeData?.profileImageUrl;

  if (aboutMeData === undefined) {
    return (
      <div className="relative group">
        <div className="relative z-10 rounded-2xl overflow-hidden bg-gray-200 dark:bg-[#222F43] aspect-[5/6] max-h-[500px] w-full animate-pulse" />
        <div className="absolute inset-0 rounded-2xl transform rotate-3 bg-gray-200/20 dark:bg-[#222F43]/20" />
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="relative z-10 rounded-2xl overflow-hidden">
        {profileImageUrl ? (
          <OptimizedImage
            src={profileImageUrl}
            alt="Profile"
            width={500}
            height={600}
            className="w-full h-auto object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <Image
            src={ProfileImage}
            alt="Profile"
            width={500}
            height={600}
            className="w-full h-auto object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        )}
      </div>
      <div
        className="absolute inset-0 bg-[#ffe400] dark:bg-[#ffe400] opacity-20 rounded-2xl 
          transform rotate-3 group-hover:rotate-6 transition-transform duration-300"
        aria-hidden
      />
    </div>
  );
}
