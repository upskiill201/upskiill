'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Clock, RefreshCw, Star } from 'lucide-react';
import { ProgressBar } from './bits';
import styles from './tabs.module.css';

interface LessonMetric {
  id: string;
  index: number;
  title: string;
  sectionTitle: string;
  reached: number;
  completed: number;
  leak: number;
  completionPct: number;
  avgTimeSpentSeconds: number | null;
  avgAttempts: number | null;
  avgQuizScore: number | null;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const rem = seconds % 60;
  return rem > 0 ? `${mins}m ${rem}s` : `${mins}m`;
}

function ScoreChip({ score }: { score: number | null }) {
  if (score === null) {
    return (
      <span className={`${styles.metricChip} ${styles.metricMuted}`} title="No quiz data yet">
        <Star size={14} />
        <span>—</span>
      </span>
    );
  }
  const tone =
    score >= 80 ? styles.scoreGood : score >= 50 ? styles.scoreMid : styles.scoreBad;
  return (
    <span className={`${styles.metricChip} ${tone}`} title="Average Apply-phase accuracy">
      <Star size={14} />
      <span>{score}%</span>
    </span>
  );
}

export function LessonsTab({ data }: { data: { lessons: LessonMetric[] } }) {
  const lessons = data.lessons ?? [];
  const worstLeak = Math.max(0, ...lessons.map((l) => l.leak));

  if (lessons.length === 0) {
    return (
      <div className={styles.retentionEmpty}>
        No published lessons yet. Publish lessons to see engagement here.
      </div>
    );
  }

  const withTime = lessons.filter((l) => l.avgTimeSpentSeconds !== null);
  const courseAvgTime =
    withTime.length > 0
      ? Math.round(
          withTime.reduce((a, l) => a + (l.avgTimeSpentSeconds ?? 0), 0) / withTime.length,
        )
      : null;

  return (
    <div className={styles.lessonsRoot}>
      <h3 className={styles.sectionHeading}>Lesson Engagement</h3>
      <p className={styles.sectionSub}>
        Time spent and accuracy come in as students complete lessons. The flag marks the
        lesson losing the most learners.
        {courseAvgTime !== null && (
          <> Course average time: <strong>{formatDuration(courseAvgTime)}</strong>.</>
        )}
      </p>

      <div className={styles.lessonsList}>
        {lessons.map((lesson, i) => (
          <motion.div
            key={lesson.id}
            className={styles.lessonMetricRow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.3) }}
          >
            <div className={styles.lessonIndexBubble}>{lesson.index + 1}</div>

            <div className={styles.lessonMetricMid}>
              <span className={styles.lessonMetricTitle}>
                {lesson.title || `Lesson ${lesson.index + 1}`}
              </span>
              <span className={styles.lessonSection}>{lesson.sectionTitle}</span>
              <div className={styles.lessonCompletionRow}>
                <ProgressBar
                  pct={lesson.completionPct}
                  color={lesson.completionPct >= 70 ? '#58cc02' : lesson.completionPct >= 40 ? '#ffc800' : '#ff4b4b'}
                />
                <span className={styles.lessonCompletionText}>
                  {lesson.completed}/{lesson.reached} finish ({lesson.completionPct}%)
                </span>
              </div>
            </div>

            <div className={styles.metricChips}>
              <span className={styles.metricChip} title="Average time spent per completion">
                <Clock size={14} />
                <span>{lesson.avgTimeSpentSeconds !== null ? formatDuration(lesson.avgTimeSpentSeconds) : '—'}</span>
              </span>
              <span className={styles.metricChip} title="Average attempts needed at completion">
                <RefreshCw size={14} />
                <span>{lesson.avgAttempts !== null ? `${lesson.avgAttempts}x` : '—'}</span>
              </span>
              <ScoreChip score={lesson.avgQuizScore} />
              {worstLeak > 0 && lesson.leak === worstLeak && (
                <span className={styles.worstFlag}>
                  <AlertTriangle size={11} />
                  Loses {lesson.leak}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <p className={styles.lessonsFootnote}>
        Dashes mean no data yet for that metric — they fill in as students complete each
        lesson on the new player.
      </p>
    </div>
  );
}
