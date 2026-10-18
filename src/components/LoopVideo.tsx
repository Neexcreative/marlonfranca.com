'use client'
import { useEffect, useRef } from 'react'

interface LoopVideoProps {
  src: string
  poster?: string
  label: string
  className?: string
}

// Muted looping video that only plays while on screen (saves CPU/battery)
// and stays paused for visitors who prefer reduced motion.
const LoopVideo = ({ src, poster, label, className = '' }: LoopVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
    >
      <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
    </video>
  )
}

export default LoopVideo
