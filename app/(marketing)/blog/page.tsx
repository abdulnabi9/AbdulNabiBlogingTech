import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on Android development, AI engineering, and building SaaS products.",
  alternates: {
    canonical: "/blog",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://abdulnabi.in/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://abdulnabi.in/blog",
    },
  ],
}

export default async function BlogListPage() {
  const supabase = await createClient()

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, reading_time, published_at, view_count, cover_image"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Supabase Error fetching blogs in /blog:", error.message, error.code, error.details)
  }

  return (
    <main className="container mx-auto max-w-7xl py-16 px-4 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Thoughts on Android, AI, and building things that matter.
        </p>
      </header>

      {!blogs?.length ? (
        <p className="text-muted-foreground">No posts published yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md"
            >
              <Link href={`/blog/${blog.slug}`} className="flex flex-1 flex-col">
                {blog.cover_image ? (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-muted/50" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {blog.title}
                  </h2>
                  {blog.excerpt && (
                    <p className="mt-2 flex-1 text-muted-foreground line-clamp-2">
                      {blog.excerpt}
                    </p>
                  )}
                  <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                    {blog.published_at && (
                      <time dateTime={blog.published_at}>
                        {new Date(blog.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    )}
                    {blog.reading_time && (
                      <>
                        <span>·</span>
                        <span>{blog.reading_time} min</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
