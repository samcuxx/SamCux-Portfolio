'use client';

import React from "react";
import { DynaPuff } from "next/font/google";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import MagneticLink from "../ui/MagneticLink";
import { projects } from "@/data/projects";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function LatestProjects() {
  const latestProjects = projects.slice(0, 2);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]),
    { stiffness: 100, damping: 20 }
  );

  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, -100]),
    { stiffness: 100, damping: 20 }
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const titleVariants = {
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
        damping: 20
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95,
      rotateX: 10
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 1.2, 
      opacity: 0,
      filter: "blur(10px)"
    },
    show: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const tagVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      y: 20
    },
    show: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: i * 0.1
      }
    })
  };

  const linkVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.9
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      y: -4,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="py-12"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      style={{ opacity, y }}
      variants={containerVariants}
    >
      <motion.div 
        className="flex justify-between items-center mb-12"
        variants={titleVariants}
      >
        <motion.h2 
          className={`${dynaPuff.className} text-3xl font-bold text-[#101010] dark:text-[#94A9C9]`}
          whileHover={{ 
            scale: 1.02,
            rotate: [-1, 1, -1],
            transition: {
              rotate: {
                repeat: Infinity,
                duration: 0.5
              }
            }
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Latest Projects
        </motion.h2>
        <motion.div 
          whileHover={{ x: 5 }}
          variants={linkVariants}
        >
          <MagneticLink
            href="/projects"
            className="inline-flex items-center gap-2 text-[#101010] dark:text-[#94A9C9] 
              hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors"
          >
            View All 
            <motion.div
              animate={{ 
                x: [0, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </MagneticLink>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        {latestProjects.map((project, index) => (
          <motion.div
            key={index}
            variants={projectVariants}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
              }
            }}
            className="group relative bg-white dark:bg-[#131C31] 
              rounded-xl overflow-hidden border border-gray-100 dark:border-[#222F43] 
              hover:border-[#ffe400] dark:hover:border-[#ffe400] transition-all duration-300
              hover:shadow-lg hover:shadow-[#ffe400]/10"
          >
            <motion.div 
              className="relative h-48 overflow-hidden"
              variants={imageVariants}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            <motion.div 
              className="p-6"
              variants={containerVariants}
            >
              <motion.h3 
                className="text-xl font-semibold mb-2 text-[#101010] dark:text-[#94A9C9]"
                variants={titleVariants}
                whileHover={{ 
                  x: 5,
                  color: "#ffe400",
                  transition: { duration: 0.2 }
                }}
              >
                {project.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-[#66768f] mb-4"
                variants={titleVariants}
              >
                {project.description}
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                variants={containerVariants}
              >
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={tagVariants}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      backgroundColor: "rgba(255, 228, 0, 0.2)",
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 text-xs rounded-full bg-[#ffe400]/10 
                      text-[#101010] dark:text-[#94A9C9] font-medium
                      hover:shadow-sm transition-all duration-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div 
                className="flex items-center gap-4"
                variants={containerVariants}
              >
                {project.githubUrl && (
                  <motion.div 
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <MagneticLink
                      href={project.githubUrl}
                      className="text-gray-600 dark:text-[#66768f] 
                        hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors"
                      aria-label="View GitHub Repository"
                    >
                      <motion.div
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.2
                        }}
                        transition={{ 
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.div>
                    </MagneticLink>
                  </motion.div>
                )}
                {project.liveUrl && (
                  <motion.div 
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <MagneticLink
                      href={project.liveUrl}
                      className="text-gray-600 dark:text-[#66768f] 
                        hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors"
                      aria-label="View Live Demo"
                    >
                      <motion.div
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.2
                        }}
                        transition={{ 
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.div>
                    </MagneticLink>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}