"use client";

/**
 * /signup — "Create your profile", Duolingo-style. Where referral links land
 * (/signup?ref=), and the direct way in for anyone skipping onboarding.
 * The form itself is components/auth/SignupFlow (shared with creators).
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Glyph } from '@/components/art/Glyph';
import { TeyLine } from '@/components/kit/Kit';
import { getOnboardingState } from '@/lib/user-onboarding';
import { sanitizeNextPath } from '@/lib/return-to';
import { markFirstSession } from '@/lib/awareness/firstSession';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import InvitedBanner from '@/components/referral/InvitedBanner';
import SignupFlow from '@/components/auth/SignupFlow';
import { authStyles as styles } from '@/components/auth/AuthUi';

/**
 * Pre-signup proofs (WhatsApp verification from onboarding, the deferred
 * challenge reward) live inside the onboarding answers — attaching them lets
 * the backend settle both the moment this account exists.
 */
function pendingOnboardingAnswers(): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null;
  const { answers } = getOnboardingState();
  return Object.keys(answers).length > 0 ? (answers as Record<string, unknown>) : null;
}

/**
 * Arriving from a course page (/signup?course=<slug>): this account is for that
 * course, so it skips onboarding entirely and goes back to the course with
 * ?start=1, which enrols and opens lesson 1. Only a plain slug is accepted —
 * it becomes a same-site path, never an arbitrary redirect.
 */
function courseReturnPath(): string | null {
  if (typeof window === 'undefined') return null;
  const slug = new URLSearchParams(window.location.search).get('course');
  return slug && /^[a-z0-9-]{1,120}$/i.test(slug) ? `/courses/${slug}?start=1` : null;
}

/** A deep link (/signup?next=/pro…) through the same allowlist as log in. */
function nextPath(): string | null {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('next');
  return raw ? sanitizeNextPath(raw) : null;
}

export default function Signup() {
  const router = useRouter();
  // Read after mount (see app/login/page.tsx for why not useSearchParams).
  const [returnTo, setReturnTo] = useState<{ course: string | null; next: string | null }>({ course: null, next: null });

  useEffect(() => {
    hydrateSoundPreferences();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read from the URL after mount, so server and client render agree
    setReturnTo({ course: courseReturnPath(), next: nextPath() });
  }, []);

  const after = returnTo.course ?? returnTo.next;
  const loginHref = after ? `/login?mode=signin&next=${encodeURIComponent(after)}` : '/login?mode=signin';

  return (
    <div className={styles.screen}>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Close"
          onClick={() => {
            playSound('cardBack');
            router.push('/');
          }}
        >
          <Glyph name="close" size={26} strokeWidth={3.2} />
        </button>
        <Link href={loginHref} className={styles.topLink} onClick={() => playSound('navTap', 1)}>
          Log in
        </Link>
      </header>

      <main className={styles.formPane}>
        <TeyLine
          teySrc="/User onbarding Assets/tey/welcome.webp"
          text={
            returnTo.course
              ? "Let's make your profile, then I'll open your course right where it starts."
              : "Let's make your profile. It takes a minute, and everything you learn stays saved."
          }
        />
        <SignupFlow
          role="STUDENT"
          title="Create your profile"
          banner={<InvitedBanner />}
          // A course signup has no onboarding answers to attach.
          getOnboarding={returnTo.course ? () => null : pendingOnboardingAnswers}
          loginHref={loginHref}
          // The backend has set the httpOnly cookie by now.
          onDone={() => {
            // A brand-new learner's first visit stays calm (lib/awareness/firstSession).
            markFirstSession();
            window.location.href = courseReturnPath() ?? nextPath() ?? '/dashboard';
          }}
        />
      </main>
    </div>
  );
}
