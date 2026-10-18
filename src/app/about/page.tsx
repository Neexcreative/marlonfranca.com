import type { Metadata } from 'next'
import RevealText from '@/components/RevealText'
import AnimateIn from '@/components/AnimateIn'
import Media from '@/components/Media'
import ContactSection from '@/components/sections/ContactSection'
import JsonLd from '@/components/JsonLd'
import { aboutGraph } from '@/lib/structured-data'
import { disciplines, site } from '@/data/site'

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
            <Media alt="Portrait of Marlon França" label="Portrait" tone="#d8d2c7" className="aspect-[4/5]" />
          </AnimateIn>
          <div className="md:col-span-6 md:col-start-7 md:pt-24 space-y-6">
            <AnimateIn delay={0.1}>
              <p className="text-2xl md:text-3xl font-medium tracking-[-0.01em] leading-snug">
                I&apos;m Marlon França, a designer based in Dublin working across brand identity, web, motion and print.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-lg leading-relaxed text-muted">
                Placeholder bio: a few lines about your background, how you got into design and what drives
                your work. Mention the kind of clients and projects you enjoy most.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <p className="text-lg leading-relaxed text-muted">
                A second paragraph about process: how you approach a brief, collaborate with clients and turn
                ideas into complete visual systems.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="px-6 md:px-12 pb-24 md:pb-32 lg:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          <AnimateIn className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.15em] text-muted">What I do</p>
          </AnimateIn>
          <ul className="md:col-span-9">
            {disciplines.map((d, i) => (
              <li key={d} className="border-t border-line">
                <AnimateIn delay={i * 0.05} className="group flex items-baseline justify-between py-5 md:py-6">
                  <span className="text-3xl md:text-5xl font-medium tracking-[-0.02em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                    {d}
                  </span>
                  <span className="text-xs text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </AnimateIn>
              </li>
            ))}
          </ul>
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
