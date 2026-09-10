'use client';

/**
 * Hub → Insights. The rule-engine feed: Teyro reads the same data as every
 * other tab and tells the creator what's working, what to watch, and what
 * needs attention — no chart-reading required.
 */

import { motion } from 'framer-motion';
import { Lightbulb, Sparkles } from 'lucide-react';
import { EmptyState, InsightCardView, type InsightCardShape } from '../bits';
import styles from './hubtabs.module.css';

export function InsightsTab({ insights }: { insights: InsightCardShape[] }) {
  if (insights.length === 0) {
    return (
      <EmptyState
        icon={<Sparkles size={30} />}
        title="Nothing needs attention right now"
        body="As learners move through your courses, Teyro will flag drop-off points, quiet students and momentum shifts here automatically."
      />
    );
  }

  return (
    <div className={styles.hubTabRoot}>
      <div className={styles.ratingHead} style={{ padding: '16px 20px' }}>
        <Lightbulb size={26} color="#ffc800" />
        <div className={styles.ratingSideInfo}>
          <span className={styles.reviewName}>Teyro Insights</span>
          <span className={styles.ratingCountLine}>
            Plain-language takeaways computed from your live learning data.
          </span>
        </div>
      </div>

      <div className={styles.insightsList}>
        {insights.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.06, 0.3) }}
          >
            <InsightCardView card={card} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
