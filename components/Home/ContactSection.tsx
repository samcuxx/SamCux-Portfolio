'use client';

import React from "react";
import { DynaPuff } from "next/font/google";
import { ArrowRight, Mail, MessageCircle, Sparkles } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import { motion, useAnimationControls, useScroll, useTransform, useSpring } from "framer-motion";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function ContactSection() {
  const controls = useAnimationControls();
  const containerRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    { stiffness: 100, damping: 20 }
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]),
    { stiffness: 100, damping: 20 }
  );

  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]),
    { stiffness: 100, damping: 20 }
  );

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 50,
      rotateX: 10
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        staggerChildren: 0.2
      }
    }
  };

  const backgroundVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      rotate: 0,
      filter: "blur(10px)"
    },
    show: {
      opacity: 0.2,
      scale: 1,
      rotate: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    hover: {
      rotate: 2,
      scale: 1.02,
      opacity: 0.3,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.9,
      filter: "blur(4px)"
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    show: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingIconVariants = {
    hidden: { 
      y: 0,
      opacity: 0,
      scale: 0
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 10, -10, 0],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 2
      }
    }
  };

  return (
    <div className="py-12">
      <motion.div 
        ref={containerRef}
        className="relative group"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        onHoverStart={() => controls.start("hover")}
        onHoverEnd={() => controls.start("show")}
        style={{ opacity, scale, y }}
      >
        {/* Sparkle Effects */}
        <motion.div 
          className="absolute -top-4 -left-4"
          variants={sparkleVariants}
          animate="show"
        >
          <Sparkles className="w-6 h-6 text-[#ffe400]" />
        </motion.div>
        <motion.div 
          className="absolute -bottom-4 -right-4"
          variants={sparkleVariants}
          animate="show"
          transition={{ delay: 0.5 }}
        >
          <Sparkles className="w-6 h-6 text-[#ffe400]" />
        </motion.div>

        {/* Floating Icons */}
        <motion.div 
          className="absolute -top-8 left-1/4"
          variants={floatingIconVariants}
          animate="animate"
          whileHover="hover"
        >
          <motion.div
            variants={iconVariants}
            className="p-4 bg-[#ffe400]/10 rounded-full backdrop-blur-sm
              hover:bg-[#ffe400]/20 transition-colors duration-300"
            whileHover="hover"
          >
            <Mail className="w-6 h-6 text-[#ffe400]" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute -bottom-4 right-1/4"
          variants={floatingIconVariants}
          animate="animate"
          whileHover="hover"
          transition={{ delay: 1 }}
        >
          <motion.div
            variants={iconVariants}
            className="p-4 bg-[#ffe400]/10 rounded-full backdrop-blur-sm
              hover:bg-[#ffe400]/20 transition-colors duration-300"
            whileHover="hover"
          >
            <MessageCircle className="w-6 h-6 text-[#ffe400]" />
          </motion.div>
        </motion.div>
        
        {/* Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#ffe400] to-[#ffd000] rounded-2xl"
          variants={backgroundVariants}
          animate={controls}
        />
        
        {/* Content */}
        <motion.div 
          className="relative p-12 bg-white dark:bg-[#131C31] rounded-2xl text-center 
            border border-gray-100 dark:border-[#222F43] group-hover:border-[#ffe400] 
            dark:group-hover:border-[#ffe400] transition-all duration-300
            hover:shadow-xl hover:shadow-[#ffe400]/10"
          variants={contentVariants}
        >
          <motion.h2 
            variants={titleVariants}
            className={`${dynaPuff.className} text-3xl md:text-4xl font-bold mb-4 
              text-[#101010] dark:text-[#94A9C9]`}
            whileHover={{
              scale: 1.02,
              color: "#ffe400",
              transition: { duration: 0.2 }
            }}
          >
            Let&apos;s Work Together
          </motion.h2>
          
          <motion.p 
            variants={contentVariants}
            className="text-gray-600 dark:text-[#66768f] mb-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.01 }}
          >
            Have a project in mind? Let&apos;s discuss how we can bring your ideas to life. 
            I&apos;m always open to new opportunities and collaborations.
          </motion.p>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <MagneticLink
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffe400] 
                text-[#101010] rounded-full font-semibold transition-all duration-300
                hover:shadow-lg hover:shadow-[#ffe400]/20 group"
            >
              <motion.span
                variants={contentVariants}
                className="relative"
              >
                Get in Touch
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
              <motion.div
                className="inline-block"
                animate={{ 
                  x: [0, 5, 0],
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </MagneticLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}