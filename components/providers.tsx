"use client"

import React, { createContext, useContext, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ContactModalContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined)

export function useContactModal() {
  const context = useContext(ContactModalContext)
  if (!context) throw new Error("useContactModal must be used within a ContactModalProvider")
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <ContactModalContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
        {children}
      </ContactModalContext.Provider>
    </NextThemesProvider>
  )
}
