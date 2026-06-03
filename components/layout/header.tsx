"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Github, Instagram, Linkedin, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { useContactModal } from "@/components/providers"
import { siteConfig } from "@/content/data/site"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openModal } = useContactModal()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="content-width flex h-14 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground hover:text-brand transition-colors"
          aria-label="Abdul Nabi — home"
        >
          Abdul Nabi
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={openModal}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </button>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative z-50 flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <div className="flex h-4 w-5 flex-col justify-between">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-full rounded-full bg-current transition-transform duration-300"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-[2px] w-full rounded-full bg-current transition-opacity duration-300"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-full rounded-full bg-current transition-transform duration-300"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-background md:hidden"
          >
            <div className="flex flex-1 flex-col justify-center px-8">
              <nav className="flex flex-col gap-8" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-semibold tracking-tight text-foreground transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    openModal()
                  }}
                  className="text-left text-4xl font-semibold tracking-tight text-foreground transition-colors hover:text-brand"
                >
                  Contact
                </button>
              </nav>

              <div className="mt-16 flex items-center gap-6 text-muted-foreground">
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                  <span className="sr-only">GitHub</span>
                  <Github size={24} />
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin size={24} />
                </a>
                <a href="https://www.instagram.com/abdulnabi.in" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                  <span className="sr-only">Instagram</span>
                  <Instagram size={24} />
                </a>
                <button onClick={openModal} className="transition-colors hover:text-foreground">
                  <span className="sr-only">Email</span>
                  <Mail size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
