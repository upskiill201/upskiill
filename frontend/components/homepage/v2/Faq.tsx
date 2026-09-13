'use client';

/**
 * Faq — six questions, reusing the shared Accordion.
 *
 * Every answer here is checked against what actually ships. Notably absent:
 * certificates (no model, no backend, no issuance) and anything about
 * downloading from an app store (Teyro is a PWA). The old FAQ answered
 * waitlist questions that no longer apply.
 */

import React from 'react';
import Accordion from '@/components/ui/Accordion';

const ITEMS = [
  {
    question: 'Is Teyro free to start?',
    answer:
      'Yes. You can create an account and start learning without paying. Individual courses from creators may be paid.',
  },
  {
    question: 'How long are the lessons?',
    answer:
      'Short enough to finish in one sitting. You pick your daily pace during setup (15, 30 or 45 minutes), and Teyro plans around it.',
  },
  {
    question: 'Do I need any experience?',
    answer:
      'No. You tell us your level when you sign up, from complete beginner upward, and courses are sorted so you can start where you actually are.',
  },
  {
    question: 'What can I learn?',
    answer:
      'Practical skills: coding, design, photography, cooking, marketing, fitness, writing, business and music, with more added by creators.',
  },
  {
    question: 'Do I need to download anything?',
    answer:
      'No app store needed. Teyro runs in your browser and installs to your home screen on iPhone and Android, where it also works offline.',
  },
  {
    question: 'Can I teach on Teyro?',
    answer:
      'Yes. Creators can build courses, publish them, and earn from learners. Teyro Studio has the tools for building and tracking your courses.',
  },
];

export default function Faq() {
  return (
    <div>
      <h2
        className="mb-12 text-center text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-ink"
        style={{ fontFamily: 'var(--font-celebration)' }}
      >
        Questions
      </h2>
      <div className="mx-auto max-w-[720px]">
        <Accordion items={ITEMS} />
      </div>
    </div>
  );
}
