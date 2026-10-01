'use client';

/**
 * /creator/signup — "Create your creator account" for anyone who comes
 * straight here instead of through creator onboarding. Same form as the
 * learner's /signup (components/auth/SignupFlow), as INSTRUCTOR, carrying any
 * onboarding answers already given. Once the session exists it continues at
 * onboarding's profile step, so every creator ends with a profile learners
 * can see.
 */

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import { getCreatorOnboarding, toSignupPayload } from '@/lib/creator-onboarding/storage';
import { PROFILE_STEP } from '@/lib/creator-onboarding/steps';
import SignupFlow from '@/components/auth/SignupFlow';
import { authStyles as styles } from '@/components/auth/AuthUi';

export default function CreatorSignup() {
  const router = useRouter();
  // Read after mount: the answers live in localStorage, and reading them
  // during render would make the server and client HTML disagree.
  const [savedName, setSavedName] = useState<string | undefined>();

  useEffect(() => {
    hydrateSoundPreferences();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSavedName(getCreatorOnboarding().answers.name);
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
        <Link
          href="/creator/login?mode=signin"
          className={styles.topLink}
          onClick={() => playSound('navTap', 1)}
        >
          Log in
        </Link>
      </header>

      <main className={styles.formPane}>
        <div className={styles.center} style={{ display: 'flex', flexDirection: 'column' }}>
          <Image src="/User onbarding Assets/tey/tablet.webp" alt="" width={96} height={120} priority />
        </div>
        <SignupFlow
          role="INSTRUCTOR"
          title="Create your creator account"
          subtitle="Teach Coding or AI to learners who actually finish."
          getOnboarding={() => toSignupPayload(getCreatorOnboarding().answers)}
          initialName={savedName}
          loginHref="/creator/login?mode=signin"
          onDone={() => {
            window.location.href = `/creator/onboarding/${PROFILE_STEP}`;
          }}
        />
      </main>
    </div>
  );
}
