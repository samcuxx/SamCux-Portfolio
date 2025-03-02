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
export function getConvexImageUrl(imageUrl: string) {
  if (!imageUrl) return "/placeholder-image.jpg";
  
  // If it's already a full URL, return it
  if (imageUrl.includes("://")) {
    return imageUrl;
  }
  
  // For Convex storage IDs, construct a URL to our API endpoint
  // This endpoint will fetch the image from Convex storage
  return `/api/image?id=${encodeURIComponent(imageUrl)}`;
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

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
} 