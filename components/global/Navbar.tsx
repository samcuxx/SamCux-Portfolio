"use client";
import React, { useState } from "react";import { usePathname } from "next/navigation";
import { Menu, X, Home, User, Code, Mail } from "lucide-react";
import navItems from "@/components/data/NavItem";
import Theme from "./Theme";
import MobileMenu from "./MobileMenu";
import MagneticLink from "../ui/MagneticLink";

const navIcons = {
  "/": <Home className="w-5 h-5" />,
  "/about": <User className="w-5 h-5" />,
  "/projects": <Code className="w-5 h-5" />,
  "/contact": <Mail className="w-5 h-5" />,
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 dark:bg-[#131C31]/80 
        backdrop-blur-md shadow-lg rounded-full py-2 px-6 transition-all duration-300 hidden md:block">
        <div className="mx-auto">
          <div className="flex items-center justify-center gap-8">
            {navItems.map((item) => (
              <MagneticLink
                key={item.id}
                href={item.path}
                className={`relative font-medium transition-colors group ${
                  pathname === item.path
                    ? "text-[#ffe400] dark:text-[#ffe400]"
                    : "text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] dark:hover:text-[#ffe400]"
                }`}
              >
                <div className="relative">
                  {navIcons[item.path as keyof typeof navIcons]}
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs opacity-0 
                    group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.title}
                  </span>
                </div>
              </MagneticLink>
            ))}
            <Theme />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-[#131C31]/80 
          backdrop-blur-md shadow-lg md:hidden transition-all duration-300 ease-bounce
          ${isMobileMenuOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`}
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-[#ffe400]" />
        ) : (
          <Menu className="w-6 h-6 text-[#101010] dark:text-[#94A9C9]" />
        )}
      </button>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
