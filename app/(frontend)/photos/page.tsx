import { PhotosContent } from "@/components/Photos/PhotosContent";
import BgGlow from "@/components/ui/BgGlow";
import type { Metadata } from "next";
import { fetchPhotosData } from "@/lib/convex-server";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

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

export default async function Photos() {
  const photosData = (await fetchPhotosData()) as any[] | null;

  return (
    <div className="w-full font-inter relative pt-7 md:pt-24">
      <BgGlow />
      <PhotosContent initialPhotos={photosData || []} />
    </div>
  );
}
