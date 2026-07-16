'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // Input states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or expired reset token. Please request a new one.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!token) {
      setError('Reset token is missing.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Reset failed. Token might be expired.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    router.push('/onboarding/0');
  };

  const textShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';
  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';

  return (
    <div className="w-full relative select-none bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden">
      
      {/* 📱 MOBILE-ONLY LAYOUT: Strict 100dvh lock, no scroll */}
      <div className="flex flex-col w-full relative z-10 md:hidden" style={{ height: '100dvh', overflow: 'hidden' }}>
        
        {/* Top Image Container - dynamic height to prevent scrolling */}
        <div className="w-full h-[35dvh] flex flex-col justify-start items-center relative overflow-hidden shrink-0">
          {/* Back button at top left */}
          <div className="w-full px-6 flex items-center shrink-0 relative z-30 pt-[max(env(safe-area-inset-top),12px)] pb-3">
            <button 
              onClick={handleBackToSignIn} 
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
            <div className="relative w-[80%] h-[80%] flex items-center justify-center">
              <Image 
                src="/User onbarding Assets/Step_7_tey_verified_state.webp" 
                alt="Tey Mascot Verified Mobile" 
                fill 
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)]" 
                priority 
              />
            </div>
          </div>
        </div>

        {/* Bottom Text & CTA Container - dynamic height to prevent scrolling */}
        <div 
          className="w-full h-[65dvh] flex flex-col items-center relative z-20 px-6 bg-white shrink-0"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
        >
          {/* Soft top gradient overlay */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

          {!success ? (
            <div className="w-full h-full flex flex-col justify-between pt-4 pb-2 z-20">
              {/* Form Header */}
              <div className="w-full text-center">
                <h2 className="text-xl font-[900] text-[#071233]" style={{ textShadow }}>Reset Password</h2>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Please choose a secure new password.</p>
              </div>

              {/* Form Inputs Container */}
              <form onSubmit={handleSubmit} className="w-full flex-grow flex flex-col justify-center gap-3 my-2 max-w-[340px] mx-auto">
                {error && (
                  <div className="w-full bg-red-50 border border-red-100 rounded-[10px] p-2.5 flex items-center gap-2 text-red-600 text-xs font-bold leading-tight shrink-0 shadow-sm animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Password input */}
                <div className="flex flex-col gap-1 w-full">
                  <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-100 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                    <Lock className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="New Password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={!token}
                      className="w-full h-full bg-transparent pl-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Confirm Password input */}
                <div className="flex flex-col gap-1 w-full">
                  <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-100 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                    <Lock className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Confirm New Password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={!token}
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
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading || !token}
                  className="w-full h-11 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.1rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(1,114,253,0.2)] cursor-pointer mt-1"
                >
                  <span>{loading ? 'RESETTING...' : 'RESET PASSWORD'}</span>
                </motion.button>
              </form>

              <div className="w-full text-center shrink-0">
                <button
                  type="button"
                  onClick={handleBackToSignIn}
                  className="text-xs font-extrabold text-slate-500 hover:text-[#0172FD] transition-colors cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center gap-4 text-center z-20 py-4">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-1 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>

              <div>
                <h2 className="text-xl font-[900] text-[#071233]">Password Reset!</h2>
                <p className="text-xs font-semibold text-slate-500 mt-2 max-w-[85%] mx-auto leading-relaxed text-center">
                  Your password has been successfully reset. You can now log in using your new password.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBackToSignIn}
                className="w-[70%] h-11 bg-[#EBF3FE] hover:bg-[#D3E5FD] text-[#0172FD] rounded-[1.1rem] font-[900] text-sm tracking-wider transition-all flex items-center justify-center cursor-pointer mt-4"
              >
                Back to Sign In
              </motion.button>
            </div>
          )}
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
            <div className="relative w-[80%] h-[80%] z-10 flex items-center justify-center">
              <Image 
                src="/User onbarding Assets/Step_7_tey_verified_state.webp" 
                alt="Tey Mascot Verified Desktop" 
                fill 
                className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.12)]" 
                priority 
              />
            </div>
          </div>

          {/* Left Column (30%): Content Container without background */}
          <div className="w-[30%] h-full flex flex-col justify-center items-start py-12 relative select-none pl-4">
            
            {/* Back button */}
            <div className="relative z-10 mb-8 shrink-0">
              <button 
                onClick={handleBackToSignIn} 
                className="w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Core Content Box with animated views */}
            <div className="w-full flex-grow flex flex-col justify-center items-start relative z-10 min-h-0">
              {!success ? (
                <div className="w-full flex flex-col items-start max-w-[320px]">
                  <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-[900] text-[#071233] text-left" style={{ textShadow: headlineShadow }}>
                      Reset Password
                    </h1>
                    <p className="text-sm font-semibold text-slate-400 mt-1">Please choose a secure new password.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    {error && (
                      <div className="w-full bg-red-50 border border-red-100 rounded-[10px] p-3 flex items-center gap-2 text-red-600 text-sm font-bold leading-tight shadow-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* New Password input */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="text-xs font-extrabold text-slate-400 tracking-wider">NEW PASSWORD</label>
                      <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-200/80 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                        <Lock className="w-5 h-5 text-slate-400 shrink-0" />
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="Enter new password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          disabled={!token}
                          className="w-full h-full bg-transparent pl-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Confirm Password input */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="text-xs font-extrabold text-slate-400 tracking-wider">CONFIRM NEW PASSWORD</label>
                      <div className="relative w-full h-[48px] bg-slate-50 border-2 border-slate-200/80 rounded-[10px] focus-within:border-[#0172FD] focus-within:bg-white transition-all flex items-center px-3.5">
                        <Lock className="w-5 h-5 text-slate-400 shrink-0" />
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="Confirm new password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          disabled={!token}
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

                    {/* Submit button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading || !token}
                      className="w-full h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(1,114,253,0.2)] cursor-pointer mt-2"
                    >
                      <span>{loading ? 'RESETTING...' : 'RESET PASSWORD'}</span>
                    </motion.button>
                  </form>

                  <div className="w-full text-center mt-6">
                    <button
                      type="button"
                      onClick={handleBackToSignIn}
                      className="text-sm font-extrabold text-slate-500 hover:text-[#0172FD] transition-colors cursor-pointer"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center max-w-[320px] text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>

                  <h1 className="text-2xl lg:text-3xl font-[900] text-[#071233] mb-2 tracking-tight">Success!</h1>
                  <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-6 text-center">
                    Your password has been reset successfully. You can now sign in using your new password.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBackToSignIn}
                    className="w-full h-12 bg-[#EBF3FE] hover:bg-[#D3E5FD] text-[#0172FD] rounded-[1.2rem] font-[900] text-sm tracking-wider transition-all flex items-center justify-center cursor-pointer"
                  >
                    Back to Sign In
                  </motion.button>
                </div>
              )}
            </div>

            {/* Bottom space for visual alignment */}
            <div className="h-12"></div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<StepSkeleton />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
