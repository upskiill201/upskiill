import type { Metadata } from 'next';
import StartExperience from '@/components/start/StartExperience';

/**
 * /start — the Teyro install gateway.
 *
 * Sits between the public marketing site and the app itself: the learner
 * arrives here, presses one button, and ends up either with Teyro on their
 * Home Screen or inside onboarding. The existing homepage and waitlist are
 * untouched — this is a new door, not a replacement for one.
 *
 * A server component whose only job is metadata; every decision on this screen
 * depends on the browser it is running in, so the interactive half is a client
 * component. Nothing here is authenticated and nothing is fetched, so the
 * route is fully static and the first paint costs one HTML document.
 */
export const metadata: Metadata = {
  title: 'Start learning — Teyro',
  description:
    'Put Teyro on your Home Screen and start your learning streak. One tap to begin.',
  alternates: { canonical: 'https://teyro.app/start' },
  openGraph: {
    type: 'website',
    url: 'https://teyro.app/start',
    siteName: 'Teyro',
    title: 'Start learning — Teyro',
    description: 'Put Teyro on your Home Screen and start your learning streak.',
    images: ['/teyro-og.png'],
  },
};

export default function StartPage() {
  return <StartExperience />;
}
