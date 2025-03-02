import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Get the contact information
export const get = query({
  handler: async (ctx) => {
    const contactData = await ctx.db.query("contact").order("desc").first();
    return contactData;
  },
});

// Create contact information
export const create = mutation({
  args: {
    email: v.string(),
    phone: v.string(),
    location: v.string(),
    officeHours: v.string(),
    formApiKey: v.string(),
    submissionEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    
    // Check if there's already an entry (we only want one record)
    const existing = await ctx.db.query("contact").first();
    
    if (existing) {
      throw new Error("Contact information already exists. Please use update instead.");
    }
    
    return ctx.db.insert("contact", {
      email: args.email,
      phone: args.phone,
      location: args.location,
      officeHours: args.officeHours,
      formApiKey: args.formApiKey,
      submissionEmail: args.submissionEmail,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

// Update contact information
export const update = mutation({
  args: {
    id: v.id("contact"),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
    officeHours: v.optional(v.string()),
    formApiKey: v.optional(v.string()),
    submissionEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    
    // Check if the record exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Contact information with ID ${id} not found`);
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
    id: v.id("contact"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
}); 