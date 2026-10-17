import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { fetchShareCard } from '@/lib/share/server';
import { SHARE_FORMATS, shareHeadline, shareImagePath } from '@/lib/share/types';
import RememberInvite from './RememberInvite';

/**
 * teyro.app/s/:slug — where a shared milestone card lands.
 *
 * The friend sees the card itself, one line on what Teyro is, and one door
 * in: /start carrying the sharer's invite, so the friend's sign-up becomes a
 * referral that pays both of them after their first lesson. Personal pages,
 * so they stay out of search (crawlable for link previews, not indexed).
 */

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const card = await fetchShareCard(slug);
  if (!card) return { title: 'Teyro', robots: { index: false, follow: true } };
  const first = card.name.split(' ')[0] || 'A friend';
  const title = `${first}: ${shareHeadline(card)}`;
  const description = 'Short daily lessons, streaks, leagues and friends that keep you coming back. Learn with me on Teyro.';
  const image = { url: shareImagePath(slug, 'square'), ...SHARE_FORMATS.square, alt: title };
  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: { type: 'website', siteName: 'Teyro', url: `https://teyro.app/s/${slug}`, title, description, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

export default async function SharePage({ params }: Props) {
  const { slug } = await params;
  const card = await fetchShareCard(slug);
  if (!card) notFound();

  const first = card.name.split(' ')[0] || 'Your friend';
  const join = card.refCode ? `/start?ref=${encodeURIComponent(card.refCode)}` : '/start';

  return (
    <main className="min-h-dvh bg-[var(--bg-section)] text-[var(--text-primary)]">
      <RememberInvite code={card.refCode} />

      <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 pb-16 pt-6 sm:px-6 md:grid-cols-[minmax(0,400px)_1fr] md:gap-16 md:pt-12">
        {/* eslint-disable-next-line @next/next/no-img-element -- a generated PNG with fixed dimensions */}
        <img
          src={shareImagePath(slug, 'story')}
          width={SHARE_FORMATS.story.width}
          height={SHARE_FORMATS.story.height}
          alt={shareHeadline(card)}
          className="mx-auto h-auto w-full max-w-[260px] sm:max-w-[320px] rounded-[24px] shadow-[0_24px_64px_-24px_color-mix(in_srgb,var(--text-primary)_45%,transparent)] md:max-w-none"
        />

        <div className="text-center md:text-left">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand)]">
            {first} shared a milestone
          </p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] font-extrabold leading-[1.1] sm:text-[44px]">
            {shareHeadline(card)}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--text-secondary)]">
            Teyro turns real skills into short daily lessons, with streaks, leagues and friends that keep you coming back.
            {` ${first} invited you to learn with them.`}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href={join}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[var(--color-brand)] px-6 py-4 text-[16px] font-extrabold text-[var(--text-on-blue)] shadow-[0_4px_0_var(--color-brand-deep)] transition-transform active:translate-y-[2px] active:shadow-[0_2px_0_var(--color-brand-deep)]"
            >
              Start learning with {first}
              <ArrowRight size={18} strokeWidth={2.6} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] px-6 py-4 text-[16px] font-bold text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
            >
              See what Teyro is
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
