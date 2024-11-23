"use client"
import React from "react";
import { Github, Youtube, Linkedin, Mail, ArrowUp, Sparkles } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import { DynaPuff } from "next/font/google";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      stiffness: 300,
      damping: 20
    }
  }
};

const linkVariants = {
  initial: { 
    opacity: 0,
    x: -10
  },
  animate: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    scale: 1.05,
    x: 5,
    color: "#ffe400",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const socialIconVariants = {
  initial: { 
    scale: 0,
    rotate: -180
  },
  animate: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      delay: i * 0.1
    }
  }),
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const sparkleVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.2, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

export function Footer() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.7, 1], [0.8, 1]);

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/samcuxx", label: "GitHub" },
    { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com/@samcux", label: "YouTube" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/samcux", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:samcuxx@gmail.com", label: "Email" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer 
      className="w-full bg-white dark:bg-[#131C31] border-t border-gray-100 dark:border-[#222F43] relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ffe400]/5 to-transparent pointer-events-none"
        animate={{
          opacity: [0, 0.5, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />

      <motion.div 
        className="max-w-6xl mx-auto px-6 py-12"
        style={{ opacity, scale }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <h3 className={`${dynaPuff.className} text-2xl font-bold text-[#101010] dark:text-[#94A9C9] relative inline-block`}>
                SamCux
                <motion.div
                  className="absolute -top-1 -right-2"
                  variants={sparkleVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Sparkles className="w-3 h-3 text-[#ffe400]" />
                </motion.div>
              </h3>
            </motion.div>
            <motion.p 
              className="text-gray-600 dark:text-[#66768f] text-sm"
              variants={itemVariants}
            >
              Software Engineer & Content Creator, passionate about building beautiful web experiences.
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <h4 className="font-semibold text-[#101010] dark:text-[#94A9C9]">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <AnimatePresence mode="wait">
                {[
                  { href: "/about", label: "About" },
                  { href: "/projects", label: "Projects" },
                  { href: "/contact", label: "Contact" }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={linkVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    custom={index}
                  >
                    <Link 
                      href={link.href} 
                      className="text-gray-600 dark:text-[#66768f] inline-block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </nav>
          </motion.div>

          {/* Connect Section */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <h4 className="font-semibold text-[#101010] dark:text-[#94A9C9]">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={socialIconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  custom={index}
                >
                  <MagneticLink
                    href={link.href}
                    className="p-2 rounded-lg bg-[#ffe400] bg-opacity-10 hover:bg-opacity-20
                      text-[#101010] dark:text-[#ffe400] relative"
                    aria-label={link.label}
                  >
                    {link.icon}
                    <motion.div
                      className="absolute inset-0 bg-[#ffe400]/10 rounded-lg"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </MagneticLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-[#222F43]"
          variants={itemVariants}
        >
          <motion.p 
            className="text-gray-600 dark:text-[#66768f] text-sm mb-4 md:mb-0"
            whileHover={{ scale: 1.02 }}
          >
            {new Date().getFullYear()} SamCux. All rights reserved.
          </motion.p>
          
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-[#ffe400] bg-opacity-10 
              text-[#101010] dark:text-[#94A9C9] relative"
            whileHover={{ 
              scale: 1.1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <motion.div
              className="absolute inset-0 bg-[#ffe400]/10 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <ArrowUp className="w-5 h-5 relative z-10" />
            <motion.div
              className="absolute -top-1 -right-1"
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
            >
              <Sparkles className="w-3 h-3 text-[#ffe400]" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}
