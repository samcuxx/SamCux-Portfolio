"use client";

import React, { useState } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, HTMLMotionProps } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const inputVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

const sparkleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3
    }
  }
};

const MotionForm = motion.form;
const MotionDiv = motion.div;

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form",
          botcheck: false,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success("Thank you for your message! I'll get back to you soon.");
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
      console.error("Form submission error:", error);
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

  return (
    <MotionForm 
      onSubmit={handleSubmit} 
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

      <div className="grid md:grid-cols-2 gap-6">
        <MotionDiv 
          className="space-y-2"
          variants={inputVariants}
        >
          <label 
            htmlFor="name"
            className="text-sm font-medium text-gray-600 dark:text-[#66768f]"
          >
            Name
          </label>
          <MotionDiv
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              pattern="^[A-Za-z\s'-]+$"
              title="Please enter a valid name"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#222F43] 
                bg-white dark:bg-[#131C31] text-gray-800 dark:text-[#94A9C9] 
                focus:border-[#ffe400] dark:focus:border-[#ffe400] outline-none
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </MotionDiv>
        </MotionDiv>

        <MotionDiv 
          className="space-y-2"
          variants={inputVariants}
        >
          <label 
            htmlFor="email"
            className="text-sm font-medium text-gray-600 dark:text-[#66768f]"
          >
            Email
          </label>
          <MotionDiv
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#222F43] 
                bg-white dark:bg-[#131C31] text-gray-800 dark:text-[#94A9C9] 
                focus:border-[#ffe400] dark:focus:border-[#ffe400] outline-none
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </MotionDiv>
        </MotionDiv>
      </div>

      <MotionDiv 
        className="space-y-2"
        variants={inputVariants}
      >
        <label 
          htmlFor="subject"
          className="text-sm font-medium text-gray-600 dark:text-[#66768f]"
        >
          Subject
        </label>
        <MotionDiv
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
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
        </MotionDiv>
      </MotionDiv>

      <MotionDiv 
        className="space-y-2"
        variants={inputVariants}
      >
        <label 
          htmlFor="message"
          className="text-sm font-medium text-gray-600 dark:text-[#66768f]"
        >
          Message
        </label>
        <MotionDiv
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
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
        </MotionDiv>
        <div className="text-xs text-gray-500 dark:text-[#66768f] text-right">
          {formData.message.length}/1000
        </div>
      </MotionDiv>

      <MotionDiv
        variants={inputVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative"
      >
        <MotionDiv
          className="absolute -top-1 -right-1"
          variants={sparkleVariants}
        >
          <Sparkles className="w-4 h-4 text-[#ffe400]" />
        </MotionDiv>
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
      </MotionDiv>
    </MotionForm>
  );
}