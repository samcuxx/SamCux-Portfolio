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
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        slideInUp: 'slideInUp 0.5s ease-out',
        blob: 'blob 7s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
