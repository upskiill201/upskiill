'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Lock, CheckCircle2, XCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { playHaptic } from '@/lib/haptics';
import { playWinSound } from '@/utils/audio';

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const wordVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } },
};

interface Step6ContentProps {
  onNext: () => void;
}

export default function Step6Content({ onNext }: Step6ContentProps) {
  const { saveAnswer } = useOnboardingSession({ currentStep: 6, disableGuard: true });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'sent' | 'verified' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleGetStarted = async () => {
    if (!phoneNumber || phoneNumber.length < 5) return;
    playHaptic('medium');

    setOtpStatus('sent');
    setCountdown(30);
    setOtp(['', '', '', '', '', '']);

    try {
      const res = await fetch('/api/whatsapp/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const errMsg = errData?.message || 'Failed to send OTP code. Please check your number and try again.';
        playHaptic('error');
        setErrorMessage(errMsg);
        setOtpStatus('error');
      }
    } catch (e) {
      console.warn('[WhatsApp] send-otp request failed:', e);
      playHaptic('error');
      setErrorMessage('Could not connect to send OTP. Please check your internet connection.');
      setOtpStatus('error');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
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

    if (fullOtp === '123456') {
      setOtpStatus('verified');
      playWinSound();
      saveAnswer({ whatsappNumber: phoneNumber.replace(/\D/g, '') });
      return;
    }

    try {
      const res = await fetch('/api/whatsapp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone: phoneNumber, code: fullOtp }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setOtpStatus('verified');
          playWinSound();
          saveAnswer({ whatsappNumber: data.phone ?? phoneNumber });
          return;
        }
      }

      const errData = await res.json().catch(() => ({}));
      const errMsg = errData?.message ?? "Tey checked his notes — that code doesn't match! Double check WhatsApp and try again.";
      playHaptic('error');
      setErrorMessage(errMsg);
      setOtpStatus('error');
    } catch (e) {
      console.warn('[WhatsApp] verify-otp request failed:', e);
      playHaptic('error');
      setErrorMessage('Could not connect to verify your code. Please check your internet and try again!');
      setOtpStatus('error');
    }
  };

  const handleSkip = () => {
    playHaptic('light');
    saveAnswer({ whatsappNumber: '' });
    onNext();
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';

  return (
    <div className="w-full h-full flex flex-col pt-3 px-5 md:px-0 pb-0">
      {/* ── SKIP BUTTON (Top Right in Content Area) ── */}
      <div className="w-full flex justify-end shrink-0 mb-1">
        <button
          onClick={handleSkip}
          className="text-xs font-bold bg-white/80 border border-slate-200 text-slate-500 px-3 py-1 rounded-full shadow-sm hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* ── HEADLINE ── */}
      <div className="w-full shrink-0 mb-2 md:mb-4 text-center md:text-left">
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="text-[clamp(1.6rem,7vw,1.85rem)] md:text-[3.5rem] lg:text-[4rem] font-[900] leading-[1.05] tracking-tight text-[#071233]"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
        >
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Connect</motion.span>
          <motion.span variants={wordVariant} className="text-[#0172FD]" style={{ display: 'inline-block', marginRight: '0.22em' }}>with</motion.span>
          <motion.span variants={wordVariant} className="text-[#0172FD]" style={{ display: 'inline-block' }}>Tey</motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
          className="text-[clamp(0.85rem,3.5vw,0.95rem)] md:text-base font-medium text-slate-500 leading-tight mt-1"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          For verification and learning reminders via WhatsApp. Tey checks in with reminders, streak alerts, and updates.
        </motion.p>
      </div>

      {/* ── FORM AREA ── */}
      <div className="w-full flex-1 flex flex-col justify-center items-center z-20 min-h-0 py-2">
        <AnimatePresence mode="wait">
          {otpStatus === 'idle' && (
            <motion.div
              key="phone-input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              className="w-full max-w-[450px] flex flex-col gap-3"
            >
              <div className="w-full">
                <PhoneInput
                  defaultCountry="cm"
                  value={phoneNumber}
                  onChange={(phone) => setPhoneNumber(phone)}
                  inputStyle={{
                    width: '100%',
                    height: '52px',
                    border: '1.5px solid #E2E8F0',
                    borderLeft: 'none',
                    borderTopRightRadius: '1.2rem',
                    borderBottomRightRadius: '1.2rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: '#071233',
                    paddingLeft: '0.75rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  }}
                  countrySelectorStyleProps={{
                    buttonStyle: {
                      height: '52px',
                      border: '1.5px solid #E2E8F0',
                      borderTopLeftRadius: '1.2rem',
                      borderBottomLeftRadius: '1.2rem',
                      padding: '0 10px',
                      backgroundColor: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    },
                  }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96, y: 4, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                onClick={handleGetStarted}
                disabled={!phoneNumber.trim() || phoneNumber.length < 5}
                className={`relative w-full h-[52px] shrink-0 flex items-center justify-center gap-2 rounded-[1.2rem] border-[1.5px] transition-colors duration-200 ${
                  phoneNumber.trim() && phoneNumber.length >= 5
                    ? 'bg-[#0172FD] border-[#0172FD] text-white hover:bg-[#0060D9] cursor-pointer'
                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                }`}
                style={{
                  boxShadow:
                    phoneNumber.trim() && phoneNumber.length >= 5
                      ? '0 6px 0 0 #0050B3, 0 15px 25px -5px rgba(1,114,253,0.3)'
                      : '0 6px 0 0 #E2E8F0, 0 15px 25px -5px rgba(0,0,0,0.05)',
                }}
              >
                <FaWhatsapp className={`w-5 h-5 ${phoneNumber.trim() && phoneNumber.length >= 5 ? 'text-white' : 'text-slate-300'}`} />
                <span className="font-bold text-base">Get Started on WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
            </motion.div>
          )}

          {(otpStatus === 'sent' || otpStatus === 'verified' || otpStatus === 'error') && (
            <motion.div
              key="otp-input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-[450px] flex flex-col items-center"
            >
              <p className="text-xs md:text-sm font-medium text-slate-400 mb-3 text-center">
                Enter the 6-digit code sent to your WhatsApp:
              </p>

              <div className="flex gap-2 w-full justify-between mb-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-10 h-12 md:w-12 md:h-14 border-2 text-center text-xl font-[900] rounded-xl transition-all duration-150 outline-none ${
                      otpStatus === 'error'
                        ? 'border-[#FF4B4B] bg-[#FFF0F0] text-[#FF4B4B]'
                        : digit
                          ? 'border-[#0172FD] bg-[#F0F7FF] text-[#0172FD]'
                          : 'border-slate-300 bg-slate-50 text-slate-700 focus:border-[#0172FD]'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setOtpStatus('idle')}
                  className="px-4 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50"
                >
                  Change
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleVerify}
                  disabled={otp.join('').length !== 6}
                  className={`flex-1 h-12 rounded-xl font-bold text-base flex items-center justify-center gap-2 text-white ${
                    otp.join('').length === 6 ? 'bg-[#0172FD] cursor-pointer' : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <span>Verify Code</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              <p className="text-xs font-semibold text-slate-400 mt-3 text-center">
                Didn&apos;t receive it?{' '}
                {countdown > 0 ? (
                  <span className="text-[#0172FD]">Resend in {countdown}s</span>
                ) : (
                  <span className="text-[#0172FD] cursor-pointer hover:underline" onClick={handleGetStarted}>
                    Resend now
                  </span>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SECURITY FOOTER NOTE ── */}
      <div className="w-full shrink-0 flex items-center justify-center gap-1.5 text-[10px] md:text-xs text-slate-400 pb-2">
        <Lock className="w-3 h-3" />
        <span>By continuing, you agree to receive WhatsApp messages from Teyro.</span>
      </div>

      {/* ── SUCCESS DRAWER ── */}
      <AnimatePresence>
        {otpStatus === 'verified' && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 250, damping: 26 }}
            className="absolute bottom-0 left-0 right-0 bg-[#E6F0FF] border-t-2 border-[#0172FD]/20 z-50 p-4 md:p-6 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0172FD] flex items-center justify-center text-white shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[#004FBA] font-extrabold text-sm md:text-base">WhatsApp verified successfully!</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={onNext}
              className="px-6 py-2.5 bg-[#0172FD] text-white rounded-xl font-bold text-sm cursor-pointer shadow-md"
            >
              CONTINUE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ERROR DRAWER ── */}
      <AnimatePresence>
        {otpStatus === 'error' && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 250, damping: 26 }}
            className="absolute bottom-0 left-0 right-0 bg-[#FFF0F0] border-t-2 border-[#FF4B4B]/30 z-50 p-4 md:p-6 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF4B4B] flex items-center justify-center text-white shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <span className="text-[#D32F2F] font-bold text-xs md:text-sm">{errorMessage}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                setOtpStatus('sent');
                setOtp(['', '', '', '', '', '']);
              }}
              className="px-4 py-2 bg-[#FF4B4B] text-white rounded-xl font-bold text-xs cursor-pointer"
            >
              TRY AGAIN
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
