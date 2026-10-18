'use client'
import { useCallback, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import CVModal, { DownloadIcon } from '../CVModal'
import { cv } from '@/data/cv'

const noop = () => () => {}

// About page box: a miniature CV "sheet" that opens the full CV popup
const CVPreview = () => {
  const [open, setOpen] = useState(false)
  // true only after hydration, so the portal never mismatches the server HTML
  const mounted = useSyncExternalStore(noop, () => true, () => false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <>
      <div className="rounded-2xl border border-line bg-paper-2 p-4 md:p-5">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="group block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink rounded-xl"
          aria-label="Open CV"
        >
          {/* Mini sheet */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper border border-line p-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
            <p className="text-lg font-medium tracking-tight leading-tight">{cv.name}</p>
            <p className="text-xs text-muted">{cv.headline}</p>
            <div className="mt-4 space-y-3" aria-hidden>
              {cv.experience.slice(0, 3).map((e) => (
                <div key={e.company + e.period}>
                  <p className="text-[11px] font-medium leading-tight">{e.role}</p>
                  <p className="text-[10px] text-muted leading-tight">{e.company} · {e.period}</p>
                  <div className="mt-1.5 space-y-1">
                    <span className="block h-1 w-[92%] rounded-full bg-line" />
                    <span className="block h-1 w-[78%] rounded-full bg-line" />
                  </div>
                </div>
              ))}
            </div>
            {/* Fade out the bottom of the sheet */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-paper to-transparent" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink text-paper px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition-transform duration-500 group-hover:scale-105">
              View CV
            </span>
          </div>
        </button>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted">Curriculum Vitae</p>
            <p className="text-sm mt-1">6+ years · Brand, Motion, Web & 3D</p>
          </div>
          <a
            href={cv.pdf}
            download={cv.pdfName}
            aria-label="Download CV as PDF"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <DownloadIcon />
          </a>
        </div>
      </div>

      {/* Portal to <body> so animated (transformed) ancestors can't offset the fixed popup */}
      {mounted &&
        createPortal(<AnimatePresence>{open && <CVModal key="cv" onClose={close} />}</AnimatePresence>, document.body)}
    </>
  )
}

export default CVPreview
