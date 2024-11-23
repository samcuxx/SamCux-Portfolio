'use client';

import React from "react";
import { DynaPuff } from "next/font/google";
import { motion } from "framer-motion";
import { Code2, Folder, Star } from "lucide-react";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function ProjectsHeader() {
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

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const floatingIconVariants = {
    hidden: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="text-center mb-12 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="absolute -top-8 left-1/4"
        variants={floatingIconVariants}
        animate="animate"
      >
        <motion.div
          variants={iconVariants}
          className="p-4 bg-[#ffe400]/10 rounded-full"
          whileHover={{ 
            scale: 1.2,
            rotate: 360,
            transition: { duration: 0.5 }
          }}
        >
          <Code2 className="w-6 h-6 text-[#ffe400]" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute top-0 right-1/4"
        variants={floatingIconVariants}
        animate="animate"
        transition={{ delay: 1 }}
      >
        <motion.div
          variants={iconVariants}
          className="p-4 bg-[#ffe400]/10 rounded-full"
          whileHover={{ 
            scale: 1.2,
            rotate: -360,
            transition: { duration: 0.5 }
          }}
        >
          <Star className="w-6 h-6 text-[#ffe400]" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute -bottom-4 left-1/2 -translate-x-1/2"
        variants={floatingIconVariants}
        animate="animate"
        transition={{ delay: 2 }}
      >
        <motion.div
          variants={iconVariants}
          className="p-4 bg-[#ffe400]/10 rounded-full"
          whileHover={{ 
            scale: 1.2,
            rotate: 360,
            transition: { duration: 0.5 }
          }}
        >
          <Folder className="w-6 h-6 text-[#ffe400]" />
        </motion.div>
      </motion.div>

      <motion.h1
        variants={titleVariants}
        className={`${dynaPuff.className} text-4xl md:text-5xl font-bold mb-8 text-[#101010] dark:text-[#94A9C9]`}
        whileHover={{ 
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 10
          }
        }}
      >
        My Projects
      </motion.h1>
    </motion.div>
  );
}