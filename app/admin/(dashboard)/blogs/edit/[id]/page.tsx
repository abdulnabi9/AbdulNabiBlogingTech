import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { BlogEditor } from "@/components/admin/blog-editor"

export const metadata = { title: "Edit Post" }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: blog } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, content, status, seo_title, seo_description, cover_image"
    )
    .eq("id", id)
    .single()

  if (!blog) notFound()

  return <BlogEditor initialData={blog} />
}
