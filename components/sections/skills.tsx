import { SectionHeader } from "@/components/shared/section-header"
import { MotionSection, MotionItem } from "@/components/shared/motion-section"
import { skills } from "@/content/data/site"

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="content-width">
        <MotionSection>
          <MotionItem>
            <SectionHeader
              label="Skills"
              title="Technologies I build with"
              subtitle="Focused on Android, AI, and full-stack SaaS — not a generalist."
            />
          </MotionItem>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <MotionItem key={group.category}>
                <div className="space-y-3">
                  <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-sm border border-border bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </MotionItem>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  )
}
