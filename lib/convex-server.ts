import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Initialize Convex HTTP client for server-side data fetching
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * Server-side utility to fetch Convex data at build time
 * Use this in Next.js Server Components to pre-fetch data
 */
export async function fetchConvexData<T>(
  query: any,
  args?: Record<string, any>
): Promise<T | null> {
  try {
    return await convex.query(query, args || {});
  } catch (error) {
    console.error(`Error fetching Convex data:`, error);
    return null;
  }
}

/**
 * Fetch all About Me data
 */
export async function fetchAboutMeData() {
  return fetchConvexData(api.aboutMe.get);
}

/**
 * Fetch all Experience data
 */
export async function fetchExperienceData() {
  return fetchConvexData(api.experience.getAll);
}

/**
 * Fetch all Education data
 */
export async function fetchEducationData() {
  return fetchConvexData(api.education.getAll);
}

/**
 * Fetch all Tech Stack data
 */
export async function fetchTechStackData() {
  return fetchConvexData(api.techStacks.getAll);
}

/**
 * Fetch all Projects data
 */
export async function fetchProjectsData(): Promise<any[] | null> {
  return fetchConvexData<any[]>(api.projects.getAll);
}

/**
 * Fetch all Photos data
 */
export async function fetchPhotosData(): Promise<any[] | null> {
  return fetchConvexData<any[]>(api.photos.getAll);
}

/**
 * Fetch contact data
 */
export async function fetchContactData() {
  return fetchConvexData(api.contact.get);
}
