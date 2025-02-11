"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, Code, Mail, Sparkles } from "lucide-react";
import navItems from "@/components/data/NavItem";
import Theme from "./Theme";
import MobileMenu from "./MobileMenu";
import MagneticLink from "../ui/MagneticLink";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

const navIcons = {
  "/": <Home className="w-5 h-5" />,
  "/about": <User className="w-5 h-5" />,
  "/projects": <Code className="w-5 h-5" />,
  "/contact": <Mail className="w-5 h-5" />,
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const navY = useSpring(
    useTransform(scrollY, [0, 100], [0, -20]),
    { stiffness: 300, damping: 30 }
  );

  const navOpacity = useSpring(
    useTransform(scrollY, [0, 100], [1, 0.95]),
    { stiffness: 300, damping: 30 }
  );

  const navScale = useSpring(
    useTransform(scrollY, [0, 100], [1, 0.98]),
    { stiffness: 300, damping: 30 }
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -20, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: -10, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
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

  const activeIndicatorVariants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className={`fixed top-6 left-0 right-0 mx-auto w-fit z-50 bg-white/80 dark:bg-[#131C31]/80 
          backdrop-blur-md shadow-lg rounded-full py-2 px-6 transition-all duration-300 hidden md:block
          ${isScrolled ? 'shadow-xl shadow-black/5 dark:shadow-white/5' : ''}`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          y: navY,
          opacity: navOpacity,
          scale: navScale
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#ffe400]/10 to-transparent rounded-full"
          animate={{
            opacity: [0, 0.5, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />

        <div className="mx-auto relative">
          <div className="flex items-center justify-center gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative"
              >
                {pathname === item.path && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 rounded-full"
                    variants={activeIndicatorVariants}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
                <MagneticLink
                  href={item.path}
                  className={`relative font-medium transition-colors group ${
                    pathname === item.path
                      ? "text-[#ffe400] dark:text-[#ffe400]"
                      : "text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] dark:hover:text-[#ffe400]"
                  }`}
                >
                  <motion.div 
                    className="relative p-2"
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
                        animate="visible"
                      >
                        <Sparkles className="w-3 h-3 text-[#ffe400]" />
                      </motion.div>
                    )}
                    {navIcons[item.path as keyof typeof navIcons]}
                    <motion.span 
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs
                        whitespace-nowrap bg-white/80 dark:bg-[#131C31]/80 px-2 py-1 
                        rounded-full backdrop-blur-sm"
                      initial={{ opacity: 0, y: -5, scale: 0.9 }}
                      whileHover={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 25
                        }
                      }}
                    >
                      {item.title}
                    </motion.span>
                  </motion.div>
                </MagneticLink>
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <Theme />
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }}
        className={`fixed bottom-6 left-0 right-0 mx-auto w-fit z-50 p-3 bg-white/80 
          dark:bg-[#131C31]/80 backdrop-blur-md shadow-lg rounded-full md:hidden
          ${isScrolled ? 'shadow-xl shadow-black/5 dark:shadow-white/5' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ 
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 17
          }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ 
            rotate: isMobileMenuOpen ? 180 : 0,
            scale: isMobileMenuOpen ? 1.1 : 1
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#101010] dark:text-[#94A9C9]" />
            ) : (
              <Menu className="w-6 h-6 text-[#101010] dark:text-[#94A9C9]" />
            )}
          </motion.div>
        </motion.div>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
