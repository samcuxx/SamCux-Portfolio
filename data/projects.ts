import { StaticImageData } from "next/image";
import { p1, p2, p3, p4, p5 } from "@/public/projects/projectImages";

export type Project = {
  title: string;
  description: string;
  image: StaticImageData | string;
  tags: string[];
  category: "Web" | "Mobile" | "UI/UX" | "Other";
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Modern E-commerce Platform",
    description:
      "A full-stack e-commerce application with Next.js, TypeScript, and Stripe integration.",
    image: p1,
    tags: ["Next.js", "TypeScript", "Stripe", "TailwindCSS"],
    category: "Web",
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/username/ecommerce",
    featured: true,
  },
  {
    title: "Social Media Dashboard",
    description: "Real-time analytics dashboard for social media management.",
    image: p2,
    tags: ["React", "Firebase", "ChartJS", "Material-UI"],
    category: "Mobile",
    liveUrl: "https://dashboard-demo.com",
    githubUrl: "https://github.com/username/dashboard",
    featured: true,
  },
  {
    title: "Travel Companion App",
    description:
      "Mobile app for travelers with offline maps and recommendations.",
    image: p3,
    tags: ["React Native", "Maps", "MongoDB", "Node.js"],
    category: "Mobile",
    liveUrl: "https://travel-app.com",
    githubUrl: "https://github.com/username/travel-app",
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website with dark mode and animations.",
    image: p4,
    tags: ["Next.js", "TailwindCSS", "Framer Motion"],
    category: "UI/UX",
    liveUrl: "https://portfolio.com",
    githubUrl: "https://github.com/username/portfolio",
  },
  {
    title: "Task Management UI",
    description: "Beautiful and intuitive task management interface design.",
    image: p5,
    tags: ["Figma", "UI Design", "Prototyping"],
    category: "UI/UX",
    liveUrl: "https://figma.com/file/...",
    githubUrl: "https://github.com/username/task-ui",
  },
  {
    title: "Weather Application",
    description: "Real-time weather updates with beautiful visualizations.",
    image: p1,
    tags: ["React", "WeatherAPI", "D3.js"],
    category: "Web",
    liveUrl: "https://weather-app.com",
    githubUrl: "https://github.com/username/weather",
  },
  {
    title: "Travel Companion App",
    description:
      "Mobile app for travelers with offline maps and recommendations.",
    image: p3,
    tags: ["React Native", "Maps", "MongoDB", "Node.js"],
    category: "Mobile",
    liveUrl: "https://travel-app.com",
    githubUrl: "https://github.com/username/travel-app",
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website with dark mode and animations.",
    image: p4,
    tags: ["Next.js", "TailwindCSS", "Framer Motion"],
    category: "UI/UX",
    liveUrl: "https://portfolio.com",
    githubUrl: "https://github.com/username/portfolio",
  },
  {
    title: "Task Management UI",
    description: "Beautiful and intuitive task management interface design.",
    image: p5,
    tags: ["Figma", "UI Design", "Prototyping"],
    category: "UI/UX",
    liveUrl: "https://figma.com/file/...",
    githubUrl: "https://github.com/username/task-ui",
  },
  {
    title: "Weather Application",
    description: "Real-time weather updates with beautiful visualizations.",
    image: p1,
    tags: ["React", "WeatherAPI", "D3.js"],
    category: "Web",
    liveUrl: "https://weather-app.com",
    githubUrl: "https://github.com/username/weather",
  },
  {
    title: "Travel Companion App",
    description:
      "Mobile app for travelers with offline maps and recommendations.",
    image: p3,
    tags: ["React Native", "Maps", "MongoDB", "Node.js"],
    category: "Mobile",
    liveUrl: "https://travel-app.com",
    githubUrl: "https://github.com/username/travel-app",
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website with dark mode and animations.",
    image: p4,
    tags: ["Next.js", "TailwindCSS", "Framer Motion"],
    category: "UI/UX",
    liveUrl: "https://portfolio.com",
    githubUrl: "https://github.com/username/portfolio",
  },
  {
    title: "Task Management UI",
    description: "Beautiful and intuitive task management interface design.",
    image: p5,
    tags: ["Figma", "UI Design", "Prototyping"],
    category: "UI/UX",
    liveUrl: "https://figma.com/file/...",
    githubUrl: "https://github.com/username/task-ui",
  },
  {
    title: "Weather Application",
    description: "Real-time weather updates with beautiful visualizations.",
    image: p1,
    tags: ["React", "WeatherAPI", "D3.js"],
    category: "Web",
    liveUrl: "https://weather-app.com",
    githubUrl: "https://github.com/username/weather",
  },
  {
    title: "Travel Companion App",
    description:
      "Mobile app for travelers with offline maps and recommendations.",
    image: p3,
    tags: ["React Native", "Maps", "MongoDB", "Node.js"],
    category: "Mobile",
    liveUrl: "https://travel-app.com",
    githubUrl: "https://github.com/username/travel-app",
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website with dark mode and animations.",
    image: p4,
    tags: ["Next.js", "TailwindCSS", "Framer Motion"],
    category: "UI/UX",
    liveUrl: "https://portfolio.com",
    githubUrl: "https://github.com/username/portfolio",
  },
  {
    title: "Task Management UI",
    description: "Beautiful and intuitive task management interface design.",
    image: p5,
    tags: ["Figma", "UI Design", "Prototyping"],
    category: "UI/UX",
    liveUrl: "https://figma.com/file/...",
    githubUrl: "https://github.com/username/task-ui",
  },
  {
    title: "Weather Application",
    description: "Real-time weather updates with beautiful visualizations.",
    image: p1,
    tags: ["React", "WeatherAPI", "D3.js"],
    category: "Web",
    liveUrl: "https://weather-app.com",
    githubUrl: "https://github.com/username/weather",
  },
];
