import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"
import { services } from "@/lib/services"

// Generates /sitemap.xml — the list of pages for search engines to index.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/works", priority: 0.9 },
    { path: "/bathroom-renovation-cost-calgary", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/portfolio", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.2 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }))
}
