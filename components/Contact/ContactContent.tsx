import React from "react";
import { ContactHeader } from "./ContactHeader";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

type ContactContentProps = {
  contactData: any;
};

export function ContactContent({ contactData }: ContactContentProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <ContactHeader />
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <ContactInfo contactData={contactData} />
        </div>
        <div className="space-y-8">
          <ContactForm contactData={contactData} />
        </div>
      </div>
    </div>
  );
} 