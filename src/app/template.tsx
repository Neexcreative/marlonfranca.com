'use client'
import { motion } from 'framer-motion'
import { easeOut } from '@/components/AnimateIn'

// Soft fade between pages
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: easeOut }}>
      {children}
    </motion.div>
  )
}
