'use client';
import { playHaptic } from '@/lib/haptics';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

// ────────────────────────────────────────────────────────────────────────────
// Animations
const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
const wordVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  show:   { y: 0,  opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } }
};
const accentVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show:   { y: 0,  opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } }
};

export default function OnboardingStep6() {
  const router = useRouter();
  const { isLoading, currentAnswer, saveAnswer, advance } = useOnboardingSession(6);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [otpStatus, setOtpStatus] = useState<'idle' | 'sent' | 'verified'>('idle');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Simulation of "Resend in 30s"
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (isLoading) return <StepSkeleton />;

  const handleGetStarted = async () => {
    if (!phoneNumber || phoneNumber.length < 5) return;
    playHaptic('medium');
    
    setOtpStatus('sent');
    setCountdown(30);

    try {
      await fetch('/api/whatsapp/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone: phoneNumber }),
      });
    } catch (e) {
      console.warn('[WhatsApp] send-otp request failed, continuing in offline mode:', e);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const focusIndex = Math.min(index + pasted.length, 5);
      otpRefs.current[focusIndex]?.focus();
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, '');
    setOtp(newOtp);

    // Auto advance
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) return;
    
    playHaptic('medium');
    
    // Explicit bypass for local staging testing
    if (fullOtp === '123456') {
      setOtpStatus('verified');
      saveAnswer({ whatsappNumber: phoneNumber.replace(/\D/g, '') });
      return;
    }

    try {
      const res = await fetch('/api/whatsapp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          phone: phoneNumber,
          code: fullOtp,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setOtpStatus('verified');
          saveAnswer({ whatsappNumber: data.phone ?? phoneNumber });
          return;
        }
      }

      // Non-ok or backend explicitly rejected — show error
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData?.message ?? 'Incorrect code. Please try again.';
      alert(errMsg);
    } catch (e) {
      console.warn('[WhatsApp] verify-otp request failed:', e);
      alert('Could not verify your code. Please check your connection and try again.');
    }
  };

  const handleSkip = () => {
    playHaptic('light');
    saveAnswer({ whatsappNumber: '' });
    void advance();
  };

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="h-[100dvh] overflow-hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] flex flex-col relative select-none">
      
      <div className="flex-1 w-full flex flex-col relative z-10 max-w-[1200px] mx-auto h-[100dvh] px-6 md:px-10 pb-[2vh] pt-12 md:pt-24">
        
        {/* Mobile Progress Bar */}
        <div className="md:hidden absolute top-4 left-0 right-0 px-6 z-30">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-3 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
              <motion.div
                initial={{ width: `${(5 / 15) * 100}%` }}
                animate={{ width: `${(6 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full relative"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold" style={{ color: '#0172FD', textShadow: '0 0 10px rgba(255,255,255,1)' }}>6/15</span>
              <button 
                onClick={handleSkip}
                className="text-[11px] font-bold bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-500 px-2.5 py-1 rounded-full shadow-sm hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                Skip
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Progress Bar */}
        <div className="hidden md:flex items-center gap-5 w-full max-w-[900px] mb-12">
          <div className="flex-1 h-4 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
            <motion.div
              initial={{ width: `${(5 / 15) * 100}%` }}
              animate={{ width: `${(6 / 15) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
              className="h-full rounded-full relative"
              style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)' }}
            />
          </div>
          <span className="text-base font-bold" style={{ color: '#0172FD', textShadow: '0 0 10px rgba(255,255,255,1)' }}>6/15</span>
          <button 
            onClick={handleSkip}
            className="text-xs font-bold bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-500 px-3.5 py-1.5 rounded-full shadow-sm hover:bg-white active:scale-95 transition-all cursor-pointer ml-1"
          >
            Skip
          </button>
        </div>

        {/* TOP SECTION: Mascot (Left) + Text/Form (Right) */}
        <div className="flex flex-1 flex-col justify-start md:justify-start md:flex-row w-full relative z-10 md:mt-12 lg:mt-16 md:mb-12">
          
          {/* Mobile Mascot (Top 40% of Screen) */}
          <div className="md:hidden relative w-full h-[38vh] flex items-center justify-center shrink-0 z-30 pointer-events-none mb-0">
             <div className="relative w-full max-w-[400px] aspect-square scale-[0.9] sm:scale-[1.0] origin-center -translate-y-[1vh]">
                <MascotBackground />
                <motion.div layoutId="tey-mascot" className="absolute inset-0 z-10 scale-[1.15]">
                  <Image 
                    src="/User onbarding Assets/Step_6_mascot.webp" 
                    alt="Connect with Tey" 
                    fill 
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" 
                    priority 
                  />
                </motion.div>
             </div>
          </div>

          {/* Text & Form Content (Right) */}
          <div className="w-full md:w-[50%] h-[62vh] md:h-auto flex flex-col justify-start md:justify-center gap-4 md:gap-0 items-center md:items-start text-center md:text-left z-20 pb-[8vh] md:pb-0 md:ml-auto md:mt-[-5rem] pt-[1vh] md:pt-0 relative">
            {/* Mobile-only white fade behind text */}
            <div className="md:hidden absolute top-[-4rem] left-[-2rem] right-[-2rem] bottom-[-5rem] bg-gradient-to-b from-transparent via-white to-white via-[15%] -z-10 pointer-events-none" />

            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[10vw] sm:text-[8vw] md:text-[5vw] lg:text-[4.5vw] leading-[1.05] font-[800] tracking-tight text-[#071233] w-full"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <div className="whitespace-nowrap">
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Connect</motion.span>
                <motion.span variants={wordVariant} className="text-[#0172FD]" style={{ display: 'inline-block', marginRight: '0.22em' }}>with</motion.span>
                <motion.span variants={wordVariant} className="text-[#0172FD]" style={{ display: 'inline-block' }}>Tey</motion.span>
              </div>
            </motion.h1>

            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
              className="text-[2.8vw] sm:text-[2.2vw] md:text-[1.2vw] lg:text-[1.1vw] font-medium text-slate-500 leading-[1.4] max-w-[350px] md:max-w-none w-full mt-2 md:mt-4 md:mb-8"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)' }}
            >
              For Verification and learning reminders via WhatsApp. Tey checks in daily with reminders, streak alerts, and progress updates and definitely notices when you skip a lesson.
            </motion.p>

            {/* Form Area */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.4 }}
              className="w-full lg:pr-8"
            >
              <AnimatePresence mode="wait">
                {otpStatus === 'idle' && (
                  <motion.div
                    key="phone-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className="w-full flex flex-col gap-4"
                  >
                    {/* Phone Input using react-international-phone */}
                    <div className="w-full">
                      <PhoneInput
                        defaultCountry="in"
                        value={phoneNumber}
                        onChange={(phone) => setPhoneNumber(phone)}
                        inputStyle={{
                          width: '100%',
                          height: '60px',
                          border: '1.5px solid #E2E8F0',
                          borderLeft: 'none',
                          borderTopRightRadius: '1.2rem',
                          borderBottomRightRadius: '1.2rem',
                          fontSize: '1.125rem',
                          fontWeight: 'bold',
                          color: '#071233',
                          paddingLeft: '1rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }}
                        countrySelectorStyleProps={{
                          buttonStyle: {
                            height: '60px',
                            border: '1.5px solid #E2E8F0',
                            borderTopLeftRadius: '1.2rem',
                            borderBottomLeftRadius: '1.2rem',
                            padding: '0 12px',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                          }
                        }}
                      />
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-[1.4rem] md:gap-3 w-full">
                      {/* Back Button */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                        onClick={() => {
                          playHaptic('light');
                          router.push('/onboarding/5');
                        }}
                        className="w-full md:w-[70px] h-[60px] shrink-0 flex items-center justify-center rounded-[1.2rem] bg-white border-[1.5px] border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-[0_6px_0_0_#E2E8F0,0_15px_25px_-5px_rgba(0,0,0,0.05)] cursor-pointer"
                      >
                        <ArrowLeft className="w-6 h-6" />
                        <span className="md:hidden font-bold text-[1.1rem] ml-2">Go Back</span>
                      </motion.button>

                      {/* Get Started Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96, y: 4, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                        onClick={handleGetStarted}
                        className={`relative w-full md:flex-1 h-[60px] shrink-0 flex items-center justify-center gap-2 rounded-[1.2rem] border-[1.5px] transition-colors duration-200 ${
                          phoneNumber.trim() 
                            ? 'bg-[#0172FD] border-[#0172FD] text-white hover:bg-[#0060D9] cursor-pointer' 
                            : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                        style={{
                          boxShadow: phoneNumber.trim()
                            ? '0 6px 0 0 #0050B3, 0 15px 25px -5px rgba(1,114,253,0.3)'
                            : '0 6px 0 0 #E2E8F0, 0 15px 25px -5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <FaWhatsapp className={`w-6 h-6 ${phoneNumber.trim() ? 'text-white' : 'text-slate-300'}`} />
                        <span className="font-bold text-[1.1rem]">Get Started on WhatsApp</span>
                        <ArrowRight className="w-5 h-5 ml-1" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {(otpStatus === 'sent' || otpStatus === 'verified') && (
                  <motion.div
                    key="otp-input"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full flex flex-col items-center"
                  >
                    <p className="text-sm font-medium text-slate-400 mb-4 text-center">
                      Tey just sent a 6-digit code to your WhatsApp. Enter it below to verify your number.
                    </p>
                    
                    <div className="flex gap-2 md:gap-3 w-full justify-between mb-6">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={el => { otpRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className={`w-12 h-14 md:w-14 md:h-16 border-2 text-center text-2xl font-[900] rounded-xl md:rounded-2xl transition-all duration-150 outline-none ${
                            digit
                              ? 'border-[#0172FD] bg-[#F0F7FF] text-[#0172FD] shadow-[0_4px_12px_rgba(1,114,253,0.15)]'
                              : 'border-slate-300/80 bg-slate-50 text-slate-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] focus:border-[#0172FD]/60 focus:bg-white'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-[1.4rem] md:gap-3 w-full mt-2">
                      {/* Back Button */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                        onClick={() => {
                          playHaptic('light');
                          setOtpStatus('idle'); // Just reset form instead of hard push if they are verifying
                        }}
                        className="w-full md:w-[70px] h-[60px] shrink-0 flex items-center justify-center rounded-[1.2rem] bg-white border-[1.5px] border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-[0_6px_0_0_#E2E8F0,0_15px_25px_-5px_rgba(0,0,0,0.05)] cursor-pointer"
                      >
                        <ArrowLeft className="w-6 h-6" />
                        <span className="md:hidden font-bold text-[1.1rem] ml-2">Go Back</span>
                      </motion.button>

                      {/* Verify Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96, y: 4, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                        onClick={handleVerify}
                        className={`relative w-full md:flex-1 h-[60px] shrink-0 flex items-center justify-center gap-2 rounded-[1.2rem] border-[1.5px] transition-colors duration-200 ${
                          otp.join('').length === 6
                            ? 'bg-[#0172FD] border-[#0172FD] text-white hover:bg-[#0060D9] cursor-pointer' 
                            : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                        style={{
                          boxShadow: otp.join('').length === 6
                            ? '0 6px 0 0 #0050B3, 0 15px 25px -5px rgba(1,114,253,0.3)'
                            : '0 6px 0 0 #E2E8F0, 0 15px 25px -5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <span className="font-bold text-[1.1rem]">Verify Code</span>
                        <ArrowRight className="w-5 h-5 ml-1" />
                      </motion.button>
                    </div>
                    
                    <p className="text-sm font-semibold text-slate-400 mt-6 text-center">
                      Didn't receive the code?{' '}
                      {countdown > 0 ? (
                        <span className="text-[#0172FD]">Resend in {countdown}s</span>
                      ) : (
                        <span 
                          className="text-[#0172FD] cursor-pointer hover:underline"
                          onClick={handleGetStarted}
                        >
                          Resend now
                        </span>
                      )}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Desktop Mascot (Left) */}
        <div className="hidden md:flex absolute ml-[-15rem] top-1/2 -translate-y-1/2 w-[55%] items-center justify-start z-10 pointer-events-none">
           <div className="relative w-full md:max-w-[700px] aspect-square scale-[1.25] lg:scale-[1.3] origin-left">
              <MascotBackground />
              <motion.div layoutId="tey-mascot" className="absolute inset-0 z-10 md:scale-[0.95] lg:scale-[1.0]">
                <Image 
                  src="/User onbarding Assets/Step_6_mascot.webp" 
                  alt="Connect with Tey" 
                  fill 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" 
                  priority 
                />
              </motion.div>
           </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.6 }}
          className="absolute bottom-4 md:bottom-8 left-0 right-0 w-full flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-6 text-[10px] md:text-xs font-semibold text-slate-400 z-50 px-4 md:px-6 text-center"
        >
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>By continuing, you agree to receive WhatsApp messages from Teyro.</span>
          </div>
          <div className="hidden md:block w-[1.5px] h-3.5 bg-slate-200" />
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0066ff]" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="font-medium ml-1">Business Platform</span>
          </div>
        </motion.div>

        {/* Duolingo Success Drawer */}
        <AnimatePresence>
          {otpStatus === 'verified' && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 250, damping: 26 }}
              className="absolute bottom-0 left-0 right-0 bg-[#E6F0FF] border-t-2 border-[#0172FD]/20 z-50 p-6 md:py-8 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[0_-10px_35px_-5px_rgba(1,114,253,0.15)]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0172FD] flex items-center justify-center text-white shadow-md shadow-[#0172FD]/20">
                  <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[#004FBA] font-[900] text-2xl tracking-tight leading-none mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>Awesome!</span>
                  <span className="text-[#005AD5] font-bold text-sm" style={{ fontFamily: 'var(--font-jakarta)' }}>WhatsApp verification completed successfully.</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                onClick={() => void advance()}
                className="w-full md:w-[240px] h-[55px] bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-lg tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center"
                style={{
                  boxShadow: '0 4px 15px rgba(1,114,253,0.25)'
                }}
              >
                CONTINUE
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
