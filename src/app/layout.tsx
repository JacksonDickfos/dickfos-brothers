import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dickfos-brothers.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Dickfos Brothers",
    template: "%s | Dickfos Brothers",
  },
  description: "Two brothers. One brand. Same DNA, different decisions.",
  metadataBase: new URL(siteUrl),
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
