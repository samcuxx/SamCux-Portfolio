"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Upload, X, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getGitHubUserFromCookies } from "@/lib/convex-client";
import { getConvexImageUrl } from "@/lib/utils";

type ProjectFormProps = {
  mode: "create" | "edit";
  initialData?: any;
};

export default function ProjectForm({ mode, initialData }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });

  // Convex mutations and queries
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  
  // Get the image URL directly from Convex if we have a storage ID
  const imageStorageId = initialData?.imageUrl && !initialData.imageUrl.includes("://") 
    ? initialData.imageUrl 
    : null;
    
  const imageUrl = useQuery(
    api.files.getUrl, 
    imageStorageId ? { storageId: imageStorageId } : "skip"
  );

  // Initialize form with existing data if editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "Web",
        liveUrl: initialData.liveUrl || "",
        githubUrl: initialData.githubUrl || "",
        featured: initialData.featured || false,
      });
      setTags(initialData.tags || []);
      setImageLoaded(false); // Reset the loaded state
      
      // Set image preview from existing project
      if (initialData.imageUrl) {
        console.log("Original image URL:", initialData.imageUrl);
        
        // If it's a storage ID and we have the URL from Convex, use that
        if (imageStorageId && imageUrl) {
          console.log("Using Convex URL:", imageUrl);
          setImagePreview(imageUrl);
        } else {
          // Otherwise use our utility function
          const fullUrl = getConvexImageUrl(initialData.imageUrl);
          console.log("Converted image URL:", fullUrl);
          setImagePreview(fullUrl);
        }
      }
    }
  }, [mode, initialData, imageUrl, imageStorageId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = initialData?.imageUrl || "";

      // Upload image if a new one is selected
      if (imageFile) {
        try {
          // Get GitHub user from cookies
          const githubUser = getGitHubUserFromCookies();
          
          if (!githubUser) {
            throw new Error("Not authenticated - Please log in to upload files");
          }
          
          // Step 1: Get upload URL with GitHub ID
          const uploadUrl = await generateUploadUrl({
            githubId: githubUser.id.toString()
          });
          
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
          
          // Store just the storage ID instead of the full URL
          // This makes it more portable between environments
          imageUrl = data.storageId;
          console.log("Image storage ID set to:", imageUrl);
        } catch (error: any) {
          console.error("Error uploading image:", error);
          
          // Check for authentication errors
          if (error.message?.includes("Not authenticated") || error.message?.includes("Not authorized")) {
            toast.error("Authentication error: Please ensure you're logged in as an admin");
            // Redirect to login page
            router.push("/admin/login");
          } else {
            toast.error("Failed to upload image: " + (error.message || "Unknown error"));
          }
          
          setIsLoading(false);
          return;
        }
      }

      // Validate required fields
      if (!imageUrl) {
        toast.error("Please upload an image");
        setIsLoading(false);
        return;
      }

      // Create or update the project
      if (mode === "create") {
        await createProject({
          title: formData.title,
          description: formData.description,
          imageUrl,
          tags,
          category: formData.category as any,
          liveUrl: formData.liveUrl,
          githubUrl: formData.githubUrl,
          featured: formData.featured,
        });
        toast.success("Project created successfully");
      } else {
        await updateProject({
          id: initialData._id,
          title: formData.title,
          description: formData.description,
          imageUrl,
          tags,
          category: formData.category as any,
          liveUrl: formData.liveUrl,
          githubUrl: formData.githubUrl,
          featured: formData.featured,
        });
        toast.success("Project updated successfully");
      }

      // Redirect back to projects list
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error(`Failed to ${mode === "create" ? "create" : "update"} project`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]">
          Project Image
        </label>
        <div className="flex items-center gap-4">
          {imagePreview ? (
            <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-[#222F43]">
              <div className={`absolute inset-0 bg-gray-200 dark:bg-[#222F43] animate-pulse transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
              <img
                src={imagePreview}
                alt="Preview"
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.log("Image preview failed to load, using fallback:", imagePreview);
                  // Don't log as error since we're handling it gracefully
                  e.currentTarget.src = "/placeholder-image.jpg"; // Fallback image
                  e.currentTarget.onerror = null; // Prevent infinite error loop
                  setImageLoaded(true); // Consider it loaded once the fallback is set
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                  setImageLoaded(false);
                }}
                className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-20 flex items-center justify-center border border-dashed border-gray-300 dark:border-[#222F43] rounded-lg">
              <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                <Upload className="w-5 h-5 text-gray-400 dark:text-[#66768f]" />
                <span className="text-xs text-gray-500 dark:text-[#66768f] mt-1">
                  Upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
          <div className="text-sm text-gray-500 dark:text-[#66768f]">
            <p>Recommended size: 1200 x 800 pixels</p>
            <p>Max size: 5MB</p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-white dark:bg-[#131C31] border border-gray-200 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] focus:border-transparent"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-2 bg-white dark:bg-[#131C31] border border-gray-200 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] focus:border-transparent"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-white dark:bg-[#131C31] border border-gray-200 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] focus:border-transparent"
        >
          <option value="Web">Web</option>
          <option value="Mobile">Mobile</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 px-2 py-1 bg-[#ffe400] bg-opacity-10 rounded-lg"
            >
              <span className="text-xs text-[#101010] dark:text-[#94A9C9]">
                {tag}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-gray-500 dark:text-[#66768f] hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Add a tag"
            className="flex-1 px-4 py-2 bg-white dark:bg-[#131C31] border border-gray-200 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-[#ffe400] text-[#101010] rounded-lg hover:bg-[#ffe400]/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Live URL */}
      <div className="space-y-2">
        <label
          htmlFor="liveUrl"
          className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]"
        >
          Live URL
        </label>
        <input
          type="url"
          id="liveUrl"
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-white dark:bg-[#131C31] border border-gray-200 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] focus:border-transparent"
        />
      </div>

      {/* GitHub URL */}
      <div className="space-y-2">
        <label
          htmlFor="githubUrl"
          className="block text-sm font-medium text-[#101010] dark:text-[#94A9C9]"
        >
          GitHub URL
        </label>
        <input
          type="url"
          id="githubUrl"
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-white dark:bg-[#131C31] border border-gray-200 dark:border-[#222F43] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe400] focus:border-transparent"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-[#ffe400] border-gray-300 rounded focus:ring-[#ffe400]"
        />
        <label
          htmlFor="featured"
          className="ml-2 text-sm font-medium text-[#101010] dark:text-[#94A9C9]"
        >
          Featured Project
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-[#ffe400] text-[#101010] rounded-lg hover:bg-[#ffe400]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {mode === "create" ? "Create Project" : "Update Project"}
        </button>
      </div>
    </form>
  );
} 