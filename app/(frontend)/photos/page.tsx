import { PhotosContent } from "@/components/Photos/PhotosContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos | SamCux - Software Engineer & Content Creator",
  description: "Browse through SamCux's photography collection showcasing creative work, designs, and inspiring moments.",
  openGraph: {
    title: "Photos | SamCux",
    description: "Browse through SamCux's photography collection showcasing creative work, designs, and inspiring moments.",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Photos() {
  return (
    <div className="w-full font-inter relative pt-7 md:pt-24">
      <ScrollProgress />
      <BgGlow />
      <PhotosContent />
    </div>
  );
}
