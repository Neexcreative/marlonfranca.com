'use client'
import { motion } from 'framer-motion'
import { easeOut } from './AnimateIn'

interface RevealTextProps {
  lines: string[]
  className?: string
  /** One class string per line (e.g. to indent the second line) */
  lineClassNames?: string[]
  delay?: number
  as?: 'h1' | 'h2' | 'p'
}

// Masked line-by-line reveal for large editorial headings
const RevealText = ({ lines, className = '', lineClassNames = [], delay = 0, as = 'h1' }: RevealTextProps) => {
  const Tag = motion[as]

  return (
    <Tag className={className} initial="hidden" animate="visible" aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]" aria-hidden>
          <motion.span
            className={`block ${lineClassNames[i] ?? ''}`}
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: '0%',
                transition: { duration: 1.1, delay: delay + i * 0.12, ease: easeOut },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export default RevealText
