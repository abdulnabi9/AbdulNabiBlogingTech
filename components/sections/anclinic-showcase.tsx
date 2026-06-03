import { ArrowUpRight, CheckCircle } from "lucide-react"
import { MotionSection, MotionItem } from "@/components/shared/motion-section"

const benefits = [
  "Appointment scheduling & reminders",
  "Patient records & history",
  "Billing & invoicing",
  "AI-powered analytics dashboard",
  "Multi-clinic support",
  "Android & web apps",
]

const anclinicStats = [
  { value: "500+", label: "Active Clinics" },
  { value: "98%", label: "Uptime" },
  { value: "4.9★", label: "App Rating" },
]

export function AnclinicShowcase() {
  return (
    <section id="anclinic" className="section-padding bg-zinc-950">
      <div className="content-width">
        <MotionSection>
          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            {/* Top accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-brand to-transparent" />

            <div className="p-8 lg:p-12">
              <MotionItem>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs text-brand">
                    Flagship Product
                  </span>
                  <span className="font-mono text-xs text-zinc-500">anclinic.in</span>
                </div>
              </MotionItem>

              <div className="mt-6 grid gap-12 lg:grid-cols-2">
                {/* Left */}
                <div>
                  <MotionItem>
                    <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                      ANCLINIC
                    </h2>
                    <p className="mt-2 text-lg text-zinc-400">
                      The complete operating system for modern clinics.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                      Built from scratch after seeing clinic owners drown in paperwork. ANCLINIC
                      handles appointments, billing, patient records, and analytics — so doctors can
                      focus on patients, not admin.
                    </p>
                  </MotionItem>

                  <MotionItem>
                    <ul className="mt-6 space-y-2">
                      {benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-zinc-400">
                          <CheckCircle size={14} className="flex-shrink-0 text-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </MotionItem>

                  <MotionItem>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="https://anclinic.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-md bg-brand px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                      >
                        Visit ANCLINIC <ArrowUpRight size={14} />
                      </a>
                      <a
                        href="https://anclinic.in/demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-700 px-5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                      >
                        Watch Demo
                      </a>
                    </div>
                  </MotionItem>
                </div>

                {/* Right — stats + screenshot placeholder */}
                <div className="flex flex-col gap-6">
                  <MotionItem>
                    <div className="grid grid-cols-3 gap-4">
                      {anclinicStats.map((s) => (
                        <div
                          key={s.label}
                          className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-center"
                        >
                          <p className="text-2xl font-bold text-white">{s.value}</p>
                          <p className="mt-1 text-xs text-zinc-500">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </MotionItem>

                  <MotionItem>
                    {/* Screenshot placeholder — replace with real screenshot */}
                    <div className="flex aspect-video items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                      <p className="font-mono text-xs text-zinc-600">
                        Dashboard screenshot
                      </p>
                    </div>
                  </MotionItem>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  )
}
