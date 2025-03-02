// This is a server component
import EditProjectClient from "./EditProjectClient";

// Server component to handle params
export default function EditProjectPage({ params }: { params: { id: string } }) {
  return <EditProjectClient id={params.id} />;
} 