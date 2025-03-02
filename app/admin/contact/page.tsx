"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/Admin/ContactForm";

export default function ContactPage() {
  const contactData = useQuery(api.contact.get);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = () => {
    setError(null);
    // The query will automatically refresh
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
          Contact Information
        </h1>
        <p className="text-gray-600 dark:text-[#66768f] mt-1">
          Manage your contact information and form settings
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <div className="flex items-center mb-6">
          <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#ffe400]" />
            Contact Details
          </h2>
        </div>

        {contactData === undefined ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
          </div>
        ) : (
          <ContactForm 
            initialData={contactData || undefined} 
            onSuccess={handleSuccess} 
          />
        )}
      </div>

      {contactData && (
        <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
          <div className="flex items-center mb-6">
            <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#ffe400]" />
              Preview
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg">
                  <Mail className="w-5 h-5 text-[#ffe400]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Email
                  </h4>
                  <p className="text-[#101010] dark:text-[#94A9C9] font-medium">
                    {contactData.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg">
                  <Phone className="w-5 h-5 text-[#ffe400]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Phone
                  </h4>
                  <p className="text-[#101010] dark:text-[#94A9C9] font-medium">
                    {contactData.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg">
                  <MapPin className="w-5 h-5 text-[#ffe400]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Location
                  </h4>
                  <p className="text-[#101010] dark:text-[#94A9C9] font-medium">
                    {contactData.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg">
                  <Clock className="w-5 h-5 text-[#ffe400]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Office Hours
                  </h4>
                  <p className="text-[#101010] dark:text-[#94A9C9] font-medium">
                    {contactData.officeHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 