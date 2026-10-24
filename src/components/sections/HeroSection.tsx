'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RevealText from '../RevealText'
import { easeOut } from '../AnimateIn'

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: easeOut },
  })

  return (
    <section ref={ref} className="relative flex flex-col px-6 md:px-12 pt-28 md:pt-36 pb-10 md:pb-14 overflow-hidden">
      <motion.div style={{ y, opacity }} className="max-w-7xl w-full mx-auto">
        <RevealText
          lines={['Marlon', 'França']}
          delay={0.35}
          className="font-medium uppercase leading-[0.86] tracking-[-0.03em] text-[19vw] md:text-[15vw] xl:text-[13.5rem]"
          lineClassNames={['', 'md:pl-[18%]']}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.p {...fade(0.9)} className="md:col-span-5 md:col-start-6 text-lg md:text-xl leading-relaxed text-ink">
            Designer working across brand identity, digital, motion and print,
            building visual systems that feel considered and alive.
          </motion.p>

          <motion.div {...fade(1.05)} className="md:col-span-3 md:col-start-11 flex md:flex-col md:items-end justify-between gap-4 text-xs uppercase tracking-[0.15em]">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for projects
            </span>
            <a href="#work" className="text-muted hover:text-ink transition-colors">
              Scroll ↓
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
