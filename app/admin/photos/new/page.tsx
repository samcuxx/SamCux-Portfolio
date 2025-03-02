"use client";

import { Camera, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PhotoForm from "@/components/Admin/PhotoForm";

export default function NewPhotoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-[#ffe400]" />
          <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
            Add New Photo
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
        <PhotoForm mode="create" />
      </div>
    </div>
  );
} 