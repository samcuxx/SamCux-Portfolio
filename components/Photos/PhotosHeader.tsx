import React from "react";
import AnimatedText from "../ui/AnimatedText";


export function PhotosHeader() {
  return (
    <div className="text-center mb-2 md:mb-12 animate-fadeIn">
      <AnimatedText
        text="Photo Gallery"
        className={`font-dynapuff text-5xl md:text-6xl font-bold mb-4 md:mb-8 text-[#101010] dark:text-[#94A9C9] text-left md:text-center mx-auto`}
        initialClass="text-animate-fast"
      />
    </div>
  );
}
