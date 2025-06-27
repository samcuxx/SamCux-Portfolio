import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

// Get all projects
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

// Get featured projects
export const getFeatured = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

// Get projects by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    if (args.category === "All") {
      return await ctx.db.query("projects").collect();
    }
    return await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});

// Get a single project by ID
export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new project
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    tags: v.array(v.string()),
    category: v.union(
      v.literal("Web"),
      v.literal("Mobile"),
      v.literal("UI/UX"),
      v.literal("Other")
    ),
    liveUrl: v.string(),
    githubUrl: v.string(),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    return await ctx.db.insert("projects", {
      ...args,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

// Update an existing project
export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    category: v.optional(
      v.union(
        v.literal("Web"),
        v.literal("Mobile"),
        v.literal("UI/UX"),
        v.literal("Other")
      )
    ),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const timestamp = Date.now();
    
    // Get the existing project
    const existingProject = await ctx.db.get(id);
    if (!existingProject) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    // Update the project
    return await ctx.db.patch(id, {
      ...fields,
      updatedAt: timestamp,
    });
  },
});

// Delete a project
export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Search projects
export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const searchQuery = args.query.toLowerCase();
    if (!searchQuery) {
      return await ctx.db.query("projects").collect();
    }
    
    const projects = await ctx.db.query("projects").collect();
    return projects.filter(project => {
      return (
        project.title.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      );
    });
  },
});

// Function to get all projects for static params generation
export const getAllForStaticParams = query({
  handler: async (ctx): Promise<{slug: string}[]> => {
    const projects = await ctx.db.query("projects").collect();
    return projects.map(project => ({
      slug: project._id.toString(), // Using ID as slug for now - you can add a proper slug field later
    }));
  },
});

// Function to get project by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args): Promise<any | null> => {
    // Currently using ID as slug - update this if you add a dedicated slug field
    try {
      const id = args.slug as Id<"projects">;
      const project = await ctx.db.get(id);
      
      if (!project) {
        return null;
      }
      
      return {
        ...project,
        slug: project._id.toString(),
      };
    } catch (error) {
      // If the slug is not a valid ID, return null
      return null;
    }
  },
}); 