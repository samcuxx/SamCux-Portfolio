// Seed script for About Me data
const { ConvexHttpClient } = require("convex/browser");
require("dotenv").config();

// Initialize the Convex client
const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Define initial About Me data
const aboutMeData = {
  bio: "Hey there! I'm a passionate Software Engineer and Content Creator based in New York. I love building beautiful, responsive, and user-friendly web applications while sharing my journey and knowledge with others.",
  additionalText: "When I'm not coding, you can find me creating content, exploring new technologies, or contributing to open-source projects. I believe in continuous learning and sharing knowledge with the developer community.",
  location: "New York, USA",
  resumeUrl: "/resume.pdf",
  resumeFileName: "resume.pdf",
  profileImageUrl: "/images/profile.jpg",
  yearsExperience: 5,
  projectsCount: 50,
  clientsCount: 20,
  coffeeCount: "∞",
};

async function seedAboutMe() {
  console.log("🌱 Seeding About Me data...");
  
  try {
    // Check if About Me data already exists
    const existingData = await client.query("aboutMe:get");
    
    if (existingData) {
      console.log("About Me data already exists.");
      
      // Ask for confirmation to update
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      
      const answer = await new Promise((resolve) => {
        readline.question("Do you want to update the existing About Me data? (y/n): ", resolve);
      });
      
      readline.close();
      
      if (answer.toLowerCase() === "y") {
        const timestamp = Date.now();
        
        // Update existing data
        await client.mutation("aboutMe:update", {
          id: existingData._id,
          ...aboutMeData,
          updatedAt: timestamp,
        });
        
        console.log("✅ About Me data updated successfully!");
      } else {
        console.log("Seeding cancelled.");
      }
      
      return;
    }
    
    // Create new About Me data
    const timestamp = Date.now();
    
    await client.mutation("aboutMe:create", {
      ...aboutMeData,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    
    console.log("✅ About Me data seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding About Me data:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedAboutMe(); 