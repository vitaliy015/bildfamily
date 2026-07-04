import type { Metadata } from "next";
import { Oswald, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

// Production URL for absolute OG/canonical links. Set NEXT_PUBLIC_SITE_URL once
// the domain is live; on Vercel it falls back to the deployment URL, else localhost.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")

const SITE_NAME = "Inside The House"
const SITE_DESCRIPTION =
  "Family-owned renovation company in Calgary, AB. Bathrooms, kitchens, basements, flooring. Honest pricing, reliable timelines. Free quote."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Inside The House | Home Renovations Calgary",
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Calgary renovations",
    "bathroom renovation Calgary",
    "basement finishing Calgary",
    "kitchen renovation",
    "home renovation Alberta",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: SITE_NAME,
    title: "Inside The House | Home Renovations Calgary",
    description: SITE_DESCRIPTION,
    // og:image is auto-populated from app/opengraph-image.png
  },
  twitter: {
    card: "summary_large_image",
    title: "Inside The House | Home Renovations Calgary",
    description: SITE_DESCRIPTION,
    // twitter:image is auto-populated from app/twitter-image.png
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
      className={`${oswald.variable} ${sourceSerif.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
