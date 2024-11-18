import { HomeContent } from "@/components/Home/HomeContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full font-inter relative pt-7 md:pt-24">
      <ScrollProgress />
      <BgGlow />
      <HomeContent />
    </div>
  );
}
