import Navbar from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "SamCux",
  description:
    "Personal portfolio of SamCux, showcasing my projects, skills, and experience as a software engineer and content creator.",
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SmoothScrollProvider>
        <ScrollProgress />
        <main className="min-h-[calc(100vh-64px)] pt-16">{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </>
  );
}
