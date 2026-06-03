import { SectionHeader } from "@/components/shared/section-header"
import { MotionSection, MotionItem } from "@/components/shared/motion-section"
import { experience } from "@/content/data/site"
import { cn } from "@/lib/utils"

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding border-b border-border">
      <div className="content-width">
        <MotionSection>
          <MotionItem>
            <SectionHeader
              label="Experience"
              title="Where I've worked"
              subtitle="A track record of shipping real products."
            />
          </MotionItem>

          <div className="relative">
            {/* Timeline line — desktop only */}
            <div className="absolute left-[7px] top-2 hidden h-[calc(100%-16px)] w-px bg-border lg:block" aria-hidden />

            <div className="space-y-10">
              {experience.map((item, i) => (
                <MotionItem key={i}>
                  <div className="flex gap-6">
                    {/* Dot */}
                    <div className="relative mt-1.5 hidden flex-shrink-0 lg:block">
                      <div
                        className={cn(
                          "h-3.5 w-3.5 rounded-full border-2",
                          item.current
                            ? "border-brand bg-brand"
                            : "border-border bg-background"
                        )}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-foreground">{item.role}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.company}
                            {item.current && (
                              <span className="ml-2 rounded-full bg-brand/10 px-2 py-0.5 font-mono text-xs text-brand">
                                Current
                              </span>
                            )}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">{item.year}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm border border-border bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </MotionItem>
              ))}
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  )
}
