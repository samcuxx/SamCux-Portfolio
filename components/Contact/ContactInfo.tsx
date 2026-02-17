"use client";

import React from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

type ContactInfoProps = {
  contactData: any;
};

export function ContactInfo({ contactData }: ContactInfoProps) {
  if (!contactData) {
    return null;
  }

  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: contactData.location,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: contactData.phone,
      href: `tel:${contactData.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Office Hours",
      value: contactData.officeHours,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <h3 className="text-2xl font-semibold text-[#101010] dark:text-[#94A9C9] mb-6">
          Contact Information
        </h3>
        <div className="absolute -left-4 top-0 w-1 h-full bg-[#ffe400] rounded-full" />
      </div>

      <div className="grid gap-6">
        {contactDetails.map((detail, index) => (
          <div
            key={index}
            className="group p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100
              dark:border-[#222F43] hover:border-[#ffe400] dark:hover:border-[#ffe400]
              transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#ffe400] bg-opacity-10 rounded-lg group-hover:bg-opacity-20 transition-all duration-300">
                {React.cloneElement(detail.icon, {
                  className: "w-5 h-5 text-[#ffe400]",
                })}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-[#66768f]">
                  {detail.title}
                </h4>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-[#101010] dark:text-[#94A9C9] font-medium hover:text-[#ffe400] dark:hover:text-[#ffe400] transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-[#101010] dark:text-[#94A9C9] font-medium">
                    {detail.value}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
