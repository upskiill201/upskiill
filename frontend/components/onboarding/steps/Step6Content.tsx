'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Lock, CheckCircle2, XCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { playHaptic } from '@/lib/haptics';
import { playWinSound } from '@/utils/audio';

// Must match RESEND_COOLDOWN_MS on the backend — the server enforces the real limit.
const RESEND_COOLDOWN_SECONDS = 60;

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const wordVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } },
};
const accentVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } },
};

interface SavedStep6Answer {
  whatsappNumber?: string;
  verified?: boolean;
}

interface Step6ContentProps {
  onNext: () => void;
}

export default function Step6Content({ onNext }: Step6ContentProps) {
  const { saveAnswer, currentAnswer } = useOnboardingSession({ currentStep: 6, disableGuard: true });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [stage, setStage] = useState<'idle' | 'sent' | 'verified'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(0);
  /**
   * Dev convenience: the backend echoes the OTP only when EXPOSE_DEV_OTP is
   * enabled (local/dev builds). Rendered as a chip so testers don't need a
   * second phone; production never receives the field.
   */
  const [devCode, setDevCode] = useState<string | null>(null);

  const canSubmit = !!phoneNumber.trim() && phoneNumber.length >= 5;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // ── Hydration: a previously verified number skips straight to done ──
  useEffect(() => {
    const saved = currentAnswer as SavedStep6Answer | null;
    if (saved?.verified && saved.whatsappNumber) {
      setPhoneNumber(saved.whatsappNumber);
      setStage('verified');
    }
  }, [currentAnswer]);

  const failWith = useCallback((message: string) => {
    playHaptic('error');
    setErrorMessage(message);
    setShowError(true);
  }, []);

  const handleGetStarted = async () => {
    if (!phoneNumber || phoneNumber.length < 5 || isSending) return;
    playHaptic('medium');
    setIsSending(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (res.ok) {
        // Dev-mode only (EXPOSE_DEV_OTP) — undefined in every real environment.
        const data = await res.json().catch(() => ({}));
        setDevCode(typeof data?.devCode === 'string' ? data.devCode : null);
        setOtp(['', '', '', '', '', '']);
        setCountdown(RESEND_COOLDOWN_SECONDS);
        setStage('sent');
      } else {
        const errData = await res.json().catch(() => ({}));
        failWith(
          errData?.message ||
            'Failed to send the code. Please check your number and try again.',
        );
      }
    } catch (e) {
      console.warn('[WhatsApp] send-otp request failed:', e);
      failWith('Could not connect to send your code. Please check your internet connection.');
    } finally {
      setIsSending(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Paste (or autofill) across boxes
      const pasted = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const focusIndex = Math.min(index + pasted.length, 5);
      otpRefs.current[focusIndex]?.focus();
      if (newOtp.join('').length === 6) void handleVerify(newOtp.join(''));
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, '');
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    if (newOtp.join('').length === 6) void handleVerify(newOtp.join(''));
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (codeOverride?: string) => {
    if (isVerifying) return;
    const fullOtp = codeOverride ?? otp.join('');
    if (fullOtp.length !== 6) return;

    playHaptic('medium');
    setIsVerifying(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone: phoneNumber, code: fullOtp }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          playWinSound();
          // Persist E.164 exactly as the server normalised it + verified flag,
          // so revisiting this step hydrates straight to the done state.
          saveAnswer({ whatsappNumber: data.phone ?? phoneNumber, verified: true });
          setStage('verified');
          return;
        }
      }

      const errData = await res.json().catch(() => ({}));
      const errMsg =
        errData?.message ??
        "Tey checked his notes — that code doesn't match! Double check WhatsApp and try again.";
      failWith(errMsg);
      // A wrong code shouldn't wipe what they typed unless the code was consumed.
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } catch (e) {
      console.warn('[WhatsApp] verify-otp request failed:', e);
      failWith('Could not connect to verify your code. Please check your internet and try again!');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSkip = () => {
    playHaptic('light');
    saveAnswer({ whatsappNumber: '', skipped: true });
    onNext();
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="w-full h-full flex flex-col pt-2 px-5 md:px-0 pb-0">
      {/* ── SKIP CONTROL (hidden once verified) ── */}
      {stage !== 'verified' && (
        <div className="w-full flex justify-end shrink-0 mb-1">
          <button
            onClick={handleSkip}
            className="text-[0.68rem] font-extrabold tracking-[0.14em] uppercase text-slate-400 hover:text-slate-600 px-2 py-1 active:scale-95 transition-all cursor-pointer"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Skip
          </button>
        </div>
      )}

      {/* ── HEADLINE ── */}
      <div className="w-full shrink-0 mb-2 md:mb-4 text-center md:text-left">
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="text-[clamp(2.5rem,14vw,3.5rem)] md:text-[3.5rem] lg:text-[4rem] font-[900] leading-[1.05] md:leading-[1.1] mb-2 md:mb-4 tracking-tight text-[#071233]"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
        >
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Connect</motion.span>
          <br className="md:hidden" />
          <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', marginRight: '0.22em', textShadow: accentShadow }}>with</motion.span>
          <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>Tey</motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
          className="text-[clamp(1rem,4.8vw,1.2rem)] md:text-base font-medium text-slate-500 leading-snug"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 10px rgba(255,255,255,1)' }}
        >
          <span className="md:hidden">
            Verify your number for reminders,
            <br />
            streak alerts, and updates.
          </span>
          <span className="hidden md:inline">For verification and learning reminders via WhatsApp. Tey checks in with reminders, streak alerts, and updates.</span>
        </motion.p>
      </div>

      {/* ── FORM ── */}
      <div className="w-full shrink-0 z-20 max-w-[450px] mx-auto md:mx-auto mt-4 md:mt-6">
        <AnimatePresence mode="wait">
          {stage === 'idle' && (
            <motion.div
              key="phone-input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              className="w-full flex flex-col gap-3"
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
                whileHover={canSubmit && !isSending ? { scale: 1.02 } : {}}
                whileTap={canSubmit && !isSending ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
                onClick={handleGetStarted}
                disabled={!canSubmit || isSending}
                className={`relative w-full h-14 md:h-14 flex items-center justify-center gap-2 rounded-[1.75rem] font-bold text-lg transition-all ${
                  canSubmit && !isSending ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                }`}
                style={
                  canSubmit && !isSending
                    ? { boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' }
                    : { boxShadow: '0 0 10px rgba(255,255,255,0.8)' }
                }
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>{isSending ? 'Sending…' : 'Get Started on WhatsApp'}</span>
                {!isSending && <ArrowRight className={`w-5 h-5 stroke-[3] ${!canSubmit && 'opacity-50'}`} />}
              </motion.button>
            </motion.div>
          )}

          {stage === 'sent' && (
            <motion.div
              key="otp-input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full flex flex-col items-center"
            >
              <p className="text-xs md:text-sm font-medium text-slate-400 mb-3 text-center">
                Enter the 6-digit code sent to your WhatsApp:
              </p>

              {/* Dev builds only — backend echoes the OTP when EXPOSE_DEV_OTP is set */}
              {devCode && (
                <button
                  type="button"
                  onClick={() => {
                    const digits = devCode.replace(/\D/g, '').slice(0, 6).split('');
                    const filled = ['', '', '', '', '', ''].map((_, i) => digits[i] ?? '');
                    setOtp(filled);
                    otpRefs.current[5]?.focus();
                  }}
                  className="mb-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-[10px] md:text-xs font-bold text-amber-700 tracking-wide hover:bg-amber-100 cursor-pointer"
                  title="Tap to autofill (dev mode only)"
                >
                  <Lock className="w-3 h-3" />
                  DEV CODE: {devCode}
                </button>
              )}

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
                    disabled={isVerifying}
                    className={`w-10 h-12 md:w-12 md:h-14 border-2 text-center text-xl font-[900] rounded-xl transition-all duration-150 outline-none ${
                      digit
                        ? 'border-[#0172FD] bg-[#F0F7FF] text-[#0172FD]'
                        : 'border-slate-300 bg-slate-50 text-slate-700 focus:border-[#0172FD]'
                    } ${isVerifying ? 'opacity-60' : ''}`}
                  />
                ))}
              </div>

              <div className="flex gap-2 w-full">
                <button
                  onClick={() => {
                    setShowError(false);
                    setStage('idle');
                  }}
                  className="px-4 h-12 rounded-[1.25rem] bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 cursor-pointer"
                >
                  Change
                </button>
                <motion.button
                  whileHover={!isVerifying ? { scale: 1.02 } : {}}
                  whileTap={!isVerifying ? { scale: 0.96 } : {}}
                  onClick={() => handleVerify()}
                  disabled={otp.join('').length !== 6 || isVerifying}
                  className={`flex-1 h-12 rounded-[1.25rem] font-bold text-base flex items-center justify-center gap-2 text-white ${
                    otp.join('').length === 6 && !isVerifying ? 'bg-[#0172FD] cursor-pointer' : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <span>{isVerifying ? 'Checking…' : 'Verify Code'}</span>
                  {!isVerifying && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </div>

              <p className="text-xs font-semibold text-slate-400 mt-3 text-center">
                Didn&apos;t receive it?{' '}
                {countdown > 0 ? (
                  <span className="text-[#0172FD]">Resend in {countdown}s</span>
                ) : (
                  <span
                    className={`text-[#0172FD] hover:underline ${isSending ? 'opacity-50' : 'cursor-pointer'}`}
                    onClick={() => !isSending && handleGetStarted()}
                  >
                    Resend now
                  </span>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {stage === 'verified' && (
          <motion.div
            key="verified-summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center gap-4"
          >
            <div className="w-full flex items-center gap-3 rounded-[1.25rem] bg-white border-2 border-[#0172FD]/30 px-4 py-3 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#0172FD] shrink-0" />
              <div>
                <p className="text-[#071233] font-extrabold text-sm">WhatsApp connected</p>
                <p className="text-slate-400 font-medium text-xs">{phoneNumber}</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={onNext}
              className="relative w-full h-14 flex items-center justify-center gap-2 rounded-[1.75rem] bg-[#0172FD] text-white font-bold text-lg cursor-pointer"
              style={{ boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' }}
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* ── SECURITY FOOTER NOTE ── */}
      <div className="w-full shrink-0 flex items-center justify-center gap-1.5 text-[10px] md:text-xs text-slate-400 mt-4 pb-1">
        <Lock className="w-3 h-3" />
        <span>By continuing, you agree to receive WhatsApp messages from Teyro.</span>
      </div>

      {/* ── ERROR DRAWER ── */}
      <AnimatePresence>
        {showError && errorMessage && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 250, damping: 26 }}
            className="absolute bottom-0 left-0 right-0 bg-[#FFF0F0] border-t-2 border-[#FF4B4B]/30 z-50 p-4 md:p-6 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#FF4B4B] flex items-center justify-center text-white shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <span className="text-[#D32F2F] font-bold text-xs md:text-sm">{errorMessage}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setShowError(false)}
              className="px-4 py-2 bg-[#FF4B4B] text-white rounded-xl font-bold text-xs cursor-pointer shrink-0"
            >
              OK
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
