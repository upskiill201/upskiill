'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { getOnboardingState } from '@/lib/user-onboarding';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

export default function OnboardingStep0() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [idle, setIdle] = useState(false);

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

  const handleSignIn = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
    router.push('/onboarding/12');
  };

  const handleGetStarted = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
    router.push('/onboarding/1');
  };

  const handleBack = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    router.push('/');
  };

  const textShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';

  return (
    <div className="w-full relative select-none bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden">
      
      {/* 📱 MOBILE-ONLY LAYOUT: Strict 60/40 Split - 100dvh hard lock, no scroll */}
      <div className="flex flex-col w-full relative z-10 md:hidden" style={{ height: '100dvh', overflow: 'hidden' }}>
        
        {/* Top 60% Image Container */}
        <div className="w-full h-[60dvh] flex flex-col justify-start items-center relative overflow-hidden shrink-0">
          
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

          {/* Glow and Glowing Logo Asset */}
          <div className="relative w-full flex-grow flex items-center justify-center z-20">
            <div
              className="absolute w-[65%] aspect-square rounded-full opacity-60 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(1,114,253,0.3) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative w-[50%] h-[50%] flex items-center justify-center"
            >
              <Image 
                src="/Teyro Logo.png" 
                alt="Teyro Logo" 
                fill 
                className="object-contain drop-shadow-[0_20px_40px_rgba(1,114,253,0.25)]" 
                priority 
              />
            </motion.div>
          </div>

        </div>

        {/* Bottom 40% Text & CTA Container */}
        <div className="w-full h-[40dvh] flex flex-col justify-center items-center relative z-20 pb-[max(env(safe-area-inset-bottom),24px)] px-6 bg-white shrink-0">
          
          {/* Soft top gradient overlay */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

          {/* Buttons and Titles vertically stacked */}
          <div className="w-full flex flex-col items-center justify-center gap-4 py-2 z-20">
            
            {/* Account check section */}
            <div className="w-full flex flex-col items-center text-center">
              <h2 
                className="text-[4.2vw] xs:text-[4.5vw] sm:text-base font-extrabold text-[#071233] mb-1.5"
                style={{ textShadow }}
              >
                Already have an account?
              </h2>
              <motion.button
                animate={idle ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSignIn}
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
              <h2 
                className="text-[4.2vw] xs:text-[4.5vw] sm:text-base font-extrabold text-[#071233] mb-1.5"
                style={{ textShadow }}
              >
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

          </div>

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

            {/* Glowing Logo */}
            <div className="absolute w-[60%] aspect-square rounded-full opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(1,114,253,0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative w-[50%] h-[50%] z-10 flex items-center justify-center"
            >
              <Image 
                src="/Teyro Logo.png" 
                alt="Teyro Logo Desktop" 
                fill 
                className="object-contain drop-shadow-[0_25px_50px_rgba(1,114,253,0.2)]" 
                priority 
              />
            </motion.div>
          </div>

          {/* Left Column (30%): Content Container without background */}
          <div className="w-[30%] h-full flex flex-col justify-center items-start py-12 relative select-none pl-4">
            
            {/* Back button */}
            <div className="relative z-10 mb-12 shrink-0">
              <button 
                onClick={handleBack} 
                className="w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Core Content Box */}
            <div className="w-full flex-grow flex flex-col justify-center items-start relative z-10">
              
              {/* Account Check Section */}
              <div className="w-full mb-8">
                <h1 
                  className="text-2xl lg:text-3xl font-[900] text-[#071233] text-left w-full mb-3 tracking-tight"
                  style={{ textShadow }}
                >
                  Already have an account?
                </h1>
                <motion.button
                  animate={idle ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                  transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignIn}
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
                <h1 
                  className="text-2xl lg:text-3xl font-[900] text-[#071233] text-left w-full mb-3 tracking-tight"
                  style={{ textShadow }}
                >
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

            </div>

            {/* Bottom space for visual alignment */}
            <div className="h-12"></div>

          </div>

        </div>

      </div>

    </div>
  );
}
