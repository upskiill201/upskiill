'use client';

/**
 * Welcome + log in, shared by /login and /onboarding/0 — Duolingo's first
 * screen.
 *
 *   welcome   Tey on his platform, one promise, GET STARTED (new learners →
 *             onboarding) and I ALREADY HAVE AN ACCOUNT.
 *   signin    Duolingo's log in: one grouped field box with FORGOT? inside
 *             the password, a chunky LOG IN, then Google.
 *   forgot    Send a reset link; `sent` confirms it.
 *
 * One responsive layout (it used to render separate phone and desktop trees).
 * The URL never changes; only the post-login redirect differs by route.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, MailCheck, X } from 'lucide-react';
import { signInWithGoogle } from '@/lib/firebase';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import { TeyMark } from '@/components/brand/TeyMark';
import {
  Divider,
  Field,
  FieldGroup,
  FormError,
  GoogleButton,
  PrimaryButton,
  SecondaryButton,
  authStyles as styles,
} from './AuthUi';

export interface WelcomeAuthScreenProps {
  /** Where GET STARTED sends a brand-new learner. */
  getStartedHref?: string;
  /** Where the back arrow goes from the welcome view. */
  backHref?: string;
  /**
   * Deep link to honour after a successful sign-in, already sanitized by the
   * caller. Overrides the server's `redirectTo`, so a push notification tapped
   * with an expired session lands on the lesson it pointed at.
   */
  nextPath?: string | null;
  /** Open straight on the log-in form (e.g. /login?mode=signin). */
  initialView?: 'welcome' | 'signin' | 'forgot';
  /**
   * Which side of Teyro this screen signs into. INSTRUCTOR logs in through
   * the creator portal — the server opens a creator profile on a learner-only
   * account — and sends reset links to the creator reset page.
   */
  role?: 'STUDENT' | 'INSTRUCTOR';
  /** Welcome-view copy and art; defaults to the learner's. */
  copy?: Partial<WelcomeCopy>;
}

export interface WelcomeCopy {
  titleLead: string;
  titleTail: string;
  subtitle: string;
  art: string;
  artAlt: string;
  /** Heading above the log-in form. */
  signinTitle: string;
  /** Fallback when the server gives no redirect. */
  homeHref: string;
}

const LEARNER_COPY: WelcomeCopy = {
  titleLead: 'Learn real skills, ',
  titleTail: 'one fun lesson at a time.',
  subtitle:
    'Bite-sized coding and AI lessons, daily streaks, leagues, and Tey cheering you on. Free to start.',
  art: '/User onbarding Assets/tey/welcome.webp',
  artAlt: 'Tey, the Teyro mascot, waving hello',
  signinTitle: 'Log in',
  homeHref: '/dashboard',
};

type View = 'welcome' | 'signin' | 'forgot' | 'sent';

