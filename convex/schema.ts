import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
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
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    avatarUrl: v.optional(v.string()),
    githubId: v.string(),
    isAdmin: v.boolean(),
    createdAt: v.number(),
  }),
}); 