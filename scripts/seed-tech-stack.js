// Script to seed initial tech stack data
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

// Initial tech stack data
const techStackData = [
  { name: "JavaScript", icon: "💛", category: "Frontend", order: 0 },
  { name: "TypeScript", icon: "💙", category: "Frontend", order: 1 },
  { name: "React", icon: "⚛️", category: "Frontend", order: 2 },
  { name: "Next.js", icon: "▲", category: "Frontend", order: 3 },
  { name: "Node.js", icon: "💚", category: "Backend", order: 4 },
  { name: "Python", icon: "🐍", category: "Backend", order: 5 },
  { name: "TailwindCSS", icon: "🎨", category: "Frontend", order: 6 },
  { name: "Git", icon: "📚", category: "DevOps", order: 7 }
];

async function seedTechStack() {
  console.log("Seeding tech stack data...");
  
  try {
    // Import the API dynamically
    const { api } = await import("../convex/_generated/api.js");
    
    // Add each tech stack item
    for (const item of techStackData) {
      try {
        await client.mutation(api.techStacks.create, item);
        console.log(`Added: ${item.name}`);
      } catch (error) {
        // Skip if the item already exists
        if (error.message.includes("already exists")) {
          console.log(`Skipped (already exists): ${item.name}`);
        } else {
          console.error(`Error adding ${item.name}:`, error.message);
        }
      }
    }
    
    console.log("Tech stack seeding completed!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

// Run the seeding function
seedTechStack(); 