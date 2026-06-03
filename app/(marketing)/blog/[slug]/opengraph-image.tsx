import { ImageResponse } from "next/og"
import { createClient } from "@/lib/supabase/server"

export const runtime = "edge"

export const alt = "Blog Post Cover"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: blog } = await supabase
    .from("blogs")
    .select("title, excerpt, author")
    .eq("slug", slug)
    .single()

  const title = blog?.title ?? "Blog Post"
  const description = blog?.excerpt ?? "Read this post on my blog."
  const author = blog?.author ?? "Abdul Nabi"

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#09090b", // zinc-950
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 32,
              color: "#a1a1aa", // zinc-400
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {author}&apos;s Blog
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: "800px",
              marginTop: "24px",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#e4e4e7", // zinc-200
              fontWeight: 500,
            }}
          >
            abdulnabi.in
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
