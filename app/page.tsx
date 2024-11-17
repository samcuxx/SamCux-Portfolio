import { SocialLinks } from "@/components/global/SocialLinks";
import { HeroContent } from "@/components/Home/HeroContent";
import { ScrollMessage } from "@/components/global/ScrollMessage";
import BgGlow from "@/components/ui/BgGlow";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full  font-inter relative">
      <BgGlow />
      <HeroContent />
      <SocialLinks />
      <ScrollMessage />
    </div>
  );
}
