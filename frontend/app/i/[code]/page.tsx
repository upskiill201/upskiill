import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Glyph } from '@/components/art/Glyph';
import { fetchInvitePreview } from '@/lib/ambassador';
import { topicOf } from '@/lib/onboarding/v3/lines';
import RememberInvite from '../../s/[slug]/RememberInvite';
import css from './InvitePage.module.css';

/**
 * teyro.app/i/:code — a learner's personal invite link (ambassador programme).
 *
 * The friend sees who invited them and what they're learning, then one door
 * in: /start carrying the invite, so the sign-up becomes a referral that
 * counts toward the inviter's Pro once the friend keeps learning. Personal
 * pages stay out of search (crawlable for link previews, not indexed).
 */

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const invite = await fetchInvitePreview(code);
  if (!invite) return { title: 'Teyro', robots: { index: false, follow: true } };
  const title = `${invite.firstName} invited you to learn${invite.courseTitle ? ` ${invite.courseTitle}` : ''} on Teyro`;
  const description = 'Short daily lessons, streaks and friends who keep you going. Learn with me on Teyro.';
  const image = { url: `/i/${invite.code}/image`, width: 1200, height: 630, alt: title };
  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: { type: 'website', siteName: 'Teyro', url: `https://teyro.app/i/${invite.code}`, title, description, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

export default async function InvitePage({ params }: Props) {
  const { code } = await params;
  const invite = await fetchInvitePreview(code);
  if (!invite) notFound();

  const join = `/start?ref=${encodeURIComponent(invite.code)}`;

  return (
    <div className="min-h-dvh bg-[var(--bg-section)] text-[var(--text-primary)]">
      <RememberInvite code={invite.code} />

      <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 pb-16 pt-6 sm:px-6 md:grid-cols-[minmax(0,520px)_1fr] md:gap-12 md:pt-12">
        {/* eslint-disable-next-line @next/next/no-img-element -- a generated PNG with fixed dimensions */}
        <img
          src={`/i/${invite.code}/image`}
          width={1200}
          height={630}
          alt={`${invite.firstName} invited you to Teyro`}
          className="h-auto w-full rounded-[16px] border border-[var(--border)]"
        />

        <div className="text-center md:text-left">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand)]">
            {invite.firstName} invited you
          </p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] font-extrabold leading-[1.1] sm:text-[40px]">
            Learn {topicOf(invite.courseTitle ?? undefined) ?? 'something real'} with {invite.firstName}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--text-secondary)]">
            Teyro turns real skills into short daily lessons, with streaks, leagues and friends who keep you going.
            {invite.squadName ? ` You can join ${invite.squadName} and learn side by side.` : ''}
          </p>
          <div className={css.actions}>
            <Link href={join} className={`${css.btn} ${css.primary}`}>
              Learn with {invite.firstName}
              <Glyph name="arrow" size={18} strokeWidth={3} />
            </Link>
            <Link href="/" className={`${css.btn} ${css.secondary}`}>
              See what Teyro is
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
