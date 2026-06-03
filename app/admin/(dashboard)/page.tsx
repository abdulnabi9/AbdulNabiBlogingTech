import { createClient } from "@/lib/supabase/server"
import { FileText, Eye, BookOpen, FolderOpen, Mail, Users } from "lucide-react"
import Link from "next/link"

export const metadata = { title: "Dashboard" }

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    blogsResponse,
    projectsResponse,
    messagesResponse,
    subscribersResponse
  ] = await Promise.all([
    supabase.from("blogs").select("id, title, status, view_count, created_at").order("created_at", { ascending: false }),
    supabase.from("projects").select("id, title, featured, created_at").order("created_at", { ascending: false }),
    supabase.from("contact_messages").select("id, name, email, created_at").order("created_at", { ascending: false }),
    supabase.from("newsletter_subscribers").select("id, email, subscribed_at").order("subscribed_at", { ascending: false })
  ])

  if (blogsResponse.error) console.error("Supabase Error fetching blogs in Dashboard:", blogsResponse.error.message, blogsResponse.error.code)
  if (projectsResponse.error) console.error("Supabase Error fetching projects in Dashboard:", projectsResponse.error.message, projectsResponse.error.code)
  if (messagesResponse.error) console.error("Supabase Error fetching messages in Dashboard:", messagesResponse.error.message, messagesResponse.error.code)
  if (subscribersResponse.error) console.error("Supabase Error fetching subscribers in Dashboard:", subscribersResponse.error.message, subscribersResponse.error.code)

  const blogs = blogsResponse.data
  const projects = projectsResponse.data
  const messages = messagesResponse.data
  const subscribers = subscribersResponse.data

  const totalBlogs = blogs?.length ?? 0
  const publishedBlogs = blogs?.filter((b) => b.status === "published").length ?? 0
  const draftBlogs = blogs?.filter((b) => b.status === "draft").length ?? 0
  const totalViews = blogs?.reduce((acc, b) => acc + (b.view_count ?? 0), 0) ?? 0
  const totalProjects = projects?.length ?? 0
  const totalMessages = messages?.length ?? 0
  const totalSubscribers = subscribers?.length ?? 0

  const stats = [
    { label: "Total Blogs", value: totalBlogs, icon: FileText, href: "/admin/blogs" as const },
    { label: "Published", value: publishedBlogs, icon: BookOpen, href: "/admin/blogs" as const },
    { label: "Drafts", value: draftBlogs, icon: FileText, href: "/admin/blogs" as const },
    { label: "Total Views", value: totalViews, icon: Eye },
    { label: "Projects", value: totalProjects, icon: FolderOpen, href: "/admin/projects" as const },
    { label: "Messages", value: totalMessages, icon: Mail, href: "/admin/messages" as const },
    { label: "Subscribers", value: totalSubscribers, icon: Users, href: "/admin/newsletter" as const },
  ] as const

  const recentBlogs = blogs?.slice(0, 3) ?? []
  const recentMessages = messages?.slice(0, 3) ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Here&apos;s an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
        {stats.map((stat) => {
          const Icon = stat.icon
          if ("href" in stat) {
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <Icon size={16} className="text-muted-foreground" />
                </div>
                <p className="mt-2 text-3xl font-bold tabular-nums">{stat.value}</p>
              </Link>
            )
          }
          return (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <Icon size={16} className="text-muted-foreground" />
              </div>
              <p className="mt-2 text-3xl font-bold tabular-nums">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Content Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Recent Blogs */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Posts</h2>
            <Link
              href="/admin/blogs/new"
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              + New Post
            </Link>
          </div>

          {recentBlogs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          ) : (
            <div className="divide-y divide-border rounded-lg border border-border">
              {recentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{blog.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        blog.status === "published"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {blog.status ?? "draft"}
                    </span>
                    <Link
                      href={`/admin/blogs/edit/${blog.id}`}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Edit →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Messages</h2>
            <Link
              href="/admin/messages"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View all →
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          ) : (
            <div className="divide-y divide-border rounded-lg border border-border">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{message.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {message.created_at
                        ? new Date(message.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{message.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
