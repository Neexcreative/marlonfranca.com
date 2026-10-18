'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Media from './Media'
import { easeOut } from './AnimateIn'
import type { Project } from '@/data/projects'

interface ProjectModalProps {
  project: Project
  next: Project
  onClose: () => void
  onNext: () => void
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.07, ease: easeOut },
  }),
}

// Gallery layout used when the project has no real images yet
const placeholderGallery = ['half', 'half', 'full', 'half', 'half'] as const

const ProjectModal = ({ project, next, onClose, onNext }: ProjectModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Scroll lock, Esc to close, focus management
  useEffect(() => {
    const { body, documentElement } = document
    const scrollbar = window.innerWidth - documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollbar}px`
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>('button, a[href]')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Back to top when jumping to the next project
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 })
  }, [project.slug])

  const gallery = project.images?.length
    ? project.images.map((src, i) => ({ src, size: i % 3 === 2 ? 'full' : 'half' }))
    : placeholderGallery.map((size) => ({ src: undefined, size }))

  const meta = [
    { label: 'Client', value: project.client },
    { label: 'Year', value: String(project.year) },
    { label: 'Discipline', value: project.category },
    { label: 'Services', value: project.services.join(', ') },
  ]

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="project-title">
      <motion.div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        className="absolute inset-x-0 bottom-0 top-[3vh] md:top-[5vh] md:inset-x-6 lg:inset-x-12 overflow-y-auto overscroll-contain rounded-t-2xl bg-paper"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        {/* Sticky top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-4 bg-paper/85 backdrop-blur-md border-b border-line">
          <span className="text-xs uppercase tracking-[0.15em] text-muted">
            {project.category} · {project.year}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.15em] cursor-pointer"
          >
            Close
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink transition-colors group-hover:bg-ink group-hover:text-paper">
              <span className="absolute h-px w-3.5 rotate-45 bg-current" />
              <span className="absolute h-px w-3.5 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <motion.div key={project.slug} initial="hidden" animate="visible" className="px-6 md:px-10 pb-16">
          {/* Title */}
          <div className="pt-10 md:pt-16 pb-10 md:pb-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <motion.h2
              id="project-title"
              custom={0}
              variants={item}
              className="md:col-span-8 text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.03em] leading-[0.9]"
            >
              {project.title}
            </motion.h2>
            <motion.p custom={1} variants={item} className="md:col-span-4 text-lg leading-relaxed text-muted">
              {project.summary}
            </motion.p>
          </div>

          {/* Hero — morphs from the grid card */}
          <motion.div layoutId={`media-${project.slug}`} className="overflow-hidden rounded-2xl bg-black" transition={{ duration: 0.8, ease: easeOut }}>
            <Media
              src={project.cover}
              poster={project.poster}
              alt={project.title}
              tone="#000"
              label="Cover"
              className="aspect-[16/10] md:aspect-[16/8] text-white"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Meta + description */}
          <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10">
            <motion.dl custom={2} variants={item} className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-6">
              {meta.map((m) => (
                <div key={m.label} className="border-t border-line pt-3">
                  <dt className="text-xs uppercase tracking-[0.15em] text-muted">{m.label}</dt>
                  <dd className="mt-1 text-sm">{m.value}</dd>
                </div>
              ))}
            </motion.dl>
            <motion.div custom={3} variants={item} className="md:col-span-7 md:col-start-6 space-y-6">
              {project.description.map((p, i) => (
                <p key={i} className="text-lg md:text-xl leading-relaxed">
                  {p}
                </p>
              ))}
            </motion.div>
          </div>

          {/* Gallery */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {gallery.map((g, i) => (
              <motion.div
                key={i}
                className={g.size === 'full' ? 'md:col-span-2' : ''}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, root: panelRef, margin: '-40px' }}
                transition={{ duration: 0.9, ease: easeOut }}
              >
                <Media
                  src={g.src}
                  alt={`${project.title}, image ${i + 1}`}
                  tone={project.tone}
                  label={`Image ${String(i + 1).padStart(2, '0')}`}
                  className={`rounded-2xl ${g.size === 'full' ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}
                  sizes={g.size === 'full' ? '100vw' : '50vw'}
                />
              </motion.div>
            ))}
          </div>

          {/* Next project */}
          <button
            type="button"
            onClick={onNext}
            className="group mt-20 md:mt-28 w-full border-t border-line pt-8 flex items-end justify-between gap-6 text-left cursor-pointer"
          >
            <span>
              <span className="block text-xs uppercase tracking-[0.15em] text-muted mb-3">Next project</span>
              <span className="block text-4xl md:text-6xl font-medium tracking-[-0.03em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                {next.title}
              </span>
            </span>
            <span className="text-3xl md:text-5xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
              →
            </span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ProjectModal
