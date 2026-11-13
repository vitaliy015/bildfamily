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
  // The registered entity. Used in the copyright line, the JSON-LD and anywhere
  // the business is named in a legal sense rather than a brand sense.
  legalName: "Inside The House Corp",
  // City of Calgary business licence BL286908, the document the FAQ and footer
  // cite. There is no public licence registry in Calgary, so the only way a
  // client can check it is to phone the city or ask us for a copy — which is
  // why the FAQ offers one. EXPIRES 2027-01-27: the number must be renewed on
  // the site at that point or it reads as stale.
  licence: {
    number: "BL286908",
    issuer: "City of Calgary",
    expires: "2027-01-27",
  },
  description:
    "Family-owned bathroom renovation company in Calgary, AB. Full remodels, ensuites, custom tile & showers, vanities. Honest pricing, reliable timelines. Free quote.",
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
    "Full Bathroom Remodels",
    "Ensuite Renovations",
    "Custom Tile & Showers",
    "Vanities & Lighting",
    "Freestanding Tubs & Fixtures",
    "Powder Rooms & Basement Bathrooms",
  ],
} as const
