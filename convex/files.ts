import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

// Generate an upload URL
export const generateUploadUrl = mutation({
  args: {
    githubId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    try {
      // Check if user is authenticated
      const identity = await ctx.auth.getUserIdentity();
      
      // Use either the identity subject or the provided githubId
      const githubId = identity?.subject || args.githubId;
      
      if (!githubId) {
        throw new Error("Not authenticated - Please log in to upload files");
      }

      // Check if user is admin using the isAdmin function
      const isAdmin = await ctx.runQuery(api.auth.isAdmin, { githubId });
      
      if (!isAdmin) {
        throw new Error("Not authorized - Admin access required to upload files");
      }

      // Generate the upload URL
      return await ctx.storage.generateUploadUrl();
    } catch (error: any) {
      // Log the error for debugging
      console.error("Error in generateUploadUrl:", error);
      
      // Re-throw the error with a clear message
      throw new Error(error.message || "Failed to generate upload URL");
    }
  },
});

// Get a file URL by ID
export const getUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    try {
      // Get the URL without excessive logging
      const url = await ctx.storage.getUrl(args.storageId);
      return url;
    } catch (error) {
      console.error(`Error getting URL for storage ID ${args.storageId}`);
      return null;
    }
  },
}); 