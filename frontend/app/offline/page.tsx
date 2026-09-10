import type { Metadata } from 'next';
import Image from 'next/image';
import { pickOfflineBodyLine } from '@/lib/tey/offlineVoice';
import styles from './Offline.module.css';

export const metadata: Metadata = {
  title: 'You are offline — Teyro',
  robots: { index: false, follow: false },
};

/**
 * Offline fallback for the service worker.
 *
 * Before this existed, sw.js answered any failed request with
 * `caches.match('/dashboard')` — including failed .js and .css requests, which
 * handed an HTML document to the module loader and produced
 * `Uncaught SyntaxError: Unexpected token '<'` and a blank screen. /dashboard
 * also requires auth, so a logged-out learner offline got a dashboard shell
 * whose every API call failed.
 *
 * The worker now serves this only for navigations, and returns a genuine
 * network error for sub-resources so the browser can report them honestly.
 *
 * Kept a Server Component in the root (public) group: it must render with no
 * providers, no data and no client JS, because by definition nothing can be
 * fetched when it is shown.
 */
export default function OfflinePage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <Image
          src="/User onbarding Assets/Tey_thinking_desktop.webp"
          alt=""
          width={180}
          height={180}
          className={styles.mascot}
          priority
        />
        <h1 className={styles.title}>You&rsquo;re offline</h1>
        <p className={styles.body}>{pickOfflineBodyLine()}</p>
        <p className={styles.hint}>This page will work again as soon as you&rsquo;re back online.</p>
      </div>
    </main>
  );
}
