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
  photos: defineTable({
    title: v.string(),
    location: v.string(),
    date: v.string(),
    imageUrl: v.string(),
    storageId: v.optional(v.string()),
    fileName: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    order: v.optional(v.number()),
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
  socials: defineTable({
    platform: v.string(),
    url: v.string(),
    icon: v.string(),
    showInHero: v.boolean(),
    showInFooter: v.boolean(),
    isActive: v.optional(v.boolean()),
    order: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  aboutMe: defineTable({
    bio: v.string(),
    additionalText: v.optional(v.string()),
    location: v.string(),
    resumeUrl: v.string(),
    resumeFileName: v.optional(v.string()),
    profileImageUrl: v.optional(v.string()),
    yearsExperience: v.number(),
    projectsCount: v.number(),
    clientsCount: v.number(),
    coffeeCount: v.string(), // Using string to allow "∞" value
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  contact: defineTable({
    email: v.string(),
    phone: v.string(),
    location: v.string(),
    officeHours: v.string(),
    formApiKey: v.string(), // For Web3Forms API key
    submissionEmail: v.string(), // Email where form submissions are sent
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
}); 