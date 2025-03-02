import { PhotosContent } from "@/components/Photos/PhotosContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Photos() {
  return (
    <div className="w-full font-inter relative pt-7 md:pt-24">
      <ScrollProgress />
      <BgGlow />
      <PhotosContent />
    </div>
  );
}
