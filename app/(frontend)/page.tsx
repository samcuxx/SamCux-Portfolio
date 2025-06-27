import { HomeContent } from "@/components/Home/HomeContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamCux | Software Engineer & Content Creator",
  description: "Passionate Computer Science and Content Creator who helps others personalize their digital space. Discover my projects, skills, and content.",
  openGraph: {
    title: "SamCux | Software Engineer & Content Creator",
    description: "Passionate Computer Science and Content Creator who helps others personalize their digital space. Discover my projects, skills, and content.",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full font-inter relative pt-7 md:pt-24">
      <ScrollProgress />
      <BgGlow />
      <HomeContent />
    </div>
  );
} 