'use client'
import { openCookieSettings } from './CookieConsent'

const CookieSettingsButton = () => (
  <button type="button" onClick={openCookieSettings} className="hover:text-[#f5f5f0] transition-colors cursor-pointer">
    Cookie settings
  </button>
)

export default CookieSettingsButton
