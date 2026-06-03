"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen } from "lucide-react"
import { fadeUp, stagger } from "@/lib/animations"

const trustSignals = [
  "3+ Years Experience",
  "Android Developer",
  "AI Builder",
  "SaaS Founder",
]

export function HeroSection() {
  return (
    <section
      aria-label="Introduction"
      className="relative isolate flex min-h-svh items-center bg-zinc-950 pt-14"
    >
      {/* Radial glow — decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Grid texture — decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="content-width w-full py-24 sm:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Availability badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs text-zinc-400">
                Open to opportunities
              </span>
            </span>
          </motion.div>

          {/* Name */}
          <motion.p
            variants={fadeUp}
            className="mt-6 font-mono text-sm font-medium tracking-widest text-zinc-500 uppercase"
          >
            Abdul Nabi
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Android Engineer
            <br />
            <span className="text-zinc-400">Building AI-Powered</span>
            <br />
            <span className="text-zinc-400">Products</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            I build Android apps, AI agents, and SaaS products that solve
            real-world business problems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/#projects"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              View Projects
              <ArrowRight size={15} aria-hidden />
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-zinc-700 px-5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <BookOpen size={15} aria-hidden />
              Read Blog
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap gap-2"
            aria-label="Credentials"
          >
            {trustSignals.map((signal) => (
              <span
                key={signal}
                className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 font-mono text-xs text-zinc-400"
              >
                {signal}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  )
}
