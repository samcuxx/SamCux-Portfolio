"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Save, X } from "lucide-react";
import * as Icons from "lucide-react";

interface SocialLinkFormProps {
  mode: "create" | "edit";
  initialData?: {
    _id: Id<"socials">;
    platform: string;
    url: string;
    icon: string;
    showInHero: boolean;
    showInFooter: boolean;
    isActive?: boolean;
    order?: number;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

// List of common social media platforms and their corresponding Lucide icons
const SOCIAL_PLATFORMS = [
  { name: "Github", icon: "Github" },
  { name: "LinkedIn", icon: "Linkedin" },
  { name: "Twitter", icon: "Twitter" },
  { name: "YouTube", icon: "Youtube" },
  { name: "Instagram", icon: "Instagram" },
  { name: "Facebook", icon: "Facebook" },
  { name: "TikTok", icon: "Music2" },
  { name: "Email", icon: "Mail" },
  { name: "Website", icon: "Globe" },
  { name: "Discord", icon: "MessageSquare" },
  { name: "Twitch", icon: "Twitch" },
  { name: "Medium", icon: "FileText" },
  { name: "Dribbble", icon: "Dribbble" },
  { name: "Behance", icon: "Figma" },
  { name: "CodePen", icon: "Code" },
  { name: "Dev.to", icon: "Code2" },
  { name: "Hashnode", icon: "Hash" },
  { name: "StackOverflow", icon: "LayoutList" },
  { name: "WhatsApp", icon: "MessageCircle" },
  { name: "Telegram", icon: "Send" },
  { name: "Other", icon: "Link" },
];

export default function SocialLinkForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: SocialLinkFormProps) {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [showInHero, setShowInHero] = useState(true);
  const [showInFooter, setShowInFooter] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize form with initial data if in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setPlatform(initialData.platform);
      setUrl(initialData.url);
      setIcon(initialData.icon);
      setShowInHero(initialData.showInHero);
      setShowInFooter(initialData.showInFooter);
      setIsActive(initialData.isActive !== false);
    }
  }, [mode, initialData]);

  // Mutations
  const createSocialLink = useMutation(api.socials.create);
  const updateSocialLink = useMutation(api.socials.update);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === "create") {
        await createSocialLink({
          platform,
          url,
          icon,
          showInHero,
          showInFooter,
          isActive,
        });
      } else if (mode === "edit" && initialData) {
        await updateSocialLink({
          id: initialData._id,
          platform,
          url,
          icon,
          showInHero,
          showInFooter,
          isActive,
        });
      }

      // Reset form if creating
      if (mode === "create") {
        setPlatform("");
        setUrl("");
        setIcon("");
        setShowInHero(true);
        setShowInFooter(true);
        setIsActive(true);
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

  // Filter platforms based on search term
  const filteredPlatforms = SOCIAL_PLATFORMS.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle platform selection
  const handlePlatformSelect = (platformName: string, iconName: string) => {
    setPlatform(platformName);
    setIcon(iconName);
    setSearchTerm("");
  };

  // Dynamically render the selected icon
  const renderSelectedIcon = () => {
    if (!icon) return null;
    
    // @ts-ignore - Dynamically access icon from Lucide
    const IconComponent = Icons[icon];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="platform"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Platform
        </label>
        <div className="relative">
          <div className="flex items-center gap-2 w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus-within:ring-2 focus-within:ring-[#ffe400] bg-white dark:bg-[#131C31]">
            {icon && (
              <span className="text-gray-500 dark:text-[#94A9C9]">
                {renderSelectedIcon()}
              </span>
            )}
            <input
              type="text"
              value={searchTerm || platform}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value !== platform) {
                  setPlatform(e.target.value);
                }
              }}
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-[#94A9C9]"
              placeholder="Search or enter platform name"
              required
            />
          </div>
          
          {searchTerm && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-[#131C31] border border-gray-300 dark:border-[#222F43] rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredPlatforms.length > 0 ? (
                filteredPlatforms.map((p) => {
                  // @ts-ignore - Dynamically access icon from Lucide
                  const PlatformIcon = Icons[p.icon];
                  return (
                    <div
                      key={p.name}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#222F43] cursor-pointer"
                      onClick={() => handlePlatformSelect(p.name, p.icon)}
                    >
                      {PlatformIcon && <PlatformIcon className="w-4 h-4 text-gray-500 dark:text-[#94A9C9]" />}
                      <span className="text-gray-900 dark:text-[#94A9C9]">{p.name}</span>
                    </div>
                  );
                })
              ) : (
                <div className="px-3 py-2 text-gray-500 dark:text-[#66768f]">
                  No platforms found. You can use a custom name.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
          placeholder="https://example.com/username"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showInHero}
              onChange={(e) => setShowInHero(e.target.checked)}
              className="rounded text-[#ffe400] focus:ring-[#ffe400]"
            />
            <span className="text-sm text-gray-700 dark:text-[#94A9C9]">
              Show in Hero Section
            </span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showInFooter}
              onChange={(e) => setShowInFooter(e.target.checked)}
              className="rounded text-[#ffe400] focus:ring-[#ffe400]"
            />
            <span className="text-sm text-gray-700 dark:text-[#94A9C9]">
              Show in Footer
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="rounded text-[#ffe400] focus:ring-[#ffe400]"
          />
          <span className="text-sm text-gray-700 dark:text-[#94A9C9]">
            Active
          </span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
              text-gray-700 dark:text-[#94A9C9] hover:bg-gray-50 dark:hover:bg-[#222F43] 
              focus:outline-none focus:ring-2 focus:ring-[#ffe400] flex items-center gap-2"
            disabled={isSubmitting}
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        )}
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
          {mode === "create" ? "Add Social Link" : "Update Social Link"}
        </button>
      </div>
    </form>
  );
} 