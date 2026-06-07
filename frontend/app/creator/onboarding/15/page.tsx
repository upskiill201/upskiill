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
import styles from '../../login/InstructorAuth.module.css';

const COMMON_PASSWORDS = ['password123', 'qwerty', '12345678', 'password', '123456789'];

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
      <div className={styles.leftPanel} style={{ overflowY: 'auto' }}>
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
            <div className={styles.inputGroup}>
              <label htmlFor="fullName">Full Name</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input 
                  id="fullName" 
                  type="text" 
                  placeholder="e.g. Alex Rivera" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email address</label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailCheckState('idle'); }}
                  onBlur={handleEmailBlur}
                  required 
                />
                {/* Real-time email check indicator */}
                {emailCheckState === 'checking' && (
                  <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: '#6B7280' }}>Checking...</span>
                )}
                {emailCheckState === 'ok' && (
                  <CheckCircle2 size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#10B981' }} />
                )}
              </div>
              {/* Duplicate email warning */}
              {emailCheckState === 'exists' && (
                <p style={{ marginTop: '6px', fontSize: '13px', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <AlertCircle size={13} />
                  An account with this email already exists.{' '}
                  <Link href="/creator/login" style={{ color: '#4F46E5', fontWeight: 600, textDecoration: 'underline' }}>
                    Sign in instead?
                  </Link>
                </p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a secure password (min. 6 chars)" 
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required 
                />
                <button 
                  type="button" 
                  className={styles.eyeIcon} 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide" : "Show"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (() => {
                const strength = getPasswordStrength(password);
                return (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px', height: '4px' }}>
                      {[1, 2, 3, 4].map((level) => (
                        <div 
                          key={level} 
                          style={{ 
                            flex: 1, 
                            borderRadius: '2px', 
                            backgroundColor: level <= strength.score ? strength.color : '#e5e7eb',
                            transition: 'background-color 0.3s ease'
                          }} 
                        />
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 500, color: strength.color }}>{strength.label}</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '16px' }}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm your secure password" 
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required 
                />
                <button 
                  type="button" 
                  className={styles.eyeIcon} 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide" : "Show"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
