"use client";

import React from "react";
import { AboutHeader } from "./AboutHeader";
import { AboutIntro } from "./AboutIntro";
import { AboutExperience } from "./AboutExperience";
import { AboutTechStack } from "./AboutTechStack";
import { AboutImage } from "./AboutImage";
import { AboutStats } from "./AboutStats";
import { AboutEducation } from "./AboutEducation";
import { motion } from "framer-motion";

export function AboutContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-6 mb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AboutHeader />
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div 
          className="space-y-8"
          variants={columnVariants}
        >
          <AboutIntro />
          <AboutStats />
          <AboutExperience />
        </motion.div>

        <motion.div 
          className="space-y-12"
          variants={columnVariants}
        >
          <AboutImage />
          <AboutTechStack />
          <AboutEducation />
        </motion.div>
      </div>
    </motion.div>
  );
}
