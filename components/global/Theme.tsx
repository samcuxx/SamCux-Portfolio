"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const buttonVariants = {
  initial: { 
    scale: 0.8,
    opacity: 0,
    rotate: -180
  },
  animate: { 
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  },
  exit: { 
    scale: 0.8,
    opacity: 0,
    rotate: 180,
    transition: {
      duration: 0.2
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  },
  exit: { 
    scale: 0,
    rotate: 180,
    transition: { duration: 0.2 }
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

const glowVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 0.5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

export default function Theme() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    return currentTheme === "light" ? setTheme("dark") : setTheme("light");
  }
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted)
    return (
      <motion.span 
        className="inline-block min-w-[28px] min-h-[28px] p-2 rounded-full 
          dark:bg-sa-dark-foregroung bg-sa-light-foregroung border 
          dark:border-sa-dark-foregroung border-sa-light-foregroung"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#ffe400]/20 to-transparent rounded-full"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      <motion.button
        onClick={toggleTheme}
        className={`relative dark:bg-sa-dark-foregroung bg-sa-light-foregroung 
          dark:text-sa-dark-text-low text-sa-light-accent border 
          dark:border-sa-dark-foregroung border-sa-light-foregroung rounded-full p-2
          overflow-hidden`}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative"
          >
            {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
            <motion.div
              className="absolute -top-1 -right-1"
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
            >
              <Sparkles className="w-3 h-3 text-[#ffe400]" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
