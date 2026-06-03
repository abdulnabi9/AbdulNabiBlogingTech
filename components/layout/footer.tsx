import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { siteConfig } from "@/content/data/site"

const footerLinks = [
  { href: "/#projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
  { href: "https://anclinic.in", label: "ANCLINIC ↗", external: true },
]

const socialLinks = [
  { href: siteConfig.github, label: "GitHub", icon: Github },
  { href: siteConfig.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: siteConfig.twitter, label: "Twitter", icon: Twitter },
  { href: `mailto:${siteConfig.email}`, label: "Email", icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="content-width py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-mono text-sm font-semibold text-foreground">Abdul Nabi</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Android Engineer · AI Builder · SaaS Founder
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Abdul Nabi. Built with Next.js.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
