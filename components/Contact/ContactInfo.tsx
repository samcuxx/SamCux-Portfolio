"use client";

import React from "react";
import { Mail, MapPin, Phone, Clock, Sparkles } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import { motion } from "framer-motion";

const contactDetails = [
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
    value: "samcuxx@gmail.com",
    href: "mailto:samcuxx@gmail.com"
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Location",
    value: "Kumasi - Ghana"
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Phone",
    value: "+233 53-111-4854",
    href: "tel:+233531114854"
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Office Hours",
    value: "Mon - Sun, 9AM - 6PM"
  }
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
  hidden: { 
    opacity: 0, 
    x: -20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

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

export function ContactInfo() {
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
        <h3 className={`text-2xl font-semibold text-[#101010] dark:text-[#94A9C9] mb-6`}>
          Contact Information
          <motion.span
            className="absolute -top-1 -right-1 text-[#ffe400]"
            variants={sparkleVariants}
          >
            <Sparkles className="w-4 h-4" />
          </motion.span>
        </h3>
        <motion.div 
          className="absolute -left-4 top-0 w-1 h-full bg-[#ffe400] rounded-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.5
          }}
        />
      </motion.div>

      <motion.div 
        className="grid gap-6"
        variants={containerVariants}
      >
        {contactDetails.map((detail, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 17
              }
            }}
            className="group p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 
              dark:border-[#222F43] hover:border-[#ffe400] dark:hover:border-[#ffe400] 
              transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg 
                  group-hover:bg-opacity-20 transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, 5, -5, 0],
                  transition: {
                    rotate: {
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }
                }}
              >
                {React.cloneElement(detail.icon, { 
                  className: "w-5 h-5 text-[#ffe400]" 
                })}
              </motion.div>
              <div>
                <motion.h4 
                  className="text-sm font-medium text-gray-500 dark:text-[#66768f]"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {detail.title}
                </motion.h4>
                {detail.href ? (
                  <MagneticLink
                    href={detail.href}
                    className="text-[#101010] dark:text-[#94A9C9] font-medium hover:text-[#ffe400] 
                      dark:hover:text-[#ffe400] transition-colors"
                  >
                    {detail.value}
                  </MagneticLink>
                ) : (
                  <motion.p 
                    className="text-[#101010] dark:text-[#94A9C9] font-medium"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {detail.value}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}