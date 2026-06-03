import { Brain, Cpu, Database, Network, Smartphone } from "lucide-react"
import { SectionHeader } from "@/components/shared/section-header"
import { MotionSection, MotionItem } from "@/components/shared/motion-section"
import { cn } from "@/lib/utils"

const aiTopics = [
  {
    title: "LLM Applications",
    description: "Exploring the integration of large language models to create intelligent, context-aware applications.",
    icon: Brain,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "RAG Systems",
    description: "Building Retrieval-Augmented Generation pipelines for factual, domain-specific AI responses.",
    icon: Database,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Agentic Workflows",
    description: "Designing autonomous AI agents capable of planning and executing multi-step tasks.",
    icon: Network,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Context Engineering",
    description: "Optimizing prompts and managing context windows to maximize LLM performance and reliability.",
    icon: Cpu,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Mobile AI Integration",
    description: "Bridging the gap between powerful cloud-based AI models and native Android user experiences.",
    icon: Smartphone,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
]

export function AiExplorationSection() {
  return (
    <section id="ai-exploration" className="section-padding bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-border">
      <div className="content-width">
        <MotionSection>
          <MotionItem>
            <SectionHeader
              label="Active Learning"
              title="Exploring AI Engineering"
              subtitle="While my production expertise is in Android, I am actively experimenting with the technologies that will define the next decade of software."
            />
          </MotionItem>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiTopics.map((topic, i) => (
              <MotionItem key={topic.title} className={cn(i === 4 && "sm:col-span-2 lg:col-span-1")}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-brand/30 hover:shadow-md">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-black/5 opacity-0 transition-opacity group-hover:opacity-100 dark:to-white/5"
                  />
                  <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-lg", topic.bg)}>
                    <topic.icon className={cn("h-5 w-5", topic.color)} />
                  </div>
                  <h3 className="font-semibold text-foreground">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>
                </div>
              </MotionItem>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  )
}
