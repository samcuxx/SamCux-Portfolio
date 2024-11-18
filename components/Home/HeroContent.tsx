import React from "react";
import AnimatedText from "../ui/AnimatedText";
import { DynaPuff } from "next/font/google";
const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function HeroContent() {
  return (
    <div className="text-center max-w-[95vw] mx-auto px-2 sm:px-4 lg:px-6">
      <p className="text-lg sm:text-xl md:text-2xl mb-3 text-gray-600 dark:text-[#66768f] text-left animate-slideInLeft">
        <span className="wave-emoji inline-block animate-wave">👋</span> I am
      </p>
      <div className="animate-float">
        <AnimatedText
          text="SamCux"
          className={`${dynaPuff.className} text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] font-bold mb-4 animate-spin-slow text-[#101010] dark:text-[#94A9C9] transition-colors duration-300`}
          initialClass="text-animate-fast"
          animationDelay={100}
          color="#ffe400"
        />
      </div>
      <p className="text-lg sm:text-xl md:text-2xl mb-3 text-gray-600 dark:text-[#66768f] text-right animate-slideInRight">
        Passionate Software Engineer <br className="sm:hidden" /> & Content
        Creator
      </p>
    </div>
  );
}
