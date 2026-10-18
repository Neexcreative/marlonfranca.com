'use client'
import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import ProjectCard from '../ProjectCard'
import ProjectModal from '../ProjectModal'
import AnimateIn, { easeOut } from '../AnimateIn'
import { projects, type Project } from '@/data/projects'

// Bento slots (desktop = 9 columns × 3 rows), in project order:
// ┌──────────── 1 ────────────┬──── 2 ────┐
// ├──── 3 ─────┬──── 4 ───────┼──── 5 ────┤
// ├── 6 ──┬── 7 ──┬── 8 ──────┤  (tall)   │
// └───────┴───────┴───────────┴───────────┘
const slots = [
  'md:col-span-2 lg:col-span-6',
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-3',
  'md:row-span-2 lg:col-span-3 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
]

const ProjectsGrid = () => {
  const [selected, setSelected] = useState<Project | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const open = useCallback((project: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setSelected(project)
  }, [])

  const close = useCallback(() => {
    setSelected(null)
    triggerRef.current?.focus({ preventScroll: true })
  }, [])

  const selectedIndex = selected ? projects.findIndex((p) => p.slug === selected.slug) : -1
  const next = selected ? projects[(selectedIndex + 1) % projects.length] : null

  return (
    <section id="work" className="px-3 md:px-6 py-24 md:py-32 scroll-mt-16">
      <div className="max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="px-3 md:px-6 flex items-end justify-between gap-8 mb-10 md:mb-14">
          <AnimateIn>
            <p className="text-xs uppercase tracking-[0.15em] text-muted mb-4">Selected Work</p>
            <h2 className="text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[0.95]">
              Projects <sup className="text-lg md:text-2xl align-top text-muted tabular-nums">({String(projects.length).padStart(2, '0')})</sup>
            </h2>
          </AnimateIn>
        </div>

        {/* Bento grid */}
        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 auto-rows-[20rem] md:auto-rows-[17rem] lg:auto-rows-[clamp(12rem,16vw,15rem)] gap-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                className={slots[i] ?? 'lg:col-span-3'}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: easeOut }}
              >
                <ProjectCard project={project} onOpen={open} />
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selected && next && (
              <ProjectModal
                key="modal"
                project={selected}
                next={next}
                onClose={close}
                onNext={() => setSelected(next)}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  )
}

export default ProjectsGrid
