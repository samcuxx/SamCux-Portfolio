import React from "react";
import { ArrowRight } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";


export function ContactSection() {
  return (
    <div className="py-12">
      <div className="relative group">
        <div
          className="absolute inset-0 bg-[#ffe400] rounded-2xl rotate-1 
          group-hover:rotate-2 transition-transform opacity-20"
        ></div>

        <div
          className="relative p-12 bg-white dark:bg-[#131C31] rounded-2xl text-center 
          border border-gray-100 dark:border-[#222F43] group-hover:border-[#ffe400] 
          dark:group-hover:border-[#ffe400] transition-all duration-300"
        >
          <h2
            className={`font-dynapuff text-3xl md:text-4xl font-bold mb-4 
            text-[#101010] dark:text-[#94A9C9]`}
          >
            Let&apos;s Work Together
          </h2>

          <p className="text-gray-600 dark:text-[#66768f] mb-8 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can bring your
            ideas to life. I&apos;m always open to new opportunities and
            collaborations.
          </p>

          <MagneticLink
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffe400] 
              text-[#101010] rounded-full font-semibold hover:scale-105 
              transition-transform"
          >
            Get in Touch <ArrowRight className="w-5 h-5" />
          </MagneticLink>
        </div>
      </div>
    </div>
  );
}
