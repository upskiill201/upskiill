'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './HowItWorks.module.css';

interface HowItWorksProps {
  onOpenModal: () => void;
}

const STEPS = [
  {
    num: "01",
    title: "Tell us your goal",
    description: "What do you want to become? Or what skill do you need?",
    graphic: (
      <div className={styles.graphic1}>
        <div className={styles.inputMock}>
          <span>I want to become a...</span>
          <span className={styles.cursor}>Frontend Developer</span>
        </div>
      </div>
    )
  },
  {
    num: "02",
    title: "AI builds your path",
    description: "In seconds, you get a clear learning path made for you.",
    graphic: (
      <div className={styles.graphic2}>
        <div className={styles.pathLine}>
          <div className={styles.pathStep}>HTML</div>
          <ArrowRight size={16} className={styles.pathArrow} />
          <div className={styles.pathStep}>CSS</div>
          <ArrowRight size={16} className={styles.pathArrow} />
          <div className={styles.pathStep}>JS</div>
        </div>
      </div>
    )
  },
  {
    num: "03",
    title: "Learn, step by step",
    description: "Our AI guides you through each lesson. Always know what to do next.",
    graphic: (
      <div className={styles.graphic3}>
        <div className={styles.lessonMock}>
          <div className={styles.lessonHeader}>
            <CheckCircle size={16} />
            <span>Lesson 3 of 24</span>
          </div>
          <div className={styles.lessonTitle}>CSS Flexbox Basics</div>
          <div className={styles.progressMock}>
            <div className={styles.progressFill2} />
          </div>
        </div>
      </div>
    )
  },
  {
    num: "04",
    title: "Reach your goal",
    description: "Complete the path. Gain real skills. Actually get somewhere.",
    graphic: (
      <div className={styles.graphic4}>
        <div className={styles.certMock}>
          <div className={styles.certIcon}>🎉</div>
          <div className={styles.certText}>Skill Verified</div>
        </div>
      </div>
    )
  }
];

export default function HowItWorks({ onOpenModal }: HowItWorksProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>How it works</h2>
          <p className={styles.subtitle}>Four simple steps. No confusion.</p>
        </motion.div>

        <div className={styles.steps}>
          {STEPS.map((step, index) => (
            <motion.div 
              key={index}
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepGraphic}>
                  {step.graphic}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className={styles.ctaBtn} onClick={onOpenModal}>
            Join the waitlist <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}