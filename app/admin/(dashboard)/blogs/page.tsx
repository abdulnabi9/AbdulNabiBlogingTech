import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { BlogActions } from "@/components/admin/blog-actions"

export const metadata = { title: "Manage Blogs" }

export default async function AdminBlogsPage() {
  const supabase = await createClient()

  const { data: blogs } = await supabase
    .from("blogs")
    .select("id, title, slug, status, view_count, created_at, published_at")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {blogs?.length ?? 0} post{blogs?.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          + New Post
        </Link>
      </div>

      {!blogs?.length ? (
        <div className="rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">No posts yet.</p>
          <Link
            href="/admin/blogs/new"
            className="mt-3 inline-block text-sm text-primary hover:underline"
          >
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[500px] text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Title
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                  Status
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                  Views
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blogs.map((blog) => (
                <tr key={blog.id} className="group hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <p className="font-medium line-clamp-1">{blog.title}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      /{blog.slug}
                    </p>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        blog.status === "published"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {blog.status ?? "draft"}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                    {(blog.view_count ?? 0).toLocaleString()}
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                    {blog.created_at
                      ? new Date(blog.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <BlogActions
                      id={blog.id}
                      slug={blog.slug}
                      status={blog.status ?? "draft"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
