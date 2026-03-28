import Link from 'next/link';
import Image from 'next/image';
import { Play, TrendingUp, Users, Award, Zap } from 'lucide-react';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            Master your future <span>with expert guidance.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Join thousands of modern web professionals building industry-leading skills on Upskiill. Access world-class interactive courses and boost your earning potential today.
          </p>
          <div className={styles.heroActions}>
            <Link href="/signup" className={styles.primaryBtn}>
              Start Learning Free
            </Link>
            <Link href="/courses" className={styles.secondaryBtn}>
              Explore Courses
            </Link>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroImageContainer}>
            <Image 
              src="/hero-graphic.png" 
              alt="Upskiill Hero Platform" 
              width={600} 
              height={600} 
              className={styles.heroImage}
              priority
            />
            {/* Absolute Placed 3D Glass Cards */}
            <div className={`${styles.floatingCard} ${styles.cardTop}`}>
              <div className={`${styles.iconBox} ${styles.bgOrange}`}>
                <Play size={24} />
              </div>
              <div className={styles.floatingText}>
                <h4>1,000+ Courses</h4>
                <p>New content daily</p>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.cardBottom}`}>
              <div className={`${styles.iconBox} ${styles.bgPurple}`}>
                <Award size={24} />
              </div>
              <div className={styles.floatingText}>
                <h4>Certifications</h4>
                <p>Industry recognized</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <TrendingUp size={32} />
            </div>
            <h3>Career Acceleration</h3>
            <p>Our courses are engineered to give you the precise skills leading technology companies actively hire for.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Users size={32} />
            </div>
            <h3>Expert Mentors</h3>
            <p>Learn directly from industry veterans and elite professionals who have scaled global digital products.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Zap size={32} />
            </div>
            <h3>Interactive Workflow</h3>
            <p>Ditch boring lectures. Write code, test designs, and build real-world portfolios directly inside your browser.</p>
          </div>
        </div>
      </section>

      {/* Conversion Footer Banner */}
      <section className={styles.conversionSection}>
        <div className={styles.conversionContainer}>
          <h2>Ready to unlock your full potential?</h2>
          <p>Join the premier network of digital architects and future-proof your career today.</p>
          <Link href="/signup" className={styles.ctaBtn}>
            Create your Free Account
          </Link>
        </div>
      </section>

    </div>
  );
}
