'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import { FaGraduationCap, FaChalkboardTeacher, FaStar } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Button from '@/components/ui/Button';
import { signInWithGoogle } from '@/lib/firebase';
import { getOnboardingData, clearOnboardingData } from '@/lib/onboarding';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import posthog from 'posthog-js';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from '../../login/InstructorAuth.module.css';

const COMMON_PASSWORDS = ['password123', 'qwerty', '12345678', 'password', '123456789'];


const FloatingInput = ({ icon: Icon, label, id, type, value, onChange, onBlur, placeholder, required, children, minLength, autoComplete }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative flex flex-col mb-4 w-full">
      <motion.div 
        className="absolute left-10 pointer-events-none z-10 flex items-center h-full"
        initial={false}
        animate={{ 
          y: isActive ? -24 : 0, 
          scale: isActive ? 0.85 : 1,
          color: isFocused ? '#2563EB' : '#64748b'
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ transformOrigin: 'left center' }}
      >
        <span className="bg-white px-1 font-medium">{label}</span>
      </motion.div>
      <div className="relative flex items-center w-full">
        <div className="absolute left-3 text-slate-400 z-10">
          <Icon size={18} color={isFocused ? '#2563EB' : '#94a3b8'} className="transition-colors" />
        </div>
        <motion.input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          placeholder={isActive ? placeholder : ''}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className="w-full h-[52px] pl-10 pr-10 rounded-[12px] border-[1.5px] border-slate-200 outline-none text-[15px] text-slate-900 bg-white transition-shadow relative z-0"
          animate={{
            borderColor: isFocused ? '#3b82f6' : '#e2e8f0',
            boxShadow: isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : '0 0 0 0px rgba(59, 130, 246, 0)',
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default function StepFifteenPage() {
  const router = useRouter();

  // 🛡️ Step-skip protection
  useOnboardingGuard(15);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password Strength
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    if (score === 0) return { score, label: '', color: '#e5e7eb' };
    
    const levels: Record<number, { label: string; color: string }> = {
      1: { label: 'Weak', color: '#ef4444' },
      2: { label: 'Fair', color: '#f97316' },
      3: { label: 'Good', color: '#eab308' },
      4: { label: 'Strong', color: '#22c55e' },
    };
    return { score, ...levels[score] };
  };

  // Email duplicate check state
  const [emailCheckState, setEmailCheckState] = useState<'idle' | 'checking' | 'exists' | 'ok'>('idle');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Verification Pending State
  const [isVerificationPending, setIsVerificationPending] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    posthog.capture('onboarding_step_viewed', { step: 15, stepName: 'signup' });
  }, []);

  useEffect(() => {
    if (password) {
      const strength = getPasswordStrength(password);
      if (strength.score === 4) {
        // Fire subtle confetti
        import('canvas-confetti').then(({ default: confetti }) => {
          confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#22c55e', '#3b82f6', '#8b5cf6'],
            disableForReducedMotion: true
          });
        });
      }
    }
  }, [password]);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // ─── Real-time email duplicate check ───────────────────────────────────────
  const handleEmailBlur = useCallback(async () => {
    if (!email || !email.includes('@')) return;
    setEmailCheckState('checking');
    try {
      const res = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setEmailCheckState(data.exists ? 'exists' : 'ok');
    } catch {
      setEmailCheckState('idle');
    }
  }, [email]);

  // ─── Email/Password Signup ──────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailCheckState === 'exists') return;
    const strength = getPasswordStrength(password);
    if (strength.score < 3) {
      setError('Please choose a stronger password (Good or Strong).');
      return;
    }
    if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
      setError('Password is too common. Please choose a different one.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);

    // Grab full onboarding payload from localStorage
    const onboardingData = getOnboardingData();

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          fullName,
          role: 'INSTRUCTOR',
          draftId: onboardingData.draftId,
          onboarding: onboardingData, // 💾 All 14 steps sent to backend for profile hydration
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If 409 Conflict, it means the user already exists and is verified.
        const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errMsg || 'Signup failed');
      }

      // Success or Idempotent Success (existing unverified user)
      posthog.capture('onboarding_completed', { method: 'email' });
      posthog.capture('creator_registered');

      // DO NOT clear localStorage here
      setIsVerificationPending(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      // ❌ Do NOT clear localStorage on failure — creator can retry with all data preserved
    } finally {
      setLoading(false);
    }
  };

  // ─── Resend Verification ────────────────────────────────────────────────────
  const handleResend = async () => {
    if (countdown > 0 || !email) return;
    
    setResending(true);
    setResendStatus('idle');
    
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!res.ok) {
        if (res.status === 429) throw new Error('Too many requests. Please try again later.');
        throw new Error('Failed to resend');
      }
      
      setResendStatus('success');
      setCountdown(60); // 60 seconds cooldown
    } catch (err) {
      setResendStatus('error');
    } finally {
      setResending(false);
    }
  };

  const maskEmail = (str: string) => {
    if (!str || !str.includes('@')) return str;
    const [name, domain] = str.split('@');
    if (name.length <= 2) return `${name[0]}***@${domain}`;
    return `${name.substring(0, 2)}***${name.substring(name.length - 1)}@${domain}`;
  };

  // ─── Google OAuth Signup ────────────────────────────────────────────────────
  const handleSocialAuth = async () => {
    setError('');
    setLoading(true);

    const onboardingData = getOnboardingData();

    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();

      const res = await fetch('/api/auth/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          idToken,
          role: 'INSTRUCTOR',
          draftId: onboardingData.draftId,
          onboarding: onboardingData,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Social authentication failed');
      }

      posthog.capture('onboarding_completed', { method: 'google' });
      posthog.capture('creator_registered');
      
      // Navigate to Step 16 directly — Google accounts are pre-verified
      window.location.href = '/creator/onboarding/16';
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Authentication popup dismissed or failed');
      } else {
        setError('Authentication popup dismissed or failed');
      }
      // ❌ Do NOT clear localStorage on failure
    } finally {
      setLoading(false);
    }
  };

  if (isVerificationPending) {
    return (
      <div className="min-h-[calc(100vh-88px)] flex items-center justify-center bg-[#F1EDFC] px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
          
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your inbox</h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            We've sent a verification link to <br/>
            <strong className="text-gray-900 font-semibold">{maskEmail(email)}</strong>
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-8 text-sm text-gray-600 text-left flex gap-3">
            <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              The link will expire in 24 hours. If you don't see it, be sure to check your spam folder.
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-center flex items-center gap-2"
              onClick={handleResend}
              disabled={resending || countdown > 0 || !email}
            >
              {resending ? (
                <span className="flex items-center gap-2">Sending...</span>
              ) : countdown > 0 ? (
                <span className="flex items-center gap-2">Resend in {countdown}s</span>
              ) : (
                <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Resend verification email</span>
              )}
            </Button>

            {resendStatus === 'success' && (
              <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Email resent successfully!
              </p>
            )}

            {resendStatus === 'error' && (
              <p className="text-sm text-red-600 flex items-center justify-center gap-1">
                <AlertCircle className="w-4 h-4" /> Failed to resend. Please try again later.
              </p>
            )}
            
            <div className="pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => setIsVerificationPending(false)}
                className="text-sm text-gray-500 hover:text-gray-900 flex items-center justify-center gap-1 transition-colors w-full bg-transparent border-none cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Wrong email? Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    // Override minHeight to account for the 88px progress bar header and prevent scrolling
    <div className={styles.splitContainer} style={{ minHeight: 'calc(100vh - 88px)', height: 'calc(100vh - 88px)', overflow: 'hidden' }}>
      {/* ─── LEFT PANEL (FORM) ─── */}
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      <div className={`${styles.leftPanel} hide-scrollbar`} style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <div className={styles.formContainer} style={{ paddingTop: '0px', paddingBottom: '20px' }}>
          
          <div className={styles.welcomeText}>
            <h1>You&apos;re 99% There. Don&apos;t Stop Now!</h1>
            <p>You&apos;ve built the perfect foundation. Create your Teyro account to lock in your progress, claim your studio, and launch your creator journey.</p>
          </div>

          {/* General error display */}
          {error && (
            <div className={styles.errorBox} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span>{error}</span>
                <p style={{ margin: '4px 0 0', fontSize: '12px', opacity: 0.8 }}>
                  Your progress is saved — please try again.
                </p>
              </div>
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <FloatingInput id="fullName" type="text" label="Full Name" placeholder="e.g. Alex Rivera" value={fullName} onChange={(e: any) => setFullName(e.target.value)} icon={User} required />

            <div className="mb-4">
    <FloatingInput id="email" type="email" label="Email address" placeholder="name@example.com" value={email} onChange={(e: any) => { setEmail(e.target.value); setEmailCheckState('idle'); }} onBlur={handleEmailBlur} icon={Mail} required autoComplete="email">
      {emailCheckState === 'checking' && <span className="absolute right-4 text-xs text-slate-500 font-medium">Checking...</span>}
      {emailCheckState === 'ok' && <CheckCircle2 size={16} className="absolute right-4 text-emerald-500" />}
    </FloatingInput>
    <AnimatePresence>
      {emailCheckState === 'exists' && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[13px] text-red-500 flex items-center gap-1 mt-1 ml-1">
          <AlertCircle size={13} />
          An account with this email already exists. <Link href="/creator/login" className="text-indigo-600 font-semibold underline ml-1">Sign in instead?</Link>
        </motion.p>
      )}
    </AnimatePresence>
  </div>

            <div>
    <FloatingInput id="password" type={showPassword ? "text" : "password"} label="Password" placeholder="Create a secure password (min. 6 chars)" value={password} onChange={(e: any) => setPassword(e.target.value)} icon={Lock} required minLength={6} autoComplete="new-password">
      <button type="button" className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors z-10" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </FloatingInput>
    <AnimatePresence>
      {password.length > 0 && (() => {
        const strength = getPasswordStrength(password);
        return (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 mb-4 overflow-hidden">
            <div className="flex gap-1 h-1.5 w-full">
              {[1, 2, 3, 4].map((level) => (
                <motion.div 
                  key={level} 
                  className="flex-1 rounded-full"
                  animate={{ backgroundColor: level <= strength.score ? strength.color : '#e2e8f0' }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <div className="flex justify-end mt-1 relative">
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={strength.label}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs font-semibold"
                  style={{ color: strength.color }}
                >
                  {strength.label}
                  {strength.score === 4 && (
                    <motion.span 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.1 }}
                      className="ml-1 inline-block"
                    >
                      🎉
                    </motion.span>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  </div>

            <div className="mt-2">
    <FloatingInput id="confirmPassword" type={showConfirmPassword ? "text" : "password"} label="Confirm Password" placeholder="Confirm your secure password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} icon={Lock} required minLength={6} autoComplete="new-password">
      <button type="button" className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors z-10" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>
        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </FloatingInput>
  </div>

            <div className={styles.termsBox}>
              By signing up, you agree to Teyro&apos;s <Link href="/terms/creator">Creator Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={styles.submitBtn}
              disabled={loading || emailCheckState === 'exists'}
            >
              {loading ? 'Claiming Studio...' : 'Create My Account & Claim Studio'}
            </Button>
          </form>

          <div className={styles.divider}>
            <span>OR CONTINUE WITH</span>
          </div>

          <div className={styles.socialGrid}>
            <button type="button" className={styles.socialBtn} onClick={handleSocialAuth} disabled={loading}>
              <FcGoogle size={18} /> Continue with Google
            </button>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL (BRANDING) ─── */}
      <div className={styles.rightPanel}>
        <div className={styles.wowContent}>
          <div className={styles.floatingGraphic}>
             <Image 
               src="/hero-graphic.png" 
               alt="Instructor Platform" 
               width={400}
               height={400}
               className={styles.heroGraphicImage}
               priority
             />
             
             <div className={`${styles.glassCard} ${styles.floatFast}`}>
               <div className={styles.iconCircle}><FaChalkboardTeacher size={16} color="white" /></div>
               <div className={styles.cardLines}>
                 <div className={styles.lineLong}>80M Students</div>
                 <div className={styles.lineShort}>Worldwide reach</div>
               </div>
             </div>

             <div className={`${styles.glassCard} ${styles.floatSlow}`}>
               <div className={styles.iconCircle}><FaGraduationCap size={16} color="white" /></div>
               <div className={styles.cardLines}>
                 <div className={styles.lineLong}>Premium Support</div>
                 <div className={styles.lineShort}>We help you succeed</div>
               </div>
             </div>
          </div>

          <div className={styles.rightTextContent}>
            <h2>Join 2,400+ Creators<br/>Already Earning on Teyro</h2>
            <p>Your studio is perfectly configured and ready. Don&apos;t let your hard work go to waste—claim your spot in the fastest-growing creator ecosystem today.</p>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialProfile}>
              <Image src="https://i.pravatar.cc/150?img=33" alt="Marcus Jenkins" width={40} height={40} className={styles.testimonialAvatar} />
              <div>
                <p className={styles.testimonialName}>Marcus Jenkins</p>
                <p className={styles.testimonialTitle}>Top Software Creator</p>
              </div>
              <div className={styles.testimonialStars} style={{marginLeft: 'auto'}}>
                <FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} />
              </div>
            </div>
            <p className={styles.testimonialQuote}>
              &quot;Teyro provided the exact premium tools I needed. The onboarding was incredible, and the analytics dashboard alone is worth passing on other platforms!&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
