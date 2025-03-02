import { Id } from "@/convex/_generated/dataModel";
import EditPhotoClient from "./EditPhotoClient";

// Server component to handle params
export default function EditPhotoPage({ params }: { params: { id: string } }) {
  // Convert string ID to Convex ID
  const photoId = params.id as Id<"photos">;
  
  return <EditPhotoClient photoId={photoId} />;
} 