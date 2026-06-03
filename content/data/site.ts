export const siteConfig = {
  name: "Abdul Nabi",
  title: "Android Engineer · AI Builder · SaaS Founder",
  description:
    "Building production Android apps and AI-powered SaaS products. Based in India.",
  url: "https://abdulnabi.in",
  email: "hello@abdulnabi.in",
  github: "https://github.com/abdulnabi",
  linkedin: "https://linkedin.com/in/abdulnabi",
  twitter: "https://twitter.com/abdulnabi",
}

export const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "12", label: "Apps Shipped" },
  { value: "3", label: "SaaS Products" },
  { value: "500+", label: "Clinic Users" },
]

export const skills = [
  {
    category: "Android",
    items: ["Kotlin", "Jetpack Compose", "Android SDK", "MVVM", "Coroutines", "Hilt", "Room"],
  },
  {
    category: "AI & ML",
    items: ["OpenAI API", "LangChain", "RAG", "Vector DBs", "Python", "Embeddings"],
  },
  {
    category: "Backend",
    items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Edge Functions"],
  },
  {
    category: "Cloud & Web",
    items: ["Next.js", "TypeScript", "Vercel", "Cloudflare", "TailwindCSS"],
  },
]

export const experience = [
  {
    year: "2023 – Present",
    company: "ANCLINIC",
    role: "Founder & Lead Engineer",
    description:
      "Built and launched a full-stack clinic management SaaS from zero to 500+ active users. Architected Android app, AI features, and backend infrastructure.",
    tags: ["Android", "Kotlin", "Supabase", "AI", "Next.js"],
    current: true,
  },
  {
    year: "2022 – 2023",
    company: "Freelance",
    role: "Senior Android Engineer",
    description:
      "Delivered 4 production Android apps for startups across healthcare, fintech, and logistics. Introduced Jetpack Compose and clean architecture patterns.",
    tags: ["Android", "Kotlin", "Compose", "Firebase"],
    current: false,
  },
  {
    year: "2020 – 2022",
    company: "Tech Startup",
    role: "Android Developer",
    description:
      "Core Android developer on a team of 8. Shipped 3 major app versions, reduced crash rate by 60%, and mentored 2 junior developers.",
    tags: ["Android", "Java", "Kotlin", "MVVM"],
    current: false,
  },
]

export const projects = [
  {
    title: "ANCLINIC",
    description:
      "Complete clinic management platform — appointments, billing, patient records, and AI-powered analytics.",
    problem: "Clinics waste hours on manual scheduling and paper records.",
    solution: "One platform that handles the entire clinic workflow with AI insights.",
    tags: ["Android", "Next.js", "Supabase", "AI", "PostgreSQL"],
    liveUrl: "https://anclinic.in",
    featured: true,
  },
  {
    title: "AI Recruiter",
    description:
      "AI-powered recruitment assistant that screens resumes, ranks candidates, and drafts interview questions.",
    problem: "Recruiters spend 80% of their time on manual resume screening.",
    solution: "RAG-based AI that understands job requirements and ranks candidates semantically.",
    tags: ["Python", "OpenAI", "LangChain", "Next.js", "Supabase"],
    githubUrl: "https://github.com/abdulnabi/ai-recruiter",
    featured: true,
  },
  {
    title: "Android Architecture Lab",
    description:
      "Open-source reference implementation of production Android architecture with Compose, Hilt, and Clean Architecture.",
    problem: "No single reference that shows all modern Android patterns working together.",
    solution: "A real-world app template with full test coverage and documentation.",
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
