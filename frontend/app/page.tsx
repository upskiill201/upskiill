/**
 * Teyro homepage — the page that turns new traffic into learners.
 *
 * Coddy's structure (hero with the app, tracks, alternating feature rows,
 * who it's for, creators, FAQ, final CTA) in Duolingo's chunky style. Every
 * visual is drawn from the rebuilt app and shows someone succeeding with it:
 * a 128-day streak, #1 in the league, a correct answer, today's quests done.
 *
 * Positioning: Teyro helps people finish the real-world skills they start
 * (coding, AI, money, leadership, communication and more) by turning courses
 * into short daily lessons with streaks, leagues and friends that keep them
 * coming back.
 *
 * Section ids are the header's scroll targets (components/layout/
 * WaitlistHeader.tsx NAV_LINKS). Renaming one means renaming both.
 */

import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import {
  Audience,
  Certificates,
  Creators,
  Faq,
  Features,
  FinalCta,
  Hero,
  LaunchBadges,
  Tracks,
} from '@/components/homepage/v3/Sections';
import { LaunchSection } from '@/components/launch/LaunchSections';
import IntroVideo from '@/components/homepage/v3/IntroVideo';
import GetNotified from '@/components/homepage/v3/GetNotified';
import HomeCourses from '@/components/homepage/v3/HomeCourses';
import s from '@/components/homepage/v3/Home.module.css';

/**
 * Self-hosted for this route only; the same display face as the in-app
 * celebration screens (app/(app)/layout.tsx's --font-celebration).
 */
const baloo2 = Baloo_2({
  variable: '--font-celebration',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

// The courses section reads the live catalogue; refresh it every five minutes.
export const revalidate = 300;

const TITLE = 'Teyro — The fun and effective way to learn skills';
const DESCRIPTION =
  'Learn coding, AI, money, leadership, communication and more in short daily lessons, with streaks, leagues and friends that keep you going. Free to start.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://teyro.app/' },
  openGraph: { type: 'website', url: 'https://teyro.app/', siteName: 'Teyro', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', site: '@teyroapp', title: TITLE, description: DESCRIPTION },
};

export default function Home() {
  return (
    <main className={`${baloo2.variable} ${s.page}`}>
      {/* Reveal animations start at opacity 0 until JS runs; without JS, show everything. */}
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <Hero />
      <IntroVideo />
      <LaunchBadges />
      <LaunchSection />
      <Tracks />
      <HomeCourses />
      {/* StayRelevant ("Learn for the job market") and WhyItWorks ("Why Teyro works")
          are hidden for now (founder, 2026-10-18). The components stay in
          Sections.tsx; add them back here to bring them back. */}
      <Features />
      <Certificates />
      <Audience />
      <Creators />
      <Faq />
      <GetNotified />
      <FinalCta />
    </main>
  );
}
