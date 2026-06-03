"use client"

import { ArrowUpRight } from "lucide-react"
import { MotionSection, MotionItem } from "@/components/shared/motion-section"

const techStack = [
  "Next.js",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
  "PostgreSQL",
]

const features = [
  "Patient Management",
  "Appointments",
  "Medical Records",
  "Multi-Tenant",
  "Responsive Design",
]

export function AnclinicShowcase() {
  return (
    <section className="section-padding border-b border-border bg-muted/30">
      <div className="content-width">
        <MotionSection className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12 items-center">
              
              {/* Left Side: Content */}
              <div className="flex flex-col justify-center">
                <MotionItem>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs font-medium text-brand">
                      ANCLINIC
                    </span>
                    <span className="font-mono text-xs text-muted-foreground tracking-wide">
                      Clinic Management Platform
                    </span>
                  </div>
                </MotionItem>

                <MotionItem>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                    A modern healthcare management platform built to streamline patient records, appointment scheduling, and clinic operations through a secure and responsive web experience.
                  </p>
                </MotionItem>

                <MotionItem>
                  <div className="mt-8">
                    <a
                      href="https://www.anclinic.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-md bg-brand px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      Visit ANCLINIC <ArrowUpRight size={16} />
                    </a>
                  </div>
                </MotionItem>
              </div>

              {/* Right Side: Tech & Features */}
              <div className="flex flex-col gap-8 rounded-xl bg-background p-6 md:p-8 border border-border/50">
                
                <MotionItem>
                  <div>
                    <h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </MotionItem>

                <MotionItem>
                  <div>
                    <h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                      Key Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </MotionItem>

              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  )
}
