import type { Metadata } from "next";
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

export const metadata: Metadata = {
  // ── Base URL (required for Next.js to resolve relative OG/canonical URLs) ──
  metadataBase: new URL('https://teyro.app'),

  // ── Primary SEO ──
  title: 'Teyro — Duolingo for learning skills online',
  description:
    'Teyro is a next-generation online learning platform that helps you learn skills faster through project-based learning, AI guidance, mentorship, and real-world practice. Build real skills, stay consistent, and achieve results.',

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
    title: 'Teyro — Duolingo for learning skills online',
    description:
      'Teyro is a next-generation online learning platform that helps you learn skills faster through project-based learning, AI guidance, mentorship, and real-world practice.',
    locale: 'en_US',
    images: [
      {
        url: '/teyro-og.png',
        width: 1200,
        height: 630,
        alt: 'Teyro — Duolingo for learning skills online',
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: 'summary_large_image',
    site: '@teyroapp',
    title: 'Teyro — Duolingo for learning skills online',
    description:
      'Next-generation learning platform. Build real skills, stay consistent, achieve results.',
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
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};


const fontAwesomeLink = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';

import { CartProvider } from "../context/CartContext";
import { PostHogProvider } from "../components/PostHogProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href={fontAwesomeLink} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PostHogProvider>
          <CartProvider>
            <HeaderWrapper />
            <main className="flex-1" style={{ overflow: 'visible' }}>
              {children}
            </main>
            <FooterWrapper />
          </CartProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
