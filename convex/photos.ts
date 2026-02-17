import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

// Get all photos
export const getAll = query({
  handler: async (ctx) => {
    try {
      const photos = await ctx.db.query("photos").order("desc").collect();
      return photos;
    } catch (error) {
      console.error("Error fetching photos:", error);
      return [];
    }
  },
});

// Get paginated photos
export const getPage = query({
  args: {
    cursor: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 9;

    const pagination = await ctx.db
      .query("photos")
      .order("desc")
      .paginate({
        cursor: args.cursor ?? null,
        numItems: limit,
      });

    return pagination;
  },
});

// Get a single photo by ID
export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args): Promise<any | null> => {
    try {
      const id = args.id as Id<"photos">;
      const photo = await ctx.db.get(id);
      
      if (!photo) {
        return null;
      }
      
      // Get the storage URL for the photo when a storageId is present
      const storageId = photo.storageId;
      const url = storageId ? await ctx.storage.getUrl(storageId) : null;
      
      return {
        ...photo,
        url,
      };
    } catch (error) {
      // If the ID is not valid, return null
      return null;
    }
  },
});

// Create a new photo
export const create = mutation({
  args: {
    title: v.string(),
    location: v.string(),
    date: v.string(),
    imageUrl: v.string(),
    storageId: v.optional(v.string()),
    fileName: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      // Check if user is authenticated and is admin
      const identity = await ctx.auth.getUserIdentity();
      
      // For development purposes, allow creation without authentication
      // In production, you should uncomment these checks
      /*
      if (!identity) {
        throw new Error("Not authenticated");
      }
      
      const githubId = identity.subject;
      const isAdmin = await ctx.runQuery(api.auth.isAdmin, { githubId });
      
      if (!isAdmin) {
        throw new Error("Not authorized - Admin access required");
      }
      */

      const timestamp = Date.now();
      
      const photoId = await ctx.db.insert("photos", {
        title: args.title,
        location: args.location,
        date: args.date,
        imageUrl: args.imageUrl,
        storageId: args.storageId,
        fileName: args.fileName,
        featured: args.featured,
        order: args.order,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      
      return photoId;
    } catch (error: any) {
      console.error("Error creating photo:", error);
      throw new Error(error.message || "Failed to create photo");
    }
  },
});

// Update an existing photo
export const update = mutation({
  args: {
    id: v.id("photos"),
    title: v.string(),
    location: v.string(),
    date: v.string(),
    imageUrl: v.string(),
    storageId: v.optional(v.string()),
    fileName: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      // Check if user is authenticated and is admin
      const identity = await ctx.auth.getUserIdentity();
      
      // For development purposes, allow updates without authentication
      // In production, you should uncomment these checks
      /*
      if (!identity) {
        throw new Error("Not authenticated");
      }
      
      const githubId = identity.subject;
      const isAdmin = await ctx.runQuery(api.auth.isAdmin, { githubId });
      
      if (!isAdmin) {
        throw new Error("Not authorized - Admin access required");
      }
      */

      // Check if photo exists
      const existingPhoto = await ctx.db.get(args.id);
      
      if (!existingPhoto) {
        throw new Error("Photo not found");
      }

      // Update the photo
      await ctx.db.patch(args.id, {
        title: args.title,
        location: args.location,
        date: args.date,
        imageUrl: args.imageUrl,
        storageId: args.storageId,
        fileName: args.fileName,
        featured: args.featured,
        order: args.order,
        updatedAt: Date.now(),
      });
      
      return args.id;
    } catch (error: any) {
      console.error("Error updating photo:", error);
      throw new Error(error.message || "Failed to update photo");
    }
  },
});

// Delete a photo
export const remove = mutation({
  args: { id: v.id("photos") },
  handler: async (ctx, args) => {
    try {
      // Check if user is authenticated and is admin
      const identity = await ctx.auth.getUserIdentity();
      
      // For development purposes, allow deletion without authentication
      // In production, you should uncomment these checks
      /*
      if (!identity) {
        throw new Error("Not authenticated");
      }
      
      const githubId = identity.subject;
      const isAdmin = await ctx.runQuery(api.auth.isAdmin, { githubId });
      
      if (!isAdmin) {
        throw new Error("Not authorized - Admin access required");
      }
      */

      // Check if photo exists
      const existingPhoto = await ctx.db.get(args.id);
      
      if (!existingPhoto) {
        throw new Error("Photo not found");
      }

      // Delete the photo
      await ctx.db.delete(args.id);
      
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting photo:", error);
      throw new Error(error.message || "Failed to delete photo");
    }
  },
});

// Function to get all photos for static params generation
export const getAllForStaticParams = query({
  handler: async (ctx): Promise<{id: string}[]> => {
    const photos = await ctx.db.query("photos").collect();
    return photos.map(photo => ({
      id: photo._id.toString(),
    }));
  },
}); 