"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import navItems from "@/components/data/NavItem";
import Theme from "./Theme";
import MobileMenu from "./MobileMenu";
import MagneticLink from "../ui/MagneticLink";
import Image from "next/image";
import Logo from "@/public/logo.png";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-[#131C31]/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="relative w-8 h-8 hover:scale-110 transition-transform"
            >
              <Image
                src={Logo}
                alt="SamCux Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <MagneticLink
                  key={item.id}
                  href={item.path}
                  className={`relative font-medium transition-colors ${
                    pathname === item.path
                      ? "text-[#ffe400] dark:text-[#ffe400]"
                      : "text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] dark:hover:text-[#ffe400]"
                  }`}
                >
                  {item.title}
                  {pathname === item.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ffe400] rounded-full" />
                  )}
                </MagneticLink>
              ))}
              <Theme />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <Theme />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-[#ffe400] bg-opacity-10 hover:bg-opacity-20
                  text-[#101010] dark:text-[#94A9C9] transition-all duration-300"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
