import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import DownloadExperience from '@/components/download/DownloadExperience';

/**
 * /download — get Teyro on the device you're holding.
 *
 * Teyro installs from the browser (manifest + service worker), so there is
 * no store listing to link to. This page works out whether the visitor is on
 * an iPhone, an Android phone or a computer and shows that install first;
 * the other two sit one tab away, with a QR code to move from a computer to
 * a phone. The detection and the native prompt are the same ones /start uses
 * (hooks/usePwaInstall.ts, lib/pwa/platform.ts).
 *
 * Unlike /start (an app screen, noindex), this is a site page: it carries the
 * site header and footer and is meant to rank for "Teyro app download".
 */

const baloo2 = Baloo_2({
  variable: '--font-celebration',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const TITLE = 'Download Teyro — iPhone, Android and computer';
const DESCRIPTION =
  'Get the Teyro app on iPhone, iPad, Android, Windows, Mac or Chromebook in a few seconds, straight from your browser. Free to start.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://teyro.app/download' },
  openGraph: {
    type: 'website',
    url: 'https://teyro.app/download',
    siteName: 'Teyro',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', site: '@teyroapp', title: TITLE, description: DESCRIPTION },
};

export default function DownloadPage() {
  return (
    <main className={baloo2.variable}>
      <DownloadExperience />
    </main>
  );
}
