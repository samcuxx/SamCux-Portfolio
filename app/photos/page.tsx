import { PhotosContent } from "@/components/Photos/PhotosContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Photos() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full font-inter relative pt-24">
      <ScrollProgress />
      <BgGlow />
      <PhotosContent />
    </div>
  );
}
