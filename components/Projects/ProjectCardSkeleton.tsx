"use client";

import React from "react";
import { Skeleton } from "../ui/Skeleton";

// Memoized skeleton components for better performance
export const ProjectCardSkeleton = React.memo(function ProjectCardSkeleton() {
  return (
    <div className="group relative bg-white dark:bg-[#131C31] rounded-xl overflow-hidden
      border border-gray-100 dark:border-[#222F43] transition-all duration-300
      shadow-sm flex flex-col h-full">
      {/* Image skeleton with fixed height */}
      <div className="relative overflow-hidden" style={{ minHeight: '200px' }}>
        <Skeleton className="w-full h-full absolute inset-0 rounded-t-xl" />
      </div>

      {/* Content skeleton */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 rounded-md" />
        
        {/* Description skeleton */}
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>
        
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          <Skeleton className="h-6 w-16 rounded-lg" />
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-6 w-14 rounded-lg" />
        </div>
      </div>
    </div>
  );
});

export const FeaturedProjectCardSkeleton = React.memo(function FeaturedProjectCardSkeleton() {
  return (
    <div className="group relative bg-white dark:bg-[#131C31] rounded-2xl overflow-hidden
      border border-gray-100 dark:border-[#222F43] transition-all duration-300
      shadow-sm">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image skeleton with fixed height */}
        <div className="relative overflow-hidden" style={{ minHeight: '250px' }}>
          <Skeleton className="w-full h-full absolute inset-0 rounded-l-2xl md:rounded-l-2xl md:rounded-r-none" />
        </div>

        {/* Content skeleton */}
        <div className="p-6 flex flex-col justify-center space-y-4">
          {/* Title skeleton */}
          <Skeleton className="h-7 w-3/4 rounded-md" />
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-4/5 rounded-md" />
          </div>
          
          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}); 