export default function WelcomeAuthScreen({
  getStartedHref = '/onboarding/1',
  backHref = '/',
  nextPath = null,
  initialView = 'welcome',
  role = 'STUDENT',
  copy: copyOverride,
}: WelcomeAuthScreenProps = {}) {
  const copy = { ...LEARNER_COPY, ...copyOverride };
  const router = useRouter();
  const reduce = useReducedMotion() ?? false;
  const [view, setView] = useState<View>(initialView);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // /login and /onboarding/0 sit outside the app providers, so the learner's
  // saved mute/volume hasn't been loaded yet.
  useEffect(() => {
    hydrateSoundPreferences();
  }, []);

  const go = (next: View) => {
    setError('');
    playSound(next === 'welcome' ? 'cardBack' : 'cardNext');
    playHaptic('light', false);
    setView(next);
  };

  const fail = (message: string) => {
    setError(message);
    playSound('wrong');
    playHaptic('error', false);
  };

  const handleGetStarted = () => {
    playSound('start');
    playHaptic('medium', false);
    router.push(getStartedHref);
  };

  const handleBack = () => {
    if (view === 'welcome') {
      playSound('cardBack');
      router.push(backHref);
    } else {
      go(view === 'signin' ? 'welcome' : 'signin');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password,
          ...(role === 'INSTRUCTOR' ? { role } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));

      playSound('correct');
      playHaptic('success', false);
      // Server-provided redirectTo comes from real profile flags, so creators
      // aren't blindly sent to /dashboard.
      window.location.href = nextPath || data.redirectTo || copy.homeHref;
    } catch (err: unknown) {
      fail(err instanceof Error ? err.message : "That didn't work. Let's try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail.toLowerCase().trim(), role }),
      });
      if (!res.ok) {
        if (res.status === 429) throw new Error('Whoa, slow down. Try again in a bit.');
        const data = await res.json().catch(() => null);
        throw new Error(extractErrorMessage(data, res.status));
      }
      playSound('correct');
      playHaptic('success', false);
      setView('sent');
    } catch (err: unknown) {
      fail(err instanceof Error ? err.message : "That didn't go through. Try again?");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();
      const res = await fetch(`/api/auth/firebase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));

      playSound('correct');
      playHaptic('success', false);
      window.location.href = nextPath || data.redirectTo || copy.homeHref;
    } catch (err: unknown) {
      console.error(err);
      fail(err instanceof Error ? err.message : "Google didn't cooperate. Mind trying again?");
    } finally {
      setLoading(false);
    }
  };

  const slide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { type: 'spring' as const, stiffness: 340, damping: 30 },
      };

  return (
    <div className={styles.screen}>
      <header className={styles.topBar}>
        <button type="button" className={styles.iconBtn} onClick={handleBack} aria-label={view === 'welcome' ? 'Back' : 'Close'}>
          {view === 'welcome' ? <ArrowLeft size={24} strokeWidth={3} /> : <X size={26} strokeWidth={3} />}
        </button>
        {view === 'signin' && (
          <button type="button" className={styles.topLink} onClick={handleGetStarted}>
            Sign up
          </button>
        )}
      </header>

      <AnimatePresence mode="wait" initial={false}>
        {view === 'welcome' && (
          <motion.main key="welcome" className={styles.welcome} {...slide}>
            <div className={styles.welcomeArt}>
              <span className={styles.halo} aria-hidden="true" />
              <motion.div
                className={styles.teyFloat}
                initial={reduce ? false : { scale: 0.85, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                <Image
                  src={copy.art}
                  alt={copy.artAlt}
                  width={420}
                  height={525}
                  priority
                  className={styles.teyImg}
                />
              </motion.div>
            </div>

            <div className={styles.welcomeCopy}>
              <TeyMark size={56} priority className={styles.mark} />
              <h1 className={styles.welcomeTitle}>
                {copy.titleLead}
                <span>{copy.titleTail}</span>
              </h1>
              <p className={styles.welcomeSub}>{copy.subtitle}</p>
              <div className={styles.actions}>
                <PrimaryButton type="button" onClick={handleGetStarted}>
                  Get started
                </PrimaryButton>
                <SecondaryButton type="button" onClick={() => go('signin')}>
                  I already have an account
                </SecondaryButton>
              </div>
            </div>
          </motion.main>
        )}

        {view === 'signin' && (
          <motion.main key="signin" className={styles.formPane} {...slide}>
            <h1 className={styles.formTitle}>{copy.signinTitle}</h1>
            <form onSubmit={handleEmailLogin} className={styles.form} noValidate={false}>
              <FieldGroup>
                <Field
                  label="Email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Field
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  trailing={
                    <span className={styles.trailing}>
                      <button
                        type="button"
                        className={styles.eye}
                        onClick={() => {
                          playSound(showPassword ? 'toggleOff' : 'toggleOn');
                          setShowPassword((s) => !s);
                        }}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                      <button type="button" className={styles.forgot} onClick={() => go('forgot')}>
                        Forgot?
                      </button>
                    </span>
                  }
                />
              </FieldGroup>
              <FormError message={error} />
              <PrimaryButton type="submit" busy={loading}>
                {loading ? 'Logging in…' : 'Log in'}
              </PrimaryButton>
            </form>
            <Divider />
            <GoogleButton onClick={handleGoogleLogin} disabled={loading} />
            <p className={styles.legal}>
              By logging in to Teyro, you agree to our <Link href="/terms">Terms</Link> and{' '}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </motion.main>
        )}

        {view === 'forgot' && (
          <motion.main key="forgot" className={styles.formPane} {...slide}>
            <h1 className={styles.formTitle}>Forgot password</h1>
            <p className={styles.formSub}>Tell me your email and I&apos;ll send you a reset link.</p>
            <form onSubmit={handleForgotPassword} className={styles.form}>
              <FieldGroup>
                <Field
                  label="Email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </FieldGroup>
              <FormError message={error} />
              <PrimaryButton type="submit" busy={loading}>
                {loading ? 'Sending…' : 'Send reset link'}
              </PrimaryButton>
            </form>
          </motion.main>
        )}

        {view === 'sent' && (
          <motion.main key="sent" className={`${styles.formPane} ${styles.center}`} {...slide}>
            <motion.span
              className={styles.sentBadge}
              initial={reduce ? false : { scale: 0.4, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 14 }}
            >
              <MailCheck size={44} strokeWidth={2.5} aria-hidden="true" />
            </motion.span>
            <h1 className={styles.formTitle}>Check your inbox</h1>
            <p className={styles.formSub}>
              I sent a reset link to <strong>{resetEmail}</strong>. Tap it to choose a new password.
            </p>
            <PrimaryButton type="button" onClick={() => go('signin')}>
              Back to log in
            </PrimaryButton>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
