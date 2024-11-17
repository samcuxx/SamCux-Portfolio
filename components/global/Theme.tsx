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
      <span className="animate-pulse min-w-[28px] min-h-[28px] p-2 rounded-full dark:bg-sa-dark-foregroung bg-sa-light-foregroung border dark:border-sa-dark-foregroung border-sa-light-foregroung"></span>
    );

  return (
    <button
      onClick={toggleTheme}
      className={`dark:bg-sa-dark-foregroung bg-sa-light-foregroung dark:text-sa-dark-text-low text-sa-light-accent border dark:border-sa-dark-foregroung border-sa-light-foregroung rounded-full p-2 duration-300 transition-transform group: ${
        currentTheme === "light" ? "-rotate-180" : "rotate-0"
      }`}
      aria-label="Toggle Theme"
    >
      {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
