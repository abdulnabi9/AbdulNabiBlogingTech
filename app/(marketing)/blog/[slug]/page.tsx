import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

interface PageProps {
  params: Promise<{ slug: string }>
}

const ALLOWED_HOSTS = ['supabase.co', 'media.licdn.com', 'images.unsplash.com'];
function isAllowedImageHost(urlStr: string) {
  try {
    const url = new URL(urlStr);
    return ALLOWED_HOSTS.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch {
    return true; // Relative paths like /images/cover.png are local, which are allowed by next/image
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  // Use select('*') so it doesn't crash if keywords/author aren't in the DB yet
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error) {
    console.error("BLOG QUERY ERROR:", error);
    // Don't throw in generateMetadata, just return empty so it doesn't crash the entire page generation,
    // but the main page component will throw.
  }

  if (blog) {
    // eslint-disable-next-line no-console
    console.log("BLOG COUNT (Metadata): 1");
  }

  if (!blog) return { title: "Post Not Found" }

  const title = blog.seo_title ?? blog.title
  const description = blog.seo_description ?? blog.excerpt ?? undefined
  const url = `https://abdulnabi.in/blog/${blog.slug}`

  return {
    title,
    description,
    keywords: blog.keywords ? blog.keywords.split(',').map((k: string) => k.trim()) : undefined,
    authors: [{ name: blog.author ?? "Abdul Nabi" }],
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      publishedTime: blog.published_at ?? undefined,
      ...(blog.cover_image ? { images: [blog.cover_image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(blog.cover_image ? { images: [blog.cover_image] } : {}),
    },
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error) {
    console.error("BLOG QUERY ERROR:", error);
    throw new Error(`Failed to fetch blog ${slug}: ${error.message}`);
  }

  if (blog) {
    // eslint-disable-next-line no-console
    console.log("BLOG COUNT (Detail): 1");
  }

  if (!blog) notFound()

  // Fire-and-forget view count increment
  supabase
    .from("blogs")
    .update({ view_count: (blog.view_count ?? 0) + 1 })
    .eq("id", blog.id)
    .then(() => {})

  const url = `https://abdulnabi.in/blog/${blog.slug}`
  const authorName = blog.author ?? "Abdul Nabi"

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
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: url,
      },
    ],
  }

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.seo_title ?? blog.title,
    description: blog.seo_description ?? blog.excerpt,
    image: blog.cover_image ? [blog.cover_image] : undefined,
    datePublished: blog.published_at,
    dateModified: blog.updated_at ?? blog.published_at,
    author: {
      "@type": "Person",
      name: authorName,
      url: "https://abdulnabi.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Abdul Nabi",
      logo: {
        "@type": "ImageObject",
        url: "https://abdulnabi.in/icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return (
    <main className="container mx-auto max-w-3xl py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* Back link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex min-h-[44px] items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        ← All posts
      </Link>

      {/* Cover image */}
      {blog.cover_image && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
          {isAllowedImageHost(blog.cover_image) ? (
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      )}

      {/* Header */}
      <header className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold leading-tight tracking-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {blog.published_at && (
            <time dateTime={blog.published_at}>
              {new Date(blog.published_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          )}
          {blog.reading_time && (
            <>
              <span>·</span>
              <span>{blog.reading_time} min read</span>
            </>
          )}
          {blog.view_count != null && (
            <>
              <span>·</span>
              <span>{(blog.view_count + 1).toLocaleString()} views</span>
            </>
          )}
        </div>
        {blog.excerpt && (
          <p className="text-lg text-muted-foreground">{blog.excerpt}</p>
        )}
      </header>

      {/* Content — rendered as prose */}
      <article
        className="prose prose-neutral max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
      />
    </main>
  )
}

/**
 * Minimal Markdown → HTML renderer (no external dependency).
 * Handles headings, bold, italic, code blocks, inline code, and paragraphs.
 */
function renderMarkdown(md: string): string {
  if (!md) return ""
  return md
    // Fenced code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold & italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Unordered lists
    .replace(/^\s*[-*+] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*<\/li>)/, "<ul>$1</ul>")
    // Horizontal rule
    .replace(/^---$/gm, "<hr>")
    // Paragraphs — wrap double-newline separated blocks
    .split(/\n{2,}/)
    .map((block) =>
      block.startsWith("<") ? block : `<p>${block.trim()}</p>`
    )
    .join("\n")
}
