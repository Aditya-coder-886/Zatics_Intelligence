import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zatics.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zatics Intelligence — AI-Powered Intelligence & Automation",
    template: "%s | Zatics Intelligence",
  },
  description:
    "Zatics Intelligence helps businesses turn data, workflows, and complex decisions into intelligent action through AI-powered systems and automation.",
  keywords: [
    "AI Intelligence",
    "Business Automation",
    "Enterprise AI",
    "AI Agents",
    "Decision Intelligence",
    "Data Intelligence",
    "Intelligent Automation",
    "Zatics",
  ],
  authors: [{ name: "Zatics Intelligence" }],
  creator: "Zatics Intelligence",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Zatics Intelligence",
    title: "Zatics Intelligence — AI-Powered Intelligence & Automation",
    description:
      "Transform data, workflows, and complex decisions into intelligent action through AI-powered systems and automation.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Zatics Intelligence — AI-Powered Intelligence & Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zatics Intelligence — AI-Powered Intelligence & Automation",
    description:
      "Transform data, workflows, and complex decisions into intelligent action through AI-powered systems and automation.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@ZaticsAI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
