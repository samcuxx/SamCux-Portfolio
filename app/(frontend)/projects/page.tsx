import { ProjectsContent } from "@/components/Projects/ProjectsContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Projects() {
  return (
    <div className="w-full font-inter relative pt-7 md:pt-24">
      <ScrollProgress />
      <BgGlow />
      <ProjectsContent />
    </div>
  );
}
