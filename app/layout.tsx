import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Providers } from "@/components/providers"
import { ContactModal } from "@/components/shared/contact-modal"
import "@/styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Abdul Nabi — Android Engineer · AI Builder · SaaS Founder",
    template: "%s | Abdul Nabi",
  },
  description:
    "Building production Android apps and AI-powered SaaS products. Based in India.",
  metadataBase: new URL("https://abdulnabi.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdulnabi.in",
    siteName: "Abdul Nabi",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@abdulnabi",
    site: "@abdulnabi",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdul Nabi",
  url: "https://abdulnabi.in",
  jobTitle: "Android Engineer",
  sameAs: [
    "https://twitter.com/abdulnabi"
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Abdul Nabi",
  url: "https://abdulnabi.in",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <ContactModal />
          {children}
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  )
}
