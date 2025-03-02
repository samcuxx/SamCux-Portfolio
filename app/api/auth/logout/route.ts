import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Create a response that redirects to the login page
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  
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