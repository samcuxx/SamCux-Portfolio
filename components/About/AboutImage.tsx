import React from "react";
import Image from "next/image";
import ProfileImage from "@/public/images/profile.jpg";

export function AboutImage() {
  return (
    <div className="relative group">
      <div className="relative z-10 rounded-2xl overflow-hidden">
        <Image
          src={ProfileImage}
          alt="Profile"
          width={500}
          height={600}
          className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-[#ffe400] dark:bg-[#ffe400] opacity-20 rounded-2xl 
        transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
      </div>
    </div>
  );
} 