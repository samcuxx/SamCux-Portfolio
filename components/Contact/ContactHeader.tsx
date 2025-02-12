import React from "react";
import AnimatedText from "../ui/AnimatedText";


export function ContactHeader() {
  return (
    <div className="text-center mb-12 animate-fadeIn">
      <AnimatedText
        text="Get in Touch"
        className={`font-dynapuff text-4xl md:text-5xl font-bold mb-8 text-[#101010] dark:text-[#94A9C9]`}
        initialClass="text-animate-fast"
      />
      <p className="text-gray-600 dark:text-[#66768f] leading-relaxed max-w-2xl mx-auto">
        Have a project in mind or want to collaborate? I&apos;d love to hear
        from you. Send me a message and I&apos;ll get back to you as soon as
        possible.
      </p>
    </div>
  );
}
