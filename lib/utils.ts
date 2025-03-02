import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a Convex storage ID to a full URL if needed
 * @param imageUrl The image URL or storage ID
 * @returns A properly formatted URL
 */
export function getConvexImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    // Return placeholder silently
    return "/placeholder-image.jpg";
  }
  
  // If it's already a full URL, return it as is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("/")) {
    return imageUrl;
  }
  
  // If it's a storage ID, convert it to a full URL
  // Make sure to use the correct Convex URL from environment variables
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://beaming-sardine-213.convex.cloud";
  const fullUrl = `${convexUrl}/api/storage/${imageUrl}`;
  return fullUrl;
}

/**
 * Get the optimized image URL for a Convex storage ID or direct URL
 * This function handles different image sources and applies optimization parameters
 */
export function getOptimizedImageUrl(imageUrl: string | null | undefined, _options: {
  width?: number;
  quality?: number;
} = {}): string | null {
  if (!imageUrl) return null;
  
  // Default options
  // These will be used in future optimization implementations
  // const width = options.width || 800;
  // const quality = options.quality || 80;
  
  // Check if it's a Convex storage ID
  const isStorageId = imageUrl && !imageUrl.includes("://") && !imageUrl.startsWith("/");
  
  if (isStorageId) {
    // For Convex storage IDs, we'll use the standard URL format
    // Optimization will happen at the component level with loading="lazy" and decoding="async"
    return getConvexImageUrl(imageUrl);
  }
  
  // For external URLs, we could implement a proxy service for optimization
  // For now, we'll just return the URL as is
  return imageUrl;
} 