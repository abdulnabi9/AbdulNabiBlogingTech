import { HeroSection } from "@/components/sections/hero"
import { AnclinicShowcase } from "@/components/sections/anclinic-showcase"
import { ProjectsSection } from "@/components/sections/projects"
import { ExperienceSection } from "@/components/sections/experience"
import { SkillsSection } from "@/components/sections/skills"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnclinicShowcase />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
    </>
  )
}
