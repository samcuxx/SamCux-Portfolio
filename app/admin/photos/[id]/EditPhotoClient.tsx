"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Camera, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import PhotoForm from "@/components/Admin/PhotoForm";
import { Id } from "@/convex/_generated/dataModel";

export default function EditPhotoClient({ photoId }: { photoId: Id<"photos"> }) {
  // Fetch the photo data
  const photo = useQuery(api.photos.getById, { id: photoId });

  if (photo === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
      </div>
    );
  }

  if (photo === null) {
    return (
      <div className="bg-white dark:bg-[#131C31] rounded-xl p-8 text-center border border-gray-100 dark:border-[#222F43]">
        <h3 className="text-lg font-medium text-[#101010] dark:text-[#94A9C9] mb-2">
          Photo not found
        </h3>
        <p className="text-gray-600 dark:text-[#66768f] mb-6">
          The photo you are looking for does not exist or has been deleted.
        </p>
        <Link
          href="/admin/photos"
          className="px-4 py-2 bg-[#ffe400] text-[#101010] rounded-lg hover:bg-opacity-90 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Photos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-[#ffe400]" />
          <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
            Edit Photo
          </h1>
        </div>
        <Link
          href="/admin/photos"
          className="flex items-center gap-2 text-gray-600 dark:text-[#66768f] hover:text-[#101010] dark:hover:text-[#94A9C9]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Photos
        </Link>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <PhotoForm mode="edit" initialData={photo} />
      </div>
    </div>
  );
} 