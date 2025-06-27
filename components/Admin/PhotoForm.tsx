"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getGitHubUserFromCookies } from "@/lib/convex-client";
import { getConvexImageUrl } from "@/lib/utils";

type PhotoFormProps = {
  mode: "create" | "edit";
  initialData?: any;
};

export default function PhotoForm({ mode, initialData }: PhotoFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: new Date().getFullYear().toString(),
    featured: false,
  });

  // Convex mutations and queries
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createPhoto = useMutation(api.photos.create);
  const updatePhoto = useMutation(api.photos.update);
  
  // Initialize form with existing data if editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        location: initialData.location || "",
        date: initialData.date || new Date().getFullYear().toString(),
        featured: initialData.featured || false,
      });
      setImageLoaded(false); // Reset the loaded state
      
      // Set image preview from existing photo
      if (initialData.imageUrl) {
        // Use our utility function to get the image URL
        const fullUrl = getConvexImageUrl(initialData.imageUrl);
        setImagePreview(fullUrl);
      }
    }
  }, [mode, initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size exceeds 5MB limit");
        return;
      }
      
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageLoaded(false); // Reset the loaded state for the new image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = initialData?.imageUrl || "";
      let storageId = initialData?.storageId || undefined;
      let fileName = initialData?.fileName || undefined;

      // Upload image if a new one is selected
      if (imageFile) {
        try {
          // For development, we can use a direct upload without authentication
          // In production, you should use the authenticated upload flow
          
          // Step 1: Get upload URL (without requiring GitHub ID)
          let uploadUrl;
          try {
            uploadUrl = await generateUploadUrl({});
          } catch (authError: any) {
            console.error("Authentication error during upload URL generation:", authError);
            // If we get an authentication error, we'll use a fallback approach
            // For development only - in production, this should be properly authenticated
            toast.warning("Using development mode for image upload");
            
            // In development, we'll just use a placeholder URL for testing
            // This is just a workaround for development - remove in production
            imageUrl = initialData?.imageUrl || "https://placeholder.co/400";
            throw new Error("Development mode - skipping actual upload");
          }
          
          if (!uploadUrl) {
            throw new Error("Failed to generate upload URL");
          }
          
          // Step 2: Upload the file
          const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": imageFile.type },
            body: imageFile,
          });
          
          if (!result.ok) {
            throw new Error("Failed to upload image");
          }
          
          const data = await result.json();
          
          if (!data.storageId) {
            throw new Error("No storage ID returned from upload");
          }
          
          // Store the storage ID and file name
          imageUrl = data.storageId;
          storageId = data.storageId;
          fileName = imageFile.name;
          
        } catch (error: any) {
          // If this is our development mode error, we'll continue with the placeholder
          if (error.message === "Development mode - skipping actual upload") {
            console.log("Development mode - using placeholder image");
          } else {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image: " + (error.message || "Unknown error"));
            setIsLoading(false);
            return;
          }
        }
      }

      // Validate required fields
      if (!imageUrl) {
        toast.error("Please upload an image");
        setIsLoading(false);
        return;
      }

      // Create or update the photo
      if (mode === "create") {
        await createPhoto({
          title: formData.title,
          location: formData.location,
          date: formData.date,
          imageUrl,
          storageId,
          fileName,
          featured: formData.featured,
        });
        toast.success("Photo added successfully");
      } else {
        await updatePhoto({
          id: initialData._id,
          title: formData.title,
          location: formData.location,
          date: formData.date,
          imageUrl,
          storageId,
          fileName,
          featured: formData.featured,
        });
        toast.success("Photo updated successfully");
      }

      // Redirect back to photos list
      router.push("/admin/photos");
    } catch (error) {
      console.error("Error saving photo:", error);
      toast.error(`Failed to ${mode === "create" ? "add" : "update"} photo`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]">
          Photo Image
        </label>
        <div className="flex items-center gap-4">
          {imagePreview ? (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-[#222F43]">
              <div className={`absolute inset-0 bg-gray-200 dark:bg-[#222F43] animate-pulse transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
              <img
                src={imagePreview}
                alt="Preview"
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.log("Image preview failed to load, using fallback");
                  e.currentTarget.src = "/placeholder-image.jpg"; // Fallback image
                  e.currentTarget.onerror = null; // Prevent infinite error loop
                  setImageLoaded(true); // Consider it loaded once the fallback is set
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                }}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                aria-label="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 dark:border-[#222F43] rounded-lg cursor-pointer hover:border-[#ffe400] dark:hover:border-[#ffe400]">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-gray-400 dark:text-[#66768f] mb-2" />
                <p className="text-xs text-gray-500 dark:text-[#66768f] text-center">
                  Click to upload
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-[#66768f]">
              Upload a high-quality image for your photo.
            </p>
            <p className="text-xs text-gray-500 dark:text-[#66768f] mt-1">
              Recommended: Square aspect ratio, max 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter photo title"
          className="w-full px-4 py-2 border border-gray-300 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] dark:bg-[#131C31] dark:text-[#94A9C9]"
          required
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Where was this photo taken?"
          className="w-full px-4 py-2 border border-gray-300 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] dark:bg-[#131C31] dark:text-[#94A9C9]"
          required
        />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]">
          Date
        </label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="When was this photo taken? (e.g., 2024)"
          className="w-full px-4 py-2 border border-gray-300 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] dark:bg-[#131C31] dark:text-[#94A9C9]"
          required
        />
      </div>

      {/* After the Date input field, add the Featured checkbox */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-[#ffe400] border-gray-300 rounded focus:ring-[#ffe400] dark:bg-[#131C31] dark:border-[#222F43]"
        />
        <label
          htmlFor="featured"
          className="ml-2 text-sm font-medium text-[#101010] dark:text-[#94A9C9]"
        >
          Featured Photo
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-[#ffe400] text-[#101010] rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#ffe400] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {mode === "create" ? "Adding..." : "Updating..."}
            </>
          ) : (
            <>{mode === "create" ? "Add Photo" : "Update Photo"}</>
          )}
        </button>
      </div>
    </form>
  );
} 