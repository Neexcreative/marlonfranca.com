'use client'
import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

// The theme lives on <html data-theme>, set before paint by the script in layout.tsx.
// Colours and positions use `dark:` CSS so the switch is correct on the very first frame;
// React state is only needed for the accessible label.
const subscribe = (cb: () => void) => {
  const observer = new MutationObserver(cb)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

const ease = 'duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]'

const stars = [
  { left: '14%', top: '18%', size: 2 },
  { left: '24%', top: '42%', size: 1.5 },
  { left: '33%', top: '16%', size: 1.5 },
  { left: '40%', top: '46%', size: 2 },
  { left: '48%', top: '24%', size: 1.5 },
]

const ThemeToggle = () => {
  const dark = useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme) === 'dark'

  const toggle = () => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      className="relative h-7 w-14 md:h-8 md:w-16 shrink-0 cursor-pointer overflow-hidden rounded-full bg-[#8ec5e6] dark:bg-[#3b3e44] shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)] transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {/* Stars (night only) */}
      {stars.map((st, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute rounded-full bg-white opacity-0 scale-0 dark:opacity-90 dark:scale-100 transition-all duration-300"
          style={{ left: st.left, top: st.top, width: st.size, height: st.size, transitionDelay: `${150 + i * 50}ms` }}
        />
      ))}

      {/* Clouds: bottom right by day, bottom left at night */}
      <span
        aria-hidden
        className={`absolute bottom-[-30%] h-full w-[70%] left-[44%] dark:left-[-18%] dark:translate-y-[18%] transition-all ${ease}`}
      >
        <span className="absolute bottom-0 left-[10%] h-[70%] w-[45%] rounded-full bg-white/70" />
        <span className="absolute bottom-0 left-[35%] h-[95%] w-[50%] rounded-full bg-white/70" />
        <span className="absolute bottom-[-20%] left-0 h-[65%] w-full rounded-full bg-white" />
        <span className="absolute bottom-[-10%] left-[25%] h-[80%] w-[45%] rounded-full bg-white" />
      </span>

      {/* Sun / moon knob: 37.5% of the track width, so 6% → 56.5% keeps equal side gaps */}
      <span
        aria-hidden
        className={`absolute top-[12.5%] h-[75%] aspect-square rounded-full left-[6%] dark:left-[56.5%] bg-[#f5c842] dark:bg-[#d4d4d4] shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all ${ease}`}
      >
        {/* Moon craters */}
        <span className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300 delay-150">
          <span className="absolute left-[22%] top-[25%] h-[22%] w-[22%] rounded-full bg-[#b5b5b5]" />
          <span className="absolute left-[55%] top-[52%] h-[18%] w-[18%] rounded-full bg-[#b5b5b5]" />
          <span className="absolute left-[30%] top-[62%] h-[12%] w-[12%] rounded-full bg-[#b5b5b5]" />
        </span>
      </span>
    </button>
  )
}

export default ThemeToggle
