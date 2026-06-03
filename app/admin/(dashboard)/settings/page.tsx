import { createClient } from "@/lib/supabase/server"
import { SettingsForm } from "@/components/admin/settings-form"

export const metadata = { title: "Settings" }

export default async function AdminSettingsPage() {
  const supabase = await createClient()

  // site_settings is a single-row table — get the first (and only) row
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your site configuration and social links.
        </p>
      </div>
      <SettingsForm initialSettings={settings} />
    </div>
  )
}
