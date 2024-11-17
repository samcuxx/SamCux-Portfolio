import React from "react";
import { ContactHeader } from "./ContactHeader";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function ContactContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <ContactHeader />
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 animate-slideInLeft">
          <ContactInfo />
        </div>
        <div className="space-y-8 animate-slideInRight">
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 