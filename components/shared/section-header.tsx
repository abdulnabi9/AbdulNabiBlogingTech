import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ label, title, subtitle, centered, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 max-w-2xl", centered && "mx-auto text-center", className)}>
      {label && (
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-brand">
          {label}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  )
}
