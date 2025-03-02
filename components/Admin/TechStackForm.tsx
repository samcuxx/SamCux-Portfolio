"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Save, X } from "lucide-react";

interface TechStackFormProps {
  mode: "create" | "edit";
  initialData?: {
    _id: Id<"techStacks">;
    name: string;
    icon: string;
    category?: string;
    order?: number;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function TechStackForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: TechStackFormProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with initial data if in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setName(initialData.name);
      setIcon(initialData.icon);
      setCategory(initialData.category);
    }
  }, [mode, initialData]);

  // Mutations
  const createTechStack = useMutation(api.techStacks.create);
  const updateTechStack = useMutation(api.techStacks.update);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === "create") {
        await createTechStack({
          name,
          icon,
          category: category as any,
        });
      } else if (mode === "edit" && initialData) {
        await updateTechStack({
          id: initialData._id,
          name,
          icon,
          category: category as any,
        });
      }

      // Reset form if creating
      if (mode === "create") {
        setName("");
        setIcon("");
        setCategory(undefined);
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

  const categories = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Mobile",
    "Other",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="icon"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Icon (emoji or symbol)
        </label>
        <input
          type="text"
          id="icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
        />
        <div className="text-sm text-gray-500 dark:text-[#66768f]">
          Use an emoji (e.g., 💛) or a simple symbol
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Category (optional)
        </label>
        <select
          id="category"
          value={category || ""}
          onChange={(e) => setCategory(e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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
          {mode === "create" ? "Add Tech Stack" : "Update Tech Stack"}
        </button>
      </div>
    </form>
  );
} 