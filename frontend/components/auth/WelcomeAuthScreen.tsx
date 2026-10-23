'use client';

/**
 * Welcome + log in, shared by /login, the creator portal's log in and its
 * forgot-password page (founder, 2026-10-23: rebuilt in the onboarding's
 * look, Duolingo-faithful and warmer).
 *
 *   welcome   Tey with the skills floating round him, one promise, GET
 *             STARTED (new learners → onboarding) and I ALREADY HAVE AN ACCOUNT.
 *   signin    Tey says welcome back; "Sign back in" offers the account this
 *             device remembers (lib/auth/savedAccount); one grouped field box
 *             with FORGOT? inside the password, a chunky LOG IN, then Google.
 *             A good log in gets a beat of "Welcome back, Ada!" before the app.
 *   forgot    Send a reset link; `sent` confirms it.
 *   code      An account that never confirmed its email: a fresh 6-digit
 *             code is sent and checked here, then the log in carries on.
 *
 * The URL never changes; only the post-login redirect differs by route.
 * Every icon is Teyro's own (components/art), never a stock icon.
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Art } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { TeyHero, TeyLine } from '@/components/kit/Kit';
import { SkillOrbit } from '@/components/onboarding/v3/IntroSteps';
import { signInWithGoogle } from '@/lib/firebase';
import { extractErrorMessage } from '@/lib/apiError';
import { forgetSavedAccount, maskEmail, readSavedAccount, saveAccount, type SavedAccount } from '@/lib/auth/savedAccount';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import { TeyMark } from '@/components/brand/TeyMark';
import VerifyCodeForm from './VerifyCodeForm';
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
  subtitle: 'Coding, AI, communication, leadership and more. A few minutes a day, with Tey cheering you on. Free to start.',
  art: '/User onbarding Assets/tey/welcome.webp',
  artAlt: 'Tey, the Teyro mascot, waving hello',
  signinTitle: 'Log in',
  homeHref: '/dashboard',
};

const TEY = (pose: string) => `/User onbarding Assets/tey/${pose}.webp`;

type View = 'welcome' | 'signin' | 'forgot' | 'sent' | 'code';

export default function WelcomeAuthScreen({
  getStartedHref = '/onboarding',
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
  const [saved, setSaved] = useState<SavedAccount | null>(null);
  const [welcomeBack, setWelcomeBack] = useState<string | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // /login sits outside the app providers, so the learner's saved mute/volume
  // hasn't been loaded yet; and the remembered account lives on this device.
  useEffect(() => {
    hydrateSoundPreferences();
    setSaved(readSavedAccount(role));
  }, [role]);

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

  /** A beat of "Welcome back, Ada!", then the app (a real navigation, fresh caches). */
  const arrive = (to: string, name: string | null) => {
    playSound('correct');
    celebrationHaptic('soft');
    setWelcomeBack(name ? `Welcome back, ${name}!` : 'Welcome back!');
    window.setTimeout(() => {
      window.location.href = to;
    }, reduce ? 150 : 900);
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

  const useSaved = () => {
    if (!saved) return;
    playSound('navTap', 3);
    playHaptic('light', false);
    setEmail(saved.email);
    window.setTimeout(() => passwordRef.current?.focus(), 30);
  };

  const removeSaved = () => {
    forgetSavedAccount();
    setSaved(null);
    if (email === saved?.email) setEmail('');
    playSound('cardBack');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cleanEmail = email.toLowerCase().trim();
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: cleanEmail, password, ...(role === 'INSTRUCTOR' ? { role } : {}) }),
      });
      const data = await res.json();
      if (res.status === 403 && data?.requiresVerification) {
        // Never confirmed the email: send a fresh code and check it right here
        // (a cooldown refusal means a recent code is already in the inbox).
        void fetch('/api/auth/resend-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail }),
        }).catch(() => undefined);
        setLoading(false);
        go('code');
        return;
      }
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      const fullName: string | null = data?.user?.fullName ?? null;
      saveAccount({ email: cleanEmail, fullName, avatarUrl: data?.user?.avatarUrl ?? null, role });
      // Server-provided redirectTo comes from real profile flags, so creators
      // aren't blindly sent to /dashboard.
      arrive(nextPath || data.redirectTo || copy.homeHref, fullName?.split(' ')[0] ?? null);
    } catch (err: unknown) {
      fail(err instanceof Error ? err.message : "That didn't work. Let's try again.");
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
      const fullName = data?.user?.fullName ?? result.user.displayName ?? null;
      if (result.user.email) saveAccount({ email: result.user.email, fullName, avatarUrl: result.user.photoURL, role });
      arrive(nextPath || data.redirectTo || copy.homeHref, fullName?.split(' ')[0] ?? null);
    } catch (err: unknown) {
      console.error(err);
      fail(err instanceof Error ? err.message : "Google didn't cooperate. Mind trying again?");
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

  const savedName = saved?.firstName ?? null;

  return (
    <div className={styles.screen}>
      <header className={styles.topBar}>
        <button type="button" className={styles.iconBtn} onClick={handleBack} aria-label={view === 'welcome' ? 'Back' : 'Close'}>
          <Glyph name={view === 'welcome' ? 'back' : 'close'} size={26} strokeWidth={3.2} />
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
              {role === 'STUDENT' ? (
                <SkillOrbit teySrc={copy.art} />
              ) : (
                <>
                  <span className={styles.halo} aria-hidden="true" />
                  <motion.div
                    className={styles.teyFloat}
                    initial={reduce ? false : { scale: 0.85, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  >
                    <Image src={copy.art} alt={copy.artAlt} width={420} height={525} priority className={styles.teyImg} />
                  </motion.div>
                </>
              )}
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
            <TeyLine
              teySrc={TEY(savedName ? 'waving' : 'pointing')}
              text={savedName ? `Hey ${savedName}, welcome back! Let’s pick up where you left off.` : 'Welcome back! Log in and I’ll take you right back to your lesson.'}
            />

            {saved && (
              <div className="flex flex-col gap-2">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">Sign back in</p>
                <button
                  type="button"
                  className={`${styles.saved} ${email === saved.email ? styles.savedOn : ''}`}
                  onClick={useSaved}
                  aria-label={`Continue as ${savedName ?? maskEmail(saved.email)}`}
                >
                  <span className={styles.savedAvatar} aria-hidden="true">
                    {saved.avatarUrl ? (
                      <Image src={saved.avatarUrl} alt="" fill sizes="48px" className="object-cover" />
                    ) : (
                      (savedName ?? saved.email).slice(0, 1).toUpperCase()
                    )}
                  </span>
                  <span className={styles.savedText}>
                    <span className={styles.savedName}>{savedName ?? 'Your account'}</span>
                    <span className={styles.savedEmail}>{maskEmail(saved.email)}</span>
                  </span>
                  <Glyph name="chevron" size={22} className={styles.savedChev} />
                </button>
                <div className={styles.savedRow}>
                  <button
                    type="button"
                    className={styles.linkBtn}
                    onClick={() => {
                      setEmail('');
                      playSound('navTap', 2);
                    }}
                  >
                    Use another account
                  </button>
                  <button type="button" className={`${styles.linkBtn} ${styles.linkMuted}`} onClick={removeSaved}>
                    Remove from this device
                  </button>
                </div>
              </div>
            )}

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
                  ref={passwordRef}
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
                        <Glyph name={showPassword ? 'eyeOff' : 'eye'} size={22} strokeWidth={2.4} />
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
              By logging in to Teyro, you agree to our <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </motion.main>
        )}

        {view === 'forgot' && (
          <motion.main key="forgot" className={styles.formPane} {...slide}>
            <TeyLine teySrc={TEY('thinking')} text="No worries, it happens. What’s your email? I’ll send you a link to choose a new password." />
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

        {view === 'code' && (
          <motion.main key="code" className={styles.formPane} {...slide}>
            <VerifyCodeForm
              email={email}
              onVerified={({ redirectTo }) => {
                const cleanEmail = email.toLowerCase().trim();
                const mine = saved?.email === cleanEmail ? saved : null;
                saveAccount({ email: cleanEmail, fullName: mine?.firstName ?? null, avatarUrl: mine?.avatarUrl ?? null, role });
                arrive(nextPath || redirectTo || copy.homeHref, mine?.firstName ?? null);
              }}
            />
          </motion.main>
        )}

        {view === 'sent' && (
          <motion.main key="sent" className={`${styles.formPane} ${styles.center}`} {...slide}>
            <motion.span
              initial={reduce ? false : { scale: 0.4, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 14 }}
            >
              <Art name="envelope" size={120} />
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

      <AnimatePresence>
        {welcomeBack && (
          <motion.div className={styles.welcomeBack} initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status">
            <TeyHero teySrc={TEY('cheering')} size={170} />
            <p className={styles.welcomeBackTitle}>{welcomeBack}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
