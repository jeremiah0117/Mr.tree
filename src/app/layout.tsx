import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteInfo, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteInfo.title,
    template: `%s | ${siteInfo.name}`,
  },
  description: siteInfo.description,
  applicationName: siteInfo.name,
  authors: [{ name: siteInfo.creator }],
  creator: siteInfo.creator,
  publisher: siteInfo.creator,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteInfo.locale,
    url: siteUrl,
    siteName: siteInfo.name,
    title: siteInfo.title,
    description: siteInfo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteInfo.title,
    description: siteInfo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
