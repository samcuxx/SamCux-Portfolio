import React from "react";
import {  Instagram } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";

export function PhotosIntro() {
  return (
    <div className="space-y-6 animate-slideInUp">
      <div className="relative">
        <p className="text-gray-600 dark:text-[#66768f] leading-relaxed text-center max-w-2xl mx-auto">
          A collection of moments captured through my lens. From urban landscapes to
          personal adventures, these photos tell stories of my journey and the world
          as I see it.
        </p>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <MagneticLink
          href="https://instagram.com/samcuxx"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffe400] dark:bg-[#ffe400] 
            text-[#101010] rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Follow on Instagram <Instagram className="w-4 h-4" />
        </MagneticLink>
      </div>
    </div>
  );
} 