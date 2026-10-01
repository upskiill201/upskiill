/**
 * Teyro homepage — the page that turns new traffic into learners.
 *
 * Coddy's structure (hero with the app, tracks, alternating feature rows,
 * who it's for, creators, FAQ, final CTA) in Duolingo's chunky style. Every
 * visual is drawn from the rebuilt app and shows someone succeeding with it:
 * a 128-day streak, #1 in the league, a correct answer, today's quests done.
 *
 * Positioning: Teyro helps students and career switchers finish the coding
 * and AI skills they start, by turning courses into short daily habit-forming
 * lessons with streaks, leagues and friends that keep them coming back.
 *
 * Section ids are the header's scroll targets (components/layout/
 * WaitlistHeader.tsx NAV_LINKS). Renaming one means renaming both.
 */

import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import {
  Audience,
  Creators,
  Faq,
  Features,
  FinalCta,
  Hero,
  LaunchBadges,
  StayRelevant,
  Tracks,
  WhyItWorks,
} from '@/components/homepage/v3/Sections';
import { LaunchSection } from '@/components/launch/LaunchSections';
import IntroVideo from '@/components/homepage/v3/IntroVideo';
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

export const metadata: Metadata = {
  title: 'Teyro — the fun way to finish learning coding and AI',
  description:
    'Teyro helps students and career switchers finish the coding and AI skills they start, with short daily lessons, streaks, leagues and friends that keep you coming back.',
  alternates: { canonical: 'https://teyro.app/' },
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
      <StayRelevant />
      <WhyItWorks />
      <Features />
      <Audience />
      <Creators />
      <Faq />
      <FinalCta />
    </main>
  );
}
