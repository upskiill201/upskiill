'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { captureEvent, loadPostHogWhenIdle } from '@/lib/analytics'

/**
 * Manual pageview tracking (posthog is initialised with capture_pageview:false
 * because the App Router's client-side navigations do not trigger it).
 *
 * captureEvent queues until the library has loaded, so the very first pageview
 * is preserved even though the load is deferred to idle.
 */
function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return
    let url = window.origin + pathname
    if (searchParams && searchParams.toString()) {
      url = url + `?${searchParams.toString()}`
    }
    captureEvent('$pageview', { $current_url: url })
  }, [pathname, searchParams])

  return null
}

/**
 * PostHog, loaded off the critical path.
 *
 * This used to statically import posthog-js (~175KB raw) and posthog-js/react,
 * putting both in the initial chunk set of every route — the largest removable
 * payload on the marketing pages after React itself. It now loads during the
 * browser's first idle period via lib/analytics.
 *
 * The react context binding (PHProvider / usePostHog) is gone deliberately: it
 * was the reason the library had to be imported eagerly, and it had exactly one
 * consumer (app/join/page.tsx), which now calls the lib/analytics helpers
 * directly. Nothing is no longer tracked — autocapture, pageleave and session
 * recording all still initialise with the same options as before.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadPostHogWhenIdle()
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </>
  )
}
