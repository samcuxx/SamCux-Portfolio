import { ContactContent } from "@/components/Contact/ContactContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | SamCux - Software Engineer & Content Creator",
  description: "Get in touch with SamCux for collaborations, projects, or inquiries. Let's connect and create something amazing together.",
  openGraph: {
    title: "Contact | SamCux",
    description: "Get in touch with SamCux for collaborations, projects, or inquiries. Let's connect and create something amazing together.",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Contact() {
  return (
    <div className="font-inter relative pt-7 md:pt-24">
      <ScrollProgress />
      <BgGlow />
      <ContactContent />
    </div>
  );
}
