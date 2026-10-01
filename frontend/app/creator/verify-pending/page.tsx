'use client';

/**
 * /creator/verify-pending?email= — enter the 6-digit code for a creator
 * account whose sign-up happened somewhere else (an old link, the verify
 * email). Same screen as the inline code step (components/auth/VerifyCodeForm);
 * a verified code continues at onboarding's profile step.
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import { playSound } from '@/lib/audio/lessonSounds';
import { ACCOUNT_STEP, PROFILE_STEP } from '@/lib/creator-onboarding/steps';
import VerifyCodeForm from '@/components/auth/VerifyCodeForm';
import { authStyles as styles } from '@/components/auth/AuthUi';

export default function VerifyPendingPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    hydrateSoundPreferences();
    // Read after hydration: no useSearchParams, so no Suspense boundary.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(new URLSearchParams(window.location.search).get('email') ?? '');
  }, []);

  return (
    <div className={styles.screen}>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Close"
          onClick={() => {
            playSound('cardBack');
            router.push('/creator/login');
          }}
        >
          <X size={26} strokeWidth={3} />
        </button>
      </header>
      <main className={styles.formPane}>
        {email !== null && (
          <VerifyCodeForm
            email={email}
            startCountdown={false}
            onVerified={() => {
              window.location.href = `/creator/onboarding/${PROFILE_STEP}`;
            }}
          />
        )}
        <Link href={`/creator/onboarding/${ACCOUNT_STEP}`} className={styles.forgot} style={{ alignSelf: 'center' }}>
          Wrong email? Sign up again
        </Link>
      </main>
    </div>
  );
}
