import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://www.samcux.com"
      : request.nextUrl.origin;

  // Create a response that redirects to the login page
  const response = NextResponse.redirect(new URL("/admin/login", baseUrl));
  
  // Clear the user cookie
  response.cookies.set("github_user", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  
  return response;
} 