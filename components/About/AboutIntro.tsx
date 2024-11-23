"use client";

import React from "react";
import MagneticLink from "@/components/ui/MagneticLink";
import { Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function AboutIntro() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <motion.div
          className="absolute -left-4 top-0 w-1 h-full bg-[#ffe400] rounded-full"
          variants={lineVariants}
        />
        <motion.p 
          className="text-gray-600 dark:text-[#66768f] leading-relaxed"
          variants={textVariants}
        >
          Hey there! I&apos;m a passionate Software Engineer and Content Creator
          based in [Your Location]. I love building beautiful, responsive,
          and user-friendly web applications while sharing my journey and
          knowledge with others.
        </motion.p>
      </div>

      <motion.p 
        className="text-gray-600 dark:text-[#66768f] leading-relaxed"
        variants={textVariants}
      >
        When I&apos;m not coding, you can find me creating content, exploring new
        technologies, or contributing to open-source projects. I believe in
        continuous learning and sharing knowledge with the developer community.
      </motion.p>

      <motion.div 
        className="flex gap-4 pt-4"
        variants={buttonVariants}
      >
        <MagneticLink
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffe400] dark:bg-[#ffe400] 
            text-[#101010] rounded-full font-semibold hover:scale-105 transition-transform group"
        >
          <span>Get in Touch</span>
          <motion.div
            className="inline-block"
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </MagneticLink>

        <MagneticLink
          href="/resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ffe400] 
            text-[#101010] dark:text-[#94A9C9] rounded-full font-semibold hover:scale-105 transition-transform group"
        >
          <span>Resume</span>
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Download className="w-4 h-4" />
          </motion.div>
        </MagneticLink>
      </motion.div>
    </div>
  );
}