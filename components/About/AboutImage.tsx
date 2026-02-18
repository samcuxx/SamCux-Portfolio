"use client";

import React from "react";
import ProfileImage from "@/public/images/profile.jpg";
import { PixelImage } from "@/components/ui/PixelImage";
import { getConvexImageUrl } from "@/lib/utils";

type AboutImageProps = {
  aboutMeData: any;
};

export function AboutImage({ aboutMeData }: AboutImageProps) {
  const profileImageUrl = aboutMeData?.profileImageUrl as string | undefined;

  let resolvedSrc: string;

  if (profileImageUrl) {
    const isStorageId =
      !profileImageUrl.includes("://") && !profileImageUrl.startsWith("/");
    resolvedSrc = isStorageId
      ? getConvexImageUrl(profileImageUrl)
      : profileImageUrl;
  } else {
    resolvedSrc = ProfileImage.src;
  }

  return (
    <div className="relative group">
      <div className="relative z-10 rounded-2xl overflow-hidden aspect-[5/6]">
        <PixelImage src={resolvedSrc} grid="6x4" className="w-full h-full" />
      </div>
      <div
        className="absolute inset-0 bg-[#ffe400] dark:bg-[#ffe400] opacity-20 rounded-2xl 
          transform rotate-3 group-hover:rotate-6 transition-transform duration-300"
        aria-hidden
      />
    </div>
  );
}

