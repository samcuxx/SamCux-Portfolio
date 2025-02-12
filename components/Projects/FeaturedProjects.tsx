import React from "react";
import { Star, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import MagneticLink from "../ui/MagneticLink";
import { projects } from "@/data/projects";


export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-6 h-6 text-[#ffe400]" />
        <h3
          className={`font-dynapuff text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}
        >
          Featured Projects
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {featuredProjects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-[#131C31] rounded-2xl overflow-hidden
              border border-gray-100 dark:border-[#222F43] hover:border-[#ffe400] 
              dark:hover:border-[#ffe400] transition-all duration-300 animate-slideInUp
              shadow-sm hover:shadow-md"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Section */}
              <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 flex items-end justify-start p-6"
                >
                  <div className="flex gap-3">
                    <MagneticLink
                      href={project.liveUrl}
                      className="p-2 bg-[#ffe400] rounded-lg hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-5 h-5 text-[#101010]" />
                    </MagneticLink>
                    <MagneticLink
                      href={project.githubUrl}
                      className="p-2 bg-[#ffe400] rounded-lg hover:scale-110 transition-transform"
                    >
                      <Github className="w-5 h-5 text-[#101010]" />
                    </MagneticLink>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-center">
                <h4 className="text-xl font-semibold text-[#101010] dark:text-[#94A9C9] mb-3">
                  {project.title}
                </h4>
                <p className="text-gray-600 dark:text-[#66768f] mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#ffe400] bg-opacity-10 text-[#101010] 
                        dark:text-[#94A9C9] rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
