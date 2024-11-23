"use client";

import React from "react";
import { Trophy, Code, Users, Coffee } from "lucide-react";
import { motion } from "framer-motion";

export function AboutStats() {
  const stats = [
    { icon: <Trophy className="w-5 h-5" />, value: "5+", label: "Years Experience" },
    { icon: <Code className="w-5 h-5" />, value: "50+", label: "Projects" },
    { icon: <Users className="w-5 h-5" />, value: "20+", label: "Clients" },
    { icon: <Coffee className="w-5 h-5" />, value: "∞", label: "Coffee Cups" },
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="group p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 
            dark:border-[#222F43] hover:border-[#ffe400] dark:hover:border-[#ffe400] 
            transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg 
                group-hover:bg-opacity-20 transition-all duration-300"
              variants={iconVariants}
              whileHover={{ rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {React.cloneElement(stat.icon, { 
                className: "w-5 h-5 text-[#ffe400]" 
              })}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.h4 
                className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {stat.value}
              </motion.h4>
              <motion.p 
                className="text-sm text-gray-500 dark:text-[#66768f]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}