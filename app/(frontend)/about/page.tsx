import { AboutContent } from "@/components/About/AboutContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function About() {
  return (
    <div className=" font-inter relative pt-7 md:pt-24">
      <ScrollProgress />
      <BgGlow />
      <AboutContent />
    </div>
  );
}
