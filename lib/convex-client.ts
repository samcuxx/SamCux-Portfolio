import { ConvexReactClient } from "convex/react";
import { getCookie } from "cookies-next";

// Create a Convex client
export const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Function to get the GitHub user from cookies
export function getGitHubUserFromCookies(): any {
  try {
    const githubUserCookie = getCookie("github_user");
    if (githubUserCookie) {
      return JSON.parse(githubUserCookie as string);
    }
  } catch (error) {
    console.error("Error parsing github_user cookie:", error);
  }
  return null;
}

// Function to get the GitHub user ID from cookies
export function getGitHubIdFromCookies(): string | null {
  const githubUser = getGitHubUserFromCookies();
  return githubUser?.id?.toString() || null;
}

// Function to create a JWT token for Convex authentication
export function createConvexToken(githubUser: any): string {
  if (!githubUser) return "";
  
  // Create a simple JWT-like token with the GitHub user ID
  // This is a simplified example - in production, use a proper JWT library
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ 
    sub: githubUser.id.toString(),
    name: githubUser.name || githubUser.login,
    email: githubUser.email,
    iss: "https://github.com",
    aud: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
  }));
  
  // In a real app, you would sign this with a secret
  // For this example, we're just concatenating the parts
  return `${header}.${payload}.signature`;
} 