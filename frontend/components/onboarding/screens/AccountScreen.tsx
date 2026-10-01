'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Mail, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { getOnboardingState } from '@/lib/user-onboarding';
import { signInWithGoogle } from '@/lib/firebase';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import {
  Divider,
  Field,
  FieldGroup,
  FormError,
  GoogleButton,
  PrimaryButton,
  authStyles,
} from '@/components/auth/AuthUi';

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};
const wordVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } },
};
const accentVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } },
};

interface AccountScreenProps {
  onNext: () => void;
}

export default function AccountScreen({ onNext }: AccountScreenProps) {
  useOnboardingSession({ currentStep: 14, disableGuard: true });

  const [view, setView] = useState<'options' | 'signup' | 'verification'>('options');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [isLinkAccountMode, setIsLinkAccountMode] = useState(false);
  const [linkPromptMessage, setLinkPromptMessage] = useState('');

  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleGoogleSignup = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();
      const localState = getOnboardingState();

      const res = await fetch(`/api/auth/firebase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          idToken,
          role: 'STUDENT',
          onboarding: localState.answers,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Social sign up failed');
      }

      playHaptic('medium');
      onNext();
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Google didn't cooperate — mind trying again?";
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const localState = getOnboardingState();
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          fullName: fullName || email.split('@')[0],
          password,
          role: 'STUDENT',
          onboarding: localState.answers,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 || data.code === 'EMAIL_ALREADY_EXISTS') {
          if (data.canLink !== false) {
            setIsLinkAccountMode(true);
            setLinkPromptMessage("Looks like I already know you — enter your password and I'll activate your Student profile.");
            throw new Error(data.message || "Enter your existing account password and I'll get you activated.");
          }
        }
        const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errMsg || "That didn't go through — try again?");
      }

      if (data.linked && data.verified) {
        playHaptic('medium');
        onNext();
        return;
      }

      setView('verification');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "That didn't go through — try again?";
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (countdown > 0 || !email) return;
    setResending(true);
    setResendStatus('idle');

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      if (!res.ok) throw new Error('Resend failed');

      setResendStatus('success');
      setCountdown(60);
    } catch {
      setResendStatus('error');
    } finally {
      setResending(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.trim().length !== 6) {
      setVerificationError('I need all 6 digits first.');
      return;
    }
    setVerifyingCode(true);
    setVerificationError('');

    try {
      const res = await fetch(`/api/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          code: verificationCode.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "That code doesn't look right — try again?");
      }

      playHaptic('medium');
      onNext();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "That didn't work — try again?";
      setVerificationError(msg);
    } finally {
      setVerifyingCode(false);
    }
  };

  const maskEmail = (str: string) => {
    if (!str || !str.includes('@')) return str;
    const [name, domain] = str.split('@');
    if (name.length <= 2) return `${name[0]}***@${domain}`;
    return `${name.substring(0, 2)}***${name.substring(name.length - 1)}@${domain}`;
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="w-full h-full flex flex-col pt-2 px-5 md:px-0 pb-2 md:pb-0">
      {/* ── MASCOT HERO (mobile, options view — Tey anchors the top like Duolingo's owl) ── */}
      {view === 'options' && (
        <div className="md:hidden flex-1 min-h-0 w-full relative flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 pointer-events-none">
            <MascotBackground variant="soft" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.1 }}
            className="relative w-full h-full z-10"
          >
            <Image
              src="/User onbarding Assets/Step_12_image_mobile.webp"
              alt="Tey Mascot"
              fill
              className="object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
              priority
            />
          </motion.div>
        </div>
      )}

      <div className={`w-full flex flex-col items-center text-center ${view === 'options' ? 'shrink-0 md:flex-1 md:justify-center' : 'flex-1 justify-center'}`}>
        <AnimatePresence mode="wait">
          {view === 'options' && (
            <motion.div
              key="options"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-[420px] flex flex-col items-center text-center"
            >
              <motion.h1
                variants={headlineContainer}
                initial="hidden"
                animate="show"
                className="text-[clamp(2.5rem,14vw,3.5rem)] md:text-[3.5rem] lg:text-[4rem] font-[900] leading-[1.05] md:leading-[1.1] mb-2 md:mb-4 tracking-tight text-[#071233]"
                style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
              >
                <div className="whitespace-nowrap inline-block md:block">
                  <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Save</motion.span>
                  <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>your</motion.span>
                </div>
                <br className="md:hidden" />
                <div className="whitespace-nowrap inline-block md:block md:-mt-1">
                  <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>
                    progress
                  </motion.span>
                </div>
              </motion.h1>

              <motion.p
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
                className="text-[clamp(1rem,4.8vw,1.2rem)] md:text-base font-medium text-slate-500 leading-snug mb-5 md:mb-6"
                style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 10px rgba(255,255,255,1)' }}
              >
                <span className="md:hidden">
                  Make an account and I&apos;ll keep your
                  <br />
                  achievements safe — come back anytime.
                </span>
                <span className="hidden md:inline">Make an account and I&apos;ll keep your achievements safe — come back anytime.</span>
              </motion.p>

              <div className="w-full flex flex-col gap-3">
                <FormError message={authError} />
                <GoogleButton onClick={handleGoogleSignup} disabled={authLoading} />
                <Divider />
                <PrimaryButton
                  type="button"
                  onClick={() => {
                    playSound('cardNext');
                    setView('signup');
                  }}
                >
                  Sign up with email
                </PrimaryButton>
              </div>
            </motion.div>
          )}

          {view === 'signup' && (
            <motion.form
              key="signup"
              onSubmit={handleEmailSignup}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-[420px] flex flex-col gap-4 text-left"
            >
              <h2 className={authStyles.formTitle}>{isLinkAccountMode ? 'Activate your profile' : 'Create your profile'}</h2>

              {isLinkAccountMode && (
                <p className={authStyles.formSub}>
                  {linkPromptMessage || "Enter your password and I'll activate your Student profile."}
                </p>
              )}

              <FieldGroup>
                {!isLinkAccountMode && (
                  <Field label="Name" autoComplete="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                )}
                <Field
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Field
                  label={isLinkAccountMode ? 'Account password' : 'Password'}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLinkAccountMode ? 'current-password' : 'new-password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  trailing={
                    <span className={authStyles.trailing}>
                      <button
                        type="button"
                        className={authStyles.eye}
                        onClick={() => {
                          playSound(showPassword ? 'toggleOff' : 'toggleOn');
                          setShowPassword(!showPassword);
                        }}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </span>
                  }
                />
              </FieldGroup>

              <FormError message={authError} />

              <PrimaryButton type="submit" busy={authLoading}>
                {authLoading ? 'Creating…' : isLinkAccountMode ? 'Activate profile' : 'Create account'}
              </PrimaryButton>
              <button
                type="button"
                onClick={() => {
                  playSound('cardBack');
                  setView('options');
                }}
                className={authStyles.forgot}
                style={{ alignSelf: 'center' }}
              >
                Back
              </button>
            </motion.form>
          )}

          {view === 'verification' && (
            <motion.div
              key="verification"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-[420px] flex flex-col items-center text-center gap-4"
            >
              <span className={authStyles.sentBadge}>
                <Mail size={40} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <h2 className={authStyles.formTitle}>I sent you a code!</h2>
              <p className={authStyles.formSub}>
                Check <strong>{maskEmail(email)}</strong> for the 6-digit code.
              </p>

              <form onSubmit={handleVerifyCode} className="w-full flex flex-col gap-4">
                <FieldGroup>
                  <label className={authStyles.field}>
                    <span className="sr-only">6-digit code</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="123456"
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                      className={authStyles.input}
                      style={{ textAlign: 'center', fontSize: 24, letterSpacing: '0.4em' }}
                    />
                  </label>
                </FieldGroup>
                <FormError message={verificationError} />
                <PrimaryButton type="submit" busy={verifyingCode}>
                  {verifyingCode ? 'Checking…' : 'Verify and continue'}
                </PrimaryButton>
              </form>

              <div className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--text-muted)]">
                {resendStatus === 'success' && (
                  <span className="text-[var(--success-green)] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Code resent!
                  </span>
                )}
                {countdown > 0 ? (
                  <span>Resend in {countdown}s</span>
                ) : (
                  <button type="button" onClick={handleResendVerification} disabled={resending} className={authStyles.forgot}>
                    {resending ? 'Sending…' : 'Resend code'}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
