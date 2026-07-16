'use client';
import { playHaptic } from '@/lib/haptics';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Mail, Lock, User, Eye, EyeOff, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';
import { getOnboardingState } from '@/lib/user-onboarding';
import { signInWithGoogle } from '@/lib/firebase';

// ─── Animation variants ──────────────────────────────────────────────────────
const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } }
};
const wordVariant: any = {
  hidden: { y: 20, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } }
};
const accentVariant: any = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show:   { y: 0,  opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } }
};

export default function OnboardingStep12() {
  const router = useRouter();
  const { isLoading, advance } = useOnboardingSession(12);
  const [view, setView] = useState<'options' | 'signup' | 'verification'>('options');
  const [idle, setIdle] = useState(false);

  // Email form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Verification state
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (isLoading) return <StepSkeleton />;

  const handleGoogleSignup = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();
      const localState = getOnboardingState();

      // Register the user as STUDENT (user onboarding, not creator onboarding)
      const res = await fetch(`/api/auth/firebase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          idToken,
          role: 'STUDENT',
          onboarding: localState.answers
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Social sign up failed');
      }

      playHaptic('medium');
      void advance();
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
      // Register the user as STUDENT (user onboarding, not creator onboarding)
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          fullName,
          password,
          role: 'STUDENT',
          onboarding: localState.answers
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errMsg || 'Signup failed');
      }

      // Transition to verification screen
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
        body: JSON.stringify({ email: email.toLowerCase().trim() })
      });

      if (!res.ok) throw new Error('Resend failed');

      setResendStatus('success');
      setCountdown(60);
    } catch (err) {
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
      void advance();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Verification failed';
      setVerificationError(msg);
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleBack = () => {
    playHaptic('light');
    if (view === 'signup') {
      setView('options');
      setAuthError('');
    } else if (view === 'verification') {
      setView('options');
      setAuthError('');
    } else {
      router.push('/onboarding/11');
    }
  };

  const maskEmail = (str: string) => {
    if (!str || !str.includes('@')) return str;
    const [name, domain] = str.split('@');
    if (name.length <= 2) return `${name[0]}***@${domain}`;
    return `${name.substring(0, 2)}***${name.substring(name.length - 1)}@${domain}`;
  };

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="w-full relative select-none bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden">
      
      {/* 📱 MOBILE-ONLY LAYOUT: Strict 50/50 Flex Split - 100dvh hard lock, no scroll */}
      <div className="flex flex-col w-full relative z-10 md:hidden" style={{ height: '100dvh', overflow: 'hidden' }}>
        
        {/* Top 50% Image Container */}
        <div className="flex-1 w-full flex flex-col justify-start items-center relative overflow-hidden">
          
          {/* Mobile Progress Bar */}
          <div className="w-full px-6 flex items-center gap-4 shrink-0 relative z-20 pt-[max(env(safe-area-inset-top),12px)] pb-3">
            <div className="flex-1 h-2.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(11 / 15) * 100}%` }}
                animate={{ width: `${(12 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                  boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.3)',
                }}
              />
            </div>
            <span className="text-sm font-[800] text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>
              12/15
            </span>
          </div>

          {/* Mascot area - fills remaining top flex space */}
          <div className="w-full flex-1 flex items-center justify-center relative min-h-0">
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MascotBackground />
            </div>
            <motion.div
              layoutId="tey-mascot"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative w-[80vw] h-[80%] z-10"
            >
              <Image 
                src="/User onbarding Assets/Step_12_image_mobile.webp" 
                alt="Tey Mascot Mobile" 
                fill 
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.1)]" 
                priority 
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom 50% Text & CTA Container - top 40px fades out white background to show blue underneath */}
        <div 
          className="flex-1 w-full flex flex-col items-center relative z-20 overflow-hidden" 
          style={{ 
            paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 40px, rgba(255, 255, 255, 1) 100%)'
          }}
        >
          
          <AnimatePresence mode="wait">
            {view === 'options' && (
              <motion.div 
                key="options"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full flex flex-col justify-between pt-8 px-6 relative z-20"
              >
                {/* Typography container */}
                <div className="w-full flex flex-col items-center text-center pt-2 px-2 shrink-0">
                  <motion.h1
                    variants={headlineContainer}
                    initial="hidden"
                    animate="show"
                    className="font-[900] leading-[1.05] mb-2 tracking-tight text-[#071233] w-[70vw] mx-auto text-center"
                    style={{ 
                      fontFamily: 'var(--font-jakarta)', 
                      textShadow: headlineShadow,
                      fontSize: 'clamp(2.1rem, calc(5.5vw + 3.2vh), 3.2rem)'
                    }}
                  >
                    <div className="whitespace-nowrap">
                      <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Save</motion.span>
                      <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
                    </div>
                    <div className="whitespace-nowrap">
                      <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>progress</motion.span>
                    </div>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
                    className="text-[3.4vw] xs:text-[3.6vw] sm:text-sm font-medium text-slate-500 leading-tight max-w-[85%]"
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                  >
                    Create an account to save your achievements and continue anytime.
                  </motion.p>
                </div>

                {/* Buttons container */}
                <div className="w-full flex flex-col items-center gap-3 shrink-0 mt-auto mb-[2vh]">
                  {authError && (
                    <div className="text-xs text-red-500 font-semibold px-4 text-center max-w-[80vw]">
                      {authError}
                    </div>
                  )}

                  {/* Sign Up with Google */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleGoogleSignup}
                    disabled={authLoading}
                    className="w-[80vw] h-12 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-3 shadow-sm hover:bg-slate-50 transition-all"
                  >
                    <Image 
                      src="/User onbarding Assets/google.webp" 
                      alt="Google Logo" 
                      width={18} 
                      height={18} 
                      className="object-contain" 
                    />
                    <span>{authLoading ? 'Signing up...' : 'Sign up with Google'}</span>
                  </motion.button>

                  {/* Divider line */}
                  <div className="flex items-center gap-3 my-1 w-[80vw]">
                    <div className="flex-grow h-[1px] bg-slate-200"></div>
                    <span className="text-xs font-semibold text-slate-400 shrink-0">or sign up with email</span>
                    <div className="flex-grow h-[1px] bg-slate-200"></div>
                  </div>

                  {/* Continue with Email */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setView('signup')}
                    className="w-[80vw] h-12 bg-[#EBF3FE] border-2 border-transparent text-[#0172FD] rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-3 hover:bg-[#D6E6FE] transition-all"
                  >
                    <Mail className="w-4.5 h-4.5 text-[#0172FD]" />
                    <span>Sign up with email</span>
                  </motion.button>

                  {/* Back button of equal width */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleBack}
                    className="w-[80vw] h-12 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                    <span>Back</span>
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
                className="w-full h-full flex flex-col justify-between pt-4 px-6 relative z-20"
              >
                <div className="w-full flex flex-col gap-3 pt-2 shrink-0">
                  <h2 className="text-xl font-[900] text-slate-800 text-center" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    Create Account
                  </h2>

                  {authError && (
                    <div className="text-xs text-red-500 font-semibold px-4 text-center bg-red-50 py-2 rounded-xl">
                      {authError}
                    </div>
                  )}

                  {/* Name field */}
                  <div className="w-full relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Full Name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 text-sm font-semibold transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="w-full relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="email"
                      placeholder="Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 text-sm font-semibold transition-all"
                    />
                  </div>

                  {/* Password field */}
                  <div className="w-full relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 text-sm font-semibold transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-3 shrink-0 mt-auto">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    disabled={authLoading}
                    className="w-full h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center shadow-[0_4px_15px_rgba(1,114,253,0.25)]"
                  >
                    <span>{authLoading ? 'Signing up...' : 'Sign up with email'}</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleBack}
                    className="w-full h-12 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm mb-2"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                    <span>Back</span>
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
                className="w-full h-full flex flex-col justify-between pt-4 px-6 relative z-20 text-center"
              >
                <div className="w-full flex-1 flex flex-col justify-center items-center gap-3 pt-2">
                  <div className="w-12 h-12 bg-[#EBF3FE] rounded-full flex items-center justify-center mb-1">
                    <Mail className="w-6 h-6 text-[#0172FD]" />
                  </div>

                  <h2 className="text-lg font-[900] text-slate-800" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    Check your email!
                  </h2>

                  <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[85%]">
                    We sent a 6-digit code to <strong className="text-[#0172FD]">{maskEmail(email)}</strong>.
                  </p>

                  {/* Code Input Form */}
                  <form onSubmit={handleVerifyCode} className="w-[80vw] flex flex-col gap-3 mt-2">
                    {verificationError && (
                      <div className="text-xs text-red-500 font-semibold text-center bg-red-50 p-2 rounded-xl">
                        {verificationError}
                      </div>
                    )}
                    <div className="w-full relative">
                      <input 
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        required
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full h-12 text-center text-xl font-mono tracking-[8px] bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 font-bold transition-all"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      disabled={verifyingCode}
                      className="w-full h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-sm flex items-center justify-center gap-2 hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all shadow-[0_4px_15px_rgba(1,114,253,0.25)]"
                    >
                      <span>{verifyingCode ? 'Verifying...' : 'Verify Code & Continue'}</span>
                    </motion.button>
                  </form>
                </div>

                <div className="w-full flex flex-col items-center gap-3 shrink-0 mt-auto pb-4">
                  {resendStatus === 'success' && (
                    <div className="text-xs text-green-600 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Code resent! (Check spam too)
                    </div>
                  )}

                  {resendStatus === 'error' && (
                    <div className="text-xs text-red-500 font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> Resend failed. Please try again.
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleResendVerification}
                    disabled={resending || countdown > 0}
                    className="w-[80vw] h-12 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-[800] flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 disabled:opacity-60 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {resending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleBack}
                    className="w-[80vw] h-12 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm mb-2"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                    <span>Back</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 🖥️ DESKTOP-ONLY LAYOUT */}
      <div className="hidden md:flex flex-row w-full h-screen relative z-10 overflow-hidden items-stretch justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF]">
        
        {/* Teyro! Logo at top left */}
        <div className="absolute top-8 left-12 z-20 flex items-center">
          <span className="text-[#0172FD] font-[900] text-3xl tracking-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
            Teyro!
          </span>
        </div>

        {/* Left Column (50%): Mascot Container with bubble background */}
        <div className="w-1/2 h-full flex items-center justify-center relative bg-transparent overflow-hidden select-none">
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <MascotBackground />
          </div>
          <motion.div
            layoutId="tey-mascot-desktop"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="relative w-[80%] h-[80%] z-10 flex items-center justify-center"
          >
            <Image 
              src="/User onbarding Assets/Step_12_image_desktop.webp" 
              alt="Tey Mascot Desktop" 
              fill 
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]" 
              priority 
            />
          </motion.div>
        </div>

        {/* Right Column (50%): Content Container */}
        <div className="w-1/2 h-full bg-transparent flex flex-col justify-between p-12 lg:p-20 relative select-none">
          
          {/* Progress row - top right */}
          <div className="w-full flex items-center gap-5 relative z-10 pt-4 shrink-0">
            <div className="flex-grow"></div>
            <div className="w-1/2 h-3.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(11 / 15) * 100}%` }}
                animate={{ width: `${(12 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.25 }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                  boxShadow: 'inset 0px -3px 0px rgba(0,0,0,0.1), inset 0px 3px 0px rgba(255,255,255,0.3)',
                }}
              />
            </div>
            <span className="text-base font-extrabold text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>
              12/15
            </span>
          </div>

          {/* Core Content Box */}
          <div className="w-full flex-1 flex flex-col justify-center items-start relative z-10">
            <AnimatePresence mode="wait">
              {view === 'options' && (
                <motion.div
                  key="options-desktop"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full flex flex-col items-start"
                >
                  <motion.h1
                    variants={headlineContainer}
                    initial="hidden"
                    animate="show"
                    className="text-[3.8rem] lg:text-[4.8rem] font-[800] leading-[1.05] mb-6 tracking-tighter text-[#071233] text-left w-[70%]"
                    style={{
                      fontFamily: 'var(--font-jakarta)',
                      textShadow: headlineShadow,
                    }}
                  >
                    <div className="whitespace-nowrap">
                      <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Save</motion.span>
                      <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
                    </div>
                    <div className="whitespace-nowrap">
                      <motion.span 
                        variants={accentVariant} 
                        className="text-[#0172FD]" 
                        style={{ display: 'inline-block', textShadow: accentShadow }}
                      >
                        progress
                      </motion.span>
                    </div>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.4 }}
                    className="text-[1.15rem] lg:text-2xl font-medium text-left text-slate-600 leading-snug mb-8 w-[70%]"
                    style={{
                      fontFamily: 'var(--font-jakarta)',
                      textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)',
                    }}
                  >
                    Create an account to save your achievements and continue anytime.
                  </motion.p>

                  <div className="w-full flex flex-col gap-4">
                    {authError && (
                      <div className="text-sm text-red-500 font-semibold px-1 mb-2">
                        {authError}
                      </div>
                    )}

                    {/* Sign Up with Google */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGoogleSignup}
                      disabled={authLoading}
                      className="w-full md:w-[70%] h-14 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-base flex items-center justify-center gap-3 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <Image 
                        src="/User onbarding Assets/google.webp" 
                        alt="Google Logo" 
                        width={22} 
                        height={22} 
                        className="object-contain" 
                      />
                      <span>{authLoading ? 'Signing up...' : 'Sign up with Google'}</span>
                    </motion.button>

                    {/* Divider line */}
                    <div className="flex items-center gap-4 my-2 w-full md:w-[70%]">
                      <div className="flex-grow h-[1px] bg-slate-200"></div>
                      <span className="text-sm font-semibold text-slate-400 shrink-0">or sign up with email</span>
                      <div className="flex-grow h-[1px] bg-slate-200"></div>
                    </div>

                    {/* Sign up with email */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setView('signup')}
                      className="w-full md:w-[70%] h-14 bg-[#EBF3FE] border-2 border-transparent text-[#0172FD] rounded-[1.2rem] font-[800] text-base flex items-center justify-center gap-3 hover:bg-[#D6E6FE] transition-all cursor-pointer"
                    >
                      <Mail className="w-5 h-5 text-[#0172FD]" />
                      <span>Sign up with email</span>
                    </motion.button>

                    {/* Full width Back button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBack}
                      className="w-full md:w-[70%] h-14 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-base flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                      <span>Back</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {view === 'signup' && (
                <motion.form
                  key="signup-desktop"
                  onSubmit={handleEmailSignup}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full flex flex-col items-start"
                >
                  <h2 className="text-3xl font-[900] text-slate-800 mb-6" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    Create Account
                  </h2>

                  {authError && (
                    <div className="text-sm text-red-500 font-semibold px-4 py-2 bg-red-50 rounded-xl mb-4 w-full md:w-[70%]">
                      {authError}
                    </div>
                  )}

                  <div className="w-full flex flex-col gap-4 w-full md:w-[70%] mb-8">
                    {/* Name */}
                    <div className="w-full relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="Full Name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 text-base font-semibold transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="w-full relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-slate-400" />
                      <input 
                        type="email"
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 text-base font-semibold transition-all"
                      />
                    </div>

                    {/* Password */}
                    <div className="w-full relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-slate-400" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 text-base font-semibold transition-all"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? <EyeOff className="w-5.5 h-5.5" /> : <Eye className="w-5.5 h-5.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-4 w-full md:w-[70%]">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={authLoading}
                      className="w-full h-14 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-lg tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center shadow-[0_4px_15px_rgba(1,114,253,0.25)] cursor-pointer"
                    >
                      <span>{authLoading ? 'Signing up...' : 'Sign up with email'}</span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBack}
                      className="w-full h-14 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-base flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                      <span>Back</span>
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {view === 'verification' && (
                <motion.div
                  key="verification-desktop"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full flex flex-col items-start text-left"
                >
                  <div className="w-16 h-16 bg-[#EBF3FE] rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-[#0172FD]" />
                  </div>

                  <h2 className="text-3xl font-[900] text-slate-800 mb-4" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    Check your email!
                  </h2>

                  <p className="text-lg text-slate-500 font-medium leading-relaxed mb-4">
                    We sent a 6-digit verification code to <br/>
                    <strong className="text-[#0172FD] font-extrabold">{maskEmail(email)}</strong>.
                  </p>

                  {/* Desktop Code Input Form */}
                  <form onSubmit={handleVerifyCode} className="w-full md:w-[70%] flex flex-col gap-4 mb-4">
                    {verificationError && (
                      <div className="text-sm text-red-500 font-semibold bg-red-50 p-3 rounded-xl">
                        {verificationError}
                      </div>
                    )}
                    <div className="w-full relative">
                      <input 
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        required
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full h-14 text-center text-2xl font-mono tracking-[12px] bg-slate-50 border border-slate-200 rounded-[1rem] focus:outline-none focus:border-[#0172FD] text-slate-800 font-bold transition-all"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={verifyingCode}
                      className="w-full h-14 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center shadow-[0_4px_15px_rgba(1,114,253,0.25)] cursor-pointer"
                    >
                      <span>{verifyingCode ? 'Verifying...' : 'Verify Code & Continue'}</span>
                    </motion.button>
                  </form>

                  <div className="w-full flex flex-col gap-4 w-full md:w-[70%]">
                    {resendStatus === 'success' && (
                      <div className="text-sm text-green-600 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4.5 h-4.5" /> Code resent! (Check spam too)
                      </div>
                    )}

                    {resendStatus === 'error' && (
                      <div className="text-sm text-red-500 font-bold flex items-center gap-1.5">
                        <AlertCircle className="w-4.5 h-4.5" /> Resend failed. Please try again.
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleResendVerification}
                      disabled={resending || countdown > 0}
                      className="w-full h-14 bg-white border-2 border-slate-200 text-slate-700 rounded-xl text-sm font-[800] flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 disabled:opacity-60 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {resending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
                      </span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBack}
                      className="w-full h-14 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-base flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer animate-none"
                    >
                      <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                      <span>Back</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom space for visual alignment */}
          <div className="h-4"></div>

        </div>

      </div>

    </div>
  );
}
