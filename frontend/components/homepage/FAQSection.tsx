'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './FAQSection.module.css';

const faqs = [
  {
    q: 'When does Teyro launch?',
    a: '<strong>Phase 1 MVP</strong> will launch in August, and we will launch <strong>Beta</strong> in July. Waitlist members get early access to the beta platform, insider insights, and testing opportunities while we develop.',
  },
  {
    q: 'Is it really free to join the waitlist?',
    a: 'Yes, completely free. Zero cost, zero commitment. Secure your spot and your early-bird benefits (discounted courses, priority access, founder badge) just by signing up.',
  },
  {
    q: 'Do I need to be technical to use Teyro?',
    a: 'Not at all. Teyro is designed for everyone — from complete beginners who have never taken an online course, to advanced professionals looking to upskill. Our AI tutor adjusts to <strong>your level</strong>.',
  },
  {
    q: "What if I'm an instructor? Can I sell courses?",
    a: "Yes! We're onboarding <strong>10,000+ instructors</strong> in the first cohort. Apply separately via the instructor waitlist. You'll get early access to our course creation wizard and studio before any public launch.",
  },
  {
    q: 'How much will courses cost?',
    a: 'Pricing will range from <strong>$20–$200</strong> depending on depth and subject. Early waitlist members get exclusive early-bird discounts — up to 70% off course launch prices.',
  },
  {
    q: 'Will Teyro work on my data plan?',
    a: 'Absolutely. <strong>Lite Mode</strong> uses 85% less data than any other major platform. Audio-only learning, offline downloads, and compressed video work on any slow connection — whether you\'re in Lagos, London, or Lima.',
  },
  {
    q: 'Can I really earn money on the marketplace?',
    a: 'Yes. After completing a Teyro course, you can offer your skills as services on the <strong>Teyro Marketplace</strong>. Students earn an average of $400/month. No previous freelancing experience required.',
  },
  {
    q: 'Is Teyro only for certain countries?',
    a: "Teyro is built for the <strong>entire world</strong>. We do have specific features that make learning exceptional in areas with slow internet or expensive data plans — but anyone, anywhere benefits from AI guidance, personalized paths, and the marketplace. English, French, Spanish, and more languages are supported.",
  },
  {
    q: "How is Teyro different from Coursera or Udemy?",
    a: 'Simple: <strong>Coursera and Udemy are Edtech 1.0.</strong> They are video libraries with a 97% drop-off rate that prioritize monetization over your success. Teyro is <strong>Edtech 2.0</strong>—a re-imagined system with 24/7 AI coaching, active problem solving, and a marketplace for real-world results. We don\'t just sell video access; we track actual achievement.',
  },
  {
    q: 'What role should I select — Student or Instructor?',
    a: 'Choose <strong>Student</strong> if you want to learn new skills and potentially earn money on the marketplace. Choose <strong>Instructor</strong> if you want to create and sell courses and build your own teaching brand.',
  },
  {
    q: 'Is Teyro just another video library like Udemy?',
    a: 'No. Traditional platforms are <strong>"dumb translations"</strong> of classroom lectures to video. They lack the three essentials for online success: Accountability, Active Practice, and Real-Time Interaction. Teyro is <strong>Edtech 2.0</strong>—re-imagined to catch you right before you "ghost" with guidance that actually sticks.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.eyebrow}>Got Questions?</div>
          <h2 className={styles.heading}>Frequently Asked Questions</h2>
          <p className={styles.subheading}>
            Everything you need to know about Teyro — honestly answered.
          </p>
        </motion.div>

        <motion.div
          className={styles.list}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {faqs.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <button
                  className={styles.questionBtn}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  id={`faq-q-${i}`}
                >
                  <span className={styles.question}>{q}</span>
                  <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.answer}
                      key="answer"
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div
                        className={styles.answerInner}
                        dangerouslySetInnerHTML={{ __html: a }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}