'use client';

/**
 * Account step. Two ways through:
 *
 *   guest      create the account right here (SignupFlow as INSTRUCTOR,
 *              email code inline) with the onboarding answers attached.
 *   signed in  a learner (or a creator re-running onboarding) confirms
 *              "Open my studio" — POST /auth/become-creator adds the creator
 *              profile to the same account, saves the answers and reissues
 *              the session cookie. No password, no second account.
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SignupFlow from '@/components/auth/SignupFlow';
import { FormError, PrimaryButton, authStyles } from '@/components/auth/AuthUi';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { toSignupPayload } from '@/lib/creator-onboarding/storage';
import type { CreatorAnswers } from '@/lib/creator-onboarding/catalog';
import type { CreatorSession } from '../useCreatorSession';
import styles from '../CreatorOnboarding.module.css';

export function CreatorAccountScreen({
  session,
  answers,
  onDone,
}: {
  session: CreatorSession;
  answers: CreatorAnswers;
  onDone: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const openStudio = async () => {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/auth/become-creator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ onboarding: toSignupPayload(answers) ?? undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      playSound('correct');
      playHaptic('success', false);
      onDone();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "I couldn't open your studio. Try again?");
      playSound('wrong');
      playHaptic('error', false);
    } finally {
      setBusy(false);
    }
  };

  if (session.status === 'loading') {
    return <div className={styles.accountSkeleton} aria-busy="true" aria-label="Checking your account" />;
  }

  if (session.status === 'signed-in') {
    const { user } = session;
    const initial = (user.fullName || user.email || '?').trim().charAt(0).toUpperCase();
    return (
      <div className={styles.accountPane}>
        <motion.div
          className={styles.accountCard}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        >
          <span className={styles.accountAvatar} aria-hidden="true">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt="" />
            ) : (
              initial
            )}
          </span>
          <div className={styles.accountWho}>
            <strong>{user.fullName || 'Your account'}</strong>
            <span>{user.email}</span>
          </div>
        </motion.div>
        <h1 className={authStyles.formTitle}>
          {user.hasCreatorAccess ? 'Save your plan to your studio' : 'Open your creator studio'}
        </h1>
        <p className={authStyles.formSub}>
          {user.hasCreatorAccess
            ? "I'll add your answers to your creator profile."
            : "Your creator studio lives on this same account. Your learning, streak and coins stay exactly where they are, and you can switch between the two any time."}
        </p>
        <FormError message={error} />
        <PrimaryButton type="button" busy={busy} onClick={openStudio}>
          {busy ? 'Opening…' : user.hasCreatorAccess ? 'Save and continue' : 'Open my studio'}
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className={styles.accountPane}>
      <SignupFlow
        role="INSTRUCTOR"
        title="Create your creator account"
        getOnboarding={() => toSignupPayload(answers)}
        initialName={answers.name}
        loginHref="/creator/login?mode=signin"
        onDone={onDone}
      />
    </div>
  );
}

export default CreatorAccountScreen;
