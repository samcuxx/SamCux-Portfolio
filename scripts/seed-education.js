// Script to seed initial education and certification data
const { ConvexHttpClient } = require("convex/browser");
require('dotenv').config({ path: '.env.local' });

// Get the Convex URL from environment variables
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.error("Error: NEXT_PUBLIC_CONVEX_URL is not defined in .env.local");
  process.exit(1);
}

// Create a Convex HTTP client
const client = new ConvexHttpClient(convexUrl);

// Initial education and certification data
const educationData = [
  {
    type: "certification",
    title: "AWS Certified Developer",
    institution: "Amazon Web Services",
    year: "2023",
    icon: "award",
    order: 0
  },
  {
    type: "education",
    title: "Computer Science",
    institution: "University Name",
    year: "2019 - 2023",
    icon: "graduation-cap",
    order: 1
  },
  {
    type: "certification",
    title: "Google Cloud Professional",
    institution: "Google Cloud",
    year: "2022",
    icon: "award",
    order: 2
  },
  {
    type: "education",
    title: "Web Development Bootcamp",
    institution: "Coding Academy",
    year: "2018",
    icon: "graduation-cap",
    order: 3
  }
];

async function seedEducation() {
  console.log("Seeding education and certification data...");
  
  try {
    // Import the API dynamically
    const { api } = await import("../convex/_generated/api.js");
    
    // Add each education item
    for (const item of educationData) {
      try {
        await client.mutation(api.education.create, item);
        console.log(`Added: ${item.title} (${item.type})`);
      } catch (error) {
        console.error(`Error adding ${item.title}:`, error.message);
      }
    }
    
    console.log("Education and certification seeding completed!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

// Run the seeding function
seedEducation(); 