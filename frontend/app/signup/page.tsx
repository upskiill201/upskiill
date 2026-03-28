import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Lock, Eye } from 'lucide-react';
import styles from './Signup.module.css';

export default function Signup() {
  return (
    <div className={styles.splitContainer}>
      {/* Left Panel: Form */}
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="Upskiill" width={140} height={40} style={{ width: 'auto', height: '36px' }} priority />
          </Link>
          
          <h1 className={styles.title}>Start your journey</h1>
          <p className={styles.subtitle}>Create your account and unlock your potential.</p>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input type="text" placeholder="John Doe" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input type="email" placeholder="Enter your email" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input type="password" placeholder="Create a password" />
                <Eye size={18} className={styles.eyeIcon} />
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
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link></label>
            </div>

            <button type="button" className={styles.submitBtn}>Create Account</button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <div className={styles.socialGrid}>
            <button type="button" className={styles.socialBtn}>Google</button>
            <button type="button" className={styles.socialBtn}>LinkedIn</button>
            <button type="button" className={styles.socialBtn}>Apple</button>
            <button type="button" className={styles.socialBtn}>Facebook</button>
          </div>

          <div className={styles.footerLinks}>
            <span className={styles.copyright}>© 2024 Upskiill Inc.</span>
            <p>Already have an account? <Link href="/login">Log in</Link></p>
          </div>
        </div>
      </div>

      {/* Right Panel: Wow Factor */}
      <div className={styles.rightPanel}>
        <div className={styles.wowContent}>
          
          <div className={styles.floatingGraphic}>
             {/* Central Graphic Placeholder */}
             <div className={styles.placeholderGraphic}></div>
             
             {/* Floating Glass Card 1 */}
             <div className={`${styles.glassCard} ${styles.floatFast}`}>
               <div className={styles.iconCircle}>🎓</div>
               <div className={styles.cardLines}>
                 <div className={styles.lineLong}></div>
                 <div className={styles.lineShort}></div>
               </div>
             </div>

             {/* Floating Glass Card 2 */}
             <div className={`${styles.glassCard} ${styles.floatSlow}`}>
               <div className={styles.iconCircle}>📈</div>
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
              <div className={styles.statIcon}>📹</div>
              <span>1000+ Courses</span>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🎖️</div>
              <span>Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
