"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import AnimatedText from "../ui/AnimatedText";
import { MorphingText } from "../ui/MorphingText";
import Link from "next/link";
import { HeroContactWidget } from "./HeroContactWidget";

export function HeroSection() {

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-9rem)]">
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-6 max-w-6xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border 
          border-gray-200 dark:border-sa-dark-border backdrop-blur-sm animate-fadeIn"
        >
          <span className="w-2 h-2 bg-[#ffe400] rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-600 dark:text-sa-dark-text-main">
            Available for freelance work
          </span>
        </div>

        <div
          className="space-y-4 animate-slideInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <AnimatedText
            text="SamCux"
            className={`font-dynapuff text-6xl md:text-7xl font-bold text-[#101010] dark:text-[#94A9C9]`}
            initialClass="text-animate-fast"
          />
          <MorphingText
            texts={["Software Engineer", "Content Creator"]}
            className="mt-1"
          />
        </div>
        <p
          className="text-gray-600 dark:text-[#66768f] text-lg max-w-2xl mx-auto animate-slideInUp"
          style={{ animationDelay: "0.4s" }}
        >
          Founder of{" "}
          <Link
            href="https://services.samcux.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline decoration-[#ffe400] decoration-2 underline-offset-4 hover:text-[#ffe400] transition-colors"
          >
            SamCux Development Consult
          </Link>
          . Building modern digital solutions for businesses and startups in Ghana.
          I help transform ideas into{" "}
          <span className="font-semibold text-[#ffe400] bg-[#ffe40033] px-1 rounded-sm">
            polished software products
          </span>{" "}
          through clean code and thoughtful engineering solutions.
        </p>

        {/* Contact: email + pill social bar (sameerasw-style) */}
        <div className="pt-2 animate-slideInUp" style={{ animationDelay: "0.5s" }}>
          <HeroContactWidget />
        </div>

     
      </div>
    </div>
  );
}
