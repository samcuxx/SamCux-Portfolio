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
  title: "SamCux",
  description:
    "Passionate Computer Science and Content Creator who tries to help other people to Personalize your digital space.",
  metadataBase: new URL("https://samcux.tech"),
  manifest: "/manifest.json",
  openGraph: {
    title: "SamCux",
    description:
      "Passionate Computer Science and Content Creator who tries to help other people to Personalize your digital space.",
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
    "SamCux youtube",
    "SamCux Tech",
    "SamCux Projects",
    "SamCux developer",
    "SamCux Content",
    "SamCux Blog",
    "SamCux Portfolio",
    "SamCux Resume",
    "SamCux About",
    "Windows customization",
    "Windows 11",
    "Windows 10",
    "Windows",
    "Technology",
    "samcux windows",
    "customization",
    "tips",
    "tricks",
    "tutorials",
  ],
  alternates: {
    canonical: "https://www.samcux.tech/",
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
