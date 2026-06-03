import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/sidebar"

const ADMIN_EMAIL = "nabiabdul943@gmail.com"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background md:flex-row">
      <AdminSidebar userEmail={user.email!} />
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  )
}
