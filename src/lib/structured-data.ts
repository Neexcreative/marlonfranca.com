// schema.org JSON-LD for Google rich results and AI crawlers.
// Validate at https://search.google.com/test/rich-results after deploy.
import { site, profiles, disciplines } from '@/data/site'
import { projects } from '@/data/projects'

const personId = `${site.url}/#person`
const websiteId = `${site.url}/#website`

const person = {
  '@type': 'Person',
  '@id': personId,
  name: site.name,
  jobTitle: site.jobTitle,
  url: site.url,
  email: `mailto:${site.email}`,
  image: `${site.url}/opengraph-image`,
  description: site.description,
  knowsAbout: disciplines,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressCountry: site.countryCode,
  },
  ...(profiles.length && { sameAs: profiles }),
}

/** Site-wide graph: who the site is about + the website itself */
export const siteGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    person,
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: 'en',
      publisher: { '@id': personId },
    },
  ],
})

/** Home page: portfolio collection listing every project */
export const homeGraph = () => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${site.url}/#work`,
  url: site.url,
  name: `${site.name} — Selected Work`,
  isPartOf: { '@id': websiteId },
  about: { '@id': personId },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.title,
        description: p.summary,
        genre: p.category,
        dateCreated: String(p.year),
        keywords: p.services.join(', '),
        creator: { '@id': personId },
        ...(p.cover && !/\.(mp4|webm)$/i.test(p.cover) && { image: `${site.url}${p.cover}` }),
        ...(p.cover && /\.(mp4|webm)$/i.test(p.cover) && {
          video: {
            '@type': 'VideoObject',
            name: p.title,
            description: p.summary,
            contentUrl: `${site.url}${p.cover}`,
            ...(p.poster && { thumbnailUrl: `${site.url}${p.poster}` }),
            uploadDate: `${p.year}-01-01`,
          },
        }),
      },
    })),
  },
})

/** About page: profile page centred on the person */
export const aboutGraph = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${site.url}/about`,
  name: `About ${site.name}`,
  isPartOf: { '@id': websiteId },
  mainEntity: { '@id': personId },
})
