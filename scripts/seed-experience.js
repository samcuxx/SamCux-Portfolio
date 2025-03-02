// Import the Convex HTTP client
const { ConvexHttpClient } = require("convex/browser");
require("dotenv").config({ path: ".env.local" });

// Get the Convex URL from environment variables
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.error("NEXT_PUBLIC_CONVEX_URL is not defined in .env.local");
  process.exit(1);
}

// Create a Convex client
const client = new ConvexHttpClient(convexUrl);

// Define initial experience data
const initialExperience = [
  {
    year: "2022 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    description: "Leading the frontend development team and implementing modern web applications with React, Next.js, and TypeScript.",
    achievements: [
      "Improved application performance by 40% through code optimization and implementing lazy loading techniques",
      "Led the migration from legacy codebase to React and TypeScript, resulting in improved developer productivity",
      "Mentored junior developers and established coding standards and best practices",
      "Implemented CI/CD pipelines reducing deployment time by 50%"
    ],
    order: 1
  },
  {
    year: "2019 - 2022",
    title: "Web Developer",
    company: "Digital Innovations",
    description: "Developed responsive web applications using modern JavaScript frameworks and collaborated with cross-functional teams.",
    achievements: [
      "Built and maintained client websites with 99.9% uptime",
      "Implemented responsive designs ensuring compatibility across all devices and browsers",
      "Collaborated with design team to create intuitive user interfaces",
      "Reduced page load times by 60% through performance optimizations"
    ],
    order: 2
  },
  {
    year: "2017 - 2019",
    title: "Junior Developer",
    company: "StartUp Tech",
    description: "Assisted in the development of web applications and gained experience with various technologies and frameworks.",
    achievements: [
      "Contributed to the development of 5+ client projects",
      "Learned and implemented best practices for web development",
      "Participated in code reviews and improved code quality",
      "Assisted in troubleshooting and fixing bugs in production applications"
    ],
    order: 3
  }
];

// Function to seed experience data
async function seedExperience() {
  console.log("Starting to seed experience data...");
  
  try {
    // Dynamically import the API
    const { api } = await import("../convex/_generated/api.js");
    
    // Loop through the initial experience data and add each item
    for (const item of initialExperience) {
      try {
        // Add the experience item
        await client.mutation(api.experience.create, {
          year: item.year,
          title: item.title,
          company: item.company,
          description: item.description,
          achievements: item.achievements,
          order: item.order
        });
        
        console.log(`Added experience: ${item.title} at ${item.company}`);
      } catch (error) {
        // If the item already exists, skip it
        if (error.message && error.message.includes("already exists")) {
          console.log(`Experience ${item.title} already exists, skipping...`);
        } else {
          console.error(`Error adding experience ${item.title}:`, error);
        }
      }
    }
    
    console.log("Experience data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding experience data:", error);
  }
}

// Call the seed function
seedExperience(); 