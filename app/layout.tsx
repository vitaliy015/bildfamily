import type { Metadata } from "next";
import { Oswald, Source_Serif_4 } from "next/font/google";
import { siteUrl, business } from "@/lib/site";
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

const SITE_TITLE = "Inside The House | Bathroom Renovations Calgary"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_TITLE,
  description: business.description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  keywords: [
    "bathroom renovation Calgary",
    "bathroom remodel Calgary",
    "ensuite renovation Calgary",
    "custom shower Calgary",
    "bathroom renovation cost Calgary",
    "family-owned renovations Alberta",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: business.name,
    title: SITE_TITLE,
    description: business.description,
    // og:image is auto-populated from app/opengraph-image.png
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: business.description,
    // twitter:image is auto-populated from app/twitter-image.png
  },
};

// JSON-LD LocalBusiness schema — lets Google show a rich business card
// (map pack, knowledge panel) and improves local + Google Ads relevance.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${siteUrl}/#business`,
  name: business.name,
  description: business.description,
  url: siteUrl,
  telephone: business.phone,
  email: business.email,
  image: `${siteUrl}/opengraph-image.png`,
  logo: `${siteUrl}/icon.png`,
  priceRange: business.priceRange,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.city,
    addressRegion: business.region,
    addressCountry: business.country,
  },
  areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.geo.lat,
    longitude: business.geo.lng,
  },
  hasMap: business.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: business.hours.days,
      opens: business.hours.opens,
      closes: business.hours.closes,
    },
  ],
  sameAs: [business.instagram],
  makesOffer: business.services.map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
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
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
