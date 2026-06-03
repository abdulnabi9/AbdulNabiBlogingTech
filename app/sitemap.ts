import { createClient } from "@/lib/supabase/server"
import type { MetadataRoute } from "next"

const BASE_URL = "https://abdulnabi.in"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const { data: blogs } = await supabase
    .from("blogs")
    .select("slug, published_at, updated_at")
    .eq("status", "published")

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = (blogs ?? []).map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at ?? blog.published_at ?? new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
