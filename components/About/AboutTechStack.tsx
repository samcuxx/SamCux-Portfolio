"use client";

import React from "react";
import { Code2 } from "lucide-react";
import { DynaPuff } from "next/font/google";
import { motion } from "framer-motion";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function AboutTechStack() {
  const skills = [
    { name: "JavaScript", icon: "💛" },
    { name: "TypeScript", icon: "💙" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "💚" },
    { name: "Python", icon: "🐍" },
    { name: "TailwindCSS", icon: "🎨" },
    { name: "Git", icon: "📚" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
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

  const skillVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="pt-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div 
        className="flex items-center gap-2 mb-6"
        variants={titleVariants}
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Code2 className="w-6 h-6 text-[#ffe400]" />
        </motion.div>
        <h3 className={`${dynaPuff.className} text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}>
          Tech Stack
        </h3>
      </motion.div>
      <motion.div 
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="group relative"
            variants={skillVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="absolute inset-0 bg-[#ffe400] rounded-xl opacity-20"
              initial={{ rotate: 1 }}
              whileHover={{ rotate: 3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div 
              className="relative p-4 bg-white dark:bg-[#131C31] rounded-xl 
                text-gray-700 dark:text-[#94A9C9] font-medium
                transition-all duration-300 cursor-default border border-gray-100 
                dark:border-[#222F43] group-hover:border-[#ffe400] 
                dark:group-hover:border-[#ffe400]"
            >
              <div className="flex items-center gap-2">
                <motion.span 
                  className="text-xl"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {skill.icon}
                </motion.span>
                <span>{skill.name}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}