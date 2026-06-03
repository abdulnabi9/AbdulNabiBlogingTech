"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Copy, Github, Instagram, Linkedin, Mail, X } from "lucide-react"
import { useContactModal } from "@/components/providers"
import { useState } from "react"
import { siteConfig } from "@/content/data/site"
import { cn } from "@/lib/utils"

export function ContactModal() {
  const { isOpen, closeModal } = useContactModal()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-6 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl md:w-full">
          <div className="flex flex-col space-y-2 text-center sm:text-left">
            <Dialog.Title className="text-xl font-semibold leading-none tracking-tight">
              Get in touch
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              Have a project in mind, or just want to say hi? I&apos;d love to hear from you.
            </Dialog.Description>
          </div>

          <div className="flex flex-col gap-3">
            {/* Email Copy Button */}
            <button
              onClick={handleCopyEmail}
              className="flex h-12 w-full items-center justify-between rounded-lg border border-border bg-muted/50 px-4 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{siteConfig.email}</span>
              </div>
              <div className={cn("flex items-center gap-1 text-xs font-medium text-muted-foreground transition-all", copied ? "text-emerald-500" : "")}>
                {copied ? "Copied!" : <><Copy className="h-4 w-4" /> Copy</>}
              </div>
            </button>

            {/* Social Links */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/abdulnabi.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
