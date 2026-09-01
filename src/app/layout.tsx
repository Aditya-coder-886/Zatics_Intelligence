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
    default: "Zatics Intelligence — AI Infrastructure & Automation",
    template: "%s | Zatics Intelligence",
  },
  description:
    "We design and deploy production-ready AI systems that automate operations, connect your technology, and scale intelligent workflows.",
  keywords: [
    "AI Infrastructure",
    "AI Automation",
    "Multi-Agent Systems",
    "Voice AI",
    "Custom AI",
    "AI Systems",
    "Business Automation",
    "Enterprise AI",
    "Zatics Intelligence",
  ],
  authors: [{ name: "Zatics Intelligence" }],
  creator: "Zatics Intelligence",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Zatics Intelligence",
    title: "Zatics Intelligence — AI Infrastructure & Automation",
    description:
      "Production-ready AI systems that automate operations, connect technology, and scale intelligent workflows.",
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
    title: "Zatics Intelligence — AI Infrastructure & Automation",
    description:
      "Production-ready AI systems that automate operations, connect technology, and scale intelligent workflows.",
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
