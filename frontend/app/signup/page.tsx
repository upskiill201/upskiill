"use client";

import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGraduationCap, FaRocket, FaVideo, FaAward, FaApple, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Signup.module.css';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, fullName, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errMsg || 'Signup failed');
      }

      // Cookie is set automatically by the backend (httpOnly, secure)
      router.push('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.splitContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="Upskiill" width={140} height={40} style={{ width: 'auto', height: '36px' }} priority />
          </Link>
          
          <h1 className={styles.title}>Start your journey</h1>
          <p className={styles.subtitle}>Create your account and unlock your potential.</p>

          {error && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', fontWeight: '500' }}>{error}</div>}

          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullName">Full Name</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input 
                  id="fullName" 
                  name="fullName" 
                  type="text" 
                  placeholder="John Doe" 
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
            </div>

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
                  autoComplete="new-password" 
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
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBars}>
                  <div className={styles.strengthBarActive} style={{ width: '25%' }}></div>
                  <div className={styles.strengthBar}></div>
                  <div className={styles.strengthBar}></div>
                  <div className={styles.strengthBar}></div>
                </div>
                <div className={styles.strengthText}>
                  <span>Password strength</span>
                  <span>Must be at least 8 characters</span>
                </div>
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link></label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <div className={styles.socialGrid}>
            <button type="button" className={styles.socialBtn}>
              <FcGoogle size={18} /> Google
            </button>
            <button type="button" className={styles.socialBtn}>
              <FaLinkedin size={18} color="#0A66C2" /> LinkedIn
            </button>
            <button type="button" className={styles.socialBtn}>
              <FaApple size={18} color="#000000" /> Apple
            </button>
            <button type="button" className={styles.socialBtn}>
              <FaFacebook size={18} color="#1877F2" /> Facebook
            </button>
          </div>

          <div className={styles.footerLinks}>
            <span className={styles.copyright}>© {new Date().getFullYear()} Upskiill Inc.</span>
            <p>Already have an account? <Link href="/login">Log in</Link></p>
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.wowContent}>
          
          <div className={styles.floatingGraphic}>
             <Image 
               src="/hero-graphic.png" 
               alt="Master new skills" 
               width={400} 
               height={400} 
               className={styles.heroGraphicImage}
               priority
             />
             
             <div className={`${styles.glassCard} ${styles.floatFast}`}>
               <div className={styles.iconCircle}><FaGraduationCap size={16} color="white" /></div>
               <div className={styles.cardLines}>
                 <div className={styles.lineLong}></div>
                 <div className={styles.lineShort}></div>
               </div>
             </div>

             <div className={`${styles.glassCard} ${styles.floatSlow}`}>
               <div className={styles.iconCircle}><FaRocket size={16} color="white" /></div>
               <div className={styles.cardLines}>
                 <div className={styles.lineLong}></div>
                 <div className={styles.lineShort}></div>
               </div>
             </div>
          </div>

          <div className={styles.rightTextContent}>
            <h2>Master new skills<br/>with expert guidance</h2>
            <p>Join our community of learners and get access to premium courses, interactive workshops, and personalized mentorship.</p>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><FaVideo size={14} color="white" /></div>
              <span>1000+ Courses</span>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><FaAward size={14} color="white" /></div>
              <span>Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
