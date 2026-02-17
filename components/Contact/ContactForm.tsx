"use client";

import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

type ContactFormProps = {
  contactData: any;
};

export function ContactForm({ contactData }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactData) {
      toast.error("Contact form configuration is not available");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: contactData.formApiKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form",
          to: contactData.submissionEmail, // Correct field name for Web3Forms
          botcheck: false,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you for your message! I'll get back to you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!contactData) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Spam Prevention - Hidden Input */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-600 dark:text-[#66768f]"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
            pattern="^[A-Za-z\s'\-]+$"
            title="Please enter a valid name"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#222F43] 
              bg-white dark:bg-[#131C31] text-gray-800 dark:text-[#94A9C9] 
              focus:border-[#ffe400] dark:focus:border-[#ffe400] outline-none
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-600 dark:text-[#66768f]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#222F43] 
              bg-white dark:bg-[#131C31] text-gray-800 dark:text-[#94A9C9] 
              focus:border-[#ffe400] dark:focus:border-[#ffe400] outline-none
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-gray-600 dark:text-[#66768f]"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          minLength={5}
          maxLength={100}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#222F43] 
            bg-white dark:bg-[#131C31] text-gray-800 dark:text-[#94A9C9] 
            focus:border-[#ffe400] dark:focus:border-[#ffe400] outline-none
            transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-gray-600 dark:text-[#66768f]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={1000}
          rows={6}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#222F43] 
            bg-white dark:bg-[#131C31] text-gray-800 dark:text-[#94A9C9] 
            focus:border-[#ffe400] dark:focus:border-[#ffe400] outline-none
            transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="text-xs text-gray-500 dark:text-[#66768f] text-right">
          {formData.message.length}/1000
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffe400] 
          text-[#101010] rounded-full font-semibold hover:scale-105 
          transition-transform duration-300 disabled:opacity-50 
          disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? (
          <>
            Sending...
            <Loader2 className="w-4 h-4 animate-spin" />
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
