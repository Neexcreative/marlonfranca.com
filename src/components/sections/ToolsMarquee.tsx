'use client'
import { motion } from 'framer-motion'
import AnimateIn from '../AnimateIn'

// Software I use. `logo` = SVG in /public/logos. Logos render in greyscale
// and show their own colours on hover; an entry without `logo` shows the name only.
// Single-colour (black) logos are inverted to white in dark mode; coloured ones stay as-is.
const colouredLogos = ['adobe', 'photoshop', 'illustrator', 'indesign', 'aftereffects', 'microsoft', 'vscode']
const isColoured = (logo: string) => colouredLogos.some((name) => logo.endsWith(`/${name}.svg`))
const tools: { name: string; logo?: string }[] = [
  { name: 'Photoshop', logo: '/logos/photoshop.svg' },
  { name: 'Illustrator', logo: '/logos/illustrator.svg' },
  { name: 'InDesign', logo: '/logos/indesign.svg' },
  { name: 'Premiere Pro', logo: '/logos/adobe.svg' },
  { name: 'After Effects', logo: '/logos/aftereffects.svg' },
  { name: 'Figma', logo: '/logos/figma.svg' },
  { name: 'Cinema 4D', logo: '/logos/cinema4d.svg' },
  { name: 'Blender', logo: '/logos/blender.svg' },
  { name: 'DaVinci Resolve', logo: '/logos/davinciresolve.svg' },
  { name: 'Vectorworks', logo: '/logos/vectorworks.svg' },
  { name: 'Google Web Designer', logo: '/logos/google.svg' },
  { name: 'Webflow', logo: '/logos/webflow.svg' },
  { name: 'Framer', logo: '/logos/framer.svg' },
  { name: 'Next.js', logo: '/logos/nextdotjs.svg' },
  { name: 'Vercel', logo: '/logos/vercel.svg' },
  { name: 'GitHub', logo: '/logos/github.svg' },
  { name: 'VS Code', logo: '/logos/vscode.svg' },
  { name: 'Claude', logo: '/logos/claude.svg' },
  { name: 'OpenAI', logo: '/logos/openai.svg' },
  { name: 'Microsoft 365', logo: '/logos/microsoft.svg' },
  { name: 'OBS Studio', logo: '/logos/obsstudio.svg' },
]

const ToolsMarquee = () => {
  const row = [...tools, ...tools]

  return (
    <section className="pb-24 md:pb-32" aria-labelledby="tools-title">
      <AnimateIn className="px-6 md:px-12 max-w-[90rem] mx-auto mb-8">
        <p id="tools-title" className="text-xs uppercase tracking-[0.15em] text-muted">
          Tools I work with
        </p>
      </AnimateIn>

      {/* Full list for screen readers; the moving row is decorative */}
      <ul className="sr-only">
        {tools.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>

      <div
        className="relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-hidden
      >
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((t, i) => (
            <span key={i} className="group flex shrink-0 items-center gap-3 px-8 md:px-12 text-ink/70 transition-colors hover:text-ink">
              {t.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.logo} alt="" width={26} height={26} className={`h-6 w-6 md:h-7 md:w-7 object-contain grayscale opacity-70 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100 ${isColoured(t.logo) ? '' : 'dark:invert'}`} />
              )}
              <span className="whitespace-nowrap text-lg md:text-2xl tracking-tight">{t.name}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ToolsMarquee
