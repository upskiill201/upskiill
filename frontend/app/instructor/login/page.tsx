'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { FaGraduationCap, FaChalkboardTeacher, FaApple, FaLinkedin, FaFacebook, FaStar } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Button from '@/components/ui/Button';
import { signInWithGoogle, signInWithFacebook } from '@/lib/firebase';
import styles from './InstructorAuth.module.css';

// Using Suspense boundary to cleanly fetch search params without blocking
function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const isDefaultSignup = searchParams?.get('mode') === 'signup' || pathname?.includes('/signup');
  const initialMode = isDefaultSignup ? 'signup' : 'login';

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If URL or path changes, sync the mode
  useEffect(() => {
    const isSignup = searchParams?.get('mode') === 'signup' || pathname?.includes('/signup');
    setMode(isSignup ? 'signup' : 'login');
  }, [searchParams, pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const body = mode === 'signup' 
        ? { email, password, fullName, role: 'INSTRUCTOR' }
        : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errMsg || `${mode === 'signup' ? 'Signup' : 'Login'} failed`);
      }

      // Success — Route directly to the instructor dashboard
      window.location.href = '/instructor';
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    setError('');
    setLoading(true);

    try {
      const result = provider === 'google' 
        ? await signInWithGoogle() 
        : await signInWithFacebook();
        
      const idToken = await result.user.getIdToken();

      const res = await fetch(`/api/auth/firebase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken, role: 'INSTRUCTOR' }), // Crucial for Instructor pages!
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Social authentication failed');
      }

      window.location.href = '/instructor';
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message || 'Authentication user popup dismissed or failed');
      } else {
        setError('Authentication user popup dismissed or failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const showComingSoon = () => {
    setError('Apple and LinkedIn integrations are coming soon!');
  };

  const toggleMode = () => {
    setError('');
    const newMode = mode === 'login' ? 'signup' : 'login';
    setMode(newMode);
    
    // Smoothly update URL without reloading
    const newPath = `/instructor/${newMode}`;
    router.replace(newPath, { scroll: false });
  };

  return (
    <div className={styles.splitContainer}>
      {/* ─── LEFT PANEL (FORM) ─── */}
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <div className={styles.header}>
            <Link href="/">
              <Image src="/logo.png" alt="Upskiill Logo" width={80} height={30} style={{ width: '100px', height: 'auto' }} priority />
            </Link>
          </div>

          <div className={styles.welcomeText}>
            <h1>{mode === 'login' ? 'Instructor Login' : 'Become an Instructor'}</h1>
            <p>{mode === 'login' 
              ? 'Welcome back! Sign in to access your instructor studio.' 
              : 'Join thousands of instructors changing lives on Upskiill.'}
            </p>
          </div>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            {mode === 'signup' && (
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
            )}

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
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder={mode === 'signup' ? "Create a secure password" : "Enter your password"} 
                  autoComplete={mode === 'signup' ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            {mode === 'login' && (
              <div className={styles.forgotPasswordRow}>
                <label className={styles.checkboxGroup}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
              </div>
            )}

            {mode === 'signup' && (
              <div className={styles.termsBox}>
                By signing up, you agree to our <Link href="/terms/instructor">Instructor Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className={styles.submitBtn} disabled={loading}>
              {loading 
                ? (mode === 'login' ? 'Signing in...' : 'Creating account...') 
                : (mode === 'login' ? 'Sign In to Studio' : 'Create Instructor Account')
              }
            </Button>
          </form>

          <div className={styles.divider}>
            <span>OR CONTINUE WITH</span>
          </div>

          <div className={styles.socialGrid}>
            <button type="button" className={styles.socialBtn} onClick={() => handleSocialAuth('google')} disabled={loading}>
              <FcGoogle size={18} /> Google
            </button>
            <button type="button" className={styles.socialBtn} onClick={showComingSoon} disabled={loading}>
              <FaLinkedin size={18} color="#0A66C2" /> LinkedIn
            </button>
            <button type="button" className={styles.socialBtn} onClick={showComingSoon} disabled={loading}>
              <FaApple size={18} color="#000000" /> Apple
            </button>
            <button type="button" className={styles.socialBtn} onClick={() => handleSocialAuth('facebook')} disabled={loading}>
              <FaFacebook size={18} color="#1877F2" /> Facebook
            </button>
          </div>

          <div className={styles.footerLinks}>
            {mode === 'login' ? (
              <p>Want to teach? <button onClick={toggleMode} className={styles.switchLink}>Sign up here</button></p>
            ) : (
              <p>Already an instructor? <button onClick={toggleMode} className={styles.switchLink}>Sign in</button></p>
            )}
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
            <h2>Empower the next<br/>generation of learners</h2>
            <p>Publish your content, build your professional network, and earn money on each enrollment while transforming careers globally.</p>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialProfile}>
              <Image src="https://i.pravatar.cc/150?img=33" alt="Marcus Jenkins" width={40} height={40} className={styles.testimonialAvatar} />
              <div>
                <p className={styles.testimonialName}>Marcus Jenkins</p>
                <p className={styles.testimonialTitle}>Top Software Instructor</p>
              </div>
              <div className={styles.testimonialStars} style={{marginLeft: 'auto'}}>
                <FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} />
              </div>
            </div>
            <p className={styles.testimonialQuote}>
              &quot;Upskiill provided the exact premium tools I needed to launch my React course. The analytics dashboard alone is worth passing on other platforms!&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstructorAuthPage() {
  return (
    <Suspense fallback={<div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
