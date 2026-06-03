"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

interface BlogActionsProps {
  id: string
  slug: string
  status: string
}

export function BlogActions({ id, slug, status }: BlogActionsProps) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function toggleStatus() {
    setBusy(true)
    const supabase = createClient()
    const newStatus = status === "published" ? "draft" : "published"
    await supabase
      .from("blogs")
      .update({
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", id)
    router.refresh()
    setBusy(false)
  }

  async function deleteBlog() {
    if (!confirm("Delete this post? This cannot be undone.")) return
    setBusy(true)
    const supabase = createClient()
    await supabase.from("blogs").delete().eq("id", id)
    router.refresh()
    setBusy(false)
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {status === "published" && (
        <Link
          href={`/blog/${slug}`}
          target="_blank"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          View
        </Link>
      )}
      <Link
        href={`/admin/blogs/edit/${id}`}
        className="text-xs text-primary hover:underline"
      >
        Edit
      </Link>
      <button
        onClick={toggleStatus}
        disabled={busy}
        className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-40"
      >
        {status === "published" ? "Unpublish" : "Publish"}
      </button>
      <button
        onClick={deleteBlog}
        disabled={busy}
        className="text-xs text-destructive hover:underline disabled:opacity-40"
      >
        Delete
      </button>
    </div>
  )
}
