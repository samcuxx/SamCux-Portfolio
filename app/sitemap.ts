import { MetadataRoute } from 'next';
import { api } from '@/convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

// Initialize Convex HTTP client for server-side data fetching
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment or default
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.samcux.tech';

  // Define static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/photos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ] as MetadataRoute.Sitemap;

  try {
    // Get the last update time for projects and photos collections
    // This helps search engines know when content was last updated
    const projects = await convex.query(api.projects.getAll);
    const photos = await convex.query(api.photos.getAll);
    
    // Find the latest modification date for projects
    const latestProjectUpdate = projects.length > 0 
      ? Math.max(...projects.map((p: any) => p.updatedAt || p.createdAt || 0))
      : Date.now();
      
    // Find the latest modification date for photos
    const latestPhotoUpdate = photos.length > 0 
      ? Math.max(...photos.map((p: any) => p.updatedAt || p.createdAt || 0))
      : Date.now();
    
    // Update the lastModified dates for the projects and photos pages
    const updatedStaticRoutes = staticRoutes.map(route => {
      if (route.url.includes('/projects')) {
        return { ...route, lastModified: new Date(latestProjectUpdate) };
      } 
      if (route.url.includes('/photos')) {
        return { ...route, lastModified: new Date(latestPhotoUpdate) };
      }
      return route;
    });

    return updatedStaticRoutes;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return basic static routes if data fetching fails
    return staticRoutes;
  }
} 