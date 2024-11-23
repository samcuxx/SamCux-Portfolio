'use client';

import React from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import AnimatedText from "../ui/AnimatedText";
import { DynaPuff } from "next/font/google";
import { TypewriterText } from "../ui/TypewriterText";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/samcuxx", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/samcux", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:samcuxx@gmail.com", label: "Email" }
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

  const statusVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const socialIconVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: i * 0.1
      }
    }),
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col justify-center min-h-[calc(100vh-9rem)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ y, opacity }}
    >
      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center space-y-6 max-w-6xl mx-auto px-6"
        variants={itemVariants}
      >
        <motion.div
          variants={statusVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border 
            border-gray-200 dark:border-sa-dark-border backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          <motion.span 
            className="w-2 h-2 bg-[#ffe400] rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.span 
            className="text-sm text-gray-600 dark:text-sa-dark-text-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Available for freelance work
          </motion.span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.3
            }}
          >
            <AnimatedText
              text="SamCux"
              className={`${dynaPuff.className} text-5xl md:text-7xl font-bold text-[#101010] dark:text-[#94A9C9]`}
              initialClass="text-animate-fast"
            />
          </motion.div>
          <TypewriterText 
            typingSpeed={100}
            deletingSpeed={50}
            pauseDuration={2000}
            cursorStyle="bar"        
            phrases={[
              "Software Engineer",
              "Full Stack Developer", 
              "UI/UX Enthusiast",
              "Content Creator"
            ]}
            className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-sa-blue to-sa-dark-primary bg-clip-text text-transparent"
          />
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-gray-600 dark:text-[#66768f] text-lg max-w-2xl mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          Full-stack developer focused on building{" "}
          <motion.span 
            className="text-[#ffe400]"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            high-quality web applications
          </motion.span>
          . I help businesses and individuals turn their ideas into{" "}
          <motion.span 
            className="text-[#ffe400]"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            successful digital products
          </motion.span>
          {" "}through clean code and thoughtful solutions.
        </motion.p>

       

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffe400] 
                text-[#101010] rounded-full font-semibold group"
            >
              Let&apos;s Talk 
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div 
            className="flex gap-3"
            variants={itemVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.div
                key={index}
                variants={socialIconVariants}
                custom={index}
                whileHover="hover"
              >
                <MagneticLink
                  href={link.href}
                  className="p-3 rounded-lg bg-white dark:bg-sa-dark-foregroung border 
                    border-gray-200 dark:border-sa-dark-border hover:border-[#ffe400]
                    dark:hover:border-[#ffe400] transition-all duration-300
                    group"
                  aria-label={link.label}
                >
                  {React.cloneElement(link.icon, {
                    className: "w-5 h-5 text-gray-600 dark:text-sa-dark-text-main group-hover:text-[#ffe400]"
                  })}
                </MagneticLink>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}