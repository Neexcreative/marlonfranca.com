'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { site } from '@/data/site'
import { easeOut } from './AnimateIn'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
      className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between transition-colors duration-500 ${
        scrolled ? 'backdrop-blur-md bg-paper/75 border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Link href="/" aria-label={`${site.name}, home`} className="whitespace-nowrap text-xs md:text-base font-medium tracking-[0.1em] md:tracking-[0.15em] uppercase">
        <span className="max-[400px]:hidden">{site.name}</span>
        <span className="hidden max-[400px]:inline" aria-hidden>MF</span>
      </Link>

      <ul className="flex items-center gap-4 md:gap-10">
        {site.nav.map((link) => {
          const active = link.href === '/about' && pathname === '/about'
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group relative text-[11px] md:text-sm uppercase tracking-[0.12em] md:tracking-[0.15em]"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-out ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}

export default Navbar
