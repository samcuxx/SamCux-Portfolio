import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Get the about me data
export const get = query({
  handler: async (ctx) => {
    const aboutMeData = await ctx.db.query("aboutMe").order("desc").first();
    return aboutMeData;
  },
});

// Create about me data
export const create = mutation({
  args: {
    bio: v.string(),
    additionalText: v.optional(v.string()),
    location: v.string(),
    resumeUrl: v.string(),
    resumeFileName: v.optional(v.string()),
    profileImageUrl: v.optional(v.string()),
    yearsExperience: v.number(),
    projectsCount: v.number(),
    clientsCount: v.number(),
    coffeeCount: v.string(),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    
    // Check if there's already an entry (we only want one record)
    const existing = await ctx.db.query("aboutMe").first();
    
    if (existing) {
      throw new Error("About Me data already exists. Please use update instead.");
    }
    
    return ctx.db.insert("aboutMe", {
      bio: args.bio,
      additionalText: args.additionalText,
      location: args.location,
      resumeUrl: args.resumeUrl,
      resumeFileName: args.resumeFileName,
      profileImageUrl: args.profileImageUrl,
      yearsExperience: args.yearsExperience,
      projectsCount: args.projectsCount,
      clientsCount: args.clientsCount,
      coffeeCount: args.coffeeCount,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

// Update about me data
export const update = mutation({
  args: {
    id: v.id("aboutMe"),
    bio: v.optional(v.string()),
    additionalText: v.optional(v.string()),
    location: v.optional(v.string()),
    resumeUrl: v.optional(v.string()),
    resumeFileName: v.optional(v.string()),
    profileImageUrl: v.optional(v.string()),
    yearsExperience: v.optional(v.number()),
    projectsCount: v.optional(v.number()),
    clientsCount: v.optional(v.number()),
    coffeeCount: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    
    // Check if the record exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`About Me data with ID ${id} not found`);
    }
    
    return ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
  },
});

// Get by ID
export const getById = query({
  args: {
    id: v.id("aboutMe"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
}); 