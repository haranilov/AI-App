import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CapacitorInit } from "@/components/CapacitorInit";
import { themeInitScript } from "@/lib/theme";
import { t } from "@/lib/translations";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

/** SEO and browser metadata for the application. */
export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
};

/** Root layout wrapping all application pages. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <CapacitorInit />
        {children}
      </body>
    </html>
  );
}
