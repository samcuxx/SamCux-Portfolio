import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Define the GitHub user interface
interface GitHubUser {
  id: number;
  login: string;
  name?: string;
  email?: string;
  avatar_url?: string;
}

export async function GET(request: NextRequest) {
  // Get the code and state from the query parameters
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  
  // Get the state from the cookie
  const storedState = request.cookies.get("github_oauth_state")?.value;
  
  // Get the base URL for redirects - use environment variable in production
  const getBaseUrl = () => {
    if (process.env.NODE_ENV === "production") {
      return process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.samcux.com";
    }
    return request.nextUrl.origin;
  };
  
  const baseUrl = getBaseUrl();
  
  // Verify the state to prevent CSRF attacks
  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid_state", baseUrl));
  }
  
  // Exchange the code for an access token
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET || process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET;
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  
  if (!clientId || !clientSecret) {
    console.error("GitHub OAuth error: Client ID or Client Secret is missing");
    return NextResponse.redirect(new URL("/admin/login?error=configuration", baseUrl));
  }
  
  try {
    // Exchange the code for an access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      console.error("GitHub OAuth error:", tokenData.error);
      return NextResponse.redirect(new URL("/admin/login?error=token", baseUrl));
    }
    
    const accessToken = tokenData.access_token;
    
    // Get the user's GitHub profile
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    const userData: GitHubUser = await userResponse.json();
    
    // Get the user's email
    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    const emailData = await emailResponse.json();
    const primaryEmail = emailData.find((email: any) => email.primary)?.email || emailData[0]?.email;
    
    // Try to update the user in Convex, but don't block the login if it fails
    if (convexUrl) {
      try {
        // Create a Convex HTTP client to call the createOrUpdateUser mutation
        const convex = new ConvexHttpClient(convexUrl);
        
        // Call the createOrUpdateUser mutation with the GitHub user data
        await convex.mutation(api.auth.createOrUpdateUser, {
          githubId: userData.id.toString(),
          name: userData.name || userData.login,
          email: primaryEmail || "",
          avatarUrl: userData.avatar_url || "",
        });
        
        console.log("User created or updated in Convex");
      } catch (convexError) {
        console.error("Convex error:", convexError);
        // Continue even if there's an error with Convex, as we'll still set the cookie
      }
    }
    
    // Prepare the user data for the cookie
    const userDataForCookie = {
      id: userData.id,
      login: userData.login,
      name: userData.name,
      email: primaryEmail,
      avatar_url: userData.avatar_url,
    };
    
    console.log("Setting github_user cookie with data:", JSON.stringify(userDataForCookie));
    console.log("Redirecting to base URL:", baseUrl);
    
    // Store the user data in a cookie or session
    const response = NextResponse.redirect(new URL("/admin", baseUrl));
    
    // Set a cookie with the user data - ensure it's not HttpOnly for client access
    response.cookies.set("github_user", JSON.stringify(userDataForCookie), {
      httpOnly: false, // Changed to false so client JS can access it
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    
    // Clear the state cookie
    response.cookies.set("github_oauth_state", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    return NextResponse.redirect(new URL("/admin/login?error=unknown", baseUrl));
  }
} 