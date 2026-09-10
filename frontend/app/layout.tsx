import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "../components/layout/HeaderWrapper";
import FooterWrapper from "../components/layout/FooterWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// NOTE: Baloo_2 (--font-celebration) is declared in app/(app)/layout.tsx, not
// here. It is used only by Celebration Engine scenes and the quests page, all
// of which live inside that group — loading it at the root meant serving three
// weights on /, /blog, /terms and /login, where a celebration cannot render.

export const viewport: Viewport = {
  themeColor: '#3D5AFE',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  // ── Base URL (required for Next.js to resolve relative OG/canonical URLs) ──
  metadataBase: new URL('https://teyro.app'),

  // ── Primary SEO ──
  title: 'Teyro. Personalize learning for everyone',
  description:
    'Teyro is an AI-personalized learning platform designed to help you learn effectively and achieve better results.',

  // ── Keywords ──
  keywords: [
    // Core brand
    'Teyro', 'Teyro.app', 'Teyro learning platform', 'Teyro online learning',
    'Teyro platform', 'Teyro app', 'what is Teyro', 'Teyro learning', 'Teyro edtech',
    // Core product
    'online learning platform', 'skill learning platform', 'learn skills online',
    'edtech platform', 'AI learning platform', 'project-based learning platform',
    // Problem-based (high conversion)
    'online learning not working', 'why online courses fail', 'low course completion rates',
    'tired of online courses', 'ineffective online learning', 'problems with Udemy courses',
    'online learning frustration', 'boring online courses', 'outdated online courses',
    // Outcome-based
    'learn skills faster', 'build real skills', 'job-ready skills online',
    'project-based learning', 'learn by doing', 'practical skill learning',
    'structured learning programs', 'stay consistent learning',
    'skill development platform', 'mentorship learning platform',
    // AI + Modern learning
    'AI-powered learning', 'AI learning assistant', 'personalized learning platform',
    'adaptive learning system', 'smart learning platform', 'AI education platform',
    // Waitlist / pre-launch
    'Teyro waitlist', 'Teyro.app waitlist', 'join Teyro early', 'Teyro early access',
    'join learning platform waitlist', 'early access learning platform',
    'upcoming edtech platform', 'new online learning platform',
    'beta access learning app', 'sign up for early access learning platform',
    // Comparison / positioning
    'Duolingo for learning skills', 'Duolingo for coding', 'Duolingo for skill learning',
    'Duolingo for professional skills', 'Duolingo but for skills',
    'platform like Duolingo for skills', 'gamified learning platform for skills',
    'interactive learning like Duolingo', 'skill learning app like Duolingo',
    'Duolingo-style learning for skills', 'gamified skill learning platform',
    'interactive project-based learning platform', 'learn skills like Duolingo',
    'daily skill learning app', 'habit-based learning platform',
    'consistent learning system', 'skill learning with streaks',
    // Alternative platform comparison
    'better than Udemy', 'Coursera alternative', 'platforms like Udemy but better',
    'modern alternative to Coursera', 'interactive learning vs Udemy',
    'project-based learning vs Coursera',
    // Long-tail high-intent
    'best platform to learn skills online', 'how to learn skills faster online',
    'platforms better than Udemy', 'project-based learning platforms online',
    'how to stay consistent learning online', 'online learning with mentorship',
    'platforms that help you build real skills',
    'is there a Duolingo for learning skills', 'apps like Duolingo for coding or skills',
    'how to learn skills daily like Duolingo', 'best gamified learning platforms for skills',
    'how to stay consistent learning online', 'platforms that help you build skills not just watch',
  ],

  // ── Open Graph (social sharing) ──
  openGraph: {
    type: 'website',
    url: 'https://teyro.app',
    siteName: 'Teyro',
    title: 'Teyro. Personalize learning for everyone',
    description:
      'Teyro is an AI-personalized learning platform designed to help you learn effectively and achieve better results.',
    locale: 'en_US',
    images: [
      {
        url: '/teyro-og.png',
        width: 1200,
        height: 630,
        alt: 'Teyro. Personalize learning for everyone',
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: 'summary_large_image',
    site: '@teyroapp',
    title: 'Teyro. Personalize learning for everyone',
    description:
      'Teyro is an AI-personalized learning platform designed to help you learn effectively and achieve better results.',
    images: ['/teyro-og.png'],
  },

  // ── Canonical + Robots ──
  alternates: {
    canonical: 'https://teyro.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': 160,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/Icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Teyro',
  },
  manifest: '/manifest.webmanifest',
};


import { SWRProvider } from "../components/providers/SWRProvider";
import { ServiceWorkerRegistrar } from "../components/providers/ServiceWorkerRegistrar";
import { TeyPushNavigation } from "../components/providers/TeyPushProvider";
import { CartProvider } from "../context/CartContext";
import { PostHogProvider } from "../components/PostHogProvider";

/**
 * Root layout — deliberately light.
 *
 * The entire authenticated student runtime (Gamification, Celebration, Herald,
 * Streak, ShopEngine, RewardAnimation, Audio, the four watchers and the two
 * engines) used to live here, which meant every visitor to the landing page,
 * the blog and the legal pages downloaded and booted it, and fired a handful of
 * authenticated requests that could only ever 401. It now lives in
 * app/(app)/layout.tsx, scoped to the routes that actually consume it.
 *
 * What stays here, and why:
 *  - ServiceWorkerRegistrar — PWA install has to work from the landing page.
 *  - SWRProvider — small, and NotificationBell/AdminUI need it outside (app).
 *  - CartProvider — Header and CourseCard call useCart, which THROWS without a
 *    provider, and both render on public routes.
 *  - PostHogProvider — removing it from marketing would delete the top of the
 *    acquisition funnel.
 *  - TeyPushNavigation — a notification tap must route from whatever page the
 *    learner happens to have open. Its authenticated other half (TeyPushSync)
 *    moved into (app).
 *  - HeaderWrapper / FooterWrapper — these already switch on pathname and
 *    render the right chrome (or none) per route; leaving them here keeps that
 *    behaviour byte-identical rather than re-deriving it per group.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ServiceWorkerRegistrar />
        <TeyPushNavigation />
        <SWRProvider>
          <PostHogProvider>
            <CartProvider>
              <HeaderWrapper />
              <main className="flex-1" style={{ overflow: 'visible' }}>
                {children}
              </main>
              <FooterWrapper />
            </CartProvider>
          </PostHogProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
