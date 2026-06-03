"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface BlogEditorProps {
  initialData?: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    status: string | null
    seo_title: string | null
    seo_description: string | null
    cover_image: string | null
    keywords?: string | null
    author?: string | null
  }
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function BlogEditor({ initialData }: BlogEditorProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isEditing = Boolean(initialData?.id)

  const [title, setTitle] = useState(initialData?.title ?? "")
  const [slug, setSlug] = useState(initialData?.slug ?? "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "")
  const [content, setContent] = useState(initialData?.content ?? "")
  const [coverImage, setCoverImage] = useState(initialData?.cover_image ?? "")
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title ?? "")
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seo_description ?? ""
  )
  const [keywords, setKeywords] = useState(
    initialData?.keywords ?? ""
  )
  const [author, setAuthor] = useState(
    initialData?.author ?? "Abdul Nabi"
  )
  const [error, setError] = useState<string | null>(null)

  function handleTitleChange(v: string) {
    setTitle(v)
    if (!isEditing || slug === slugify(title)) {
      setSlug(slugify(v))
    }
  }

  async function save(publishStatus: "draft" | "published") {
    setError(null)
    if (!title.trim() || !slug.trim() || !content.trim()) {
      setError("Title, slug, and content are required.")
      return
    }

    const supabase = createClient()
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      cover_image: coverImage.trim() || null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      keywords: keywords.trim() || null,
      author: author.trim() || null,
      status: publishStatus,
      reading_time: estimateReadingTime(content),
      word_count: content.trim().split(/\s+/).length,
      updated_at: new Date().toISOString(),
      ...(publishStatus === "published" && !initialData?.id
        ? { published_at: new Date().toISOString() }
        : {}),
    }

    startTransition(async () => {
      if (isEditing) {
        const { error: err } = await supabase
          .from("blogs")
          .update(payload)
          .eq("id", initialData!.id)
        if (err) { setError(err.message); return }
      } else {
        const { error: err } = await supabase.from("blogs").insert(payload)
        if (err) { setError(err.message); return }
      }
      router.push("/admin/blogs")
      router.refresh()
    })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Post" : "New Post"}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            disabled={isPending}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => save("draft")}
            disabled={isPending}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
          >
            {isPending ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={() => save("published")}
            disabled={isPending}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="space-y-4 rounded-lg border border-border p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Content
        </h2>
        <Field label="Title" required>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="My awesome post"
            className={inputClass}
          />
        </Field>
        <Field label="Slug" required>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="my-awesome-post"
            className={`${inputClass} font-mono`}
          />
        </Field>
        <Field label="Author">
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Abdul Nabi"
            className={inputClass}
          />
        </Field>
        <Field label="Excerpt">
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A short summary of the post…"
            rows={2}
            className={inputClass}
          />
        </Field>
        <Field label="Content (Markdown)" required>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post in Markdown…"
            rows={20}
            className={`${inputClass} font-mono text-xs`}
          />
        </Field>
      </div>

      <div className="space-y-4 rounded-lg border border-border p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Media &amp; SEO
        </h2>
        <Field label="Cover Image URL">
          <input
            id="coverImage"
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://…"
            className={inputClass}
          />
        </Field>
        <Field label="SEO Title">
          <input
            id="seoTitle"
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Override page title for search engines"
            className={inputClass}
          />
        </Field>
        <Field label="SEO Description">
          <textarea
            id="seoDescription"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Meta description shown in search results (150–160 chars)"
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label="Keywords">
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Comma separated keywords (e.g., nextjs, react, seo)"
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  "w-full min-h-[44px] rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm outline-none ring-ring transition-shadow focus:ring-2 resize-y"
