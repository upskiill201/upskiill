'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { getOnboardingState } from '@/lib/user-onboarding';
import { signInWithGoogle } from '@/lib/firebase';
import { playHaptic } from '@/lib/haptics';

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

interface Step12ContentProps {
  onNext: () => void;
}

export default function Step12Content({ onNext }: Step12ContentProps) {
  useOnboardingSession({ currentStep: 12, disableGuard: true });

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
      const msg = err instanceof Error ? err.message : 'Google authentication failed';
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
            setLinkPromptMessage('It looks like you already have a Teyro account! Please enter your password to activate your Student profile.');
            throw new Error(data.message || 'Please enter your existing account password to activate your Student profile.');
          }
        }
        const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errMsg || 'Signup failed');
      }

      if (data.linked && data.verified) {
        playHaptic('medium');
        onNext();
        return;
      }

      setView('verification');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
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
      setVerificationError('Please enter a 6-digit code');
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
        throw new Error(data.message || 'Invalid verification code');
      }

      playHaptic('medium');
      onNext();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Verification failed';
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
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1)';

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-2 px-5 md:px-0 pb-2 md:pb-0">
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
              className="text-[clamp(2rem,8vw,3rem)] font-[900] leading-[1.05] mb-2 tracking-tight text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Save</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
              <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>
                progress
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
              className="text-sm md:text-base font-medium text-slate-500 leading-tight mb-6"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Create an account to save your achievements and continue anytime.
            </motion.p>

            {authError && (
              <div className="text-xs text-red-500 font-semibold px-4 text-center mb-3 bg-red-50 py-1.5 rounded-lg w-full">
                {authError}
              </div>
            )}

            <div className="w-full flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleGoogleSignup}
                disabled={authLoading}
                className="w-full h-12 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-3 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Image src="/User onbarding Assets/google.webp" alt="Google Logo" width={18} height={18} className="object-contain" />
                <span>{authLoading ? 'Signing up...' : 'Sign up with Google'}</span>
              </motion.button>

              <div className="flex items-center gap-3 my-0.5 w-full">
                <div className="flex-grow h-[1px] bg-slate-200"></div>
                <span className="text-xs font-semibold text-slate-400 shrink-0">or sign up with email</span>
                <div className="flex-grow h-[1px] bg-slate-200"></div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setView('signup')}
                className="w-full h-12 bg-[#EBF3FE] border-2 border-transparent text-[#0172FD] rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-3 hover:bg-[#D6E6FE] transition-all cursor-pointer"
              >
                <Mail className="w-4.5 h-4.5 text-[#0172FD]" />
                <span>Sign up with email</span>
              </motion.button>
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
            className="w-full max-w-[420px] flex flex-col gap-3 text-center"
          >
            <h2 className="text-xl font-[900] text-slate-800" style={{ fontFamily: 'var(--font-jakarta)' }}>
              {isLinkAccountMode ? 'Activate Student Profile' : 'Create Account'}
            </h2>

            {isLinkAccountMode && (
              <div className="text-xs text-blue-900 font-medium px-4 text-center bg-blue-50 py-2 rounded-xl border border-blue-200">
                {linkPromptMessage || 'Enter your password to activate your Student profile.'}
              </div>
            )}

            {authError && <div className="text-xs text-red-500 font-semibold px-4 text-center bg-red-50 py-2 rounded-xl">{authError}</div>}

            {!isLinkAccountMode && (
              <div className="w-full relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 text-sm font-semibold"
                />
              </div>
            )}

            <div className="w-full relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 text-sm font-semibold"
              />
            </div>

            <div className="w-full relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={isLinkAccountMode ? 'Account Password' : 'Password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-11 pr-11 bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 text-sm font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex gap-2 w-full mt-1">
              <button
                type="button"
                onClick={() => setView('options')}
                className="px-4 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm"
              >
                Back
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={authLoading}
                className="flex-1 h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-xl font-[900] text-sm flex items-center justify-center cursor-pointer shadow-md"
              >
                <span>{authLoading ? 'Signing up...' : isLinkAccountMode ? 'Activate Profile' : 'Create Account'}</span>
              </motion.button>
            </div>
          </motion.form>
        )}

        {view === 'verification' && (
          <motion.div
            key="verification"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-[420px] flex flex-col items-center text-center gap-3"
          >
            <div className="w-12 h-12 bg-[#EBF3FE] rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#0172FD]" />
            </div>

            <h2 className="text-xl font-[900] text-slate-800" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Check your email!
            </h2>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              We sent a 6-digit code to <strong className="text-[#0172FD]">{maskEmail(email)}</strong>.
            </p>

            <form onSubmit={handleVerifyCode} className="w-full flex flex-col gap-3">
              {verificationError && (
                <div className="text-xs text-red-500 font-semibold text-center bg-red-50 p-2 rounded-xl">{verificationError}</div>
              )}
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full h-12 text-center text-xl font-mono tracking-[8px] bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 font-bold"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                disabled={verifyingCode}
                className="w-full h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-sm flex items-center justify-center shadow-md cursor-pointer"
              >
                <span>{verifyingCode ? 'Verifying...' : 'Verify Code & Continue'}</span>
              </motion.button>
            </form>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mt-2">
              {resendStatus === 'success' && (
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Code resent!
                </span>
              )}
              {countdown > 0 ? (
                <span>Resend in {countdown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resending}
                  className="text-[#0172FD] font-bold hover:underline cursor-pointer"
                >
                  {resending ? 'Sending...' : 'Resend code'}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
