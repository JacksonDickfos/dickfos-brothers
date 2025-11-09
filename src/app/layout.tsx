import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Get site URL safely - handle edge cases
function getSiteUrl(): URL {
  const defaultUrl = "https://dickfos-brothers.vercel.app";
  try {
    const urlString = process.env.NEXT_PUBLIC_SITE_URL || defaultUrl;
    // Validate URL format
    if (urlString && urlString.startsWith("http")) {
      return new URL(urlString);
    }
    return new URL(defaultUrl);
  } catch (error) {
    // If URL construction fails, use default
    return new URL(defaultUrl);
  }
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: "Dickfos Brothers",
    template: "%s | Dickfos Brothers",
  },
  description: "Two brothers. One brand. Same DNA, different decisions.",
  metadataBase: siteUrl,
  icons: {
    icon: [
      { url: "/images/logo.jpeg", sizes: "any" },
      { url: "/images/logo.jpeg", type: "image/jpeg" },
    ],
    apple: "/images/logo.jpeg",
    shortcut: "/images/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
