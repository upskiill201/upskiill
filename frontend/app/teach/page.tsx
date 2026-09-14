/**
 * Teyro's creator marketing page — rebuilt to match the homepage's design
 * system (app/page.tsx): Band + SplitSection, alternating sides, real
 * Creator Studio screens recreated as visuals, outcome-first copy, no
 * bullet lists, no unshipped-feature claims. Uses WaitlistHeader /
 * WaitlistFooter (see HeaderWrapper.tsx / FooterWrapper.tsx's isWaitlistRoute)
 * instead of the generic app chrome, so it reads as the same site as '/'.
 *
 * Every CTA goes to /creator/onboarding (the redirect entry into step 1),
 * matching the homepage's own "teach" band convention — never a hardcoded
 * /creator/onboarding/1.
 */

import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import Band from '@/components/homepage/v2/Band';
import SplitSection from '@/components/homepage/v2/SplitSection';
import FinalCta from '@/components/homepage/v2/FinalCta';
import TeachHero from '@/components/teach/TeachHero';
import EarningsGrowthVisual from '@/components/teach/visuals/EarningsGrowthVisual';
import AnalyticsInsightVisual from '@/components/teach/visuals/AnalyticsInsightVisual';
import PayoutsVisual from '@/components/teach/visuals/PayoutsVisual';
import CreatorRoleVisual from '@/components/teach/visuals/CreatorRoleVisual';

const baloo2 = Baloo_2({
  variable: '--font-celebration',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const TITLE = 'Teach on Teyro — Turn What You Know Into Income';
const DESCRIPTION =
  'Publish a course, keep earning while you sleep, and see exactly what\'s working with real analytics. Payouts land on a schedule you can count on.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'teach on Teyro', 'become a Teyro creator', 'become a Teyro instructor',
    'create and sell courses', 'sell courses online', 'course creator platform',
    'online course instructor income', 'creator earnings platform',
    'how to make money teaching online', 'course creator payouts',
    'course creator analytics', 'gamified course platform for creators',
    'Duolingo for course creators', 'Teyro for creators', 'Teyro for instructors',
  ],
  alternates: {
    canonical: '/teach',
  },
  openGraph: {
    type: 'website',
    url: '/teach',
    siteName: 'Teyro',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@teyroapp',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TeachPage() {
  return (
    <main className={baloo2.variable}>
      <noscript>
        <style>{`[data-band]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <TeachHero />

      <Band tone="white">
        <SplitSection
          headline="Publish Once, Keep Earning"
          copy="A course you build once keeps paying out while you sleep. Real students, real revenue, on the same platform that made the lessons stick."
          visual={<EarningsGrowthVisual />}
          visualSide="right"
        />
      </Band>

      <Band tone="tint">
        <SplitSection
          headline="See Exactly What's Working"
          copy="No guessing which course to improve or which lesson is losing students. Every metric you need to grow is sitting right there, updated as it happens."
          visual={<AnalyticsInsightVisual />}
          visualSide="left"
        />
      </Band>

      <Band tone="white">
        <SplitSection
          headline="Get Paid On A Schedule You Trust"
          copy="Request a payout and watch it move from requested to paid, step by step. No wondering where your money is or when it's landing."
          visual={<PayoutsVisual />}
          visualSide="right"
        />
      </Band>

      <Band tone="tint" id="creators-instructors">
        <SplitSection
          headline="Creators, Instructors — Same Thing"
          copy="Anyone teaching on Teyro goes by Creator or Instructor, whichever feels right. Same courses, same students, same payouts, same seat at the table."
          visual={<CreatorRoleVisual />}
          visualSide="left"
        />
      </Band>

      <Band tone="white" flushBottom>
        <FinalCta
          headline="Start Teaching on Teyro"
          ctaLabel="BECOME A CREATOR"
          ctaHref="/creator/onboarding"
        />
      </Band>
    </main>
  );
}
