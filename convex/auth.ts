import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get the current user
export const getUser = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // If a specific userId is provided, find that user
    if (args.userId) {
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("githubId"), args.userId))
        .first();
      return user;
    }
    
    // If no identity, check for a cookie-based user
    if (!identity) {
      // This will be handled by the cookie-based auth
      return null;
    }

    // Find the user in the database
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("githubId"), identity.subject))
      .first();

    return user;
  },
});

// Check if the current user is an admin
export const isAdmin = query({
  args: {
    githubId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Use either the identity subject or the provided githubId
    const userId = identity?.subject || args.githubId;
    
    // If no user ID, return false
    if (!userId) {
      return false;
    }

    // Find the user in the database
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("githubId"), userId))
      .first();

    return user?.isAdmin || false;
  },
});

// Create or update a user
export const createOrUpdateUser = mutation({
  args: {
    githubId: v.optional(v.string()),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Use either the identity or the provided args
    const githubId = identity?.subject || args.githubId;
    const name = identity?.name || args.name;
    const email = identity?.email || args.email;
    const pictureUrl = identity?.pictureUrl || args.avatarUrl;
    
    if (!githubId) {
      throw new Error("No GitHub ID provided");
    }

    // Check if the user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("githubId"), githubId))
      .first();

    if (existingUser) {
      // Update the existing user
      return await ctx.db.patch(existingUser._id, {
        name: name || existingUser.name,
        email: email || existingUser.email,
        avatarUrl: pictureUrl || existingUser.avatarUrl,
      });
    } else {
      // Create a new user
      // For simplicity, we'll make the first user an admin
      const isFirstUser = (await ctx.db.query("users").collect()).length === 0;
      
      return await ctx.db.insert("users", {
        githubId,
        name: name || "Anonymous",
        email: email || "",
        avatarUrl: pictureUrl,
        isAdmin: isFirstUser, // First user is admin
        createdAt: Date.now(),
      });
    }
  },
});

// Get user by GitHub ID
export const getUserByGithubId = query({
  args: { githubId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("githubId"), args.githubId))
      .first();
    
    return user;
  },
});

// Make a user an admin
export const makeAdmin = mutation({
  args: { githubId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("githubId"), args.githubId))
      .first();
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return await ctx.db.patch(user._id, {
      isAdmin: true,
    });
  },
});

// Logout the current user
export const logout = mutation({
  handler: async (ctx) => {
    // Note: In Convex, actual logout happens on the client side
    // by clearing the auth token. This function is a placeholder
    // that can be extended if needed for server-side logout logic.
    return { success: true };
  },
}); 