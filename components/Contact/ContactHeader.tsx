"use client";

import React from "react";
import AnimatedText from "../ui/AnimatedText";
import { DynaPuff } from "next/font/google";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

const sparkleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2
    }
  }
};

export function ContactHeader() {
  return (
    <div className="text-center mb-12 relative">
      <motion.div
        className="absolute -top-4 -right-4 text-[#ffe400]"
        variants={sparkleVariants}
        initial="hidden"
        animate="visible"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      <AnimatedText
        text="Get in Touch"
        className={`${dynaPuff.className} text-4xl md:text-5xl font-bold mb-8 text-[#101010] dark:text-[#94A9C9]`}
        initialClass="text-animate-fast"
      />

      <motion.div
        className="relative"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#ffe400]/10 via-transparent to-[#ffe400]/10 rounded-lg"
          animate={{
            opacity: [0, 0.5, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
        <p className="text-gray-600 dark:text-[#66768f] leading-relaxed max-w-2xl mx-auto p-4 rounded-lg">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you. 
          Send me a message and I&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>
    </div>
  );
}