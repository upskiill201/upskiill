'use client';

/**
 * Students hub → Insights. Deterministic rule cards about the learner base
 * (same shape as Analytics insights — rendered by the shared card view).
 */

import { InsightCardView, EmptyState, type InsightCardShape } from '@/components/creator/analytics/bits';
import { Lightbulb } from 'lucide-react';
import styles from './students.module.css';

export function StudentsInsightsTab({ insights }: { insights: InsightCardShape[] }) {
  if (insights.length === 0) {
    return (
      <EmptyState
        icon={<Lightbulb size={28} />}
        title="No learner insights yet"
        body="Insights appear once your courses have learners with real activity — patterns like who is stuck where and who is about to finish."
      />
    );
  }
  return (
    <div className={styles.root}>
      <div className={styles.twoCol}>
        {insights.map((card) => (
          <InsightCardView key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
