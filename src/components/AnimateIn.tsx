'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface AnimateInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export const ease = [0.25, 0.1, 0.25, 1] as const
export const easeOut = [0.16, 1, 0.3, 1] as const

const AnimateIn = ({ children, delay = 0, className = '' }: AnimateInProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateIn
