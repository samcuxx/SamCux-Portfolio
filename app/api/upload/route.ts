import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = request.nextUrl.searchParams.get("type") || "other";
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (type === "profile" && !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    if (type === "resume" && file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Resume must be a PDF file" },
        { status: 400 }
      );
    }

    // Validate file size
    const maxSize = type === "resume" ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB for resume, 5MB for images
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit` },
        { status: 400 }
      );
    }

    // Create directory if it doesn't exist
    const uploadDir = type === "resume" ? "public/uploads/resumes" : "public/uploads/profiles";
    await mkdir(uploadDir, { recursive: true });

    // Generate a unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, "-");
    const filename = `${timestamp}-${originalName}`;
    const filepath = join(uploadDir, filename);

    // Convert file to buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return the URL to the saved file
    const url = `/uploads/${type === "resume" ? "resumes" : "profiles"}/${filename}`;
    
    return NextResponse.json({ url, filename });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
} 