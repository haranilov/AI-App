import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NativeInit } from "@/components/NativeInit";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { t } from "@/lib/translations";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${t.appName} — Viral Hooks for Short Videos`,
  description: t.metaDescription,
  appleWebApp: {
    capable: true,
    title: t.appName,
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

/** Root layout wrapping all pages. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NativeInit />
        {children}
      </body>
    </html>
  );
}
