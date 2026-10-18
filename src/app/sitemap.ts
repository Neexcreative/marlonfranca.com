import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { MetadataRoute } from 'next'
import { site } from '@/data/site'
import { projects } from '@/data/projects'

// Only real, indexable pages that return 200. Project popups have no URL of their own,
// and /llms.txt, icons and the OG image are not pages, so none of them are listed.
// Add a route here only when its page.tsx exists.
const pages = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.8 },
] as const

const isImage = (src?: string): src is string => !!src && /\.(jpe?g|png|webp|avif)$/i.test(src)

// Skip paths typed in projects.ts whose file isn't in /public yet (would 404)
const existsInPublic = (src: string) => existsSync(join(process.cwd(), 'public', src))

export default function sitemap(): MetadataRoute.Sitemap {
  // Project covers/stills help Google Images index the work
  const images = projects
    .flatMap((p) => [p.cover, p.poster, ...(p.images ?? []).map((i) => (typeof i === 'string' ? i : i.src))])
    .filter(isImage)
    .filter(existsInPublic)
    .map((src) => `${site.url}${src}`)

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: site.updated,
    changeFrequency,
    priority,
    ...(path === '' && images.length && { images }),
  }))
}
