import React from "react";
import AnimatedText from "../ui/AnimatedText";
import { DynaPuff } from "next/font/google";
import { Code2, Sparkles, ArrowRight } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function HeroContent() {
  return (
    <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Decorative background elements */}
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#ffe400]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] bg-[#ffe400]/5 rounded-full blur-2xl -z-10" />
      
      <div className="lg:w-1/2 space-y-8 animate-slideInLeft">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffe400]/10 rounded-full">
          <Sparkles className="w-4 h-4 text-[#ffe400]" />
          <span className="text-sm font-medium text-gray-600 dark:text-[#94A9C9]">
            Welcome to my digital space
          </span>
        </div>

        <div>
          <h1 className={`${dynaPuff.className} text-5xl lg:text-7xl font-bold text-[#101010] dark:text-[#94A9C9] mb-4`}>
            <AnimatedText
              text="Hey, I&apos;m"
              className="block"
              initialClass="text-animate-fast"
            />
            <AnimatedText
              text="SamCux"
              className="text-[#ffe400] block"
              initialClass="text-animate-fast"
              animationDelay={100}
            />
          </h1>
          <p className="text-xl text-gray-600 dark:text-[#66768f] leading-relaxed">
            A passionate Software Engineer and Creative Developer crafting exceptional digital experiences.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <MagneticLink
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffe400] text-[#101010] 
              rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-[#ffe400]/20"
          >
            View Projects
            <ArrowRight className="w-5 h-5" />
          </MagneticLink>
          <MagneticLink
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ffe400] 
              text-[#101010] dark:text-[#94A9C9] rounded-full font-semibold 
              hover:bg-[#ffe400]/10 transition-all duration-300"
          >
            Let&apos;s Connect
          </MagneticLink>
        </div>
      </div>

      <div className="lg:w-1/2 relative animate-slideInRight">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffe400]/20 to-transparent rounded-3xl -rotate-6" />
        <div className="relative p-8 bg-white dark:bg-[#131C31] rounded-2xl border border-gray-100 dark:border-[#222F43]">
          <Code2 className="w-12 h-12 text-[#ffe400] mb-4" />
          <div className="space-y-2 font-mono">
            <p className="text-gray-600 dark:text-[#94A9C9]">{"<code>"}</p>
            <p className="pl-4 text-[#ffe400]">const developer = {"{"}</p>
            <p className="pl-8">name: &quot;SamCux&quot;,</p>
            <p className="pl-8">passion: &quot;Web Development&quot;,</p>
            <p className="pl-8">loves: [&quot;React&quot;, &quot;Design&quot;, &quot;Innovation&quot;]</p>
            <p className="pl-4">{"}"}</p>
            <p className="text-gray-600 dark:text-[#94A9C9]">{"</code>"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
