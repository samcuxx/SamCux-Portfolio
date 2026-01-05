"use client";
import React from "react";
import { Github, Youtube, Linkedin, Mail, ArrowUp, Loader2, Link2 } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import * as Icons from "lucide-react";


export function Footer() {
  // Fetch social links from the database
  const socialLinks = useQuery(api.socials.getForFooter);
  
  // Fallback social links in case database is empty or loading
  const fallbackSocialLinks = [
    {
      icon: "Github",
      url: "https://github.com/samcuxx",
      platform: "GitHub",
    },
    {
      icon: "Youtube",
      url: "https://youtube.com/@samcux",
      platform: "YouTube",
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
  ];

  // Render the icon for a social link
  const renderSocialIcon = (iconName: string) => {
    // @ts-ignore - Dynamically access icon from Lucide
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Link2 className="w-5 h-5" />;
  };

  // Determine which links to display
  const linksToDisplay = socialLinks && socialLinks.length > 0 
    ? socialLinks 
    : fallbackSocialLinks;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white dark:bg-[#131C31] border-t border-gray-100 dark:border-[#222F43]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3
              className={`font-dynapuff text-2xl font-bold text-[#101010] dark:text-[#94A9C9]`}
            >
              SamCux
            </h3>
            <p className="text-gray-600 dark:text-[#66768f] text-sm">
              Software Engineer & Content Creator. Founder of{" "}
              <Link 
                href="https://services.samcux.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] underline decoration-2 underline-offset-2 hover:decoration-[#ffe400] transition-colors"
              >
                SamCux Development Consult
              </Link>
              , building modern digital solutions for businesses and startups in Ghana.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#101010] dark:text-[#94A9C9]">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-gray-600 dark:text-[#66768f] hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-gray-600 dark:text-[#66768f] hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 dark:text-[#66768f] hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#101010] dark:text-[#94A9C9]">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks === undefined ? (
                // Loading state
                <div className="p-2 rounded-lg bg-[#ffe400] bg-opacity-10">
                  <Loader2 className="w-5 h-5 text-[#ffe400] animate-spin" />
                </div>
              ) : (
                // Display social links
                linksToDisplay.map((link, index) => (
                  <MagneticLink
                    key={index}
                    href={link.url}
                    className="p-2 rounded-lg bg-[#ffe400] bg-opacity-10 hover:bg-opacity-20
                      text-[#101010] dark:text-[#ffe400] transition-all duration-300
                      hover:scale-110"
                    aria-label={link.platform}
                  >
                    {link.icon ? (
                      renderSocialIcon(link.icon)
                    ) : (
                      <Link2 className="w-5 h-5" />
                    )}
                  </MagneticLink>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-[#222F43]">
          <p className="text-gray-600 dark:text-[#66768f] text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Samuel Amoah |{" "}
            <Link 
              href="https://services.samcux.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#ffe400] underline decoration-1 underline-offset-2 transition-colors"
            >
              SamCux Development Consult
            </Link>
            . All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-[#ffe400] bg-opacity-10 hover:bg-opacity-20
              text-[#101010] dark:text-[#94A9C9] transition-all duration-300
              hover:scale-110 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
