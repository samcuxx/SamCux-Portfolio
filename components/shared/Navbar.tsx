import React from "react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import SamCuxLogo from "@/app/assets/images/Logo-svg.svg";
import MagneticLink from "../ui/MagneticLink";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <MagneticLink href="/">
            <Image
              src={SamCuxLogo}
              alt="SamCux Logo"
              width={35}
              height={35}
              className="object-contain"
            />
          </MagneticLink>
        </div>
        <nav className="hidden md:flex space-x-10">
          <MagneticLink
            href="about"
            className="text-gray-600 dark:text-[#66768f] hover:text-gray-800 dark:hover:text-[#ffe400] transition-colors"
          >
            About
          </MagneticLink>
          <MagneticLink
            href="#project"
            className="text-gray-600 dark:text-[#66768f] hover:text-gray-800 dark:hover:text-[#ffe400] transition-colors"
          >
            Project
          </MagneticLink>
          <MagneticLink
            href="#contact"
            className="text-gray-600 dark:text-[#66768f] hover:text-gray-800 dark:hover:text-[#ffe400] transition-colors"
          >
            Contact
          </MagneticLink>
        </nav>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
