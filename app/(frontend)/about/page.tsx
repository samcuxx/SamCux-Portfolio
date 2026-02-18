import { AboutContent } from "@/components/About/AboutContent";
import BgGlow from "@/components/ui/BgGlow";
import type { Metadata } from "next";
import {
  fetchAboutMeData,
  fetchExperienceData,
  fetchEducationData,
  fetchTechStackData,
} from "@/lib/convex-server";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "About Me | SamCux - Software Engineer & Content Creator",
  description: "Learn more about SamCux - my background, skills, education, and professional experience as a software engineer and content creator.",
  openGraph: {
    title: "About Me | SamCux",
    description: "Learn more about SamCux - my background, skills, education, and professional experience as a software engineer and content creator.",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function About() {
  // Fetch all data at build time
  const [aboutMeData, experienceData, educationData, techStackData] =
    await Promise.all([
      fetchAboutMeData(),
      fetchExperienceData(),
      fetchEducationData(),
      fetchTechStackData(),
    ]);

  return (
    <div className=" font-inter relative pt-7 md:pt-24">
      <BgGlow />
      <AboutContent
        aboutMeData={aboutMeData}
        experienceData={experienceData}
        educationData={educationData}
        techStackData={techStackData}
      />
    </div>
  );
}
