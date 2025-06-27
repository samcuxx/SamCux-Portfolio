"use client";

import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-t-[#ffe400] border-r-transparent border-b-[#94A9C9] border-l-transparent animate-spin"></div>
    </div>
  );
} 