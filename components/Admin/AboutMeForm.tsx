"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Save, Upload, X, Image as ImageIcon, FileText } from "lucide-react";

interface AboutMeFormProps {
  initialData?: {
    _id: Id<"aboutMe">;
    bio: string;
    additionalText?: string;
    location: string;
    resumeUrl: string;
    resumeFileName?: string;
    profileImageUrl?: string;
    yearsExperience: number;
    projectsCount: number;
    clientsCount: number;
    coffeeCount: string;
  };
  onSuccess?: () => void;
}

export default function AboutMeForm({
  initialData,
  onSuccess,
}: AboutMeFormProps) {
  const [bio, setBio] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [location, setLocation] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [yearsExperience, setYearsExperience] = useState<number>(0);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [clientsCount, setClientsCount] = useState<number>(0);
  const [coffeeCount, setCoffeeCount] = useState("∞");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Initialize form with initial data if available
  useEffect(() => {
    if (initialData) {
      setBio(initialData.bio);
      setAdditionalText(initialData.additionalText || "");
      setLocation(initialData.location);
      setResumeUrl(initialData.resumeUrl);
      setResumeFileName(initialData.resumeFileName || "");
      setProfileImageUrl(initialData.profileImageUrl || "");
      setYearsExperience(initialData.yearsExperience);
      setProjectsCount(initialData.projectsCount);
      setClientsCount(initialData.clientsCount);
      setCoffeeCount(initialData.coffeeCount);
    }
  }, [initialData]);

  // Mutations
  const createAboutMe = useMutation(api.aboutMe.create);
  const updateAboutMe = useMutation(api.aboutMe.update);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (initialData) {
        // Update existing record
        await updateAboutMe({
          id: initialData._id,
          bio,
          additionalText: additionalText || undefined,
          location,
          resumeUrl,
          resumeFileName: resumeFileName || undefined,
          profileImageUrl: profileImageUrl || undefined,
          yearsExperience,
          projectsCount,
          clientsCount,
          coffeeCount,
        });
      } else {
        // Create new record
        await createAboutMe({
          bio,
          additionalText: additionalText || undefined,
          location,
          resumeUrl,
          resumeFileName: resumeFileName || undefined,
          profileImageUrl: profileImageUrl || undefined,
          yearsExperience,
          projectsCount,
          clientsCount,
          coffeeCount,
        });
      }

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle profile image upload
  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Profile image must be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("File must be an image");
      return;
    }

    setIsUploadingImage(true);
    setError(null);

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);
      
      // Send the file to your upload endpoint
      const response = await fetch("/api/upload?type=profile", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload profile image");
      }
      
      const data = await response.json();
      setProfileImageUrl(data.url);
      
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle resume file upload
  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Resume file must be less than 10MB");
      return;
    }

    // Check file type
    if (file.type !== "application/pdf") {
      setError("Resume file must be a PDF");
      return;
    }

    setIsUploadingResume(true);
    setError(null);

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);
      
      // Send the file to your upload endpoint
      const response = await fetch("/api/upload?type=resume", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload resume file");
      }
      
      const data = await response.json();
      setResumeUrl(data.url);
      setResumeFileName(file.name);
      
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsUploadingResume(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Profile Image Upload */}
        <div>
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Profile Image
          </label>
          <div className="flex items-start gap-4">
            <div className="relative w-32 h-32 bg-gray-100 dark:bg-[#222F43] rounded-lg overflow-hidden flex items-center justify-center border border-gray-300 dark:border-[#222F43]">
              {profileImageUrl ? (
                <>
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setProfileImageUrl("")}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                    aria-label="Remove profile image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-400 dark:text-[#66768f]" />
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                id="profileImage"
                ref={profileImageInputRef}
                onChange={handleProfileImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => profileImageInputRef.current?.click()}
                className="px-4 py-2 bg-gray-100 dark:bg-[#222F43] rounded-md text-gray-700 dark:text-[#94A9C9] 
                  hover:bg-gray-200 dark:hover:bg-[#2A3A56] focus:outline-none focus:ring-2 focus:ring-[#ffe400] 
                  flex items-center gap-2 disabled:opacity-70"
                disabled={isUploadingImage}
              >
                {isUploadingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {profileImageUrl ? "Change Image" : "Upload Image"}
              </button>
              <p className="mt-1 text-xs text-gray-500 dark:text-[#66768f]">
                Recommended size: 500x600px. Max size: 5MB.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
              text-gray-900 dark:text-[#94A9C9]"
            required
            placeholder="Tell us about yourself..."
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-[#66768f]">
            This will be displayed in the About section of your portfolio.
          </p>
        </div>

        <div>
          <label
            htmlFor="additionalText"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Additional Text
          </label>
          <textarea
            id="additionalText"
            value={additionalText}
            onChange={(e) => setAdditionalText(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
              text-gray-900 dark:text-[#94A9C9]"
            placeholder="Additional information about yourself..."
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-[#66768f]">
            This will be displayed as a second paragraph in the About section.
          </p>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
              text-gray-900 dark:text-[#94A9C9]"
            required
            placeholder="e.g. New York, USA"
          />
        </div>

        {/* Resume File Upload */}
        <div>
          <label
            htmlFor="resumeFile"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Resume File
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-[#222F43] rounded-md border border-gray-300 dark:border-[#222F43]">
                <FileText className="w-5 h-5 text-gray-400 dark:text-[#66768f]" />
                <span className="text-sm text-gray-700 dark:text-[#94A9C9] truncate">
                  {resumeFileName || resumeUrl || "No file selected"}
                </span>
              </div>
            </div>
            <div>
              <input
                type="file"
                id="resumeFile"
                ref={resumeInputRef}
                onChange={handleResumeChange}
                accept=".pdf"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="px-4 py-2 bg-gray-100 dark:bg-[#222F43] rounded-md text-gray-700 dark:text-[#94A9C9] 
                  hover:bg-gray-200 dark:hover:bg-[#2A3A56] focus:outline-none focus:ring-2 focus:ring-[#ffe400] 
                  flex items-center gap-2 disabled:opacity-70"
                disabled={isUploadingResume}
              >
                {isUploadingResume ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                Upload Resume
              </button>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-[#66768f]">
            Upload your resume as a PDF file. Max size: 10MB.
          </p>
        </div>

        <div>
          <label
            htmlFor="resumeUrl"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Resume URL
          </label>
          <input
            type="text"
            id="resumeUrl"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
              text-gray-900 dark:text-[#94A9C9]"
            required
            placeholder="e.g. /resume.pdf"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-[#66768f]">
            Path to your resume file. This will be updated automatically when you upload a file.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-[#222F43] pt-4">
        <h3 className="text-md font-medium text-gray-700 dark:text-[#94A9C9] mb-3">
          Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="yearsExperience"
              className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
            >
              Years of Experience
            </label>
            <input
              type="number"
              id="yearsExperience"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
                focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
                text-gray-900 dark:text-[#94A9C9]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="projectsCount"
              className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
            >
              Projects Count
            </label>
            <input
              type="number"
              id="projectsCount"
              value={projectsCount}
              onChange={(e) => setProjectsCount(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
                focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
                text-gray-900 dark:text-[#94A9C9]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="clientsCount"
              className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
            >
              Clients Count
            </label>
            <input
              type="number"
              id="clientsCount"
              value={clientsCount}
              onChange={(e) => setClientsCount(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
                focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
                text-gray-900 dark:text-[#94A9C9]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="coffeeCount"
              className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
            >
              Coffee Count
            </label>
            <input
              type="text"
              id="coffeeCount"
              value={coffeeCount}
              onChange={(e) => setCoffeeCount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
                focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
                text-gray-900 dark:text-[#94A9C9]"
              required
              placeholder="e.g. ∞"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-[#66768f]">
              Use "∞" for infinity or a number.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-[#ffe400] rounded-md text-[#101010] 
            hover:bg-[#ffd700] focus:outline-none focus:ring-2 focus:ring-[#ffe400] 
            flex items-center gap-2 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {initialData ? "Update About Me" : "Save About Me"}
        </button>
      </div>
    </form>
  );
} 