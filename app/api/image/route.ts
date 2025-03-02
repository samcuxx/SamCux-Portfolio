import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Create a Convex HTTP client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

export async function GET(request: NextRequest) {
  try {
    // Get the storage ID from the query parameter
    const { searchParams } = new URL(request.url);
    const storageId = searchParams.get("id");
    
    if (!storageId) {
      return new NextResponse("Missing storage ID", { status: 400 });
    }
    
    // Get the URL from Convex
    const imageUrl = await convex.query(api.files.getUrl, { storageId });
    
    if (!imageUrl) {
      return new NextResponse("Image not found", { status: 404 });
    }
    
    // Redirect to the actual image URL
    return NextResponse.redirect(imageUrl);
  } catch (error) {
    console.error("Error fetching image:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
} 