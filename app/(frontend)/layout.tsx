import Navbar from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Suspense } from "react";
import { Metadata } from "next";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const metadata: Metadata = {
  title: "SamCux | Software Engineer & Content Creator",
  description: "Personal portfolio of SamCux, showcasing my projects, skills, and experience as a software engineer and content creator.",
};

// Create a loading fallback component
function LoadingFallback() {
  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] pt-16">
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
