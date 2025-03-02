"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Save, X, Plus, Trash2 } from "lucide-react";

interface ExperienceFormProps {
  mode: "create" | "edit";
  initialData?: {
    _id: Id<"experience">;
    year: string;
    title: string;
    company: string;
    description: string;
    achievements: string[];
    order?: number;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ExperienceForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: ExperienceFormProps) {
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [achievements, setAchievements] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with initial data if in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setYear(initialData.year);
      setTitle(initialData.title);
      setCompany(initialData.company);
      setDescription(initialData.description);
      setAchievements(initialData.achievements.length > 0 ? initialData.achievements : [""]);
    }
  }, [mode, initialData]);

  // Mutations
  const createExperience = useMutation(api.experience.create);
  const updateExperience = useMutation(api.experience.update);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Filter out empty achievements
    const filteredAchievements = achievements.filter(a => a.trim() !== "");

    try {
      if (mode === "create") {
        await createExperience({
          year,
          title,
          company,
          description,
          achievements: filteredAchievements,
        });
      } else if (mode === "edit" && initialData) {
        await updateExperience({
          id: initialData._id,
          year,
          title,
          company,
          description,
          achievements: filteredAchievements,
        });
      }

      // Reset form if creating
      if (mode === "create") {
        setYear("");
        setTitle("");
        setCompany("");
        setDescription("");
        setAchievements([""]);
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

  // Handle achievement changes
  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };

  // Add a new achievement field
  const addAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  // Remove an achievement field
  const removeAchievement = (index: number) => {
    if (achievements.length > 1) {
      const newAchievements = [...achievements];
      newAchievements.splice(index, 1);
      setAchievements(newAchievements);
    }
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
          htmlFor="year"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Year
        </label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
          placeholder="2023 - Present"
        />
        <div className="text-sm text-gray-500 dark:text-[#66768f]">
          Format: "2021 - 2023" or "2023 - Present"
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Job Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
          placeholder="Senior Software Engineer"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
          placeholder="Company Name"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
          placeholder="Brief description of your role and responsibilities"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
          >
            Achievements
          </label>
          <button
            type="button"
            onClick={addAchievement}
            className="text-sm text-[#ffe400] hover:text-[#ffd700] flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Achievement
          </button>
        </div>
        
        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
                  text-gray-900 dark:text-[#94A9C9]"
                placeholder="Led team of 5 developers"
              />
              <button
                type="button"
                onClick={() => removeAchievement(index)}
                className="p-2 text-gray-500 hover:text-red-500"
                disabled={achievements.length <= 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500 dark:text-[#66768f]">
          Add key achievements or responsibilities from this role
        </div>
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
          {mode === "create" ? "Add Experience" : "Update Experience"}
        </button>
      </div>
    </form>
  );
} 