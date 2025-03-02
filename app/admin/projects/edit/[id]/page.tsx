// This is a server component
import EditProjectClient from "./EditProjectClient";
import { use } from "react";

// Server component to handle params
export default function EditProjectPage({ params }: { params: { id: string } }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(Promise.resolve(params));
  return <EditProjectClient id={unwrappedParams.id} />;
} 