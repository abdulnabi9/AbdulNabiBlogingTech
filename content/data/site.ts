export const siteConfig = {
  name: "Abdul Nabi",
  title: "Android Engineer & AI Explorer",
  description:
    "Senior Android Developer building production-grade mobile apps and exploring AI-powered experiences.",
  url: "https://abdulnabi.in",
  email: "nabiabdul943@gmail.com",
  github: "https://github.com/abdulnabi",
  linkedin: "https://www.linkedin.com/in/abdul-nabi-62a6141b0",
  twitter: "https://twitter.com/abdulnabi",
}

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Apps Shipped" },
  { value: "500+", label: "Active Users" },
  { value: "100%", label: "Clean Arch" },
]

export const skills = [
  {
    category: "Android",
    items: ["Kotlin", "Java", "Jetpack Compose", "Android SDK", "MVVM", "Clean Architecture", "Room Database", "Google Maps API", "Play Store Publishing"],
  },
  {
    category: "Backend Integration",
    items: ["REST APIs", "Firebase", "Supabase", "PostgreSQL", "Node.js"],
  },
  {
    category: "AI & Emerging Technologies",
    items: ["LLM Applications", "RAG", "Agent Workflows", "Context Engineering", "Python"],
  },
  {
    category: "Tools",
    items: ["CI/CD", "Git", "GitHub", "Vercel", "Figma"],
  },
]

export const experience = [
  {
    year: "2023 – Present",
    company: "ANCLINIC",
    role: "Founder & Lead Android Engineer",
    description:
      "Built and launched a production-grade clinic management SaaS to the Play Store. Architected the Android app using Kotlin, Jetpack Compose, and Clean Architecture. Integrated real-time data and AI-powered insights.",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Clean Architecture", "Firebase", "Play Store Deployment"],
    current: true,
  },
  {
    year: "2022 – 2023",
    company: "Freelance",
    role: "Senior Android Engineer",
    description:
      "Delivered multiple production Android apps for diverse clients. Engineered scalable solutions using MVVM, Hilt, and Room Database, focusing on high performance and optimized UI.",
    tags: ["Android", "Kotlin", "Java", "MVVM", "Room", "REST APIs"],
    current: false,
  },
  {
    year: "2021 – 2022",
    company: "Tech Startup",
    role: "Android Developer",
    description:
      "Core developer for high-traffic mobile applications. Reduced crash rates significantly, implemented complex UI flows, and streamlined CI/CD pipelines for automated Play Store releases.",
    tags: ["Android", "Kotlin", "CI/CD", "Google Maps"],
    current: false,
  },
]

export const projects = [
  {
    title: "ANCLINIC",
    description:
      "Complete clinic management platform — appointments, billing, patient records, and AI-powered analytics.",
    features: "Real-time sync, AI patient insights, offline mode, encrypted medical records.",
    impact: "Currently processing 500+ active patients, reducing manual scheduling time by 80%.",
    tags: ["Android", "Next.js", "Supabase", "AI", "PostgreSQL"],
    liveUrl: "https://anclinic.in",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.anclinic",
    featured: true,
  },
  {
    title: "AI Recruiter",
    description:
      "AI-powered recruitment assistant that screens resumes, ranks candidates, and drafts interview questions.",
    features: "RAG-based semantic search, automated candidate scoring, custom LLM prompts.",
    impact: "Reduces manual resume screening time by 90% for hiring managers.",
    tags: ["Python", "OpenAI", "LangChain", "Next.js", "Supabase"],
    githubUrl: "https://github.com/abdulnabi/ai-recruiter",
    featured: true,
  },
  {
    title: "Android Architecture Lab",
    description:
      "Open-source reference implementation of production Android architecture with Compose, Hilt, and Clean Architecture.",
    features: "Jetpack Compose UI, Hilt DI, Clean Architecture, offline-first Room DB, comprehensive unit tests.",
    impact: "Used as a reference template for scaling robust Android applications.",
    tags: ["Android", "Kotlin", "Compose", "Hilt", "Room"],
    githubUrl: "https://github.com/abdulnabi/android-arch-lab",
    featured: true,
  },
]

export const blogPosts = [
  {
    title: "Building a RAG System for Clinic Management",
    excerpt:
      "How I built a production retrieval-augmented generation system that answers clinical queries from patient history.",
    category: "AI",
    readingTime: 8,
    date: "Jun 1, 2026",
    slug: "rag-system-clinic-management",
  },
  {
    title: "Jetpack Compose Performance Patterns",
    excerpt:
      "The recomposition traps that silently kill your app's performance and how to fix them.",
    category: "Android",
    readingTime: 6,
    date: "May 20, 2026",
    slug: "compose-performance-patterns",
  },
  {
    title: "From Android Dev to SaaS Founder",
    excerpt:
      "What I learned building ANCLINIC — the technical decisions, the mistakes, and what I'd do differently.",
    category: "SaaS",
    readingTime: 10,
    date: "May 5, 2026",
    slug: "android-dev-to-saas-founder",
  },
]
