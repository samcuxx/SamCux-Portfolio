import React from "react";
import { ChevronDown } from "lucide-react";

export function ScrollMessage() {
  return (
    <div className="absolute bottom-8 right-8 flex flex-col items-center p-0">
      {/* <span className="text-gray-600 dark:text-[#94A9C9] text-sm font-semibold uppercase transform -rotate-90 bg-red-400">
        Explore
      </span> */}
      <ChevronDown
        size={24}
        className="text-gray-600 dark:text-[#94A9C9] animate-bounce mt-8"
      />
    </div>
  );
}
