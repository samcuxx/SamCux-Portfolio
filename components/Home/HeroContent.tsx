import React from "react";
import AnimatedText from "../ui/AnimatedText";
import { DynaPuff } from "next/font/google";
import { ArrowDown } from "lucide-react";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function HeroContent() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffe400]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffe400]/5 rounded-full blur-2xl -z-10" />

      <div className="space-y-8 text-center">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 px-6 py-2 bg-[#ffe400]/10 rounded-full text-gray-600 dark:text-[#94A9C9] animate-slideInDown">
            <span className="w-2 h-2 bg-[#ffe400] rounded-full animate-pulse"></span>
            Software Engineer & Digital Creator
          </p>

          <div className="relative">
            <AnimatedText
              text="SamCux"
              className={`${dynaPuff.className} text-7xl sm:text-8xl md:text-9xl font-bold text-[#101010] dark:text-[#94A9C9] tracking-tight`}
              initialClass="text-animate-fast"
              animationDelay={100}
              color="#ffe400"
            />
            <div className="absolute -right-4 top-0 w-20 h-20 bg-[#ffe400] rounded-full blur-2xl opacity-20 animate-pulse"></div>
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-[#66768f] leading-relaxed animate-fadeIn">
          Crafting exceptional digital experiences through innovative code and
          creative design. Let's build something amazing together.
        </p>

        <div className="pt-12 animate-bounce">
          <ArrowDown className="w-6 h-6 mx-auto text-[#ffe400]" />
        </div>
      </div>
    </div>
  );
}
