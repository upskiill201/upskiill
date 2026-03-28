"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaChartLine, FaCheck, FaApple, FaLinkedin, FaFacebook, FaStar } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.splitContainer}>
      {/* Left Panel: Form */}
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <div className={styles.header}>
            <Image src="/logo.png" alt="Upskiill Logo" width={60} height={46} style={{ width: 'auto', height: 'auto' }} />
            {/* <span className={styles.brandName}>Upskiill</span> */}
          </div>

          <div className={styles.welcomeText}>
            <h1>Welcome back</h1>
            <p>Please enter your details to sign in.</p>
          </div>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input id="email" name="email" type="email" placeholder="Enter your email" autoComplete="email" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Create a password" autoComplete="current-password" />
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

            <button type="submit" className={styles.submitBtn}>
              Log In
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

      {/* Right Panel: Wow Factor */}
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
             
             {/* Floating Glass Card 1 */}
             <div className={`${styles.glassCard} ${styles.floatFast}`}>
               <div className={styles.iconCircle}><FaChartLine size={16} color="white" /></div>
               <div className={styles.cardLines}>
                 <div className={styles.lineLong}></div>
                 <div className={styles.lineShort}></div>
               </div>
             </div>

             {/* Floating Glass Card 2 */}
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
