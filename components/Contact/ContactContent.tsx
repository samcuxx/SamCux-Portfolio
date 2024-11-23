"use client";

import React from "react";
import { ContactHeader } from "./ContactHeader";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
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

export function ContactContent() {
  return (
    <motion.div 
      className="max-w-6xl mx-auto px-6 mb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={sectionVariants}>
        <ContactHeader />
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div 
          variants={sectionVariants}
          className="space-y-8"
        >
          <ContactInfo />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          className="space-y-8"
        >
          <ContactForm />
        </motion.div>
      </div>
    </motion.div>
  );
}