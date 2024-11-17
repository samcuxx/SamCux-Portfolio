import React from "react";
import { PhotosHeader } from "./PhotosHeader";
import { PhotosIntro } from "./PhotosIntro";
import { PhotosGrid } from "./PhotosGrid";

export function PhotosContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <PhotosHeader />
      <div className="space-y-16">
        <PhotosIntro />
        <PhotosGrid />
      </div>
    </div>
  );
} 