import React from "react";
import { ArrowRight, Github, ExternalLink, Code2 } from "lucide-react";
import MagneticLink from "../ui/MagneticLink";
import AnimatedText from "../ui/AnimatedText";
import { DynaPuff } from "next/font/google";
import { projects } from "@/data/projects";
import Image from "next/image";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function HomeProjects() {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffe400]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffe400]/5 rounded-full blur-2xl -z-10" />

      <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-20">
        <div className="md:sticky md:top-24 md:w-1/3 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-[#ffe400]" />
            <AnimatedText
              text="Featured Work"
              className={`${dynaPuff.className} text-3xl font-bold text-[#101010] dark:text-[#94A9C9]`}
              initialClass="text-animate-fast"
            />
          </div>
          <p className="text-gray-600 dark:text-[#66768f] leading-relaxed text-lg">
            Explore a collection of my most impactful projects, showcasing innovation and technical excellence.
          </p>
          <MagneticLink
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffe400]/10 
              text-[#101010] dark:text-[#94A9C9] rounded-2xl font-semibold 
              hover:bg-[#ffe400] transition-all duration-300 group"
          >
            Browse Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MagneticLink>
        </div>

        <div className="md:w-2/3 space-y-16">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50 
                dark:from-[#131C31] dark:to-[#0f1725] rounded-3xl overflow-hidden
                border border-gray-100 dark:border-[#222F43] hover:border-[#ffe400] 
                dark:hover:border-[#ffe400] transition-all duration-500 
                hover:shadow-2xl animate-slideInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={675}
                  className="object-cover w-full h-full transform group-hover:scale-105 
                    transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="flex gap-3">
                      <MagneticLink
                        href={project.liveUrl}
                        className="p-3 bg-white/90 rounded-xl hover:bg-[#ffe400] 
                          transition-colors duration-300"
                      >
                        <ExternalLink className="w-5 h-5 text-[#101010]" />
                      </MagneticLink>
                      <MagneticLink
                        href={project.githubUrl}
                        className="p-3 bg-white/90 rounded-xl hover:bg-[#ffe400] 
                          transition-colors duration-300"
                      >
                        <Github className="w-5 h-5 text-[#101010]" />
                      </MagneticLink>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white/90 text-[#101010] 
                            rounded-lg text-sm font-medium backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9] mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-[#66768f] leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}