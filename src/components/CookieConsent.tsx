'use client'
import { useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GoogleAnalytics } from '@next/third-parties/google'
import { easeOut } from './AnimateIn'

// GDPR: Google Analytics only loads after the visitor accepts.
// The choice is stored per browser; "Cookie settings" in the footer reopens the banner.
type Consent = 'granted' | 'denied' | null

const KEY = 'cookie-consent'
const EVENT = 'cookie-consent-change'

const read = (): Consent => {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

const save = (value: Consent) => {
  try {
    if (value) localStorage.setItem(KEY, value)
    else localStorage.removeItem(KEY)
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

/** Reopens the banner (used by the footer link) */
export const openCookieSettings = () => save(null)

// 'unset' on the server so nothing renders until the browser's choice is known
const getServerSnapshot = () => 'unset' as const

const CookieConsent = ({ gaId }: { gaId?: string }) => {
  const consent = useSyncExternalStore(subscribe, read, getServerSnapshot)

  return (
    <>
      {consent === 'granted' && gaId && <GoogleAnalytics gaId={gaId} />}

      <AnimatePresence>
        {consent === null && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie preferences"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="fixed inset-x-3 bottom-3 md:inset-x-auto md:left-6 md:bottom-6 z-[60] md:max-w-md rounded-2xl border border-line bg-paper/90 backdrop-blur-md p-5 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-muted mb-2">Cookies</p>
            <p className="text-sm leading-relaxed">
              I use Google Analytics to understand how visitors use this site, anonymously and only with your
              consent. No ads, no selling of data.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => save('granted')}
                className="flex-1 rounded-full bg-ink text-paper px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-opacity hover:opacity-85 cursor-pointer"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => save('denied')}
                className="flex-1 rounded-full border border-ink px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-ink hover:text-paper cursor-pointer"
              >
                Decline
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CookieConsent
