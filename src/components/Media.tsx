import Image from 'next/image'
import LoopVideo from './LoopVideo'

interface MediaProps {
  /** Image (.jpg/.png/.webp/.avif) or video (.mp4/.webm) path from /public */
  src?: string
  /** Still frame shown before a video loads */
  poster?: string
  alt: string
  tone?: string
  label?: string
  className?: string
  sizes?: string
  priority?: boolean
  /** Keep a native ratio (e.g. "3985/1001"), overriding any aspect class */
  aspect?: string
}

export const isVideo = (src?: string) => !!src && /\.(mp4|webm)$/i.test(src)

// Shows the real image or video when `src` exists, otherwise a toned placeholder
const Media = ({ src, poster, alt, tone = '#dcd8d0', label, className = '', sizes = '100vw', priority, aspect }: MediaProps) => (
  <div
    className={`relative overflow-hidden ${className}`}
    style={{ backgroundColor: tone, ...(aspect && { aspectRatio: aspect }) }}
  >
    {isVideo(src) ? (
      <LoopVideo src={src!} poster={poster} label={alt} />
    ) : src ? (
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    ) : (
      <div className="absolute inset-0 flex items-end justify-between p-4 md:p-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-current opacity-40">{label ?? 'Image'}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-current opacity-40">Placeholder</span>
      </div>
    )}
  </div>
)

export default Media
