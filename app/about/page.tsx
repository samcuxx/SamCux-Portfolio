import { AboutContent } from "@/components/About/AboutContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center w-full font-inter relative pt-16">
      <ScrollProgress />
      <BgGlow />
      <AboutContent />
    </div>
  );
}
