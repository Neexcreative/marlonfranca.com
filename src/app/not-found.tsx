import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="min-h-svh flex flex-col justify-end px-6 md:px-12 pt-32 pb-16">
      <div className="max-w-7xl w-full mx-auto">
        <p className="text-xs uppercase tracking-[0.15em] text-muted mb-6">Error 404</p>
        <h1 className="text-[22vw] md:text-[14rem] font-medium uppercase leading-[0.85] tracking-[-0.04em]">Lost?</h1>
        <p className="mt-10 max-w-md text-lg text-muted">This page doesn&apos;t exist or has moved.</p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-4 text-xs uppercase tracking-[0.15em]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
            ←
          </span>
          Back to the work
        </Link>
      </div>
    </section>
  )
}
