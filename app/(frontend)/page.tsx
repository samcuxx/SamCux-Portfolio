import { HomeContent } from "@/components/Home/HomeContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import type { Metadata } from "next";
import { fetchProjectsData } from "@/lib/convex-server";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SamCux - Software Engineer & Content Creator",
  description:
    "Software Engineer and Content Creator based in Ghana. Founder of SamCux Development Consult. Discover my projects, software solutions, and content.",
  openGraph: {
    title: "SamCux - Software Engineer & Content Creator",
    description:
      "Software Engineer and Content Creator based in Ghana. Founder of SamCux Development Consult. Discover my projects, software solutions, and content.",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Home() {
  const projectsData = await fetchProjectsData();

  return (
    <div className="flex flex-col items-center justify-center w-full font-inter relative ">
      <ScrollProgress />
      <BgGlow />
      <HomeContent initialProjects={projectsData || []} />
    </div>
  );
}
