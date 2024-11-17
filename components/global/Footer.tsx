"use client"
import React from "react";
import { Github, Youtube, Linkedin, Mail, ArrowUp } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import { DynaPuff } from "next/font/google";
import Link from "next/link";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function Footer() {
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/samcuxx", label: "GitHub" },
    { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com/@samcux", label: "YouTube" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/samcux", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:samcuxx@gmail.com", label: "Email" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white dark:bg-[#131C31] border-t border-gray-100 dark:border-[#222F43]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className={`${dynaPuff.className} text-2xl font-bold text-[#101010] dark:text-[#94A9C9]`}>
              SamCux
            </h3>
            <p className="text-gray-600 dark:text-[#66768f] text-sm">
              Software Engineer & Content Creator, passionate about building beautiful web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#101010] dark:text-[#94A9C9]">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-gray-600 dark:text-[#66768f] hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-gray-600 dark:text-[#66768f] hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-[#66768f] hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#101010] dark:text-[#94A9C9]">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <MagneticLink
                  key={index}
                  href={link.href}
                  className="p-2 rounded-lg bg-[#ffe400] bg-opacity-10 hover:bg-opacity-20
                    text-[#101010] dark:text-[#ffe400] transition-all duration-300
                    hover:scale-110"
                  aria-label={link.label}
                >
                  {link.icon}
                </MagneticLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-[#222F43]">
          <p className="text-gray-600 dark:text-[#66768f] text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SamCux. All rights reserved.
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
