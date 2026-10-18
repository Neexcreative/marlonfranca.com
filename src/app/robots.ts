import type { MetadataRoute } from 'next'
import { site } from '@/data/site'

// Search engines and AI assistants are welcome — being cited by ChatGPT,
// Claude, Perplexity or Gemini is discovery for a portfolio.
// To block AI training crawlers, add e.g. { userAgent: 'GPTBot', disallow: '/' }.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
