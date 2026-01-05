import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/global/Provider";
import { Inter, DynaPuff } from "next/font/google";
import CursorEffect from "@/components/ui/CursorEffect";
import { Toaster } from "sonner";
import ConvexClientProvider from "@/components/global/ConvexClientProvider";

// Force static rendering at the root level for better performance
export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate once per day

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const dynaPuff = DynaPuff({
  subsets: ["latin"],
  variable: "--font-dynapuff",
  display: "swap",
  preload: true,
});

// Metadata needs to be exported from a server component
export const metadata: Metadata = {
  title: "SamCux - Software Engineer & Content Creator",
  description:
    "Software Engineer and Content Creator based in Ghana. Founder of SamCux Development Consult, building modern digital solutions for businesses and startups.",
  metadataBase: new URL("https://samcux.com"),
  manifest: "/manifest.json",
  openGraph: {
    title: "SamCux - Software Engineer & Content Creator",
    description:
      "Software Engineer and Content Creator based in Ghana. Founder of SamCux Development Consult, building modern digital solutions for businesses and startups.",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "SamCux",
    "Software Engineer",
    "Software Development",
    "Content Creator",
    "Ghana",
    "Samuel Amoah",
    "SamCux Development Consult",
    "Web Development",
    "Digital Solutions",
    "Software Consulting",
    "Software Agency",
    "Tech Ghana",
    "React Developer",
    "Next.js Developer",
    "Full Stack Developer",
    "SamCux Portfolio",
    "SamCux Projects",
    "Software Development Ghana",
  ],
  alternates: {
    canonical: "https://www.samcux.com/",
  },
  publisher: "SamCux",
  creator: "SamCux",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "google-site-verification": "1bvnid7e7mLx5JZWdbxz7KmXj6_DsoJ7v5ul9Xo9T_o",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${dynaPuff.variable}`}
    >
      <body className="antialiased bg-sa-light-bg text-sa-light-accent dark:bg-sa-dark-bg dark:text-sa-dark-text-main">
        <ConvexClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <CursorEffect />
          </ThemeProvider>
        </ConvexClientProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
