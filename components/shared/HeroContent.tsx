import React from "react";
import AnimatedText from "../ui/AnimatedText";
import { DynaPuff } from "next/font/google";
const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function HeroContent() {
  return (
    <div className="text-center">
      <p className="text-xl mb-2 text-gray-600 dark:text-[#66768f] text-left">
        <span className="wave-emoji inline-block">👋</span> I am
      </p>
      <AnimatedText
        text="SamCux"
        className={`${dynaPuff.className} text-7xl sm:text-8xl md:text-9xl lg:text-[15rem] font-bold mb-4 animate-spin-slow text-[#101010] dark:text-[#94A9C9]`}
        initialClass="text-animate-fast"
        animationDelay={100}
        color="#ffe400"
      />
      <p className="text-xl mb-2 text-gray-600 dark:text-[#66768f] text-right">
        Passionate Software Engineer <br /> & Content Creator
      </p>
    </div>
  );
}
