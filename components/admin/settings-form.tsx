"use client"

import { useState, useTransition } from "react"
import { createClient } from "@/lib/supabase/client"

type SiteSettings = {
  id?: string
  site_name?: string | null
  hero_title?: string | null
  hero_subtitle?: string | null
  email?: string | null
  github_url?: string | null
  linkedin_url?: string | null
  resume_url?: string | null
}

interface SettingsFormProps {
  initialSettings: SiteSettings | null
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<SiteSettings>({
    site_name: initialSettings?.site_name ?? "",
    hero_title: initialSettings?.hero_title ?? "",
    hero_subtitle: initialSettings?.hero_subtitle ?? "",
    email: initialSettings?.email ?? "",
    github_url: initialSettings?.github_url ?? "",
    linkedin_url: initialSettings?.linkedin_url ?? "",
    resume_url: initialSettings?.resume_url ?? "",
  })

  function update(key: keyof SiteSettings, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSuccess(false)
    setError(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    startTransition(async () => {
      const supabase = createClient()
      const payload = {
        ...form,
        updated_at: new Date().toISOString(),
      }

      let err
      if (initialSettings?.id) {
        ;({ error: err } = await supabase
          .from("site_settings")
          .update(payload)
          .eq("id", initialSettings.id))
      } else {
        ;({ error: err } = await supabase.from("site_settings").insert(payload))
      }

      if (err) {
        setError(err.message)
      } else {
        setSuccess(true)
      }
    })
  }

  const fields: { key: keyof SiteSettings; label: string; type?: string; placeholder?: string }[] = [
    { key: "site_name", label: "Site Name", placeholder: "Abdul Nabi" },
    { key: "hero_title", label: "Hero Title", placeholder: "Android Engineer · AI Builder" },
    { key: "hero_subtitle", label: "Hero Subtitle", placeholder: "Building production-grade products" },
    { key: "email", label: "Email", type: "email", placeholder: "hello@abdulnabi.in" },
    { key: "github_url", label: "GitHub URL", type: "url", placeholder: "https://github.com/…" },
    { key: "linkedin_url", label: "LinkedIn URL", type: "url", placeholder: "https://linkedin.com/in/…" },
    { key: "resume_url", label: "Resume URL", type: "url", placeholder: "https://…/resume.pdf" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-border p-5">
      {fields.map(({ key, label, type, placeholder }) => (
        <div key={key} className="space-y-1.5">
          <label htmlFor={key} className="block text-sm font-medium">
            {label}
          </label>
          <input
            id={key}
            type={type ?? "text"}
            value={(form[key] as string) ?? ""}
            onChange={(e) => update(key, e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-[44px] rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm outline-none ring-ring transition-shadow focus:ring-2"
            disabled={isPending}
          />
        </div>
      ))}

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-600 dark:text-green-400">
          Settings saved successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="min-h-[44px] rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save Settings"}
      </button>
    </form>
  )
}
