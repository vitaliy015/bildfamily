import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

// Generates /robots.txt — tells search engines they may crawl everything and
// where to find the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
