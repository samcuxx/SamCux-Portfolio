import React from "react";
import AnimatedText from "../ui/AnimatedText";

export function AboutHeader() {
  return (
    <div className="text-center mb-12 animate-fadeIn">
      <AnimatedText
        text="About Me"
        className={`font-dynapuff text-4xl md:text-5xl font-bold mb-8 text-[#101010] dark:text-[#94A9C9]`}
        initialClass="text-animate-fast"
      />
    </div>
  );
}
