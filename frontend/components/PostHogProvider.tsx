'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && posthog.__loaded) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', { '$current_url': url })
    }
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !posthog.__loaded) {
      const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      if (key) {
        const isDev = process.env.NODE_ENV === 'development';
        posthog.init(key, {
          // In development, send directly from client to prevent Next.js dev server ETIMEDOUT proxy logs
          api_host: isDev ? (process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com') : '/ingest',
          ui_host: 'https://app.posthog.com',
          capture_pageview: false,
          capture_pageleave: !isDev,
          autocapture: !isDev,
          disable_session_recording: isDev,
        });
      }
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PHProvider>
  )
}
