'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FaGraduationCap, FaChalkboardTeacher, FaStar } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Button from '@/components/ui/Button';
import { signInWithGoogle } from '@/lib/firebase';
import { getOnboardingData, clearOnboardingData } from '@/lib/onboarding';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import posthog from 'posthog-js';
import styles from '../../login/InstructorAuth.module.css';

export default function StepFifteenPage() {
  const router = useRouter();

  // 🛡️ Step-skip protection
  useOnboardingGuard(15);

  const [showPassword, setShowPassword] = useState(false);
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

  useEffect(() => {
    posthog.capture('onboarding_step_viewed', { step: 15, stepName: 'signup' });
  }, []);

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
        const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errMsg || 'Signup failed');
      }

      // ✅ ONLY clear localStorage after confirmed backend success
      clearOnboardingData();
      posthog.capture('onboarding_completed', { method: 'email' });

      window.location.href = `/creator/verify-pending?email=${encodeURIComponent(email)}`;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      // ❌ Do NOT clear localStorage on failure — creator can retry with all data preserved
    } finally {
      setLoading(false);
    }
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
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Social authentication failed');
      }

      // ✅ Only clear after backend confirms success
      clearOnboardingData();
      posthog.capture('onboarding_completed', { method: 'google' });

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
