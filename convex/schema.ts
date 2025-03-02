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
  techStacks: defineTable({
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
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  education: defineTable({
    type: v.union(
      v.literal("education"),
      v.literal("certification")
    ),
    title: v.string(),
    institution: v.string(),
    year: v.string(),
    icon: v.string(),
    order: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  experience: defineTable({
    year: v.string(),
    title: v.string(),
    company: v.string(),
    description: v.string(),
    achievements: v.array(v.string()),
    order: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
}); 