"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Home, User, Code, Mail, Sparkles } from "lucide-react";
import navItems from "@/components/data/NavItem";
import Theme from "./Theme";
import MagneticLink from "../ui/MagneticLink";
import { motion } from "framer-motion";

const navIcons = {
  "/": <Home className="w-5 h-5" />,
  "/about": <User className="w-5 h-5" />,
  "/projects": <Code className="w-5 h-5" />,
  "/contact": <Mail className="w-5 h-5" />,
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: "100%",
      scale: 0.95,
      borderRadius: "100%"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      borderRadius: "24px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      y: "100%",
      scale: 0.95,
      borderRadius: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9,
      rotate: -5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      scale: 0.9,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
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

  const gradientVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-x-4 bottom-24 z-40 md:hidden"
      variants={menuVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "exit"}
      exit="exit"
    >
      <motion.div 
        className="relative bg-white/80 dark:bg-[#131C31]/80 backdrop-blur-md shadow-lg 
          rounded-3xl p-6 overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#ffe400]/10 to-transparent"
          variants={gradientVariants}
        />

        <nav className="relative">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <motion.li key={item.id} variants={itemVariants}>
                <MagneticLink
                  href={item.path}
                  onClick={onClose}
                  className={`relative flex items-center gap-4 p-2 font-medium transition-colors group
                    ${
                      pathname === item.path
                        ? "text-[#ffe400] dark:text-[#ffe400]"
                        : "text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] dark:hover:text-[#ffe400]"
                    }`}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ 
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {pathname === item.path && (
                      <motion.div
                        className="absolute -top-1 -right-1"
                        variants={sparkleVariants}
                      >
                        <Sparkles className="w-3 h-3 text-[#ffe400]" />
                      </motion.div>
                    )}
                    {navIcons[item.path as keyof typeof navIcons]}
                  </motion.div>
                  <motion.span
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }
                    }}
                  >
                    {item.title}
                  </motion.span>
                  {pathname === item.path && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-[#ffe400]/10 rounded-xl"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </MagneticLink>
              </motion.li>
            ))}
            <motion.li variants={itemVariants}>
              <div className="p-2">
                <Theme />
              </div>
            </motion.li>
          </ul>
        </nav>
      </motion.div>
    </motion.div>
  );
}
