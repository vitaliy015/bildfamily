import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

// Generates /sitemap.xml — the list of pages for search engines to index.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/works", priority: 0.9 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }))
}
