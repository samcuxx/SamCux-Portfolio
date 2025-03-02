// Seed script for social links
const { ConvexHttpClient } = require("convex/browser");
require("dotenv").config();

// Initialize the Convex client
const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Define initial social links data
const socialLinks = [
  {
    platform: "GitHub",
    url: "https://github.com/samcux",
    icon: "Github",
    showInHero: true,
    showInFooter: true,
    isActive: true,
    order: 1,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/samcux",
    icon: "Linkedin",
    showInHero: true,
    showInFooter: true,
    isActive: true,
    order: 2,
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/samcux",
    icon: "Twitter",
    showInHero: true,
    showInFooter: true,
    isActive: true,
    order: 3,
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/samcux",
    icon: "Instagram",
    showInHero: false,
    showInFooter: true,
    isActive: true,
    order: 4,
  },
  {
    platform: "Email",
    url: "mailto:contact@samcux.com",
    icon: "Mail",
    showInHero: true,
    showInFooter: true,
    isActive: true,
    order: 5,
  }
];

async function seedSocialLinks() {
  console.log("🌱 Seeding social links...");
  
  try {
    // Get existing social links to avoid duplicates
    const existingSocialLinks = await client.query("socials:getAll");
    
    if (existingSocialLinks && existingSocialLinks.length > 0) {
      console.log(`Found ${existingSocialLinks.length} existing social links.`);
      
      // Ask for confirmation to continue
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      
      const answer = await new Promise((resolve) => {
        readline.question("Social links already exist. Do you want to continue and add more? (y/n): ", resolve);
      });
      
      readline.close();
      
      if (answer.toLowerCase() !== "y") {
        console.log("Seeding cancelled.");
        return;
      }
    }
    
    // Add each social link
    for (const socialLink of socialLinks) {
      const timestamp = Date.now();
      
      // Check if this platform already exists
      const exists = existingSocialLinks?.some(
        (link) => link.platform.toLowerCase() === socialLink.platform.toLowerCase()
      );
      
      if (exists) {
        console.log(`Skipping ${socialLink.platform} - already exists`);
        continue;
      }
      
      // Add the social link
      await client.mutation("socials:create", {
        ...socialLink,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      
      console.log(`Added ${socialLink.platform}`);
    }
    
    console.log("✅ Social links seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding social links:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedSocialLinks(); 