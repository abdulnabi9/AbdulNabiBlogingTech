import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

const ADMIN_EMAIL = "nabiabdul943@gmail.com"

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const { pathname } = request.nextUrl

  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginPage = pathname.startsWith("/admin/login")

  if (isAdminRoute) {
    if (!user) {
      if (isLoginPage) return supabaseResponse; // Allow access to login page
      // Not authenticated — send to login
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/admin/login"
      return NextResponse.redirect(loginUrl)
    }

    if (user.email !== ADMIN_EMAIL) {
      if (isLoginPage) return supabaseResponse; // Allow access to login page
      // Authenticated but not the admin — kick out
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/admin/login"
      return NextResponse.redirect(loginUrl)
    }

    if (isLoginPage) {
      // Already authed admin visiting login — redirect to dashboard
      const dashboardUrl = request.nextUrl.clone()
      dashboardUrl.pathname = "/admin"
      return NextResponse.redirect(dashboardUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
