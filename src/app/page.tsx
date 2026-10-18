import HeroSection from '@/components/sections/HeroSection'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import JsonLd from '@/components/JsonLd'
import { homeGraph } from '@/lib/structured-data'

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <HeroSection />
      <ProjectsGrid />
    </>
  )
}
