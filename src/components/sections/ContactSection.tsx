'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateIn, { easeOut } from '../AnimateIn'
import { site } from '@/data/site'

const ContactSection = () => {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section id="contact" className="px-6 md:px-12 py-24 md:py-32 lg:py-40 bg-paper-2 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <AnimateIn>
          <p className="text-xs uppercase tracking-[0.15em] text-muted mb-8">Contact</p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h2 className="text-[13vw] md:text-[8vw] xl:text-[7.5rem] font-medium tracking-[-0.03em] leading-[0.95]">
            Let&apos;s work
            <br />
            <span className="md:pl-[12%]">together.</span>
          </h2>
        </AnimateIn>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-12">
          <AnimateIn delay={0.15} className="md:col-span-7">
            <p className="text-lg text-muted max-w-md leading-relaxed mb-8">
              Have a project in mind, a collaboration or just want to say hello? Drop me a line.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group relative inline-block text-2xl sm:text-3xl md:text-5xl font-medium tracking-[-0.02em] break-all"
            >
              {site.email}
              <span className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </a>
            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={copyEmail}
                className="relative overflow-hidden rounded-full border border-ink px-5 py-3 text-xs uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-ink hover:text-paper cursor-pointer"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'copied' : 'copy'}
                    className="block"
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                  >
                    {copied ? 'Copied ✓' : 'Copy email'}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span className="sr-only" aria-live="polite">{copied ? 'Email copied to clipboard' : ''}</span>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.25} className="md:col-span-4 md:col-start-9 space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-4">Elsewhere</p>
              <ul>
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-t border-line py-4 text-lg"
                    >
                      {s.label}
                      <span className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-4">Based in</p>
              <p className="text-lg">{site.location}</p>
              <p className="text-sm text-muted mt-1">Working worldwide</p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
