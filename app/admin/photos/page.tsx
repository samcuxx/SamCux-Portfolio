"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Plus, Pencil, Trash2, Camera } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getConvexImageUrl } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";

export default function PhotosAdminPage() {
  const photos = useQuery(api.photos.getAll) || [];
  const deletePhoto = useMutation(api.photos.remove);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [imageLoadedMap, setImageLoadedMap] = useState<Record<string, boolean>>({});

  const handleDelete = async (id: Id<"photos">) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      setIsDeleting(id);
      try {
        await deletePhoto({ id });
        toast.success("Photo deleted successfully");
      } catch (error) {
        console.error("Error deleting photo:", error);
        toast.error("Failed to delete photo");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleImageLoaded = (id: string) => {
    setImageLoadedMap(prev => ({ ...prev, [id]: true }));
  };

  if (photos === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-[#ffe400]" />
          <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
            Photos
          </h1>
        </div>
        <Link
          href="/admin/photos/new"
          className="px-4 py-2 bg-[#ffe400] text-[#101010] rounded-lg hover:bg-opacity-90 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Photo
        </Link>
      </div>

      {photos.length === 0 ? (
        <div className="bg-white dark:bg-[#131C31] rounded-xl p-8 text-center border border-gray-100 dark:border-[#222F43]">
          <Camera className="w-12 h-12 text-gray-400 dark:text-[#66768f] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#101010] dark:text-[#94A9C9] mb-2">
            No photos yet
          </h3>
          <p className="text-gray-600 dark:text-[#66768f] mb-6">
            Add your first photo to showcase your photography work.
          </p>
          <Link
            href="/admin/photos/new"
            className="px-4 py-2 bg-[#ffe400] text-[#101010] rounded-lg hover:bg-opacity-90 inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Photo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => {
            const imageUrl = getConvexImageUrl(photo.imageUrl);
            const isImageLoaded = imageLoadedMap[photo._id] || false;

            return (
              <div
                key={photo._id}
                className={`group relative bg-white dark:bg-[#131C31] rounded-xl overflow-hidden border ${
                  photo.featured ? 'border-[#ffe400]' : 'border-gray-100 dark:border-[#222F43]'
                }`}
              >
                {photo.featured && (
                  <div className="absolute top-2 right-2 z-10 bg-[#ffe400] text-[#101010] text-xs font-medium px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
                <div className="relative aspect-square overflow-hidden">
                  {/* Skeleton loader */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0">
                      <div className="w-full h-full bg-gray-200 dark:bg-[#1E293B]">
                        <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-[#1E293B] dark:via-[#2A3A50] dark:to-[#1E293B] bg-[length:400%_100%] animate-shimmer" />
                      </div>
                    </div>
                  )}
                  
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={photo.title}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoaded(photo._id)}
                      onError={(e) => {
                        console.log("Image failed to load, using fallback");
                        e.currentTarget.src = "/placeholder-image.jpg";
                        e.currentTarget.onerror = null;
                        handleImageLoaded(photo._id);
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/photos/${photo._id}`}
                        className="p-2 bg-white text-[#101010] rounded-full hover:bg-[#ffe400]"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(photo._id)}
                        disabled={isDeleting === photo._id}
                        className="p-2 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Delete photo"
                      >
                        {isDeleting === photo._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#101010] dark:text-[#94A9C9] mb-1">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#66768f]">
                    <span>{photo.location}</span>
                    <span>•</span>
                    <span>{photo.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 