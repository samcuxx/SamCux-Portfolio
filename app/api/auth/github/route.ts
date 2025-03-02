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
  
  // Get the origin for the callback URL
  const origin = request.headers.get("origin") || request.nextUrl.origin;
  const callbackUrl = `${origin}/api/auth/github/callback`;
  
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