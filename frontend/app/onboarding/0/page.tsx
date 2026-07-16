'use client';
import { playHaptic } from '@/lib/haptics';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, UserPlus, LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { getOnboardingState } from '@/lib/user-onboarding';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';
import { signInWithGoogle } from '@/lib/firebase';

export default function OnboardingStep0() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [idle, setIdle] = useState(false);
  const [view, setView] = useState<'options' | 'signin' | 'forgotpassword' | 'forgot-success'>('options');

  // Sign In Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password States
  const [resetEmail, setResetEmail] = useState('');

  // Status States
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Basic initialization check
    const state = getOnboardingState();
    if (state.onboardingComplete) {
      router.replace('/dashboard');
      return;
    }
    setIsLoading(false);
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, [router]);

  if (isLoading) return <StepSkeleton />;

  const handleGetStarted = () => {
    playHaptic(12);
    router.push('/onboarding/1');
  };

  const handleBack = () => {
    playHaptic(10);
    setError('');
    setSuccess('');
    
    if (view === 'signin') {
      setView('options');
    } else if (view === 'forgotpassword' || view === 'forgot-success') {
      setView('signin');
    } else {
      router.push('/');
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
          password 
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errMsg || 'Login failed');
      }

      playHaptic(12);
      
      // If user has both profiles, let them pick their mode first
      window.location.href = data.hasBothRoles ? '/role-select' : '/dashboard';
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: resetEmail.toLowerCase().trim(),
          role: 'STUDENT'
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Something went wrong. Please try again.');
      }

      playHaptic(12);
      setView('forgot-success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send reset link';
      setError(message);
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
        body: JSON.stringify({ idToken, role: 'STUDENT' }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Social login failed');
      }

      playHaptic(12);
      window.location.href = data.hasBothRoles ? '/role-select' : '/dashboard';
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Google authentication failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const textShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';
  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';
  const accentShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';

  const isFormView = view === 'signin' || view === 'forgotpassword' || view === 'forgot-success';

  return (
    <div className="w-full relative select-none bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden">
      
      {/* 📱 MOBILE-ONLY LAYOUT: Strict 100dvh lock, no scroll */}
      <div className="flex flex-col w-full relative z-10 md:hidden" style={{ height: '100dvh', overflow: 'hidden' }}>
        
        {/* Top Image Container - dynamic height based on view mode to prevent scrolling */}
        <div 
          className="w-full flex flex-col justify-start items-center relative overflow-hidden shrink-0 transition-all duration-300"
          style={{ height: isFormView ? '35dvh' : '60dvh' }}
        >
          {/* Back button at top left */}
          <div className="w-full px-6 flex items-center shrink-0 relative z-30 pt-[max(env(safe-area-inset-top),12px)] pb-3">
            <button 
              onClick={handleBack} 
              className="w-10 h-10 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700 stroke-[2.5]" />
            </button>
          </div>

          {/* Bubbles Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <MascotBackground />
          </div>

          {/* Mascot Image */}
          <div className="relative w-full flex-grow flex items-center justify-center z-20 min-h-0">
            <motion.div
              layoutId="tey-mascot"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative w-[80%] h-[80%] flex items-center justify-center"
            >
              <Image 
                src="/User onbarding Assets/Step_7_tey_verified_state.webp" 
                alt="Tey Mascot Verified Mobile" 
                fill 
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)]" 
                priority 
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Text & CTA Container - dynamic height based on view mode to prevent scrolling */}
        <div 
          className="w-full flex flex-col items-center relative z-20 px-6 bg-white shrink-0 transition-all duration-300"
          style={{ 
            height: isFormView ? '65dvh' : '40dvh',
            paddingBottom: 'max(env(safe-area-inset-bottom), 16px)'
          }}
        >
          {/* Soft top gradient overlay */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

          <AnimatePresence mode="wait">
            {view === 'options' && (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col justify-center items-center gap-4 py-2 z-20"
              >
                {/* Account check section */}
                <div className="w-full flex flex-col items-center text-center">
                  <h2 className="text-[4.2vw] xs:text-[4.5vw] sm:text-base font-extrabold text-[#071233] mb-1.5" style={{ textShadow }}>
                    Already have an account?
                  </h2>
                  <motion.button
                    animate={idle ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                    transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      playHaptic(10);
                      setView('signin');
                    }}
                    className="w-[70%] h-11 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.1rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(1,114,253,0.2)] cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 stroke-[3]" />
                    <span>SIGN IN</span>
                  </motion.button>
                </div>

                {/* Divider line */}
                <div className="w-[70%] border-t border-slate-100 my-1" />

                {/* New user section */}
                <div className="w-full flex flex-col items-center text-center">
                  <h2 className="text-[4.2vw] xs:text-[4.5vw] sm:text-base font-extrabold text-[#071233] mb-1.5" style={{ textShadow }}>
                    New to Teyro?
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleGetStarted}
                    className="w-[70%] h-11 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.1rem] font-[800] text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 stroke-[2.5]" />
                    <span>GET STARTED</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {view === 'signin' && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col justify-between pt-4 pb-2 z-20"
              >
                {/* Sign-in Header */}
                <div className="w-full text-center">
                  <h2 className="text-xl font-[900] text-[#071233]" style={{ textShadow }}>Welcome back</h2>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">Please enter your details to sign in.</p>
                </div>

                {/* Form Inputs Container */}
                <form onSubmit={handleEmailLogin} className="w-full flex-grow flex flex-col justify-center gap-3 my-2 max-w-[340px] mx-auto">
                  {error && (
                    <div className="w-full bg-red-50 border border-red-100 rounded-[10px] p-2.5 flex items-center gap-2 text-red-600 text-xs font-bold leading-tight shrink-0 shadow-sm animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Email input */}
                  <div className="flex flex-col gap-1 w-full">
                    <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-100 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                      <Mail className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-full bg-transparent pl-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Password input */}
                  <div className="flex flex-col gap-1 w-full">
                    <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-100 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                      <Lock className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full h-full bg-transparent pl-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-slate-600 shrink-0 ml-1.5 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {/* Forgot password link */}
                    <div className="w-full text-right px-0.5 mt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setView('forgotpassword');
                          setError('');
                          setResetEmail(email);
                        }}
                        className="text-xs font-bold text-[#0172FD] hover:underline focus:outline-none cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {/* Log In CTA button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.1rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(1,114,253,0.2)] cursor-pointer mt-1"
                  >
                    <span>{loading ? 'LOGGING IN...' : 'LOG IN'}</span>
                  </motion.button>
                </form>

                {/* Google Sign In option */}
                <div className="w-full flex flex-col gap-2 shrink-0 items-center max-w-[340px] mx-auto mt-1">
                  <div className="flex items-center gap-2.5 w-[75%] my-1.5">
                    <div className="flex-1 h-[1px] bg-slate-100" />
                    <span className="text-[10px] font-extrabold text-slate-400 tracking-wider">OR</span>
                    <div className="flex-1 h-[1px] bg-slate-100" />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-[70%] h-10 bg-white border-2 border-slate-200 text-slate-700 rounded-[1rem] font-[800] text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                  >
                    <FaGoogle className="w-3.5 h-3.5 text-slate-500" />
                    <span>Continue with Google</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {view === 'forgotpassword' && (
              <motion.div
                key="forgotpassword"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col justify-between pt-6 pb-4 z-20"
              >
                <div className="w-full text-center">
                  <h2 className="text-xl font-[900] text-[#071233]" style={{ textShadow }}>Forgot Password</h2>
                  <p className="text-xs font-semibold text-slate-400 mt-1 max-w-[85%] mx-auto text-center leading-normal">Enter your email address and we{"'"}ll send you a link to reset your password.</p>
                </div>

                <form onSubmit={handleForgotPassword} className="w-full flex-grow flex flex-col justify-center gap-4 my-4 max-w-[340px] mx-auto">
                  {error && (
                    <div className="w-full bg-red-50 border border-red-100 rounded-[10px] p-2.5 flex items-center gap-2 text-red-600 text-xs font-bold leading-tight shrink-0 shadow-sm animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Reset Email Input */}
                  <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-100 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                    <Mail className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="w-full h-full bg-transparent pl-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.1rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(1,114,253,0.2)] cursor-pointer"
                  >
                    <span>{loading ? 'SENDING LINK...' : 'SEND RESET LINK'}</span>
                  </motion.button>
                </form>

                <div className="w-full text-center shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setView('signin');
                      setError('');
                    }}
                    className="text-xs font-extrabold text-slate-500 hover:text-[#0172FD] transition-colors cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              </motion.div>
            )}

            {view === 'forgot-success' && (
              <motion.div
                key="forgot-success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col justify-center items-center gap-4 text-center z-20 py-4"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-1 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>

                <div>
                  <h2 className="text-xl font-[900] text-[#071233]">Check your email</h2>
                  <p className="text-xs font-semibold text-slate-500 mt-2 max-w-[85%] mx-auto leading-relaxed text-center">
                    We has sent a link to <span className="text-slate-800 font-bold">{resetEmail}</span>. Click the link inside the email to reset your password.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setView('signin');
                    setError('');
                  }}
                  className="w-[70%] h-11 bg-[#EBF3FE] hover:bg-[#D3E5FD] text-[#0172FD] rounded-[1.1rem] font-[900] text-sm tracking-wider transition-all flex items-center justify-center cursor-pointer mt-4"
                >
                  Back to Sign In
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 🖥️ DESKTOP-ONLY LAYOUT */}
      <div className="hidden md:flex w-full h-screen items-center justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] p-8 lg:p-12 relative z-10">
        
        {/* Main 70vw transparent layout container */}
        <div className="w-[70vw] h-full flex flex-row-reverse relative overflow-hidden items-center justify-center gap-12 lg:gap-20">
          
          {/* Right Column (70%): Branding Container with bubbles */}
          <div className="w-[70%] h-full flex items-center justify-center relative select-none">
            {/* Background floating animations */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MascotBackground />
            </div>

            {/* Glowing Backdrop */}
            <div className="absolute w-[60%] aspect-square rounded-full opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(1,114,253,0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            
            {/* Mascot Container */}
            <motion.div
              layoutId="tey-mascot-desktop"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative w-[80%] h-[80%] z-10 flex items-center justify-center"
            >
              <Image 
                src="/User onbarding Assets/Step_7_tey_verified_state.webp" 
                alt="Tey Mascot Verified Desktop" 
                fill 
                className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.12)]" 
                priority 
              />
            </motion.div>
          </div>

          {/* Left Column (30%): Content Container without background */}
          <div className="w-[30%] h-full flex flex-col justify-center items-start py-12 relative select-none pl-4">
            
            {/* Back button */}
            <div className="relative z-10 mb-8 shrink-0">
              <button 
                onClick={handleBack} 
                className="w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Core Content Box with animated views */}
            <div className="w-full flex-grow flex flex-col justify-center items-start relative z-10 min-h-0">
              <AnimatePresence mode="wait">
                {view === 'options' && (
                  <motion.div
                    key="desktop-options"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex flex-col items-start"
                  >
                    {/* Account Check Section */}
                    <div className="w-full mb-8">
                      <h1 className="text-2xl lg:text-3xl font-[900] text-[#071233] text-left w-full mb-3 tracking-tight" style={{ textShadow: headlineShadow }}>
                        Already have an account?
                      </h1>
                      <motion.button
                        animate={idle ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                        transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          playHaptic(10);
                          setView('signin');
                        }}
                        className="w-full max-w-[320px] h-14 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-3 shadow-[0_4px_15px_rgba(1,114,253,0.25)] cursor-pointer"
                      >
                        <LogIn className="w-5 h-5 stroke-[3]" />
                        <span>SIGN IN</span>
                      </motion.button>
                    </div>

                    {/* Divider line */}
                    <div className="w-full max-w-[320px] border-t border-slate-200/60 my-4" />

                    {/* New User Section */}
                    <div className="w-full mt-4">
                      <h1 className="text-2xl lg:text-3xl font-[900] text-[#071233] text-left w-full mb-3 tracking-tight" style={{ textShadow: headlineShadow }}>
                        New to Teyro?
                      </h1>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGetStarted}
                        className="w-full max-w-[320px] h-14 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-base flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                      >
                        <UserPlus className="w-5 h-5 stroke-[2.5]" />
                        <span>GET STARTED</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {view === 'signin' && (
                  <motion.div
                    key="desktop-signin"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex flex-col items-start max-w-[320px]"
                  >
                    <div className="mb-6">
                      <h1 className="text-2xl lg:text-3xl font-[900] text-[#071233] text-left" style={{ textShadow: headlineShadow }}>
                        Welcome back
                      </h1>
                      <p className="text-sm font-semibold text-slate-400 mt-1">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-4">
                      {error && (
                        <div className="w-full bg-red-50 border border-red-100 rounded-[10px] p-3 flex items-center gap-2 text-red-600 text-sm font-bold leading-tight shadow-sm">
                          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                          <span>{error}</span>
                        </div>
                      )}

                      {/* Email input */}
                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs font-extrabold text-slate-400 tracking-wider">EMAIL</label>
                        <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-200/80 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                          <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                          <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full h-full bg-transparent pl-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Password input */}
                      <div className="flex flex-col gap-1.5 w-full">
                        <div className="flex justify-between items-center w-full">
                          <label className="text-xs font-extrabold text-slate-400 tracking-wider">PASSWORD</label>
                          <button
                            type="button"
                            onClick={() => {
                              setView('forgotpassword');
                              setError('');
                              setResetEmail(email);
                            }}
                            className="text-xs font-bold text-[#0172FD] hover:underline focus:outline-none cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-200/80 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                          <Lock className="w-5 h-5 text-slate-400 shrink-0" />
                          <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full h-full bg-transparent pl-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-slate-400 hover:text-slate-600 shrink-0 ml-1.5 focus:outline-none"
                          >
                            {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Log In submit button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(1,114,253,0.2)] cursor-pointer mt-2"
                      >
                        <span>{loading ? 'LOGGING IN...' : 'LOG IN'}</span>
                      </motion.button>
                    </form>

                    {/* Google divider */}
                    <div className="w-full flex items-center gap-2.5 my-4">
                      <div className="flex-grow h-[1px] bg-slate-200/60" />
                      <span className="text-[10px] font-extrabold text-slate-400 tracking-wider">OR</span>
                      <div className="flex-grow h-[1px] bg-slate-200/60" />
                    </div>

                    {/* Google Sign In button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className="w-full h-12 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                    >
                      <FaGoogle className="w-4 h-4 text-slate-500" />
                      <span>Continue with Google</span>
                    </motion.button>
                  </motion.div>
                )}

                {view === 'forgotpassword' && (
                  <motion.div
                    key="desktop-forgot"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex flex-col items-start max-w-[320px]"
                  >
                    <div className="mb-6">
                      <h1 className="text-2xl lg:text-3xl font-[900] text-[#071233] text-left" style={{ textShadow: headlineShadow }}>
                        Forgot Password
                      </h1>
                      <p className="text-sm font-semibold text-slate-400 mt-2 text-left leading-relaxed">
                        Enter your email address and we{"'"}ll send you a link to reset your password.
                      </p>
                    </div>

                    <form onSubmit={handleForgotPassword} className="w-full flex flex-col gap-4">
                      {error && (
                        <div className="w-full bg-red-50 border border-red-100 rounded-[10px] p-3 flex items-center gap-2 text-red-600 text-sm font-bold leading-tight shadow-sm">
                          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                          <span>{error}</span>
                        </div>
                      )}

                      {/* Reset Email Input */}
                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs font-extrabold text-slate-400 tracking-wider">EMAIL ADDRESS</label>
                        <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-200/80 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                          <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                          <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                            className="w-full h-full bg-transparent pl-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(1,114,253,0.2)] cursor-pointer mt-2"
                      >
                        <span>{loading ? 'SENDING LINK...' : 'SEND RESET LINK'}</span>
                      </motion.button>
                    </form>

                    <div className="w-full text-center mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setView('signin');
                          setError('');
                        }}
                        className="text-sm font-extrabold text-slate-500 hover:text-[#0172FD] transition-colors cursor-pointer"
                      >
                        Back to Sign In
                      </button>
                    </div>
                  </motion.div>
                )}

                {view === 'forgot-success' && (
                  <motion.div
                    key="desktop-success"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex flex-col items-center max-w-[320px] text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>

                    <h1 className="text-2xl lg:text-3xl font-[900] text-[#071233] mb-2 tracking-tight">Check your email</h1>
                    <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-6 text-center">
                      We has sent a link to <span className="text-slate-800 font-bold">{resetEmail}</span>. Click the link inside the email to reset your password.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setView('signin');
                        setError('');
                      }}
                      className="w-full h-12 bg-[#EBF3FE] hover:bg-[#D3E5FD] text-[#0172FD] rounded-[1.2rem] font-[900] text-sm tracking-wider transition-all flex items-center justify-center cursor-pointer"
                    >
                      Back to Sign In
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom space for visual alignment */}
            <div className="h-12"></div>

          </div>

        </div>

      </div>

    </div>
  );
}
