'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { easeOut } from './AnimateIn'
import { useModal } from './useModal'
import { cv } from '@/data/cv'
import { site } from '@/data/site'

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.06, ease: easeOut },
  }),
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs uppercase tracking-[0.15em] text-muted mb-6">{children}</h3>
)

export const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
)

const CVModal = ({ onClose }: { onClose: () => void }) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useModal(panelRef, closeRef, onClose)

  const linkedin = site.socials.find((s) => s.label === 'LinkedIn')

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cv-title">
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
        className="absolute inset-x-0 bottom-0 top-[3vh] md:top-[5vh] md:inset-x-6 lg:inset-x-[max(3rem,calc((100vw-72rem)/2))] overflow-y-auto overscroll-contain rounded-t-2xl bg-paper"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        {/* Sticky top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-4 bg-paper/85 backdrop-blur-md border-b border-line">
          <span className="text-xs uppercase tracking-[0.15em] text-muted">Curriculum Vitae</span>
          <div className="flex items-center gap-3">
            <a
              href={cv.pdf}
              download={cv.pdfName}
              className="group flex items-center gap-2 rounded-full border border-ink px-4 h-9 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-ink hover:text-paper"
              aria-label="Download CV as PDF"
            >
              <DownloadIcon />
              <span className="hidden sm:inline">PDF</span>
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close CV"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-paper cursor-pointer"
            >
              <span className="absolute h-px w-3.5 rotate-45 bg-current" />
              <span className="absolute h-px w-3.5 -rotate-45 bg-current" />
            </button>
          </div>
        </div>

        <motion.div initial="hidden" animate="visible" className="px-6 md:px-10 pb-16">
          {/* Header */}
          <motion.header custom={0} variants={item} className="pt-10 md:pt-14 pb-10 md:pb-14 border-b border-line">
            <h2 id="cv-title" className="text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[0.95]">
              {cv.name}
            </h2>
            <p className="mt-4 text-xl md:text-2xl">{cv.headline}</p>
            <p className="text-lg text-muted">{cv.focus}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.12em]">
              <span className="rounded-full border border-line px-3 py-1.5">{cv.location}</span>
              <span className="rounded-full border border-line px-3 py-1.5">Right to work in Ireland</span>
              <span className="rounded-full border border-line px-3 py-1.5">No sponsorship needed</span>
            </div>
          </motion.header>

          {/* Summary */}
          <motion.section custom={1} variants={item} className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-line">
            <div className="md:col-span-3"><Label>Profile</Label></div>
            <p className="md:col-span-9 text-lg md:text-xl leading-relaxed">{cv.summary}</p>
          </motion.section>

          {/* Experience */}
          <motion.section custom={2} variants={item} className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-line">
            <div className="md:col-span-3"><Label>Experience</Label></div>
            <ol className="md:col-span-9 space-y-10">
              {cv.experience.map((e) => (
                <li key={e.company + e.period} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                  <div className="sm:col-span-4 text-sm text-muted">
                    <p className="tabular-nums">{e.period}</p>
                    {e.note && <p className="mt-0.5 text-xs uppercase tracking-[0.12em]">{e.note}</p>}
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-lg font-medium leading-snug">{e.role}</p>
                    <p className="text-sm text-muted">{e.company}</p>
                    <ul className="mt-3 space-y-2">
                      {e.points.map((pt) => (
                        <li key={pt} className="relative pl-4 text-[15px] leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </motion.section>

          {/* Skills */}
          <motion.section custom={3} variants={item} className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-line">
            <div className="md:col-span-3"><Label>Skills</Label></div>
            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {cv.skills.map((s) => (
                <div key={s.group}>
                  <p className="font-medium mb-2">{s.group}</p>
                  <p className="text-[15px] leading-relaxed text-muted">{s.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Tools */}
          <motion.section custom={4} variants={item} className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-line">
            <div className="md:col-span-3"><Label>Tools</Label></div>
            <ul className="md:col-span-9 flex flex-wrap gap-2">
              {cv.tools.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1.5 text-sm">{t}</li>
              ))}
            </ul>
          </motion.section>

          {/* Education + certifications */}
          <motion.section custom={5} variants={item} className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-line">
            <div className="md:col-span-3"><Label>Education</Label></div>
            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-10">
              <ul className="space-y-6">
                {cv.education.map((ed) => (
                  <li key={ed.title}>
                    <p className="font-medium leading-snug">{ed.title}</p>
                    <p className="text-sm text-muted">{ed.place} · {ed.period}</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted mt-1">{ed.note}</p>
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted mb-4">Certifications</p>
                <ul className="space-y-3">
                  {cv.certifications.map((c) => (
                    <li key={c.title} className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
                      <span>
                        <span className="block text-[15px] leading-snug">{c.title}</span>
                        <span className="block text-sm text-muted">{c.place}</span>
                      </span>
                      <span className="shrink-0 text-xs text-muted tabular-nums">{c.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Contact + download */}
          <motion.section custom={6} variants={item} className="pt-10 md:pt-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-1 text-lg">
              <a href={`mailto:${site.email}`} className="block hover:text-accent transition-colors">{site.email}</a>
              {linkedin && (
                <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="block text-muted hover:text-ink transition-colors">
                  LinkedIn ↗
                </a>
              )}
            </div>
            <a
              href={cv.pdf}
              download={cv.pdfName}
              className="inline-flex items-center gap-3 self-start rounded-full bg-ink text-paper px-6 py-3.5 text-xs uppercase tracking-[0.15em] transition-opacity hover:opacity-85"
            >
              <DownloadIcon />
              Download PDF
            </a>
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CVModal
