"use client";

import React from "react";
import { GraduationCap, Award } from "lucide-react";
import { DynaPuff } from "next/font/google";
import { motion } from "framer-motion";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function AboutEducation() {
  const education = [
    {
      type: "certification",
      title: "AWS Certified Developer",
      institution: "Amazon Web Services",
      year: "2023",
      icon: <Award className="w-4 h-4" />
    },
    {
      type: "education",
      title: "Computer Science",
      institution: "University Name",
      year: "2019 - 2023",
      icon: <GraduationCap className="w-4 h-4" />
    }
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
    hidden: { opacity: 0, y: -20 },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const iconContainerVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
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
          <GraduationCap className="w-6 h-6 text-[#ffe400]" />
        </motion.div>
        <h3 className={`${dynaPuff.className} text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}>
          Education & Certifications
        </h3>
      </motion.div>
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
      >
        {education.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="group p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 
              dark:border-[#222F43] hover:border-[#ffe400] dark:hover:border-[#ffe400] 
              transition-all duration-300"
          >
            <motion.div 
              className="flex items-center gap-2 mb-2"
              variants={containerVariants}
            >
              <motion.div 
                className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg"
                variants={iconContainerVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {React.cloneElement(item.icon, { className: "text-[#ffe400]" })}
              </motion.div>
              <motion.span 
                className="text-sm text-[#ffe400] font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {item.type === 'certification' ? 'Certification' : 'Education'}
              </motion.span>
            </motion.div>
            <motion.h4 
              className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9]"
              variants={cardVariants}
            >
              {item.title}
            </motion.h4>
            <motion.div 
              className="flex justify-between items-center mt-1"
              variants={cardVariants}
            >
              <motion.p 
                className="text-gray-600 dark:text-[#66768f]"
                whileHover={{ x: 4 }}
              >
                {item.institution}
              </motion.p>
              <motion.span 
                className="text-sm text-gray-500 dark:text-[#66768f]"
                whileHover={{ scale: 1.1 }}
              >
                {item.year}
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}