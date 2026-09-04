"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaChartLine, FaCheck, FaStar } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { signInWithGoogle } from '@/lib/firebase';
import { sanitizeNextPath } from '@/lib/return-to';
import styles from './Login.module.css';

export default function Login() {
  // proxy.ts preserves the destination when it bounces a token-less request,
  // so a push notification tapped with an expired session still lands on the
  // lesson it pointed at. Sanitized against open redirects.
  //
  // Read from window at call time rather than via useSearchParams: this page is
  // a client component at the route root, and the hook would force a Suspense
  // boundary for static prerendering (see PostHogProvider for the same issue).
  const resolveNext = () =>
    sanitizeNextPath(new URLSearchParams(window.location.search).get('next'));

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errMsg || 'Login failed');
      }

      // Cookie is set automatically by the backend (httpOnly, secure)
      window.location.href = resolveNext();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
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

      window.location.href = resolveNext();
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

  return (
    <div className={styles.splitContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <div className={styles.header}>
            <Image src="/teyro-logo-blue.png" alt="Teyro Logo" width={220} height={66} style={{ width: 'auto', height: '56px', objectFit: 'contain' }} />
          </div>

          <div className={styles.welcomeText}>
            <h1>Welcome back</h1>
            <p>Please enter your details to sign in.</p>
          </div>

          {error && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', fontWeight: '500' }}>{error}</div>}

          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
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
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a password" 
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className={styles.eyeIcon} 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.forgotPasswordRow}>
              <label className={styles.checkboxGroup}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <div className={styles.socialGrid}>
            <button type="button" className={styles.socialBtn} onClick={handleSocialLogin} disabled={loading}>
              <FcGoogle size={18} /> Continue with Google
            </button>
          </div>

          <div className={styles.footerLinks}>
            <p>Don&apos;t have an account?</p>
            <Link href="/signup" className={styles.signupLink}>Sign up</Link>
          </div>
        </div>

        <div className={styles.bottomLegal}>
          <Link href="/privacy">Privacy Policy</Link>
          <span> • </span>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.wowContent}>
          
          <div className={styles.floatingGraphic}>
             <Image 
               src="/hero-graphic.png" 
               alt="Elevate your skills" 
               width={400} 
               height={400} 
               className={styles.heroGraphicImage}
               priority
             />
             
             <div className={`${styles.glassCard} ${styles.floatFast}`}>
               <div className={styles.iconCircle}><FaChartLine size={16} color="white" /></div>
               <div className={styles.cardLines}>
                 <div className={styles.lineLong}></div>
                 <div className={styles.lineShort}></div>
               </div>
             </div>

             <div className={`${styles.glassCard} ${styles.floatSlow}`}>
               <div className={styles.iconCircle}><FaCheck size={16} color="white" /></div>
               <div className={styles.cardLines}>
                 <div className={styles.lineLong}></div>
                 <div className={styles.lineShort}></div>
               </div>
             </div>
          </div>

          <div className={styles.rightTextContent}>
            <h2>Elevate your skills<br/>to the next level</h2>
            <p>Join hundreds of professionals who are transforming their careers with our cutting-edge learning platform.</p>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialProfile}>
              <Image src="https://i.pravatar.cc/150?img=5" alt="Sarah Jenkins" width={40} height={40} className={styles.testimonialAvatar} />
              <div>
                <p className={styles.testimonialName}>Sarah Jenkins</p>
                <p className={styles.testimonialTitle}>Product Designer</p>
              </div>
              <div className={styles.testimonialStars} style={{marginLeft: 'auto'}}>
                <FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} />
              </div>
            </div>
            <p className={styles.testimonialQuote}>
              &quot;Upskiill completely changed my workflow. The intuitive design and comprehensive courses helped me land my dream job.&quot;
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
