import { ProjectsContent } from "@/components/Projects/ProjectsContent";
import BgGlow from "@/components/ui/BgGlow";
import type { Metadata } from "next";
import { fetchProjectsData } from "@/lib/convex-server";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Projects | SamCux - Software Engineer & Content Creator",
  description: "Explore SamCux's software engineering projects, applications, websites, and technical innovations in design and development.",
  openGraph: {
    title: "Projects | SamCux",
    description: "Explore SamCux's software engineering projects, applications, websites, and technical innovations in design and development.",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Projects() {
  const projectsData = (await fetchProjectsData()) as any[] | null;

  return (
    <div className="w-full font-inter relative pt-7 md:pt-24">
      <BgGlow />
      <ProjectsContent initialProjects={projectsData || []} />
    </div>
  );
}
