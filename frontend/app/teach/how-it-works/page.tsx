/**
 * /teach/how-it-works — the creator journey as a marketing page: what it means
 * to teach on Teyro, what creators get, how they build, and what success looks
 * like. /teach sells the idea; this page shows every step. Launch-video makers
 * are pointed at both pages, so the fact sheet in HowSections must stay exact.
 */

import type { Metadata } from 'next';
import {
  Founding,
  FactSheet,
  Glance,
  HOW_FAQ,
  HowFaq,
  HowFinal,
  HowHero,
  JOURNEY,
  JourneyPath,
  Outcome,
  Steps,
  TeyroDoes,
  Who,
} from '@/components/teach/HowSections';
import { baloo2 } from '@/lib/seo/fonts';
import { breadcrumbSchema, faqSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import s from '@/components/homepage/v3/Home.module.css';

const TITLE = 'How Teaching on Teyro Works: From First Lesson to Monthly Income';
const DESCRIPTION =
  'Every step of teaching coding or AI on Teyro: plan with Tey, build hands-on lessons in Studio, get reviewed, launch to your audience and keep 70% of every payment.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/teach/how-it-works' },
  openGraph: { type: 'website', url: '/teach/how-it-works', siteName: 'Teyro', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', site: '@teyroapp', title: TITLE, description: DESCRIPTION },
};

const HOW_TO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to teach a coding or AI course on Teyro',
  description: DESCRIPTION,
  step: JOURNEY.map((j, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: j.title,
    url: `https://teyro.app/teach/how-it-works#${j.id}`,
  })),
};

export default function HowTeachingWorksPage() {
  return (
    <main className={`${baloo2.variable} ${s.page}`}>
      {/* Reveal animations start at opacity 0 until JS runs; without JS, show everything. */}
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <JsonLd
        data={schemas(
          HOW_TO,
          faqSchema(HOW_FAQ),
          breadcrumbSchema([
            { name: 'Teach', path: '/teach' },
            { name: 'How it works', path: '/teach/how-it-works' },
          ]),
        )}
      />
      <HowHero />
      <Glance />
      <JourneyPath />
      <Steps />
      <TeyroDoes />
      <Outcome />
      <Founding />
      <Who />
      <FactSheet />
      <HowFaq />
      <HowFinal />
    </main>
  );
}
