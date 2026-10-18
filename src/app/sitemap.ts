import type { MetadataRoute } from 'next'
import { site } from '@/data/site'
import { projects } from '@/data/projects'

const isImage = (src?: string) => !!src && /\.(jpe?g|png|webp|avif)$/i.test(src)

export default function sitemap(): MetadataRoute.Sitemap {
  // Project covers/stills help Google Images index the work
  const images = projects
    .flatMap((p) => [p.cover, p.poster, ...(p.images ?? [])])
    .filter(isImage)
    .map((src) => `${site.url}${src}`)

  return [
    {
      url: site.url,
      lastModified: site.updated,
      changeFrequency: 'monthly',
      priority: 1,
      ...(images.length && { images }),
    },
    {
      url: `${site.url}/about`,
      lastModified: site.updated,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]
}
