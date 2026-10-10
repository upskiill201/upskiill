"use client";

/**
 * /signup — "Create your profile", Duolingo-style. Where referral links land
 * (/signup?ref=), and the direct way in for anyone skipping onboarding.
 * The form itself is components/auth/SignupFlow (shared with creators).
 */

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { getOnboardingState } from '@/lib/user-onboarding';
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

export default function Signup() {
  const router = useRouter();
  // Read after mount (see app/login/page.tsx for why not useSearchParams).
  const [courseNext, setCourseNext] = useState<string | null>(null);

  useEffect(() => {
    hydrateSoundPreferences();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCourseNext(courseReturnPath());
  }, []);

  const loginHref = courseNext
    ? `/login?mode=signin&next=${encodeURIComponent(courseNext)}`
    : '/login?mode=signin';

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
          <X size={26} strokeWidth={3} />
        </button>
        <Link href={loginHref} className={styles.topLink} onClick={() => playSound('navTap', 1)}>
          Log in
        </Link>
      </header>

      <main className={styles.formPane}>
        <div className={styles.center} style={{ display: 'flex', flexDirection: 'column' }}>
          <Image src="/User onbarding Assets/tey/welcome.webp" alt="" width={96} height={120} priority />
        </div>
        <SignupFlow
          role="STUDENT"
          title="Create your profile"
          banner={<InvitedBanner />}
          // A course signup has no onboarding answers to attach.
          getOnboarding={courseNext ? () => null : pendingOnboardingAnswers}
          loginHref={loginHref}
          // The backend has set the httpOnly cookie by now.
          onDone={() => {
            window.location.href = courseReturnPath() ?? '/dashboard';
          }}
        />
      </main>
    </div>
  );
}
