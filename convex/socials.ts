import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Get all social links, sorted by order
export const getAll = query({
  handler: async (ctx) => {
    const socialLinks = await ctx.db.query("socials").collect();
    
    // Sort by order if available
    return socialLinks.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return 0;
    });
  },
});

// Get social links for hero section
export const getForHero = query({
  handler: async (ctx) => {
    const socialLinks = await ctx.db
      .query("socials")
      .filter((q) => q.eq(q.field("showInHero"), true))
      .collect();
    
    // Sort by order if available
    return socialLinks.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return 0;
    });
  },
});

// Get social links for footer
export const getForFooter = query({
  handler: async (ctx) => {
    const socialLinks = await ctx.db
      .query("socials")
      .filter((q) => q.eq(q.field("showInFooter"), true))
      .collect();
    
    // Sort by order if available
    return socialLinks.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return 0;
    });
  },
});

// Create a new social link
export const create = mutation({
  args: {
    platform: v.string(),
    url: v.string(),
    icon: v.string(),
    showInHero: v.boolean(),
    showInFooter: v.boolean(),
    isActive: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    
    return ctx.db.insert("socials", {
      platform: args.platform,
      url: args.url,
      icon: args.icon,
      showInHero: args.showInHero,
      showInFooter: args.showInFooter,
      isActive: args.isActive ?? true,
      order: args.order,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

// Update an existing social link
export const update = mutation({
  args: {
    id: v.id("socials"),
    platform: v.optional(v.string()),
    url: v.optional(v.string()),
    icon: v.optional(v.string()),
    showInHero: v.optional(v.boolean()),
    showInFooter: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    
    // Check if the social link exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Social link with ID ${id} not found`);
    }
    
    return ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
  },
});

// Delete a social link
export const remove = mutation({
  args: {
    id: v.id("socials"),
  },
  handler: async (ctx, args) => {
    // Check if the social link exists
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error(`Social link with ID ${args.id} not found`);
    }
    
    return ctx.db.delete(args.id);
  },
});

// Get a social link by ID
export const getById = query({
  args: {
    id: v.id("socials"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

// Reorder social links
export const reorder = mutation({
  args: {
    orderedIds: v.array(v.id("socials")),
  },
  handler: async (ctx, args) => {
    const { orderedIds } = args;
    
    // Update the order of each social link
    for (let i = 0; i < orderedIds.length; i++) {
      await ctx.db.patch(orderedIds[i], {
        order: i,
        updatedAt: Date.now(),
      });
    }
    
    return true;
  },
}); 