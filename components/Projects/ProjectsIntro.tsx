'use client';

import React from "react";
import { Github, ExternalLink } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import { motion } from "framer-motion";

export function ProjectsIntro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.6
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="relative"
        variants={itemVariants}
      >
        <motion.p 
          className="text-gray-600 dark:text-[#66768f] leading-relaxed text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.4
          }}
        >
          Explore my portfolio of projects showcasing my expertise in web development,
          from responsive applications to innovative solutions using modern technologies.
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex justify-center gap-4 pt-4"
        variants={buttonContainerVariants}
      >
        <motion.div variants={buttonVariants}>
          <MagneticLink
            href="https://github.com/samcuxx"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffe400] dark:bg-[#ffe400] 
              text-[#101010] rounded-full font-semibold hover:scale-105 transition-transform group"
          >
            GitHub Profile 
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </motion.div>
          </MagneticLink>
        </motion.div>

        <motion.div variants={buttonVariants}>
          <MagneticLink
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ffe400] 
              text-[#101010] dark:text-[#94A9C9] rounded-full font-semibold hover:scale-105 transition-transform group"
          >
            Work With Me 
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </motion.div>
          </MagneticLink>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}