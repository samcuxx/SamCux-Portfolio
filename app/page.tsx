import { HeroContent } from "@/components/Home/HeroContent";
import { HomeAbout } from "@/components/Home/HomeAbout";
import { HomeProjects } from "@/components/Home/HomeProjects";
import { HomeContact } from "@/components/Home/HomeContact";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full font-inter relative">
      <ScrollProgress />
      <BgGlow />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <HeroContent />
      </section>

      {/* Content Sections */}
      <section className="w-full space-y-24">
        <div className="bg-gradient-to-b from-transparent via-gray-50/50 to-gray-50 dark:from-transparent dark:via-[#0B1121]/50 dark:to-[#0B1121]">
          <HomeAbout />
        </div>
        <HomeProjects />
        <div className="bg-gradient-to-b from-gray-50 via-gray-50/50 to-transparent dark:from-[#0B1121] dark:via-[#0B1121]/50 dark:to-transparent">
          <HomeContact />
        </div>
      </section>
    </div>
  );
}
