"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";

export default function Theme() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    return currentTheme === "light" ? setTheme("dark") : setTheme("light");
  }
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted)
    return (
      <span className="animate-pulse size-3.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
    );

  return (
    <button
      onClick={toggleTheme}
      className={`text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] dark:hover:text-[#ffe400] duration-300 transition-all ${
        currentTheme === "light" ? "-rotate-180" : "rotate-0"
      }`}
      aria-label="Toggle Theme"
    >
      {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
