import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Get all tech stacks, sorted by order or name
export const getAll = query({
  handler: async (ctx) => {
    const techStacks = await ctx.db.query("techStacks").collect();
    
    // Sort by order if available, otherwise by name
    return techStacks.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return a.name.localeCompare(b.name);
    });
  },
});

// Create a new tech stack
export const create = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
    category: v.optional(v.union(
      v.literal("Frontend"),
      v.literal("Backend"),
      v.literal("Database"),
      v.literal("DevOps"),
      v.literal("Mobile"),
      v.literal("Other")
    )),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if a tech stack with this name already exists
    const existing = await ctx.db
      .query("techStacks")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    
    if (existing) {
      throw new Error(`Tech stack with name "${args.name}" already exists`);
    }
    
    const timestamp = Date.now();
    
    return ctx.db.insert("techStacks", {
      name: args.name,
      icon: args.icon,
      category: args.category,
      order: args.order,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

// Update an existing tech stack
export const update = mutation({
  args: {
    id: v.id("techStacks"),
    name: v.optional(v.string()),
    icon: v.optional(v.string()),
    category: v.optional(v.union(
      v.literal("Frontend"),
      v.literal("Backend"),
      v.literal("Database"),
      v.literal("DevOps"),
      v.literal("Mobile"),
      v.literal("Other")
    )),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    
    // Check if the tech stack exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Tech stack with ID ${id} not found`);
    }
    
    // If name is being updated, check for duplicates
    if (fields.name) {
      const duplicate = await ctx.db
        .query("techStacks")
        .filter((q) => 
          q.and(
            q.eq(q.field("name"), fields.name as string),
            q.neq(q.field("_id"), id)
          )
        )
        .first();
      
      if (duplicate) {
        throw new Error(`Tech stack with name "${fields.name}" already exists`);
      }
    }
    
    return ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
  },
});

// Delete a tech stack
export const remove = mutation({
  args: {
    id: v.id("techStacks"),
  },
  handler: async (ctx, args) => {
    // Check if the tech stack exists
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error(`Tech stack with ID ${args.id} not found`);
    }
    
    return ctx.db.delete(args.id);
  },
});

// Get a tech stack by ID
export const getById = query({
  args: {
    id: v.id("techStacks"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

// Reorder tech stacks
export const reorder = mutation({
  args: {
    orderedIds: v.array(v.id("techStacks")),
  },
  handler: async (ctx, args) => {
    const { orderedIds } = args;
    
    // Update the order of each tech stack
    for (let i = 0; i < orderedIds.length; i++) {
      await ctx.db.patch(orderedIds[i], {
        order: i,
        updatedAt: Date.now(),
      });
    }
    
    return true;
  },
}); 