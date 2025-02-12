import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode
        "sa-light-primary": "#FFD700",
        "sa-light-foregroung": "#D2D2D2",
        "sa-light-bg": "#F8F8F8",
        "sa-light-bg2": "#E9E9E9",
        "sa-light-accent": "#222222",

        // dark mode
        "sa-dark-primary": "#FFD700",
        "sa-dark-foregroung": "#131C31",
        "sa-dark-bg": "#0F172A",
        "sa-dark-bg2": "#E9E9E9",
        // "sa-dark-accent": "#b9e0f2",
        "sa-dark-text-low": "#66768F",
        "sa-dark-text-main": "#94A9C9",
        "sa-dark-accent": "#b9e0f2",
        "sa-dark-border": "#222F43",
        // neutral
        "sa-blue": "#0ea5ea",
        "sa-blue2": "#0bd1d1",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        slideInLeft: "slideInLeft 0.5s ease-out",
        slideInRight: "slideInRight 0.5s ease-out",
        slideInUp: "slideInUp 0.5s ease-out",
        blob: "blob 7s infinite",
        wave: "wave 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        scaleIn: "scaleIn 0.3s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        dynapuff: ["var(--font-dynapuff)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
