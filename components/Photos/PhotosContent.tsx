import React from "react";
import { PhotosHeader } from "./PhotosHeader";
import { PhotosIntro } from "./PhotosIntro";
import { PhotosGrid } from "./PhotosGrid";

type PhotosContentProps = {
  initialPhotos: any[];
};

export function PhotosContent({ initialPhotos }: PhotosContentProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <PhotosHeader />
      <div className="space-y-16">
        <PhotosIntro />
        <PhotosGrid initialPhotos={initialPhotos} />
      </div>
    </div>
  );
} 