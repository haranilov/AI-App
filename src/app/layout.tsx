import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NativeInit } from "@/components/NativeInit";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HookAI — Viral Hooks for Short Videos",
  description:
    "AI generator of catchy hooks, titles and scripts for TikTok, Reels and YouTube Shorts",
  appleWebApp: {
    capable: true,
    title: "HookAI",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NativeInit />
        {children}
      </body>
    </html>
  );
}
