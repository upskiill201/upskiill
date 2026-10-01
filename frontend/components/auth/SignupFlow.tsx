'use client';

/**
 * Create-an-account flow shared by /signup, /creator/signup and creator
 * onboarding's account step. Duolingo-style: one grouped field box, an honest
 * "at least 8 characters" check, Google, then the 6-digit email code inline —
 * the code step sets the session cookie, so nobody is bounced to a log-in wall
 * after signing up.
 *
 * Existing accounts are handled the way the backend already models them:
 *   409 + canLink    the email belongs to an account without this profile —
 *                    the password activates it (name field hides).
 *   409 verified     the account already has it — offer LOG IN instead.
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Eye, EyeOff } from 'lucide-react';
import { signInWithGoogle } from '@/lib/firebase';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import {
  Divider,
  Field,
  FieldGroup,
  FormError,
  GoogleButton,
  PrimaryButton,
  authStyles as styles,
} from './AuthUi';
import VerifyCodeForm from './VerifyCodeForm';

const MIN_PASSWORD = 8;

export interface SignupResult {
  /** Server-chosen landing page, when it sent one. */
  redirectTo?: string;
  method: 'email' | 'google' | 'code';
}

export interface SignupFlowProps {
  role: 'STUDENT' | 'INSTRUCTOR';
  title: string;
  subtitle?: React.ReactNode;
  /** Pre-signup answers attached to the account call (read at submit time). */
  getOnboarding?: () => Record<string, unknown> | null;
  /** Prefills the name field (e.g. the name given earlier in onboarding). */
  initialName?: string;
  /** Where "Log in instead" goes when the email already has this profile. */
  loginHref: string;
  /** Rendered between the title and the form (e.g. the invite banner). */
  banner?: React.ReactNode;
  /** Called once a session cookie exists. */
  onDone: (result: SignupResult) => void;
}

type View = 'form' | 'code';


export default function SignupFlow({
  role,
  title,
  subtitle,
  getOnboarding,
  initialName = '',
  loginHref,
  banner,
  onDone,
}: SignupFlowProps) {
  const reduce = useReducedMotion() ?? false;
  const [view, setView] = useState<View>('form');

  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [linkMode, setLinkMode] = useState(false);
  const [offerLogin, setOfferLogin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialName && !fullName) setFullName(initialName);
    // Only a late-arriving prefill should land; never clobber typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialName]);

  const longEnough = password.length >= MIN_PASSWORD;
  const profileWord = role === 'INSTRUCTOR' ? 'creator' : 'learner';

  const fail = (message: string) => {
    setError(message);
    playSound('wrong');
    playHaptic('error', false);
  };

  const succeed = (result: SignupResult) => {
    playSound('correct');
    playHaptic('success', false);
    onDone(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setOfferLogin(false);
    // Linking an existing account checks *its* password, which may predate
    // the 8-character rule.
    if (!linkMode && !longEnough) return fail(`Your password needs at least ${MIN_PASSWORD} characters.`);
    if (!agreed) return fail('Please agree to the Terms and Privacy Policy first.');

    setLoading(true);
    try {
      const onboarding = getOnboarding?.() ?? null;
      const cleanEmail = email.toLowerCase().trim();
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: cleanEmail,
          fullName: fullName.trim() || cleanEmail.split('@')[0],
          password,
          role,
          ...(onboarding && { onboarding }),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409 && data.code === 'EMAIL_ALREADY_EXISTS') {
          if (data.canLink) {
            setLinkMode(true);
            playSound('teyPop');
            setError('');
            setLoading(false);
            return;
          }
          setOfferLogin(true);
        }
        throw new Error(extractErrorMessage(data, res.status));
      }

      if (data.requiresVerification) {
        playSound('cardNext');
        playHaptic('light', false);
        setView('code');
        return;
      }
      succeed({ redirectTo: data.redirectTo, method: 'email' });
    } catch (err: unknown) {
      fail(err instanceof Error ? err.message : "That didn't go through. Try again?");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();
      const onboarding = getOnboarding?.() ?? null;
      const res = await fetch('/api/auth/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken, role, ...(onboarding && { onboarding }) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      succeed({ redirectTo: data.redirectTo, method: 'google' });
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
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { type: 'spring' as const, stiffness: 340, damping: 30 },
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {view === 'form' ? (
        <motion.div key="form" className={styles.form} {...slide}>
          <h1 className={styles.formTitle}>{linkMode ? 'Activate your profile' : title}</h1>
          {linkMode ? (
            <p className={styles.formSub}>
              I already know this email. Enter its password and I&apos;ll open your {profileWord} profile on the
              same account.
            </p>
          ) : (
            subtitle && <p className={styles.formSub}>{subtitle}</p>
          )}
          {banner}

          <form onSubmit={handleSubmit} className={styles.form}>
            <FieldGroup>
              {!linkMode && (
                <Field
                  label="Name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              )}
              <Field
                label="Email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (linkMode) setLinkMode(false);
                }}
                required
              />
              <Field
                label={linkMode ? 'Account password' : 'Password'}
                type={showPassword ? 'text' : 'password'}
                autoComplete={linkMode ? 'current-password' : 'new-password'}
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
                  </span>
                }
              />
            </FieldGroup>
            {!linkMode && (
              <p className={`${styles.hint} ${longEnough ? styles.hintOk : ''}`}>
                {longEnough && <Check size={14} strokeWidth={4} aria-hidden="true" />}
                At least {MIN_PASSWORD} characters
              </p>
            )}

            <label className={styles.check}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  playSound(e.target.checked ? 'toggleOn' : 'toggleOff');
                  setAgreed(e.target.checked);
                }}
              />
              <span>
                I agree to Teyro&apos;s <Link href="/terms">Terms</Link> and{' '}
                <Link href="/privacy">Privacy Policy</Link>.
              </span>
            </label>

            <FormError message={error} />
            {offerLogin && (
              <Link href={loginHref} className={styles.forgot} style={{ alignSelf: 'center' }}>
                Log in instead
              </Link>
            )}
            <PrimaryButton type="submit" busy={loading}>
              {loading ? 'Creating…' : linkMode ? 'Activate profile' : 'Create account'}
            </PrimaryButton>
          </form>

          <Divider />
          <GoogleButton onClick={handleGoogle} disabled={loading} />
        </motion.div>
      ) : (
        <motion.div key="code" {...slide}>
          <VerifyCodeForm
            email={email}
            onVerified={({ redirectTo }) => onDone({ redirectTo, method: 'code' })}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
