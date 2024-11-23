'use client';

import React from "react";
import { DynaPuff } from "next/font/google";
import { Code2, Globe, Laptop, Layout, Server, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { MotionDiv, fadeIn } from "../ui/motion";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function SkillsSection() {
  const skills = [
    {
      name: "Frontend Development",
      icon: <Layout className="w-6 h-6" />,
      technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Vue.js", "Redux", "Material UI", "Styled Components"],
      description: "Building responsive, accessible, and performant user interfaces"
    },
    {
      name: "Backend Development", 
      icon: <Server className="w-6 h-6" />,
      technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Python", "Django", "GraphQL", "Redis", "AWS"],
      description: "Designing scalable APIs and efficient database architectures"
    },
    {
      name: "Web Technologies",
      icon: <Globe className="w-6 h-6" />,
      technologies: ["HTML5", "CSS3", "JavaScript", "REST APIs", "WebSockets", "Progressive Web Apps", "SEO", "Web Security"],
      description: "Mastering core web technologies and modern standards"
    },
    {
      name: "Development Tools",
      icon: <Code2 className="w-6 h-6" />,
      technologies: ["Git", "Docker", "Webpack", "Jest", "GitHub Actions", "Jenkins", "Kubernetes", "Terraform", "Nginx"],
      description: "Utilizing industry-standard tools for efficient development"
    },
    {
      name: "UI/UX Design",
      icon: <Sparkles className="w-6 h-6" />,
      technologies: ["Figma", "Adobe XD", "Responsive Design", "Prototyping", "Sketch", "InVision", "User Research", "Wireframing"],
      description: "Creating intuitive and engaging user experiences"
    },
    {
      name: "Cross-Platform",
      icon: <Laptop className="w-6 h-6" />,
      technologies: ["PWA", "React Native", "Electron", "Mobile-First", "Flutter", "Ionic", "Capacitor", "Cross-browser Testing"],
      description: "Developing applications that work seamlessly across devices"
    }
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 0.8
      }
    }
  };

  return (
    <div className="py-12">
      <MotionDiv
        variants={fadeIn('down')}
        className="mb-12"
      >
        <h2 className={`${dynaPuff.className} text-3xl font-bold text-center
          text-[#101010] dark:text-[#94A9C9]`}>
          Technical Expertise
        </h2>
      </MotionDiv>

      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={skillVariants}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
          >
            <div className="p-6 bg-white/50 dark:bg-[#131C31]/50 rounded-xl 
              border border-gray-100 dark:border-[#222F43] group-hover:border-[#ffe400]
              dark:group-hover:border-[#ffe400] transition-all duration-300
              hover:shadow-xl hover:shadow-[#ffe400]/10"
            >
              <motion.div 
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="p-2 bg-[#ffe400]/10 rounded-lg group-hover:bg-[#ffe400]/20 
                    transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {React.cloneElement(skill.icon, {
                    className: "text-[#ffe400]"
                  })}
                </motion.div>
                <h3 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9]">
                  {skill.name}
                </h3>
              </motion.div>
              
              <p className="text-gray-600 dark:text-[#66768f] text-sm leading-relaxed mb-4">
                {skill.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, i) => (
                  <motion.span 
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-[#ffe400]/10 
                      text-[#101010] dark:text-[#94A9C9] font-medium
                      hover:bg-[#ffe400]/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}