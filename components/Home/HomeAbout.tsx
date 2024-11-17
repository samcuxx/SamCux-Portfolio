import React from "react";
import { ArrowRight, Code2, Palette, Share2 } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import AnimatedText from "../ui/AnimatedText";
import { DynaPuff } from "next/font/google";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function HomeAbout() {
  const experiences = [
    {
      icon: <Code2 className="w-8 h-8 text-[#ffe400]" />,
      title: "Technical Expertise",
      description: "Specializing in modern web technologies and scalable architecture design.",
      years: "5+ Years"
    },
    {
      icon: <Palette className="w-8 h-8 text-[#ffe400]" />,
      title: "UI/UX Design",
      description: "Creating engaging digital experiences with a focus on user-centered design.",
      years: "4+ Years"
    },
    {
      icon: <Share2 className="w-8 h-8 text-[#ffe400]" />,
      title: "Community Leadership",
      description: "Mentoring developers and contributing to open-source projects.",
      years: "3+ Years"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <div className="space-y-6">
          <AnimatedText
            text="Crafting Digital Excellence"
            className={`${dynaPuff.className} text-4xl lg:text-5xl font-bold text-[#101010] dark:text-[#94A9C9]`}
            initialClass="text-animate-fast"
          />
          <p className="text-gray-600 dark:text-[#66768f] text-lg leading-relaxed">
            As a Software Engineer and Digital Creator, I blend technical expertise with creative vision 
            to deliver exceptional web solutions. My approach combines innovative coding practices with 
            thoughtful design principles to create impactful digital experiences.
          </p>
          <MagneticLink
            href="/about"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ffe400] 
              text-[#101010] rounded-full font-semibold hover:scale-105 
              transition-transform group shadow-lg shadow-[#ffe400]/20"
          >
            Explore My Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MagneticLink>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffe400]/20 to-transparent rounded-3xl -rotate-6" />
          <div className="relative space-y-6">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-gray-100 
                  dark:border-[#222F43] hover:border-[#ffe400] dark:hover:border-[#ffe400] 
                  transition-all duration-300 animate-slideInUp shadow-lg hover:shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-4 rounded-xl bg-[#ffe400] bg-opacity-10">
                  {exp.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-[#101010] dark:text-[#94A9C9]">
                      {exp.title}
                    </h3>
                    <span className="text-sm font-medium text-[#ffe400] bg-[#ffe400]/10 px-3 py-1 rounded-full">
                      {exp.years}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-[#66768f]">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}