import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Log environment variables for debugging (remove in production)
  console.log("Environment variables check:", {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ? "exists" : "missing",
    nodeEnv: process.env.NODE_ENV
  });
  
  // Try both environment variable formats
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  
  if (!clientId) {
    console.error("GitHub OAuth error: Client ID is missing");
    return NextResponse.json(
      { error: "GitHub OAuth is not configured" },
      { status: 500 }
    );
  }

  // Generate a random state value for security
  const state = Math.random().toString(36).substring(2, 15);
  
  // Get the callback URL - use environment variable in production, fallback to request origin in development
  let callbackUrl: string;
  if (process.env.NODE_ENV === "production") {
    // In production, use the configured production URL to ensure exact match with GitHub OAuth settings
    const productionUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.samcux.com";
    callbackUrl = `${productionUrl}/api/auth/github/callback`;
  } else {
    // In development, use the request origin
    const origin = request.headers.get("origin") || request.nextUrl.origin;
    callbackUrl = `${origin}/api/auth/github/callback`;
  }
  
  // Log the callback URL for debugging
  console.log("OAuth callback URL:", callbackUrl);
  console.log("Production URL env:", process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "not set");
  
  // Store the state in a cookie for verification when the user returns
  const response = NextResponse.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=user:email&state=${state}`
  );
  
  // Set a cookie with the state value
  response.cookies.set("github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });
  
  return response;
} 