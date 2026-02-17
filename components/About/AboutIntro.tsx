"use client";

import React from "react";
import MagneticLink from "@/components/ui/MagneticLink";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";

const BIO =
  "I am a professional Software Engineer and Content Creator based in Ghana. I am also the Founder of SamCux Development Consult, a software development company focused on building modern digital solutions for businesses and startups.";

const ADDITIONAL_TEXT =
  "Through my work, I help businesses in Ghana leverage software solutions to grow and scale their operations. I create educational content through my YouTube channel and blog, sharing knowledge about software development, technology trends, and building digital solutions.";

const RESUME_URL = "/resume.pdf";

function formatBioWithLink(bio: string) {
  const parts = bio.split("SamCux Development Consult");
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}
        <Link
          href="https://services.samcux.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] underline decoration-2 underline-offset-2 hover:decoration-[#ffe400] transition-colors"
        >
          SamCux Development Consult
        </Link>
        {parts[1]}
      </>
    );
  }
  return bio;
}

export function AboutIntro() {
  const bioToRender = formatBioWithLink(BIO);

  return (
    <div className="space-y-6">
      <div className="relative">
        <p className="text-gray-600 dark:text-[#66768f] leading-relaxed">
          {bioToRender}
        </p>
        <div
          className="absolute -left-4 top-0 w-1 h-full bg-[#ffe400] rounded-full"
          aria-hidden
        />
      </div>

      <p className="text-gray-600 dark:text-[#66768f] leading-relaxed">
        {ADDITIONAL_TEXT}
      </p>

      <div className="flex gap-4 pt-4">
        <MagneticLink
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffe400] dark:bg-[#ffe400] 
            text-[#101010] rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Get in Touch <ArrowRight className="w-4 h-4" />
        </MagneticLink>
        <MagneticLink
          href={RESUME_URL}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ffe400] 
            text-[#101010] dark:text-[#94A9C9] rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Resume <Download className="w-4 h-4" />
        </MagneticLink>
      </div>
    </div>
  );
}
