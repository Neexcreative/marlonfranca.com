import type { Metadata } from 'next'
import RevealText from '@/components/RevealText'
import AnimateIn from '@/components/AnimateIn'
import Media from '@/components/Media'
import ContactSection from '@/components/sections/ContactSection'
import JsonLd from '@/components/JsonLd'
import { aboutGraph } from '@/lib/structured-data'
import { site } from '@/data/site'

const title = 'About & Contact'
const description = `About ${site.name}, a ${site.city}-based designer working across brand strategy, websites, 3D, photo & video, large print and multimedia. Get in touch.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: '/about',
    siteName: site.name,
    locale: 'en_IE',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${site.name}`,
    description,
  },
}

// Placeholder content — replace with real bio, experience and clients
const experience = [
  { years: '2024 / Now', role: 'Founder & Creative Director', place: 'Neex Creative, Dublin' },
  { years: '2021 / 2024', role: 'Senior Designer', place: 'Studio Name' },
  { years: '2019 / 2021', role: 'Graphic Designer', place: 'Agency Name' },
]

const clients = ['Client One', 'Client Two', 'Client Three', 'Client Four', 'Client Five', 'Client Six', 'Client Seven', 'Client Eight']

const coreAreas = [
  'Visual Design',
  'Brand Design',
  'Digital Design',
  'Motion Graphics',
  'Web Design',
  'Presentation Design',
  '3D Visualisation',
  'Figma',
  'Adobe Creative Cloud',
  'AI-assisted Workflows',
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutGraph()} />
      {/* Intro */}
      <section className="px-6 md:px-12 pt-36 md:pt-48 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <p className="text-xs uppercase tracking-[0.15em] text-muted mb-8">About</p>
          </AnimateIn>
          <RevealText
            lines={['Design that', 'feels considered', 'and alive.']}
            delay={0.2}
            className="font-medium tracking-[-0.03em] leading-[0.95] text-[13vw] md:text-[8vw] xl:text-[7.5rem]"
            lineClassNames={['', 'md:pl-[12%]', '']}
          />
        </div>
      </section>

      {/* Portrait + bio */}
      <section className="px-6 md:px-12 pb-24 md:pb-32 lg:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          <AnimateIn className="md:col-span-5">
            <Media src="/images/portrait.jpg" alt="Portrait of Marlon França" label="Portrait" tone="#d8d2c7" className="aspect-[4/5]" />
          </AnimateIn>
          <div className="md:col-span-6 md:col-start-7 md:pt-24 space-y-6">
            <AnimateIn delay={0.1}>
              <p className="text-2xl md:text-3xl font-medium tracking-[-0.01em] leading-snug">
                I&apos;m Marlon França, a multidisciplinary digital designer based in Dublin, working across brand,
                motion, web and visual systems.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-lg leading-relaxed text-muted">
                With 6+ years of experience, I turn briefs into clear visual directions and production-ready work:
                campaigns, visual identities, websites, branded presentations, social content, corporate events,
                motion graphics and 3D environments. Creative thinking meets hands-on delivery, with a strong eye for
                layout, typography, storytelling and final execution.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <p className="text-lg leading-relaxed text-muted">
                Today I&apos;m growing further into digital, brand, motion and product-minded design, ideally as part
                of larger remote or remote-friendly creative teams.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.4}>
              <ul className="flex flex-wrap gap-2 pt-2" aria-label="Core areas">
                {coreAreas.map((a) => (
                  <li key={a} className="rounded-full border border-line px-3 py-1.5 text-xs uppercase tracking-[0.12em]">
                    {a}
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Experience + clients */}
      <section className="px-6 md:px-12 pb-24 md:pb-32 lg:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          <div className="md:col-span-7">
            <AnimateIn>
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-8">Experience</p>
            </AnimateIn>
            {experience.map((e, i) => (
              <AnimateIn key={e.years} delay={i * 0.08}>
                <div className="grid grid-cols-12 gap-4 border-t border-line py-5">
                  <span className="col-span-12 sm:col-span-4 text-sm text-muted tabular-nums">{e.years}</span>
                  <span className="col-span-12 sm:col-span-8">
                    <span className="block text-lg font-medium">{e.role}</span>
                    <span className="block text-sm text-muted">{e.place}</span>
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <AnimateIn>
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-8">Selected clients</p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <ul className="grid grid-cols-2 gap-x-6">
                {clients.map((c) => (
                  <li key={c} className="border-t border-line py-3 text-sm">
                    {c}
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
