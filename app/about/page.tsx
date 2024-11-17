import { AboutContent } from "@/components/About/AboutContent";
import BgGlow from "@/components/ui/BgGlow";
import { SocialLinks } from "@/components/global/SocialLinks";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full font-inter relative pt-24">
      <ScrollProgress />
      <BgGlow />
      <AboutContent />
      <SocialLinks />
    </div>
  );
}
