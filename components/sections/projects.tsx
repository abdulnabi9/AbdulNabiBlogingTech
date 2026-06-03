import { ArrowUpRight, Github } from "lucide-react"
import { SectionHeader } from "@/components/shared/section-header"
import { MotionSection, MotionItem } from "@/components/shared/motion-section"
import { projects } from "@/content/data/site"

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding">
      <div className="content-width">
        <MotionSection>
          <MotionItem>
            <SectionHeader
              label="Projects"
              title="Selected work"
              subtitle="Problems I found, solutions I built."
            />
          </MotionItem>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <MotionItem key={project.title}>
                <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-brand/30 hover:shadow-md">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mt-4 space-y-2 rounded-lg bg-muted/50 p-3">
                      <div>
                        <p className="font-mono text-xs font-medium text-brand">Key Features</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{project.features}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs font-medium text-foreground">Business Impact</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{project.impact}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-border bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-brand/10 px-2 py-1 text-xs font-medium text-brand hover:bg-brand/20 transition-colors"
                      >
                        Web <ArrowUpRight size={12} />
                      </a>
                    )}
                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-500/20 transition-colors dark:text-emerald-400"
                      >
                        Play Store <ArrowUpRight size={12} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <Github size={12} /> GitHub
                      </a>
                    )}
                  </div>
                </article>
              </MotionItem>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  )
}
