'use client'
import { useEffect, RefObject } from 'react'

// Shared popup behaviour: scroll lock, Esc to close, focus trap, initial focus on close button
export const useModal = (
  panelRef: RefObject<HTMLElement | null>,
  closeRef: RefObject<HTMLElement | null>,
  onClose: () => void
) => {
  useEffect(() => {
    const { body, documentElement } = document
    const scrollbar = window.innerWidth - documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollbar}px`
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>('button, a[href]')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      window.removeEventListener('keydown', onKey)
    }
  }, [panelRef, closeRef, onClose])
}
