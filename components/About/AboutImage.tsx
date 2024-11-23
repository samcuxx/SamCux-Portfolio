"use client";

import React from "react";
import Image from "next/image";
import ProfileImage from "@/public/images/profile.jpg";
import { motion } from "framer-motion";

export function AboutImage() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delayChildren: 0.2
      }
    }
  };

  const imageVariants = {
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

  return (
    <motion.div 
      className="relative group"
      variants={containerVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="relative z-10 rounded-2xl overflow-hidden"
        variants={imageVariants}
      >
        <Image
          src={ProfileImage}
          alt="Profile"
          width={500}
          height={600}
          className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </motion.div>
      <motion.div 
        className="absolute inset-0 bg-[#ffe400] dark:bg-[#ffe400] opacity-20 rounded-2xl"
        initial={{ rotate: 3 }}
        whileHover={{ rotate: 6 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </motion.div>
  );
}