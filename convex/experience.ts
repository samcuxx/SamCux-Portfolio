import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Get all experience items, sorted by order or year (most recent first)
export const getAll = query({
  handler: async (ctx) => {
    const experienceItems = await ctx.db.query("experience").collect();
    
    // Sort by order if available, otherwise by year (most recent first)
    return experienceItems.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      
      // Extract years for comparison (assuming format like "2021 - 2023" or "2023 - Present")
      const getLatestYear = (yearStr: string) => {
        const parts = yearStr.split('-').map(part => part.trim());
        const lastPart = parts[parts.length - 1];
        
        // If "Present", consider it as the latest
        if (lastPart.toLowerCase() === "present") {
          return Number.MAX_SAFE_INTEGER;
        }
        
        // Otherwise, try to parse the year
        const year = parseInt(lastPart, 10);
        return isNaN(year) ? 0 : year;
      };
      
      const yearA = getLatestYear(a.year);
      const yearB = getLatestYear(b.year);
      
      // Sort descending (most recent first)
      return yearB - yearA;
    });
  },
});

// Create a new experience item
export const create = mutation({
  args: {
    year: v.string(),
    title: v.string(),
    company: v.string(),
    description: v.string(),
    achievements: v.array(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    
    return ctx.db.insert("experience", {
      year: args.year,
      title: args.title,
      company: args.company,
      description: args.description,
      achievements: args.achievements,
      order: args.order,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

// Update an existing experience item
export const update = mutation({
  args: {
    id: v.id("experience"),
    year: v.optional(v.string()),
    title: v.optional(v.string()),
    company: v.optional(v.string()),
    description: v.optional(v.string()),
    achievements: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    
    // Check if the experience item exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Experience item with ID ${id} not found`);
    }
    
    return ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
  },
});

// Delete an experience item
export const remove = mutation({
  args: {
    id: v.id("experience"),
  },
  handler: async (ctx, args) => {
    // Check if the experience item exists
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error(`Experience item with ID ${args.id} not found`);
    }
    
    return ctx.db.delete(args.id);
  },
});

// Get an experience item by ID
export const getById = query({
  args: {
    id: v.id("experience"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

// Reorder experience items
export const reorder = mutation({
  args: {
    orderedIds: v.array(v.id("experience")),
  },
  handler: async (ctx, args) => {
    const { orderedIds } = args;
    
    // Update the order of each experience item
    for (let i = 0; i < orderedIds.length; i++) {
      await ctx.db.patch(orderedIds[i], {
        order: i,
        updatedAt: Date.now(),
      });
    }
    
    return true;
  },
}); 