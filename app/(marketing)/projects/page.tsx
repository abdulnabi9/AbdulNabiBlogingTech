import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export const metadata = {
  title: "Projects",
  description: "A showcase of my recent work.",
  alternates: {
    canonical: "/projects",
  },
}

export default async function ProjectsPage() {
  const supabase = await createClient()
  
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Here are some of the things I&apos;ve built.
      </p>
      
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {projects?.length ? (
          projects.map((project) => (
            <div key={project.id} className="rounded-lg border border-border p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description || "No description provided."}
              </p>
              {(project.live_url || project.github_url) && (
                <Link href={(project.live_url || project.github_url)!} target="_blank" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">
                  View Project →
                </Link>
              )}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No projects found.</p>
        )}
      </div>
    </div>
  )
}
