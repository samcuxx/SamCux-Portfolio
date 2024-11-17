import React from "react";
import { ArrowRight, Mail} from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import AnimatedText from "../ui/AnimatedText";
import { DynaPuff } from "next/font/google";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function HomeContact() {


  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <AnimatedText
          text="Let's Connect"
          className={`${dynaPuff.className} text-4xl font-bold mb-6 text-[#101010] dark:text-[#94A9C9]`}
          initialClass="text-animate-fast"
        />
        <p className="text-gray-600 dark:text-[#66768f] leading-relaxed max-w-2xl mx-auto text-lg">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-4">
          <MagneticLink
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffe400] 
              text-[#101010] rounded-full font-semibold hover:scale-105 
              transition-transform group shadow-lg shadow-[#ffe400]/20"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MagneticLink>

          <MagneticLink
            href="mailto:samcuxx@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#ffe400] 
              text-[#101010] dark:text-[#94A9C9] rounded-full font-semibold hover:scale-105 
              transition-transform group"
          >
            Email Me
            <Mail className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
          </MagneticLink>
        </div>

        {/* <div className="flex gap-4 mt-8">
          {socialLinks.map((link, index) => (
            <MagneticLink
              key={index}
              href={link.href}
              className="p-3 rounded-full bg-[#ffe400] bg-opacity-10 hover:bg-opacity-20
                text-[#101010] dark:text-[#94A9C9] transition-all duration-300
                hover:scale-110"
              aria-label={link.label}
            >
              {link.icon}
            </MagneticLink>
          ))}
        </div> */}
      </div>
    </div>
  );
} 