/**
 * Teyro's creator page — the homepage's layout and look (app/page.tsx, v3),
 * told from the creator's side: why a course on Teyro becomes a business
 * (recurring subscriptions + learners who come back), what the creator and
 * their learners each get, and what a course could earn.
 *
 * Uses WaitlistHeader / WaitlistFooter (HeaderWrapper.tsx's isWaitlistRoute)
 * so it reads as the same site as '/'. Every CTA goes to /creator/onboarding.
 */

import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import {
  Audience,
  BothSides,
  Calculator,
  Faq,
  Features,
  FinalCta,
  Loop,
  Steps,
  TEACH_FAQ,
  TeachHero,
  WhyTeyro,
} from '@/components/teach/TeachSections';
import { ApplySection } from '@/components/launch/LaunchSections';
import s from '@/components/homepage/v3/Home.module.css';

const baloo2 = Baloo_2({
  variable: '--font-celebration',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const TITLE = 'Teach on Teyro: Earn Monthly From Coding & AI Courses';
const DESCRIPTION =
  'Turn your coding or AI skills into monthly income. Keep 70% of every subscription while streaks, leagues and a community keep your learners coming back.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'teach on Teyro',
    'become a Teyro creator',
    'teach coding online',
    'teach AI online',
    'sell coding courses',
    'create and sell online courses',
    'course creator platform',
    'recurring revenue from courses',
    'course subscription platform',
    'online course creator income',
    'gamified course platform',
    'Duolingo for course creators',
  ],
  alternates: { canonical: 'https://teyro.app/teach' },
  openGraph: {
    type: 'website',
    url: 'https://teyro.app/teach',
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

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: TEACH_FAQ.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

export default function TeachPage() {
  return (
    <main className={`${baloo2.variable} ${s.page}`}>
      {/* Reveal animations start at opacity 0 until JS runs; without JS, show everything. */}
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <TeachHero />
      <ApplySection />
      <WhyTeyro />
      <Loop />
      <Features />
      <Calculator />
      <BothSides />
      <Steps />
      <Audience />
      <Faq />
      <FinalCta />
    </main>
  );
}
