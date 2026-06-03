import { SectionHeader } from "@/components/shared/section-header"
import { MotionSection, MotionItem } from "@/components/shared/motion-section"

const signals = [
  {
    value: "5+",
    label: "Years Experience",
    description: "Building production Android apps since 2019",
  },
  {
    value: "12",
    label: "Apps Shipped",
    description: "From zero to Play Store across multiple industries",
  },
  {
    value: "3",
    label: "SaaS Products",
    description: "Designed, built, and launched independently",
  },
  {
    value: "500+",
    label: "Clinic Users",
    description: "Real businesses running on ANCLINIC daily",
  },
]

export function TrustSignals() {
  return (
    <section className="section-padding border-b border-border bg-muted/30">
      <div className="content-width">
        <MotionSection>
          <MotionItem>
            <SectionHeader
              label="By the numbers"
              title="Built for production. Proven in the real world."
              centered
            />
          </MotionItem>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {signals.map((s) => (
              <MotionItem key={s.label}>
                <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                  <p className="text-4xl font-bold tracking-tight text-foreground">{s.value}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{s.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                </div>
              </MotionItem>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  )
}
