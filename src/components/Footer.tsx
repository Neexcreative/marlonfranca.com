import Link from 'next/link'
import { site } from '@/data/site'
import CookieSettingsButton from './CookieSettingsButton'

const Footer = () => (
  <footer className="border-t border-[#1f1f1f] bg-night px-6 py-16 md:px-12 text-[#f5f5f0]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Brand */}
      <div>
        <p className="font-medium tracking-widest uppercase text-sm mb-3">{site.name}</p>
        <p className="text-[#8a8a85] text-sm leading-relaxed max-w-xs">
          Designer working across brand, digital, motion and print.
        </p>
      </div>

      {/* Navigation */}
      <div>
        <p className="text-[#8a8a85] uppercase text-xs tracking-[0.15em] mb-4">Navigation</p>
        <ul className="space-y-2">
          {[{ label: 'Home', href: '/' }, ...site.nav].map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="text-sm hover:text-accent transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <p className="text-[#8a8a85] uppercase text-xs tracking-[0.15em] mb-4">Contact</p>
        <ul className="space-y-2 text-sm">
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-accent transition-colors">
              {site.email}
            </a>
          </li>
          <li>{site.location}</li>
          <li className="pt-2 flex flex-wrap gap-4">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8a8a85] hover:text-[#f5f5f0] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1f1f1f] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <p className="text-[#8a8a85] text-xs tracking-[0.1em] uppercase">
        © {site.year} {site.name}. All rights reserved.
      </p>
      <div className="flex items-center gap-6 text-[#8a8a85] text-xs">
        <CookieSettingsButton />
        <p>Designed &amp; built by {site.name}</p>
      </div>
    </div>
  </footer>
)

export default Footer
