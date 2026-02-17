"use client";

import React from "react";
import { ArrowRight, Github, Linkedin, Mail, Link2 } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import AnimatedText from "../ui/AnimatedText";
import { MorphingText } from "../ui/MorphingText";
import Link from "next/link";

const HERO_SOCIAL_LINKS = [
  {
    icon: "Github",
    url: "https://github.com/samcuxx",
    platform: "GitHub",
  },
  {
    icon: "Linkedin",
    url: "https://linkedin.com/in/samcux",
    platform: "LinkedIn",
  },
  {
    icon: "Mail",
    url: "mailto:samcuxx@gmail.com",
    platform: "Email",
  },
] as const;

const renderSocialIcon = (iconName: string) => {
  switch (iconName) {
    case "Github":
      return <Github className="w-5 h-5" />;
    case "Linkedin":
      return <Linkedin className="w-5 h-5" />;
    case "Mail":
      return <Mail className="w-5 h-5" />;
    default:
      return <Link2 className="w-5 h-5" />;
  }
};

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
            className={`font-dynapuff text-6xl md:text-8xl font-bold text-[#101010] dark:text-[#94A9C9]`}
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

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slideInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffe400] 
              text-[#101010] rounded-full font-semibold hover:scale-105 
              transition-transform group"
          >
            Let&apos;s Talk
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex gap-3">
            {HERO_SOCIAL_LINKS.map((link, index) => (
              <MagneticLink
                key={index}
                href={link.url}
                className="p-3 rounded-lg bg-white dark:bg-sa-dark-foregroung border 
                  border-gray-200 dark:border-sa-dark-border hover:border-[#ffe400]
                  dark:hover:border-[#ffe400] transition-all duration-300
                  hover:scale-110 group"
                aria-label={link.platform}
              >
                {renderSocialIcon(link.icon)}
              </MagneticLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
