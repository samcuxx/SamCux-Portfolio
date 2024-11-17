import React from "react";
import { Github, Youtube, Instagram, Linkedin } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";

export function SocialLinks() {
  return (
    <div className="absolute bottom-8 left-8 flex flex-col space-y-4">
      <MagneticLink
        href="https://github.com/samcuxx"
        className="text-gray-600 dark:text-[#66768f] hover:text-gray-800 dark:hover:text-[#ffe400] transition-colors"
      >
        <Github size={18} />
      </MagneticLink>
      <MagneticLink
        href="https://youtube.com/@samcux"
        className="text-gray-600 dark:text-[#66768f] hover:text-gray-800 dark:hover:text-[#ffe400] transition-colors"
      >
        <Youtube size={18} />
      </MagneticLink>
      <MagneticLink
        href="https://instagram.com/samcuxx"
        className="text-gray-600 dark:text-[#66768f] hover:text-gray-800 dark:hover:text-[#ffe400] transition-colors"
      >
        <Instagram size={18} />
      </MagneticLink>
      <MagneticLink
        href="https://linkedin.com/in/samcux"
        className="text-gray-600 dark:text-[#66768f] hover:text-gray-800 dark:hover:text-[#ffe400] transition-colors"
      >
        <Linkedin size={18} />
      </MagneticLink>
    </div>
  );
}
