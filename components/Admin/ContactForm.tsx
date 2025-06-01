"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Save, Eye, EyeOff } from "lucide-react";

interface ContactFormProps {
  initialData?: {
    _id: Id<"contact">;
    email: string;
    phone: string;
    location: string;
    officeHours: string;
    formApiKey: string;
    submissionEmail: string;
  };
  onSuccess?: () => void;
}

export default function ContactForm({
  initialData,
  onSuccess,
}: ContactFormProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [officeHours, setOfficeHours] = useState("");
  const [formApiKey, setFormApiKey] = useState("");
  const [submissionEmail, setSubmissionEmail] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with initial data if available
  useEffect(() => {
    if (initialData) {
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setLocation(initialData.location);
      setOfficeHours(initialData.officeHours);
      setFormApiKey(initialData.formApiKey);
      setSubmissionEmail(initialData.submissionEmail);
    }
  }, [initialData]);

  // Mutations
  const createContact = useMutation(api.contact.create);
  const updateContact = useMutation(api.contact.update);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (initialData) {
        // Update existing record
        await updateContact({
          id: initialData._id,
          email,
          phone,
          location,
          officeHours,
          formApiKey,
          submissionEmail,
        });
      } else {
        // Create new record
        await createContact({
          email,
          phone,
          location,
          officeHours,
          formApiKey,
          submissionEmail,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Email (Display on Contact Page)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
              text-gray-900 dark:text-[#94A9C9]"
            required
            placeholder="e.g. contact@example.com"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-[#66768f]">
            This email will be displayed on your contact page
          </p>
        </div>

        <div>
          <label
            htmlFor="submissionEmail"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Form Submission Email
          </label>
          <input
            type="email"
            id="submissionEmail"
            value={submissionEmail}
            onChange={(e) => setSubmissionEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
              text-gray-900 dark:text-[#94A9C9]"
            required
            placeholder="e.g. submissions@example.com"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-[#66768f]">
            Form submissions will be sent to this email address
          </p>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
              text-gray-900 dark:text-[#94A9C9]"
            required
            placeholder="e.g. +1 234 567 8900"
          />
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

        <div>
          <label
            htmlFor="officeHours"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Office Hours
          </label>
          <input
            type="text"
            id="officeHours"
            value={officeHours}
            onChange={(e) => setOfficeHours(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
              text-gray-900 dark:text-[#94A9C9]"
            required
            placeholder="e.g. Mon - Fri, 9AM - 5PM"
          />
        </div>

        <div>
          <label
            htmlFor="formApiKey"
            className="block text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1"
          >
            Form API Key (Web3Forms)
          </label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              id="formApiKey"
              value={formApiKey}
              onChange={(e) => setFormApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#222F43] rounded-md 
                focus:outline-none focus:ring-2 focus:ring-[#ffe400] bg-white dark:bg-[#131C31] 
                text-gray-900 dark:text-[#94A9C9] pr-10"
              required
              placeholder="Your Web3Forms API key"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-[#66768f]"
            >
              {showApiKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-[#66768f]">
            Get your API key from{" "}
            <a
              href="https://web3forms.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffe400] hover:underline"
            >
              Web3Forms
            </a>
          </p>
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
          {initialData ? "Update Contact Info" : "Save Contact Info"}
        </button>
      </div>
    </form>
  );
}
