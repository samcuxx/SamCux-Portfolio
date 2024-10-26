import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Nova_Mono } from "next/font/google";

const nova = Nova_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SamCux",
  description: "SamCux",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nova.className} bg-[#FFFFFF] dark:bg-[#0F172A]`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
