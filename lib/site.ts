// Single source of truth for site-wide business data — used by page metadata,
// robots.ts, sitemap.ts and the JSON-LD LocalBusiness schema.

// Production URL for absolute links. Set NEXT_PUBLIC_SITE_URL once the domain is
// live; on Vercel it falls back to the deployment URL, otherwise localhost.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")

export const business = {
  name: "Inside The House",
  description:
    "Family-owned renovation company in Calgary, AB. Bathrooms, kitchens, basements, flooring. Honest pricing, reliable timelines. Free quote.",
  phone: "+1 (403) 667-6148",
  email: "insidethehouseca@gmail.com", // TODO: swap for professional domain email
  instagram: "https://www.instagram.com/insidethehouse_renovations",
  priceRange: "$$",
  // Work area — Calgary + surrounding communities (no fixed street address yet)
  city: "Calgary",
  region: "AB",
  country: "CA",
  areaServed: ["Calgary", "Airdrie", "Cochrane", "Okotoks", "Chestermere"],
  // Map location (no fixed street address yet) — used by MapCard + JSON-LD
  geo: { lat: 50.9236644, lng: -114.0778437 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=50.9236644,-114.0778437",
  // Mon–Sat 08:00–18:00
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  services: [
    "Bathroom Remodeling",
    "Basement Finishing",
    "Kitchen Updates",
    "Flooring Installation",
    "Drywall & Painting",
    "Handyman Services",
  ],
} as const
