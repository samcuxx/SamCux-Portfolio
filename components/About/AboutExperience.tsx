"use client";

import React from "react";
import { Briefcase, Building2, Calendar } from "lucide-react";
import { DynaPuff } from "next/font/google";
import { motion } from "framer-motion";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function AboutExperience() {
  const experiences = [
    {
      year: "2023 - Present",
      title: "Senior Software Engineer",
      company: "Company Name",
      description: "Leading development of modern web applications using React and Next.js",
      achievements: [
        "Led team of 5 developers",
        "Improved performance by 40%",
        "Implemented CI/CD pipeline"
      ]
    },
    {
      year: "2021 - 2023",
      title: "Full Stack Developer",
      company: "Previous Company",
      description: "Developed and maintained full-stack applications",
      achievements: [
        "Developed 10+ features",
        "Reduced bug count by 60%",
        "Mentored junior developers"
      ]
    },
  ];

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

  const experienceVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const achievementVariants = {
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

  return (
    <motion.div 
      className="pt-8"
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
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Briefcase className="w-6 h-6 text-[#ffe400]" />
        </motion.div>
        <h3 className={`${dynaPuff.className} text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}>
          Experience
        </h3>
      </motion.div>
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={experienceVariants}
            whileHover={{ scale: 1.02, x: 4 }}
            className="relative pl-6 border-l-2 border-[#ffe400] dark:border-[#ffe400] 
              group hover:bg-gray-50 dark:hover:bg-[#131C31] p-6 
              rounded-xl transition-all duration-300 hover:border-l-4"
          >
            <motion.div 
              className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-[#ffe400]"
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#66768f] mb-2"
              variants={achievementVariants}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Calendar className="w-4 h-4" />
              </motion.div>
              <span className="group-hover:text-[#ffe400] transition-colors">
                {exp.year}
              </span>
            </motion.div>

            <motion.h4 
              className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-1"
              variants={achievementVariants}
            >
              {exp.title}
            </motion.h4>

            <motion.div 
              className="flex items-center gap-2 text-gray-600 dark:text-[#66768f] mb-3"
              variants={achievementVariants}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Building2 className="w-4 h-4" />
              </motion.div>
              <p>{exp.company}</p>
            </motion.div>

            <motion.p 
              className="text-gray-600 dark:text-[#66768f] mb-4"
              variants={achievementVariants}
            >
              {exp.description}
            </motion.p>

            <motion.ul 
              className="space-y-2"
              variants={containerVariants}
            >
              {exp.achievements.map((achievement, i) => (
                <motion.li 
                  key={i}
                  variants={achievementVariants}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#66768f]"
                  whileHover={{ x: 4 }}
                >
                  <motion.span 
                    className="w-1.5 h-1.5 bg-[#ffe400] rounded-full"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  {achievement}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}