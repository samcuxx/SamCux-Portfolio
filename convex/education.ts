import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Get all education items, sorted by order or type
export const getAll = query({
  handler: async (ctx) => {
    const educationItems = await ctx.db.query("education").collect();
    
    // Sort by order if available, otherwise by type and then by year (descending)
    return educationItems.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      
      // Sort by type (education first, then certification)
      if (a.type !== b.type) {
        return a.type === "education" ? -1 : 1;
      }
      
      // Sort by year (descending - newest first)
      return b.year.localeCompare(a.year);
    });
  },
});

// Create a new education item
export const create = mutation({
  args: {
    type: v.union(
      v.literal("education"),
      v.literal("certification")
    ),
    title: v.string(),
    institution: v.string(),
    year: v.string(),
    icon: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    
    return ctx.db.insert("education", {
      type: args.type,
      title: args.title,
      institution: args.institution,
      year: args.year,
      icon: args.icon,
      order: args.order,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

// Update an existing education item
export const update = mutation({
  args: {
    id: v.id("education"),
    type: v.optional(v.union(
      v.literal("education"),
      v.literal("certification")
    )),
    title: v.optional(v.string()),
    institution: v.optional(v.string()),
    year: v.optional(v.string()),
    icon: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    
    // Check if the education item exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Education item with ID ${id} not found`);
    }
    
    return ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
  },
});

// Delete an education item
export const remove = mutation({
  args: {
    id: v.id("education"),
  },
  handler: async (ctx, args) => {
    // Check if the education item exists
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error(`Education item with ID ${args.id} not found`);
    }
    
    return ctx.db.delete(args.id);
  },
});

// Get an education item by ID
export const getById = query({
  args: {
    id: v.id("education"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

// Reorder education items
export const reorder = mutation({
  args: {
    orderedIds: v.array(v.id("education")),
  },
  handler: async (ctx, args) => {
    const { orderedIds } = args;
    
    // Update the order of each education item
    for (let i = 0; i < orderedIds.length; i++) {
      await ctx.db.patch(orderedIds[i], {
        order: i,
        updatedAt: Date.now(),
      });
    }
    
    return true;
  },
}); 