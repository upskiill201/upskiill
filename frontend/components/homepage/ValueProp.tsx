'use client';

import { motion } from 'framer-motion';
import { Brain, Target, TrendingUp } from 'lucide-react';
import styles from './ValueProp.module.css';

interface ValuePropProps {
  onOpenModal: () => void;
}

export default function ValueProp({ onOpenModal }: ValuePropProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>
            Learning, <span className={styles.fixed}>fixed.</span>
          </h2>
          <p className={styles.subtitle}>
            The old way: scroll through thousands of courses, hope you pick right, get stuck, give up.
            <br />
            Our way: AI handles everything.
          </p>
        </motion.div>

        <div className={styles.grid}>
          <motion.div 
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.iconWrap}>
              <Brain size={28} />
            </div>
            <h3>AI knows what you need</h3>
            <p>No more guessing. Our AI analyzes your goal and builds your exact path.</p>
          </motion.div>

          <motion.div 
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.iconWrap}>
              <Target size={28} />
            </div>
            <h3>One step at a time</h3>
            <p>No overwhelm. Just clear next lessons that actually make sense.</p>
          </motion.div>

          <motion.div 
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.iconWrap}>
              <TrendingUp size={28} />
            </div>
            <h3>You actually finish</h3>
            <p>Our AI keeps you moving. No more starting and stopping.</p>
          </motion.div>
        </div>

        <motion.div 
          className={styles.bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button className={styles.ctaBtn} onClick={onOpenModal}>
            Get early access
          </button>
        </motion.div>
      </div>
    </section>
  );
}