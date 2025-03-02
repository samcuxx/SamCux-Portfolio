"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Save, X } from "lucide-react";

interface EducationFormProps {
  mode: "create" | "edit";
  initialData?: {
    _id: Id<"education">;
    type: "education" | "certification";
    title: string;
    institution: string;
    year: string;
    icon: string;
    order?: number;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EducationForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: EducationFormProps) {
  const [type, setType] = useState<"education" | "certification">("education");
  const [title, setTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [year, setYear] = useState("");
  const [icon, setIcon] = useState("graduation-cap");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with initial data if in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setType(initialData.type);
      setTitle(initialData.title);
      setInstitution(initialData.institution);
      setYear(initialData.year);
      setIcon(initialData.icon);
    }
  }, [mode, initialData]);

  // Mutations
  const createEducation = useMutation(api.education.create);
  const updateEducation = useMutation(api.education.update);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === "create") {
        await createEducation({
          type,
          title,
          institution,
          year,
          icon,
        });
      } else if (mode === "edit" && initialData) {
        await updateEducation({
          id: initialData._id,
          type,
          title,
          institution,
          year,
          icon,
        });
      }

      // Reset form if creating
      if (mode === "create") {
        setType("education");
        setTitle("");
        setInstitution("");
        setYear("");
        setIcon("graduation-cap");
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

  // Available icons for education items
  const iconOptions = [
    { value: "graduation-cap", label: "Graduation Cap" },
    { value: "award", label: "Award" },
    { value: "certificate", label: "Certificate" },
    { value: "school", label: "School" },
    { value: "book", label: "Book" },
    { value: "briefcase", label: "Briefcase" },
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
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as "education" | "certification")}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
        >
          <option value="education">Education</option>
          <option value="certification">Certification</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Title
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
          placeholder={type === "education" ? "Computer Science" : "AWS Certified Developer"}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="institution"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Institution
        </label>
        <input
          type="text"
          id="institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
          placeholder={type === "education" ? "University Name" : "Amazon Web Services"}
        />
      </div>

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
          placeholder={type === "education" ? "2019 - 2023" : "2023"}
        />
        <div className="text-sm text-gray-500 dark:text-[#66768f]">
          For education, you can use a range (e.g., "2019 - 2023"). For certifications, use the year obtained.
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="icon"
          className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9]"
        >
          Icon
        </label>
        <select
          id="icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
            text-gray-900 dark:text-[#94A9C9]"
          required
        >
          {iconOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
          {mode === "create" ? "Add Education" : "Update Education"}
        </button>
      </div>
    </form>
  );
} 