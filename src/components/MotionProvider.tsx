'use client'
import { MotionConfig } from 'framer-motion'
import { ReactNode } from 'react'

// Respects the visitor's "reduce motion" OS setting across every animation
const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
)

export default MotionProvider
