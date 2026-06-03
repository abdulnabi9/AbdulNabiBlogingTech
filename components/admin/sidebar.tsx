"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X } from "lucide-react"

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 md:hidden">
        <span className="font-mono text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          abdulnabi.in
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out md:static md:w-56 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand */}
        <div className="hidden border-b border-border px-4 py-5 md:block">
          <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            abdulnabi.in
          </span>
          <p className="mt-0.5 text-xs text-muted-foreground truncate">
            {userEmail}
          </p>
        </div>

        {/* Mobile Header in Sidebar */}
        <div className="flex h-16 items-center border-b border-border px-4 md:hidden">
          <p className="text-sm font-medium text-muted-foreground truncate">
            {userEmail}
          </p>
          <button
             onClick={() => setIsOpen(false)}
             className="ml-auto inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {nav.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex min-h-[44px] items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="border-t border-border p-3">
          <button
            onClick={handleSignOut}
            className="flex min-h-[44px] w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
