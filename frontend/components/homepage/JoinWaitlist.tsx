'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import styles from './JoinWaitlist.module.css';

interface JoinWaitlistProps {
  onOpenModal: () => void;
}

export default function JoinWaitlist({ onOpenModal }: JoinWaitlistProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>
            Ready to fix your learning?
          </h2>
          <p className={styles.subtitle}>
            Join thousands already on the waitlist. Be first to know when we launch.
          </p>

          <button className={styles.ctaBtn} onClick={onOpenModal}>
            Join the waitlist <ArrowRight size={20} />
          </button>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>23,543</span>
              <span className={styles.statLabel}>waiting</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <span className={styles.statNum}>~6 weeks</span>
              <span className={styles.statLabel}>to launch</span>
            </div>
          </div>

          <div className={styles.social}>
            <span>Follow our journey</span>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Twitter"><FaTwitter size={20} /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
              <a href="#" aria-label="Instagram"><FaInstagram size={20} /></a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}