'use client'
import { motion } from 'framer-motion'
import Media from './Media'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project, trigger: HTMLElement) => void
}

const ProjectCard = ({ project, onOpen }: ProjectCardProps) => (
  <button
    type="button"
    onClick={(e) => onOpen(project, e.currentTarget)}
    className="group relative block h-full w-full overflow-hidden rounded-2xl text-left text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    aria-label={`Open project: ${project.title}`}
  >
    {/* Media — morphs into the popup hero */}
    <motion.div layoutId={`media-${project.slug}`} className="absolute inset-0 overflow-hidden rounded-2xl bg-black">
      {project.cover && (
        <div className="h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <Media
            src={project.cover}
            poster={project.poster}
            alt={project.title}
            tone="#000"
            className="h-full w-full"
            sizes="(min-width: 1024px) 66vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      )}
    </motion.div>

    {/* Legibility gradients over media */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />

    {/* Service label */}
    <span className="absolute left-5 top-4 md:left-6 md:top-5 text-sm">{project.category}</span>

    {/* Hover arrow */}
    <span className="absolute right-4 top-4 md:right-5 md:top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black opacity-0 scale-75 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
      ↗
    </span>

    {/* Name + briefing */}
    <span className="absolute inset-x-5 bottom-4 md:inset-x-6 md:bottom-5 block">
      <span className="block text-sm uppercase">{project.title}</span>
      <span className="mt-1.5 max-w-md text-sm uppercase text-white/70 line-clamp-2">{project.summary}</span>
    </span>
  </button>
)

export default ProjectCard
